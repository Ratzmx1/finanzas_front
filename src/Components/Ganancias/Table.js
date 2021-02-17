import { Icon, Table, Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

import dayjs from "dayjs";

const Teibol = ({ data }) => {
  const navigator = useHistory();
  return (
    <Table selectable textAlign="center">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Tipo</Table.HeaderCell>
          <Table.HeaderCell>Identificador</Table.HeaderCell>
          <Table.HeaderCell>Fecha</Table.HeaderCell>
          <Table.HeaderCell>Cantidad</Table.HeaderCell>
          <Table.HeaderCell>Total</Table.HeaderCell>
          <Table.HeaderCell>Detalles</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((item) => (
          <Table.Row key={item._id} textAlign="center">
            <Table.Cell>{item.type}</Table.Cell>
            <Table.Cell>{item.number}</Table.Cell>
            <Table.Cell>
              {dayjs(item.createdAt).format("DD/MM/YYYY")}
            </Table.Cell>
            <Table.Cell>{item.products.length}</Table.Cell>
            <Table.Cell>{item.total}</Table.Cell>
            <Table.Cell>
              <Button
                fluid
                color="teal"
                onClick={() => navigator.push(`/ganancias/${item._id}`)}
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
