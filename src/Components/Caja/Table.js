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
      setTotal((t) => t + e.balance);
    });
  }, [data]);

  return (
    <Table selectable textAlign="center">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Fecha</Table.HeaderCell>
          <Table.HeaderCell>Descripcion</Table.HeaderCell>
          <Table.HeaderCell>Tipo</Table.HeaderCell>
          <Table.HeaderCell>Cargo</Table.HeaderCell>
          <Table.HeaderCell>Abono</Table.HeaderCell>
          <Table.HeaderCell>Saldo</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((item) => (
          <Table.Row key={item._id} textAlign="center">
            <Table.Cell>
              {dayjs(item.createdAt).format("DD/MM/YYYY")}
            </Table.Cell>
            <Table.Cell width="3">{item.description}</Table.Cell>
            <Table.Cell>{item.type}</Table.Cell>
            <Table.Cell>
              {item.cargo !== 0 &&
                new Intl.NumberFormat("es-cl", {
                  style: "currency",
                  currency: "CLP",
                }).format(item.cargo)}
            </Table.Cell>
            <Table.Cell>
              {item.abono !== 0 &&
                new Intl.NumberFormat("es-cl", {
                  style: "currency",
                  currency: "CLP",
                }).format(item.abono)}
            </Table.Cell>
            <Table.Cell>
              <b>
                {new Intl.NumberFormat("es-cl", {
                  style: "currency",
                  currency: "CLP",
                }).format(item.balance)}
              </b>
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
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export default Teibol;
