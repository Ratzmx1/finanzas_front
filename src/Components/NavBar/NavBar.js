/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Menu, Container, Icon } from "semantic-ui-react";

import { useHistory } from "react-router-dom";

import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../Redux/actionCreators";

export const NavBar = () => {
  const [active, setActive] = useState();
  const navigator = useHistory();
  const dispatch = useDispatch();

  const handleClick = (selection) => {
    setActive(selection);
  };

  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user.id) {
      const url = navigator.location.pathname;
      if (url === "/ganancias") {
        setActive("Ganancias");
      } else if (url === "/productos") {
        setActive("Productos");
      } else if (url === "/gastos") {
        setActive("Gastos");
      } else {
        setActive("Inicio");
      }
    } else {
      setActive("Login");
    }
  }, [user]);

  return (
    <>
      <Menu pointing secondary size="large" stackable>
        <Container>
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
        </Container>
      </Menu>
    </>
  );
};
