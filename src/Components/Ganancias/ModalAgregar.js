/* eslint-disable react-hooks/exhaustive-deps */
import {
  Modal,
  Button,
  Form,
  Grid,
  Search,
  Icon,
  Select,
  Header,
} from "semantic-ui-react";

import { useState, useEffect } from "react";

import axios from "axios";
import { baseUrl } from "../../Utils/baseUrl";

import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../Redux/actionCreators";

import Swal from "sweetalert2";

import { useHistory } from "react-router-dom";

import "./styles.css";

const ModalAgregar = () => {
  const navigator = useHistory();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [productsSelected, setSelected] = useState([""]);
  const [quantities, setQuantities] = useState([""]);
  const [resultsProductsSelected, setResultsProductsSelected] = useState([]);
  const [prices, setPrices] = useState([""]);
  const [type, setType] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${baseUrl}/products`, {
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setProducts(res.data.data);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          dispatch(setToken(""));
          dispatch(setUser({}));
        } else if (err.response && err.response.status === 404) {
          await Swal.fire("Unauthorized", `Usuario no autorizado`, `warning`);
          dispatch(setToken(""));
          dispatch(setUser({}));
          navigator.push("/login");
        }
      }
    };

    fetch();
  }, []);

  const handleSubmit = async () => {
    const prod = [];
    for (let i = 0; i < productsSelected.length; i++) {
      if (productsSelected[i] && quantities[i] && prices[i]) {
        prod.push({
          name: productsSelected[i],
          quantity: parseInt(quantities[i]),
          price: parseInt(prices[i]),
        });
      }
    }

    try {
      await axios.post(
        `${baseUrl}/profits`,
        {
          type,
          number: parseInt(identifier),
          products: prod,
          description: desc,
          date: new Date(date),
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
      size="small"
    >
      <Modal.Header>Agregar Ganancia</Modal.Header>

      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Grid stackable>
            <Grid.Row columns="3">
              <Grid.Column>
                <Grid>
                  <Grid.Row>
                    <Grid.Column>
                      <Header size="small">Tipo de documento</Header>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field>
                        <Select
                          placeholder="Tipo"
                          options={[
                            { key: "Boleta", value: "Boleta", text: "Boleta" },
                            {
                              key: "Factura",
                              value: "Factura",
                              text: "Factura",
                            },
                            { key: "Otro", value: "Otro", text: "Otro" },
                          ]}
                          onChange={(e, { value }) => {
                            setType(value);
                            setIdentifier(0);
                          }}
                          style={{ height: "2.71428571em" }}
                          fluid
                        />
                      </Form.Field>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
              <Grid.Column>
                <Grid>
                  <Grid.Row>
                    <Grid.Column>
                      <Header size="small">Numero de factura</Header>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field>
                        <Form.Input
                          required
                          placeholder="Numero identificador"
                          type="number"
                          min="0"
                          onChange={(e, { value }) => setIdentifier(value)}
                          style={{ height: "2.71428571em" }}
                          disabled={type !== "Factura"}
                          fluid
                        />
                      </Form.Field>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
              <Grid.Column>
                <Grid>
                  <Grid.Row>
                    <Grid.Column>
                      <Header size="small"> Fecha de emisión </Header>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field>
                        <Form.Input
                          type="datetime-local"
                          onChange={(e, { value }) => setDate(value)}
                          required
                          style={{ height: "2.71428571em" }}
                          fluid
                        />
                      </Form.Field>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Grid>
                  <Grid.Row>
                    <Grid.Column>
                      <Header size="small">Descripción</Header>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field>
                        <Form.TextArea
                          onChange={(e, { value }) => setDesc(value)}
                          placeholder="Descripcion"
                        />
                      </Form.Field>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <h3>Productos</h3>
          <Grid stackable>
            {productsSelected.map((item, index) => (
              <Grid.Row key={index} className="producto">
                <Grid.Column width="8">
                  <Form.Field>
                    <Search
                      fluid
                      results={resultsProductsSelected.map((p) => ({
                        title: p.name,
                      }))}
                      placeholder="Producto"
                      onSearchChange={(e, { value }) => {
                        const p = [...productsSelected];
                        p[index] = value;
                        setSelected(p);
                        setResultsProductsSelected(
                          products.filter((prod) =>
                            prod.name
                              .toUpperCase()
                              .trim()
                              .includes(p[index].toUpperCase().trim())
                          )
                        );
                      }}
                      onResultSelect={(e, { result }) => {
                        const p = [...productsSelected];
                        p[index] = result.title;
                        setSelected(p);
                      }}
                      required
                    />
                  </Form.Field>
                </Grid.Column>
                <Grid.Column width="4">
                  <Form.Field>
                    <Form.Input
                      fluid
                      required
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
                    <Form.Input
                      fluid
                      required
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
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default ModalAgregar;
