/* eslint-disable react-hooks/exhaustive-deps */
import {
  Container,
  Select,
  Grid,
  Header,
  Input,
  Button,
} from "semantic-ui-react";

import { useEffect, useState } from "react";

import DataTable from "./Table";

import axios from "axios";
import { baseUrl } from "../../Utils/baseUrl";
import ModalAgregar from "./ModalAgregar";
import Swal from "sweetalert2";

import { setToken, setUser } from "../../Redux/actionCreators";
import { useDispatch } from "react-redux";

const Caja = () => {
  const [selection, setSelection] = useState("week");
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const selectOptions = [
    { key: "lastest", value: "lastest", text: "Todos" },
    { key: "month", value: "month", text: "Meses" },
    { key: "week", value: "week", text: "Semanas" },
    { key: "date", value: "date", text: "Dias" },
  ];

  const fetchData = async () => {
    if (selection === "lastest") {
      try {
        const res = await axios.get(`${baseUrl}/cash/`, {
          headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
        });
        setData(res.data.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          Swal.fire(
            `Unauthorized`,
            "Sesion expirada, inicie sesion nuevamente",
            `warning`
          );
        }
      }
      return;
    }
    if (!input1) {
      return;
    }

    let url;
    let fetchData;
    if (selection === "week") {
      url = "week";
      fetchData = { week: parseInt(input1.split("-")[1].slice(1, 3)) };
    } else if (selection === "month") {
      const date = input1.split("-");
      url = "month";
      fetchData = { month: parseInt(date[1]), year: parseInt(date[0]) };
    } else {
      if (!input2) {
        return;
      }
      url = "range";
      fetchData = { dateI: new Date(input2), dateF: new Date(input1) };
    }
    try {
      const res = await axios.get(
        `${baseUrl}/cash/${url}?data=${JSON.stringify(fetchData)}`,
        {
          headers: { authorization: `bearer ${localStorage.getItem("token")}` },
        }
      );
      setData(res.data.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        await Swal.fire("Unauthorized", `Usuario no autorizado`, `warning`);
        dispatch(setToken(""));
        dispatch(setUser({}));
        navigator.push("/login");
      }
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${baseUrl}/cash/`, {
          headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
        });
        console.log(res.data.data);
        setData(res.data.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          await Swal.fire("Unauthorized", `Usuario no autorizado`, `warning`);
          dispatch(setToken(""));
          dispatch(setUser({}));
          navigator.push("/login");
        }
      }
    };

    fetch();
  }, []);

  return (
    <Container>
      <Header textAlign="center" size="huge">
        Caja
      </Header>

      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column>
            <Input
              type={selection}
              onChange={(e) => setInput2(e.target.value)}
              fluid
              style={{ height: "2.71428571em" }}
              disabled={selection !== "date"}
            />
          </Grid.Column>
          <Grid.Column>
            <Input
              type={selection}
              onChange={(e) => setInput1(e.target.value)}
              fluid
              style={{ height: "2.71428571em" }}
              disabled={selection === "lastest"}
            />
          </Grid.Column>
          <Grid.Column>
            <Select
              placeholder="Seleccione rango"
              onChange={(e, { value }) => {
                setInput1("");
                setInput2("");
                setSelection(value);
              }}
              value={selection}
              options={selectOptions}
            />
            <Button style={{ marginLeft: "0.7vw" }} primary onClick={fetchData}>
              Aplicar
            </Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column></Grid.Column>
          <Grid.Column>
            <ModalAgregar />
          </Grid.Column>
          <Grid.Column></Grid.Column>
        </Grid.Row>
      </Grid>
      <DataTable data={data} />
    </Container>
  );
};

export default Caja;
