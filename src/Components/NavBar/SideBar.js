import { useState } from "react";

import { Menu, Icon, Button, Sidebar } from "semantic-ui-react";

import { useHistory } from "react-router-dom";

import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../Redux/actionCreators";

const Side = () => {
  const [active, setActive] = useState(false);
  const navigator = useHistory();
  const dispatch = useDispatch();

  const handleClick = (state) => {
    setActive((s) => !s);
  };

  const user = useSelector((state) => state.user);

  return (
    <>
      <Menu secondary>
        <Menu.Item>
          <Button icon basic color="grey" size="huge" onClick={handleClick}>
            <Icon name="bars" />
          </Button>
        </Menu.Item>
      </Menu>
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        inverted
        onHide={() => setActive(false)}
        vertical
        visible={active}
        width="thin"
      >
        {user.id && (
          <>
            <Menu.Item
              icon={<Icon size="large" name="chart bar" />}
              name="Inicio"
              active={active === "Inicio"}
              onClick={() => {
                handleClick("Inicio");
                navigator.push("/");
              }}
            />
            <Menu.Item
              icon={<Icon size="large" name="arrow circle down" />}
              name="Gastos"
              active={active === "Gastos"}
              onClick={() => {
                handleClick("Gastos");
                navigator.push("/gastos");
              }}
            />
            <Menu.Item
              icon={<Icon size="large" name="arrow circle up" />}
              name="Ganancias"
              active={active === "Ganancias"}
              onClick={() => {
                handleClick("Ganancias");
                navigator.push("/ganancias");
              }}
            />
            <Menu.Item
              icon={<Icon size="large" name="product hunt" />}
              name="Productos"
              active={active === "Productos"}
              onClick={() => {
                handleClick("Productos");
                navigator.push("/productos");
              }}
            />
            <Menu.Item
              icon={<Icon size="large" name="dollar sign" />}
              name="Caja"
              active={active === "Caja"}
              onClick={() => {
                handleClick("Caja");
                navigator.push("/caja");
              }}
            />
            <Menu.Item
              icon={<Icon size="large" name="close" />}
              name="Cerrar sesion"
              position="right"
              onClick={() => {
                dispatch(setToken(""));
                dispatch(setUser({}));
                navigator.push("/login");
              }}
            />
          </>
        )}
        {!user.id && (
          <>
            <Menu.Item
              position="right"
              active={active === "Login"}
              name="Iniciar Sesion"
              onClick={() => {
                handleClick("Login");
                navigator.push("/login");
              }}
            />
            <Menu.Item
              name="Registro"
              position=""
              active={active === "Register"}
              onClick={() => {
                handleClick("Register");
                navigator.push("/register");
              }}
            />
          </>
        )}
      </Sidebar>
    </>
  );
};

export { Side as SideBar };
