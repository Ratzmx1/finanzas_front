import { Icon, Table, Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

import dayjs from "dayjs";

const Teibol = ({ data }) => {
  const navigator = useHistory();
  return (
    <Table selectable textAlign="center">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Proveedor</Table.HeaderCell>
          <Table.HeaderCell>Factura</Table.HeaderCell>
          <Table.HeaderCell>Fecha</Table.HeaderCell>
          <Table.HeaderCell>Cantidad</Table.HeaderCell>
          <Table.HeaderCell>Total</Table.HeaderCell>
          <Table.HeaderCell>Detalles</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((item) => (
          <Table.Row key={item._id} textAlign="center">
            <Table.Cell>{item.provider}</Table.Cell>
            <Table.Cell>{item.facture}</Table.Cell>
            <Table.Cell>{dayjs(item.date).format("DD/MM/YYYY")}</Table.Cell>
            <Table.Cell>{item.products.length}</Table.Cell>
            <Table.Cell>{item.total}</Table.Cell>
            <Table.Cell>
              <Button
                fluid
                color="teal"
                onClick={() => navigator.push(`/gastos/${item._id}`)}
              >
                <Icon name="eye" color="black" />
              </Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default Teibol;
