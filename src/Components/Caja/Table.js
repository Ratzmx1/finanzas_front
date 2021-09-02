import { Table } from "semantic-ui-react";

import dayjs from "dayjs";

import { useState, useEffect } from "react";

const Teibol = ({ data }) => {
  const [abonos, setAbonos] = useState(0);
  const [cargos, setCargos] = useState(0);

  useEffect(() => {
    setAbonos(0);
    data.forEach((e) => {
      setAbonos((t) => t + e.abono);
      setCargos((t) => t + e.cargo);
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
          <Table.Cell>
            <b>
              {new Intl.NumberFormat("es-cl", {
                style: "currency",
                currency: "CLP",
              }).format(cargos)}
            </b>
          </Table.Cell>
          <Table.Cell>
            <b>
              {new Intl.NumberFormat("es-cl", {
                style: "currency",
                currency: "CLP",
              }).format(abonos)}
            </b>
          </Table.Cell>
          <Table.Cell></Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export default Teibol;
