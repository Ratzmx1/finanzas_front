import { Container, Card, Form, Button, Header, Grid } from "semantic-ui-react";
import { useState } from "react";

import { baseUrl } from "../../Utils/baseUrl";
import axios from "axios";

import { setToken, setUser } from "../../Redux/actionCreators";
import { useDispatch } from "react-redux";

const Login = () => {
  const [rut, setRut] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseUrl}/users/login`, { rut, password });
      if (res) {
        dispatch(setToken(res.data.token));
        dispatch(setUser(res.data.user));
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 400) {
          console.log("Informacion Mal Ingresada");
        } else if (err.response.status === 404) {
          console.log("Usuario y/o contraseña incorrectas");
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
                        rut.toString().length < 6 || password.length < 6
                      }
                    >
                      Iniciar Sesion
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

export default Login;
