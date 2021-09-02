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
  const [resultsProductsSelected, setResultsProductsSelected] = useState([]);
  const [quantities, setQuantities] = useState([""]);
  const [prices, setPrices] = useState([""]);
  const [provider, setProvider] = useState("");
  const [facture, setfacture] = useState(1);
  const [description, setDescription] = useState("");
  const [docType, setDocType] = useState("");
  const [expenseType, setExpenseType] = useState("");
  const [buyDate, setBuyDate] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [paymentType, setPaymentType] = useState("");

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
        `${baseUrl}/expenses`,
        {
          provider: provider,
          documentType: docType,
          facture: parseInt(facture),
          expenseType,
          paymentType,
          paymentDate: paymentDate ? new Date(paymentDate) : undefined,
          description,
          products: prod,
          date: new Date(buyDate),
        },
        {
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      await Swal.fire(`Success`, `Compra agregada correctamente`, `success`);
      navigator.go(0);
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
      <Modal.Header>Agregar entrada</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Grid stackable>
            <Grid.Row columns="2">
              <Grid.Column>
                <Grid>
                  <Grid.Row>
                    <Grid.Column>
                      <Header size="small"> Proveedor </Header>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field>
                        <Form.Input
                          required
                          placeholder="Proveedor"
                          style={{ height: "2.71428571em" }}
                          onChange={(e, { value }) => setProvider(value)}
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
                      <Header size="small"> Tipo de gasto </Header>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field>
                        <Select
                          required
                          placeholder="Tipo de gasto"
                          style={{ height: "2.71428571em" }}
                          options={[
                            {
                              key: "Gasto Local",
                              value: "Gasto Local",
                              text: "Gasto Local",
                            },
                            {
                              key: "Factura de Compra",
                              value: "Factura de Compra",
                              text: "Factura de Compra",
                            },
                          ]}
                          onChange={(e, { value }) => setExpenseType(value)}
                        />
                      </Form.Field>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns="3">
              <Grid.Column>
                <Grid>
                  <Grid.Row>
                    <Grid.Column>
                      <Header size="small"> Tipo de documento </Header>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field>
                        <Select
                          required
                          placeholder="Tipo de documento"
                          style={{ height: "2.71428571em" }}
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
                            setDocType(value);
                            setfacture(1);
                          }}
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
                          placeholder="Numero de factura"
                          type="number"
                          min="1"
                          disabled={docType !== "Factura"}
                          style={{ height: "2.71428571em" }}
                          onChange={(e, { value }) => setfacture(value)}
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
                      <Header size="small"> Fecha de compra </Header>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field>
                        <Form.Input
                          required
                          type="datetime-local"
                          style={{ height: "2.71428571em" }}
                          onChange={(e, { value }) => setBuyDate(value)}
                        />
                      </Form.Field>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns="2">
              <Grid.Column>
                <Grid>
                  <Grid.Row>
                    <Grid.Column>
                      <Header size="small"> Forma de pago </Header>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field>
                        <Select
                          required
                          placeholder="Tipo de pago"
                          style={{ height: "2.71428571em" }}
                          options={[
                            {
                              key: "Credito",
                              value: "Credito",
                              text: "Credito",
                            },
                            {
                              key: "Contado",
                              value: "Contado",
                              text: "Contado",
                            },
                          ]}
                          onChange={(e, { value }) => {
                            setPaymentType(value);
                            setPaymentDate("");
                          }}
                          value={paymentType}
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
                      <Header size="small"> Fecha de pago </Header>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field>
                        <Form.Input
                          type="datetime-local"
                          style={{ height: "2.71428571em" }}
                          required
                          disabled={paymentType !== "Credito"}
                          onChange={(e, { value }) => setPaymentDate(value)}
                        />
                      </Form.Field>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <Form.TextArea
                    placeholder="Descripcion"
                    type="text"
                    onChange={(e, { value }) => setDescription(value)}
                  />
                </Form.Field>
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
                      results={resultsProductsSelected.map((p) => ({
                        title: p.name,
                      }))}
                      placeholder="Producto"
                      value={productsSelected[index]}
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
                    />
                  </Form.Field>
                </Grid.Column>
                <Grid.Column width="4">
                  <Form.Field>
                    <Form.Input
                      required
                      placeholder="Precio unitario"
                      provider="number"
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
                      required
                      placeholder="Cantidad"
                      provider="number"
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

          <Button
            fluid
            color="blue"
            type="submit"
            disabled={
              !provider || !docType || !expenseType || !buyDate || !paymentType
            }
          >
            Agregar
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default ModalAgregar;
