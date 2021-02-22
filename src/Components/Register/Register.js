import { Container, Card, Form, Button, Header, Grid } from "semantic-ui-react";
import { useState } from "react";

import { baseUrl } from "../../Utils/baseUrl";
import axios from "axios";

import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../Redux/actionCreators";

import Swal from "sweetalert2";

const Register = () => {
  const [rut, setRut] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const navigator = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseUrl}/users/register`, {
        rut,
        password,
        lastname,
        name,
      });
      console.log(res);
      if (res.data.data && res.data.data.token) {
        dispatch(setToken(res.data.data.token));
        dispatch(setUser(res.data.data.user));
        await Swal.fire(`Success`, `Registrado correctamente`, `success`);

        navigator.push("/");
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 400) {
          console.log("Informacion Mal Ingresada");
        } else if (err.response && err.response.status === 404) {
          await Swal.fire("Unauthorized", `Usuario no autorizado`, `warning`);
          dispatch(setToken(""));
          dispatch(setUser({}));
          navigator.push("/login");
        }else if (err.response.status === 409) {
          console.log("Usuario ya registrado");
        }
      }
    }
  };
  return (
    <Container>
      <div style={{ marginTop: "5vh" }}>
        <Card centered fluid>
          <div style={{ marginTop: "5vh", marginBottom: "5vh" }}>
            <Card.Content>
              <Header size="huge" textAlign="center">
                Login
              </Header>
              <Grid columns={3}>
                <Grid.Column></Grid.Column>
                <Grid.Column>
                  <Form onSubmit={handleSubmit}>
                    <Form.Field>
                      <input
                        placeholder="Rut"
                        onChange={(e) => {
                          setRut(e.target.value);
                        }}
                        value={rut}
                      />
                    </Form.Field>
                    <Form.Field>
                      <input
                        placeholder="Nombre"
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        value={name}
                      />
                    </Form.Field>
                    <Form.Field>
                      <input
                        placeholder="Apellidos"
                        onChange={(e) => {
                          setLastname(e.target.value);
                        }}
                        value={lastname}
                      />
                    </Form.Field>
                    <Form.Field>
                      <input
                        placeholder="Password"
                        type="password"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        value={password}
                      />
                    </Form.Field>
                    <Button
                      type="submit"
                      primary
                      fluid
                      disabled={
                        rut.toString().length < 6 ||
                        password.length < 6 ||
                        name.length === 0 ||
                        lastname.length === 0
                      }
                    >
                      Registrar
                    </Button>
                  </Form>
                </Grid.Column>
              </Grid>
            </Card.Content>
          </div>
        </Card>
      </div>
    </Container>
  );
};

export default Register;
