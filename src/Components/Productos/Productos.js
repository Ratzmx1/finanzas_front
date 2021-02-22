import { Container, Header, Grid } from "semantic-ui-react";

import axios from "axios";
import { useState, useEffect } from "react";
import { baseUrl } from "../../Utils/baseUrl";

import { setToken, setUser } from "../../Redux/actionCreators";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Swal from "sweetalert2";

import WithAccordion from "./WithAccordion";
import Lista from "./List";
import ModalAgregar from "./ModalAgregar";

const Productos = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const navigator = useHistory();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${baseUrl}/products`, {
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        // console.log(res.data.data.filter((e) => /^c/i.test(e.name)));
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Header size="huge" textAlign="center">
        Productos
      </Header>
      <Grid columns="3">
        <Grid.Row>
          <Grid.Column></Grid.Column>
          <Grid.Column>
            <ModalAgregar />
          </Grid.Column>
          <Grid.Column></Grid.Column>
        </Grid.Row>
        <Grid.Row></Grid.Row>
      </Grid>
      {data.length > 40 ? (
        <WithAccordion data={data} />
      ) : (
        <Grid columns="2">
          <Grid.Column>
            <Lista data={data.slice(0, Math.ceil(data.length / 2))} />
          </Grid.Column>
          <Grid.Column>
            <Lista data={data.slice(Math.ceil(data.length / 2), data.length)} />
          </Grid.Column>
        </Grid>
      )}
      <div style={{ margin: "5vh" }}>
        <p style={{ color: "transparent" }}>a</p>
      </div>
    </Container>
  );
};

export default Productos;
