import { gql } from 'graphql-request';

export const INSERT_DELIVERY_ORDER = gql`
  mutation InsertDeliveryOrders($input: [delivery_orders_insert_input!]!) {
    insert_delivery_orders(objects: $input) {
      affected_rows
      returning {
        id
      }
    }
  }
`;

export const UPDATE_WORK_ORDER = gql`
  mutation UpdateWorkOrder($id: uuid!, $deliveryId: uuid!) {
    update_work_orders_by_pk(
      pk_columns: { id: $id }
      _set: { delivery_order_id: $deliveryId }
    ) {
      id
    }
  }
`;
