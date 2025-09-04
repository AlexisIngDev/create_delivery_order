import { WorkOrderElement } from '../Interface/workOrder.interface';
import { DeliveryOrder } from '../Interface/deliveryOrder.interface';
import { DeliveryOrderContent } from '../Interface/deliveryOrderContent.interface';

export function mapWorkOrderToDeliveryOrder(
  workOrder: WorkOrderElement,
  content: DeliveryOrderContent,
  rawData: Record<string, any>,
): DeliveryOrder {
  return {
    customer_ref: workOrder.customer_ref ?? '',
    consignee_id: workOrder.consignee_id,
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
    delivery_order_content: { data: content },
  };
}
