/* eslint-disable react-hooks/exhaustive-deps */
import { Modal, Button, Form, Grid } from "semantic-ui-react";

import { useState } from "react";

import axios from "axios";
import { baseUrl } from "../../Utils/baseUrl";

import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../Redux/actionCreators";

import Swal from "sweetalert2";

import { useHistory } from "react-router-dom";

const ModalAgregar = () => {
  const navigator = useHistory();
  const dispatch = useDispatch();
  const [name, setName] = useState([]);

  const handleSubmit = async () => {
    try {
      await axios.post(
        `${baseUrl}/products`,
        {
          name,
          type: "Producto",
        },
        {
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      await Swal.fire(`Success`, `Producto agregada correctamente`, `success`);
      navigator.go(0);
    } catch (error) {
      console.log(error);
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
              <Form.Field>
                <Form.Input
                  placeholder="Nombre"
                  onChange={(e, { value }) => setName(value)}
                  required
                />
              </Form.Field>

              <Button fluid color="blue" type="submit">
                Agregar
              </Button>
            </Grid.Column>
          </Grid>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default ModalAgregar;
