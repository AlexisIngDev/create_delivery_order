export interface WorkOrder {
  work_orders: WorkOrderElement[];
}

export interface WorkOrderElement {
  id?: string;
  do_received?: string;
  customer_ref?: string;
  bill_of_lading?: null | string;
  consignee_id?: null;
  type_id?: TypeID;
  to_zone_id?: string;
  from_zone_id?: string;
  customer_id?: null | string;
  arrival_date?: null;
  inbond_via_id?: null | string;
  updated_by?: string;
  move_type_code_name?: MoveTypeCodeName | null;
  vessel_name?: null | string;
  delivery_order_id?: string;
  carrier_id?: null;
  te?: string;
  container?: string;
  weight?: number;
  load_type_id?: string;
  unit_type_id?: string;
  seal?: null | string;
  te_expiration?: null;
  equipment?: Equipment;
}

export interface Equipment {
  id?: string;
  customer_id?: string;
  code?: string;
  equipment_type?: EquipmentType;
}

export interface EquipmentType {
  id?: string;
  model?: string;
}

export interface MoveTypeCodeName {
  code_name?: string;
}

export interface TypeID {
  id?: string;
  code_name?: string;
}
