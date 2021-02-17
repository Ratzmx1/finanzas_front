import "./App.css";

import { Switch, Route } from "react-router-dom";

import { NavBar } from "./Components/NavBar/NavBar";

import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Notfound from "./Components/NotFound/notfound";
import Register from "./Components/Register/Register";
import Ganancias from "./Components/Ganancias/Ganancias";
import GananciasDetail from "./Components/Ganancias/Detail/Detail";

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/ganancias" component={Ganancias} />
        <Route exact path="/ganancias/:id" component={GananciasDetail} />
        <Route component={Notfound} />
      </Switch>
    </>
  );
}

export default App;
