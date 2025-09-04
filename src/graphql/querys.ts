import { gql } from 'graphql-request';

export const WORK_ORDER = gql`
  query WorkOrder {
    work_orders(
      where: { id: { _eq: "3566209a-cac7-47f7-93b1-93a155753ba7" } }
    ) {
      #DRIVE MOVE
      id
      customer_ref: customer_reference
      bill_of_lading: mbl
      consignee_id
      type_id: order_type {
        id
        code_name
      }
      to_zone_id
      from_zone_id
      customer_id
      arrival_date
      inbond_via_id
      updated_by
      move_type_code_name: move_type {
        code_name
      }
      vessel_name
      delivery_order_id
      carrier_id
      #DRIVE MOVE CONTENT
      te
      container
      weight
      load_type_id
      unit_type_id
      seal
      te_expiration
      equipment {
        id # equipment_id
        customer_id # delivery_order_content.customer_id
        code # delivery_order_content.container
        equipment_type {
          id # equipment_type_id
          model # container_size
        }
      }
    }
  }
`;

export const SEARCH_CUSTOMER_REF = gql`
  query CheckDeliveryOrder($ref: String!) {
    delivery_orders(where: { customer_ref: { _eq: $ref } }) {
      id
    }
  }
`;
