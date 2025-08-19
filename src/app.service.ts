import { InjectGraphQLClient } from '@golevelup/nestjs-graphql-request';
import { Injectable, BadRequestException } from '@nestjs/common';
import { GraphQLClient } from 'graphql-request';
import { SEARCH_CUSTOMER_REF, WORK_ORDER } from './graphql/querys';
import { INSERT_DELIVERY_ORDER, UPDATE_WORK_ORDER } from './graphql/mutation';
import { WorkOrder } from './Interface/workOrder.interface';
import * as fs from 'fs';

@Injectable()
export class AppService {
  constructor(@InjectGraphQLClient() private readonly client: GraphQLClient) {}

  async startApp() {
    const updatedOrdersCsv: string[] = [];

    try {
      const response = await this.client.request<WorkOrder>(WORK_ORDER);

      if (!response.work_orders || response.work_orders.length === 0) {
        return { status: 'no_work_orders', message: 'No work orders found' };
      }

      updatedOrdersCsv.push(
        'work_order_id,customer_ref,delivery_order_id,was_created,error_message',
      );

      for (const order of response.work_orders) {
        const customerRef = order?.customer_ref;
        if (!customerRef) continue;

        let deliveryOrderId = '';
        let wasCreated = false;
        let errorMsg = '';

        try {
          const check: { delivery_orders: Array<{ id: string }> } =
            await this.client.request(SEARCH_CUSTOMER_REF, {
              ref: customerRef,
            });

          if (check.delivery_orders.length > 0) {
            deliveryOrderId = check.delivery_orders[0].id;
            console.log(
              `✅ DeliveryOrder already exists: ${deliveryOrderId} for ${customerRef} (WO: ${order.id})`,
            );
          } else {
            const rawData = {
              type_id: order?.type_id?.id ?? null,
              to_zone_id: order?.to_zone_id ?? null,
              customer_id: order?.customer_id ?? null,
              from_zone_id: order?.from_zone_id ?? null,
            };

            const insertRes = await this.client.request(INSERT_DELIVERY_ORDER, {
              input: [
                {
                  customer_ref: customerRef,
                  bill_of_lading: order?.bill_of_lading ?? null,
                  type_id: order?.type_id?.id ?? null,
                  status_id: '7feb6604-64a8-40e6-b60b-e3cc4788b229',
                  type_code_name: order?.type_id?.code_name ?? null,
                  to_zone_id: order?.to_zone_id ?? null,
                  from_zone_id: order?.from_zone_id ?? null,
                  customer_id: order?.customer_id ?? null,
                  arrival_date: order?.arrival_date ?? null,
                  inbond_via_id: order?.inbond_via_id ?? null,
                  updated_by: order?.updated_by ?? null,
                  move_type_code_name:
                    order?.move_type_code_name?.code_name ?? null,
                  vessel_name: order?.vessel_name ?? null,
                  raw: rawData,
                },
              ],
            });

            const insertDeliveryOrders = (
              insertRes as {
                insert_delivery_orders: { returning: Array<{ id: string }> };
              }
            ).insert_delivery_orders;
            deliveryOrderId = insertDeliveryOrders.returning[0].id;

            wasCreated = true;
            console.log(
              `🆕 DeliveryOrder created: ${deliveryOrderId} for ${customerRef} (WO: ${order.id})`,
            );
          }

          await this.client.request(UPDATE_WORK_ORDER, {
            id: order.id,
            deliveryId: deliveryOrderId,
          });

          console.log(
            `🔄 Work Order updated: ${order.id} with DO ${deliveryOrderId}`,
          );
        } catch (err) {
          errorMsg = (err as Error).message || 'unknown_error';
          console.error(
            `❌ Error en WO ${order.id} (${customerRef}): ${errorMsg}`,
          );
        }

        // Agregar resultado al CSV
        updatedOrdersCsv.push(
          `${order.id},${customerRef},${deliveryOrderId},${wasCreated},${errorMsg}`,
        );
      }

      const filePath = 'updated_work_orders.csv';
      fs.writeFileSync(filePath, updatedOrdersCsv.join('\n'), 'utf8');
      console.log(`📄 CSV generado: ${filePath}`);

      return { status: 'done', file: filePath };
    } catch (error) {
      console.error(error);
      throw new BadRequestException(`Error general: ${error}`);
    }
  }
}
