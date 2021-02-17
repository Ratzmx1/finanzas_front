/* eslint-disable react-hooks/exhaustive-deps */
import {
  Modal,
  Button,
  Form,
  Grid,
  Search,
  Input,
  Icon,
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
  const [products, setProducts] = useState([]);
  const [productsSelected, setSelected] = useState([""]);
  const [quantities, setQuantities] = useState([""]);
  const [prices, setPrices] = useState([""]);
  const [type, setType] = useState("");
  const [identifier, setIdentifier] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${baseUrl}/products`, {
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setProducts(res.data.data);
      } catch (error) {
        if (error.response.status === 401) {
          dispatch(setToken(""));
          dispatch(setUser({}));
        }
      }
    };

    fetch();
  }, []);

  const handleSubmit = async () => {
    const prod = [];
    for (let i = 0; i < productsSelected.length; i++) {
      prod.push({
        name: productsSelected[i],
        quantity: parseInt(quantities[i]),
        price: parseInt(prices[i]),
      });
    }

    try {
      await axios.post(
        `${baseUrl}/profits`,
        {
          type,
          number: parseInt(identifier),
          products: prod,
        },
        {
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      await Swal.fire(`Success`, `Ganancia agregada correctamente`, `success`);
      navigator.go(0);
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(setToken(""));
        dispatch(setUser({}));
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
                <Input
                  placeholder="Tipo"
                  onChange={(e, { value }) => setType(value)}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  placeholder="Numero identificador"
                  type="number"
                  min="1"
                  onChange={(e, { value }) => setIdentifier(value)}
                />
              </Form.Field>
              <Grid>
                {productsSelected.map((item, index) => (
                  <Grid.Row key={index}>
                    <Grid.Column width="8">
                      <Form.Field>
                        <Search
                          results={products.map((it) => ({
                            title: it.name,
                          }))}
                          placeholder="Producto"
                          onSearchChange={(e, { value }) => {
                            const p = [...productsSelected];
                            p[index] = value;
                            setSelected(p);
                          }}
                          onResultSelect={(e, { result }) => {
                            const p = [...productsSelected];
                            p[index] = result.title;
                            setSelected(p);
                          }}
                        />
                      </Form.Field>
                    </Grid.Column>
                    <Grid.Column width="4">
                      <Form.Field>
                        <Input
                          placeholder="Precio unitario"
                          type="number"
                          min="0"
                          step="1"
                          onChange={(e, { value }) => {
                            const p = [...prices];
                            p[index] = value;
                            setPrices(p);
                          }}
                        />
                      </Form.Field>
                    </Grid.Column>
                    <Grid.Column width="3">
                      <Form.Field>
                        <Input
                          placeholder="Cantidad"
                          type="number"
                          onChange={(e, { value }) => {
                            const p = [...quantities];
                            p[index] = value;
                            setQuantities(p);
                          }}
                        />
                      </Form.Field>
                    </Grid.Column>
                    <Grid.Column width="1">
                      <div
                        onClick={() => {
                          setSelected(
                            productsSelected.filter((val, ind) => ind !== index)
                          );
                          setPrices(prices.filter((val, ind) => ind !== index));

                          setQuantities(
                            quantities.filter((val, ind) => ind !== index)
                          );
                        }}
                      >
                        <Icon name="delete" size="large" />
                      </div>
                    </Grid.Column>
                  </Grid.Row>
                ))}
              </Grid>
              <div style={{ marginTop: "3vh", marginBottom: "3vh" }}>
                <Button
                  fluid
                  color="green"
                  onClick={() => {
                    setSelected([...productsSelected, ""]);
                    setQuantities([...quantities, ""]);
                    setPrices([...prices, ""]);
                  }}
                  type="button"
                >
                  Agregar producto
                </Button>
              </div>

              <Button fluid color="blue" type="submit">
                Agregar
              </Button>
            </Grid.Column>
          </Grid>
        </Form>
        {JSON.stringify(productsSelected)}
        {JSON.stringify(quantities)}
        {JSON.stringify(prices)}
      </Modal.Content>
    </Modal>
  );
};

export default ModalAgregar;
