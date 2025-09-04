export interface DeliveryOrderContent {
  customer_ref: string;
  description: string;
  weight?: number | null;
  container?: string | null;
  container_size?: string | null;
  te?: string | null;
  seal?: string | null;
  te_expiration?: string | null;
  load_type_id?: string | null;
  unit_type_id?: string | null;
  equipment_type_id?: string | null;
  equipment_id?: string | null;
  status_id: string;
}
