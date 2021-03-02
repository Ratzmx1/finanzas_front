import { Chart, Interval, Tooltip } from "bizcharts";
import { Header } from "semantic-ui-react";

import axios from "axios";
import { useState, useEffect } from "react";
import { baseUrl } from "../../Utils/baseUrl";

import { setToken, setUser } from "../../Redux/actionCreators";
import { useDispatch } from "react-redux";

import Swal from "sweetalert2";

const Percentaje = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${baseUrl}/charts`, {
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const arr = [];
        res.data.data.forEach((i) => {
          if (i.type === "Gasto") {
            arr.push({
              type: "Gasto",
              item: i.type,
              count: i.total,
              percent: i.total / res.data.total,
            });
          } else {
            arr.push({
              item: i.type,
              count: i.total,
              percent: i.total / res.data.total,
              type: "Ganancia",
            });
          }
        });
        setData(arr);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          await Swal.fire("Unauthorized", `Usuario no autorizado`, `warning`);
          dispatch(setToken(""));
          dispatch(setUser({}));
          navigator.push("/login");
        }
      }
    };

    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (data.length < 2) return <Header>Sin informacion este mes</Header>;

  return (
    <Chart height={400} padding="auto" data={data} autoFit>
      <Interval
        adjust={[
          {
            type: "stack",
          },
        ]}
        color="item"
        position="type*count"
      />
      <Tooltip shared />
    </Chart>
  );
};

export default Percentaje;
