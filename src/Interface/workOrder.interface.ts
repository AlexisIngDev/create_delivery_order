export interface DeliveryOrderInput {
  customer_ref: string | null;
  bill_of_lading: string | null;
  type_id: string | null;
  status_id: string | null;
  to_zone_id: string | null;
  from_zone_id: string | null;
  customer_id: string | null;
  arrival_date: string | null;
  inbond_via_id: string | null;
  updated_by: string | null;
  move_type_code_name: MoveTypeCodeNameCodeName | null;
  vessel_name: string | null;
  raw: string;
}

export interface WorkOrder {
  work_orders: WorkOrderElement[];
}

export interface WorkOrderElement {
  customer_ref?: string;
  bill_of_lading?: null | string;
  type_id?: TypeID;
  status_id?: StatusID;
  to_zone_id?: string;
  from_zone_id?: null | string;
  customer_id?: string;
  arrival_date?: null;
  inbond_via_id?: null | string;
  updated_by?: string;
  move_type_code_name?: MoveTypeCodeName;
  vessel_name?: null | string;
  delivery_order_id?: null | string;
  id?: string;
}

export interface MoveTypeCodeName {
  code_name?: MoveTypeCodeNameCodeName;
}

export enum MoveTypeCodeNameCodeName {
  CrossToMX = 'CROSS_TO_MX',
  CrossToUs = 'CROSS_TO_US',
  DrayageMX = 'DRAYAGE_MX',
  DrayageUs = 'DRAYAGE_US',
  Export = 'EXPORT',
  Import = 'IMPORT',
}

export interface StatusID {
  id?: string;
}

export interface TypeID {
  id?: string;
  code_name?: TypeIDCodeName;
}

export enum TypeIDCodeName {
  DryBox53 = 'DRY_BOX_53',
  LocalMX = 'LOCAL_MX',
  Ocean = 'OCEAN',
  Otr = 'OTR',
  QuickDispatch = 'QUICK_DISPATCH',
  Rail = 'RAIL',
  LongTerm = 'LONG_TERM',
}
