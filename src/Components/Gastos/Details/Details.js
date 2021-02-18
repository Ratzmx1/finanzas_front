import { Table, Container, Header, Label, List } from "semantic-ui-react";
import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../Utils/baseUrl";

import dayjs from "dayjs";

const Detail = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${baseUrl}/expenses/byId/${id}`, {
          headers: {
            authorization: `bearer ${localStorage.getItem("token")}`,
          },
        });
        setData(res.data.data);
        console.log(res.data.data);
      } catch (error) {}
    };
    fetch();
  }, [id]);

  return (
    <Container>
      <Header textAlign="center" size="huge">
        Transaccion {id}
      </Header>
      {data.products && (
        <>
          <List>
            <List.Item>
              <Label color="grey">
                Cantidad <Label.Detail>{data.products.length}</Label.Detail>
              </Label>
            </List.Item>
            <List.Item>
              <Label color="grey">
                Factura n° <Label.Detail>{data.facture}</Label.Detail>
              </Label>
            </List.Item>

            <List.Item>
              <Label color="grey">
                Proveedor <Label.Detail>{data.provider}</Label.Detail>
              </Label>
            </List.Item>
            <List.Item>
              <Label color="grey">
                Fecha
                <Label.Detail>
                  {dayjs(data.createdAt).format("DD/MM/YYYY")}
                </Label.Detail>
              </Label>
            </List.Item>
          </List>
          <Table selectable textAlign="center">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Nombre</Table.HeaderCell>
                <Table.HeaderCell>Cantidad</Table.HeaderCell>
                <Table.HeaderCell>Precio Unitario</Table.HeaderCell>
                <Table.HeaderCell>Precio Total</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.products.map((item) => (
                <Table.Row textAlign="center" key={item._id}>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.quantity}</Table.Cell>
                  <Table.Cell>{item.price}</Table.Cell>
                  <Table.Cell>{item.price * item.quantity}</Table.Cell>
                </Table.Row>
              ))}
              <Table.Row>
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell>
                  <b>{data.total}</b>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </>
      )}
    </Container>
  );
};

export default Detail;
