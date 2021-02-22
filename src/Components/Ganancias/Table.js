import { Icon, Table, Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

import dayjs from "dayjs";

import { useState, useEffect } from "react";
import { setToken, setUser } from "../../Redux/actionCreators";
import { useDispatch } from "react-redux";

import Swal from "sweetalert2";
import axios from "axios";
import { baseUrl } from "../../Utils/baseUrl";

const Teibol = ({ data }) => {
  const [total, setTotal] = useState(0);
  const navigator = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    setTotal(0);
    data.forEach((e) => {
      setTotal((t) => t + e.total);
    });
  }, [data]);

  const deleteAll = async (id) => {
    try {
      await axios.post(
        `${baseUrl}/profits/delete`,
        { id },
        {
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      await Swal.fire("Success", `Eliminado correctamente`, `success`);
      navigator.go(0);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        await Swal.fire("Unauthorized", `Usuario no autorizado`, `warning`);
        dispatch(setToken(""));
        dispatch(setUser({}));
        navigator.push("/login");
      }
    }
  };

  return (
    <Table selectable textAlign="center">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Tipo</Table.HeaderCell>
          <Table.HeaderCell>Identificador</Table.HeaderCell>
          <Table.HeaderCell>Descripción</Table.HeaderCell>
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
            <Table.Cell width="3">{item.description}</Table.Cell>
            <Table.Cell>
              {dayjs(item.createdAt).format("DD/MM/YYYY")}
            </Table.Cell>
            <Table.Cell>{item.products.length}</Table.Cell>
            <Table.Cell>
              {new Intl.NumberFormat("es-cl", {
                style: "currency",
                currency: "CLP",
              }).format(item.total)}
            </Table.Cell>
            <Table.Cell>
              <Button.Group fluid>
                <Button
                  icon
                  color="blue"
                  basic
                  onClick={() => navigator.push(`ganancias/${item._id}`)}
                >
                  <Icon name="eye" size="large" />
                </Button>
                <Button icon color="red" onClick={() => deleteAll(item._id)}>
                  <Icon name="trash" size="large" />
                </Button>
              </Button.Group>
            </Table.Cell>
          </Table.Row>
        ))}
        <Table.Row>
          <Table.Cell></Table.Cell>
          <Table.Cell></Table.Cell>
          <Table.Cell></Table.Cell>
          <Table.Cell></Table.Cell>
          <Table.Cell></Table.Cell>
          <Table.Cell>
            <b>
              {new Intl.NumberFormat("es-cl", {
                style: "currency",
                currency: "CLP",
              }).format(total)}
            </b>
          </Table.Cell>
          <Table.Cell></Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export default Teibol;
