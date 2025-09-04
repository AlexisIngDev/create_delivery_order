import { InjectGraphQLClient } from '@golevelup/nestjs-graphql-request';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { GraphQLClient } from 'graphql-request';
import { SEARCH_CUSTOMER_REF, WORK_ORDER } from './graphql/querys';
import { INSERT_DELIVERY_ORDER, UPDATE_WORK_ORDER } from './graphql/mutation';
import { WorkOrder } from './Interface/workOrder.interface';
import { DeliveryOrder } from './Interface/deliveryOrder.interface';

@Injectable()
export class AppService {
  constructor(@InjectGraphQLClient() private readonly client: GraphQLClient) {}

  async startApp() {
    try {
      const response = await this.client.request<WorkOrder>(WORK_ORDER);

      if (!response || response.work_orders?.length === 0) {
        return new NotFoundException('No work orders found');
      }

      const workOrder = response.work_orders[0];
      const customerRef = workOrder?.customer_ref;

      if (!customerRef) {
        return new NotFoundException('No customer ref found');
      }

      try {
        const check: { delivery_orders: Array<{ id: string }> } =
          await this.client.request(SEARCH_CUSTOMER_REF, { ref: customerRef });

        if (check.delivery_orders.length > 0) {
          return new BadRequestException('Delivery order already exists');
        }

        const delivery_order_content = {
          customer_ref: customerRef,
          description: 'DELIVERY ORDER CONTENT CREATE FROM STREET RETURN',
          weight: workOrder.weight ?? null,
          container: workOrder.container ?? null,
          container_size: workOrder.equipment?.equipment_type?.model ?? null,
          te: workOrder.te ?? null,
          seal: workOrder.seal ?? null,
          te_expiration: workOrder.te_expiration ?? null,
          load_type_id: workOrder.load_type_id ?? null,
          unit_type_id: workOrder.unit_type_id ?? null,
          equipment_type_id: workOrder.equipment?.equipment_type?.id ?? null,
          equipment_id: workOrder.equipment?.id ?? null,
          status_id: 'f13b8103-17c6-43e0-9b91-f488409358c0',
        };

        const rawData = {
          type_id: workOrder.type_id?.id ?? null,
          to_zone_id: workOrder.to_zone_id ?? null,
          customer_id: workOrder.customer_id ?? null,
          from_zone_id: workOrder.from_zone_id ?? null,
        };

        const input: DeliveryOrder = {
          customer_ref: customerRef,
          consignee_id: workOrder.consignee_id ?? null,
          bill_of_lading: workOrder.bill_of_lading ?? null,
          type_id: workOrder.type_id?.id ?? null,
          status_id: '7feb6604-64a8-40e6-b60b-e3cc4788b229',
          type_code_name: workOrder.type_id?.code_name ?? null,
          to_zone_id: workOrder.to_zone_id ?? null,
          from_zone_id: workOrder.from_zone_id ?? null,
          customer_id: workOrder.customer_id ?? null,
          arrival_date: workOrder.arrival_date ?? null,
          inbond_via_id: workOrder.inbond_via_id ?? null,
          updated_by: workOrder.updated_by ?? null,
          move_type_code_name: workOrder.move_type_code_name?.code_name ?? null,
          vessel_name: workOrder.vessel_name ?? null,
          raw: rawData,
          date: workOrder.do_received ?? null,
          carrier_id: workOrder.carrier_id ?? null,
          delivery_order_content: { data: delivery_order_content },
        };

        const insertRes = await this.client.request<{
          insert_delivery_orders: {
            returning: Array<{ id: string }>;
          };
        }>(INSERT_DELIVERY_ORDER, { input: [input] });

        const responses = await this.client.request(UPDATE_WORK_ORDER, {
          id: workOrder.id,
          deliveryId: insertRes.insert_delivery_orders.returning[0].id,
        });

        console.log(responses);

        return { status: responses };
      } catch (err: unknown) {
        let errorMsg = 'unknown_error';
        if (err instanceof Error) errorMsg = err.message;
        console.error(
          `❌ Error en WO ${workOrder.id} (${customerRef}): ${errorMsg}`,
        );
      }

      return { status: 'done' };
    } catch (error: unknown) {
      let errorMsg = 'unknown_error';
      if (error instanceof Error) errorMsg = error.message;
      console.error(error);
      throw new BadRequestException(`Error general: ${errorMsg}`);
    }
  }
}
