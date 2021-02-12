import { useState, useEffect } from "react";
import { Menu, Container } from "semantic-ui-react";

import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

export const NavBar = () => {
  const [active, setActive] = useState();
  const user = useSelector((state) => state.user);
  const navigator = useHistory();

  const handleCLick = (selection) => {
    setActive(selection);
  };

  useEffect(() => {
    if (user.id) {
      setActive("Inicio");
    } else {
      setActive("Login");
    }
  }, [user]);

  return (
    <>
      <Menu pointing secondary>
        <Container>
          {user.id && (
            <>
              <Menu.Item
                name="Inicio"
                active={active === "Inicio"}
                onClick={() => {
                  handleCLick("Inicio");
                  navigator.push("/");
                }}
              />
              <Menu.Item
                name="Menu"
                active={active === "Menu"}
                onClick={() => {
                  handleCLick("Menu");
                  navigator.push("/");
                }}
              />
              <Menu.Item
                name="Productos"
                active={active === "Productos"}
                onClick={() => {
                  handleCLick("Productos");
                  navigator.push("/");
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
                  handleCLick("Login");
                  navigator.push("/login");
                }}
              />
              <Menu.Item
                name="Registro"
                position=""
                active={active === "Register"}
                onClick={() => {
                  handleCLick("Register");
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
