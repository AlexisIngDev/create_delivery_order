import { DeliveryOrderContent } from './deliveryOrderContent.interface';

export interface DeliveryOrder {
  customer_ref: string;
  consignee_id?: string | null;
  bill_of_lading?: string | null;
  type_id?: string | null;
  status_id: string;
  type_code_name?: string | null;
  to_zone_id?: string | null;
  from_zone_id?: string | null;
  customer_id?: string | null;
  arrival_date?: string | null;
  inbond_via_id?: string | null;
  updated_by?: string | null;
  move_type_code_name?: string | null;
  vessel_name?: string | null;
  raw?: Record<string, any> | null;
  date?: string | null;
  carrier_id?: string | null;
  delivery_order_content: {
    data: DeliveryOrderContent;
  };
}
