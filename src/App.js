import "./App.css";

import { Switch, Route } from "react-router-dom";

import { NavBar } from "./Components/NavBar/NavBar";

import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Notfound from "./Components/NotFound/notfound";
import Register from "./Components/Register/Register";
import Ganancias from "./Components/Ganancias/Ganancias";
import GananciasDetail from "./Components/Ganancias/Detail/Detail";
import Gastos from "./Components/Gastos/Gastos";
import GastosDetail from "./Components/Gastos/Details/Details";
import Products from "./Components/Productos/Productos";

import { useHistory } from "react-router-dom";

function App() {
  const navigator = useHistory();

  const auth = (component) => {
    if (!localStorage.getItem("token")) {
      navigator.push("/login");
    }
    return component;
  };

  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={auth(Home)} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/ganancias" component={auth(Ganancias)} />
        <Route exact path="/ganancias/:id" component={auth(GananciasDetail)} />
        <Route exact path="/gastos/" component={auth(Gastos)} />
        <Route exact path="/gastos/:id" component={auth(GastosDetail)} />
        <Route exact path="/productos" component={auth(Products)} />
        <Route component={auth(Notfound)} />
      </Switch>
    </>
  );
}

export default App;
