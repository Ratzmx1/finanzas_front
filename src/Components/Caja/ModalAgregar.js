/* eslint-disable react-hooks/exhaustive-deps */
import {
  Modal,
  Button,
  Form,
  Grid,
  Search,
  Icon,
  Select,
} from "semantic-ui-react";

import { useState, useEffect } from "react";

import axios from "axios";
import { baseUrl } from "../../Utils/baseUrl";

import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../Redux/actionCreators";

import Swal from "sweetalert2";

import { useHistory } from "react-router-dom";

const ModalAgregar = () => {
  const navigator = useHistory();
  const dispatch = useDispatch();
  const [type, setType] = useState("");
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post(
        `${baseUrl}/cash/${type}`,
        {
          description,
          value: parseInt(value),
        },
        {
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      await Swal.fire(`Success`, `Venta agregada correctamente`, `success`);
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
    <Modal
      closeIcon
      trigger={
        <Button fluid color="teal">
          Agregar
        </Button>
      }
    >
      <Modal.Header>Agregar entrada</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Grid columns="12">
            <Grid.Column></Grid.Column>
            <Grid.Column width="13">
              <Grid stackable>
                <Grid.Row columns="2">
                  <Grid.Column>
                    <Select
                      placeholder="Tipo"
                      options={[
                        { key: "profit", value: "profit", text: "Abono" },
                        { key: "expense", value: "expense", text: "Cargo" },
                      ]}
                      onChange={(e, { value }) => setType(value)}
                      style={{ height: "2.71428571em" }}
                      fluid
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Input
                      style={{ height: "2.71428571em" }}
                      placeholder="Valor"
                      type="number"
                      min="1"
                      required
                      onChange={(e, { value }) => setValue(value)}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns="1">
                  <Grid.Column>
                    <Form.TextArea
                      placeholder="Descripcion"
                      onChange={(e, { value }) => setDescription(value)}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns="1">
                  <Grid.Column>
                    <Button
                      fluid
                      color="blue"
                      type="submit"
                      disabled={!type || !description || !value}
                    >
                      Agregar
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default ModalAgregar;
