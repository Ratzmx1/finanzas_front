import "./App.css";

import { Switch, Route } from "react-router-dom";

import { NavBar } from "./Components/NavBar/NavBar";

import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Notfound from "./Components/NotFound/notfound";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "./Redux/actionCreators";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    if (token && user) {
      user = JSON.parse(user);
      dispatch(setToken(token));
      dispatch(setUser(user));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route component={Notfound} />
      </Switch>
    </>
  );
}

export default App;
