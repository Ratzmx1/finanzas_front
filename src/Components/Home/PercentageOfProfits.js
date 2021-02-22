import { useState, useEffect } from "react";
import { Chart, Interval, Tooltip, Axis, Coordinate } from "bizcharts";

import axios from "axios";
import { baseUrl } from "../../Utils/baseUrl";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../Redux/actionCreators";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

const Percentage = () => {
  // const data = [
  //   { item: "事例一", count: 40, percent: 0.4 },
  //   { item: "事例二", count: 21, percent: 0.21 },
  //   { item: "事例三", count: 17, percent: 0.17 },
  //   { item: "事例四", count: 13, percent: 0.13 },
  //   { item: "事例五", count: 9, percent: 0.09 },
  // ];

  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const navigator = useHistory();
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${baseUrl}/charts/profits`, {
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        res.data.data.forEach((e) => {
          e.percentage = (e.total / res.data.total) * 100;
        });
        setData(res.data.data);
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

  const cols = {
    percent: {
      formatter: (val) => {
        val = val * 100 + "%";
        return val;
      },
    },
  };

  return (
    <Chart height={400} data={data} scale={cols} autoFit>
      <Coordinate type="theta" radius={0.75} />
      <Tooltip showTitle={false} />
      <Axis visible={false} />
      <Interval
        position="percentage"
        adjust="stack"
        color="type"
        style={{
          lineWidth: 1,
          stroke: "#fff",
        }}
        label={[
          "count",
          {
            content: (data) => {
              return `${data.type}: ${parseFloat(data.percentage).toFixed(2)}%`;
            },
          },
        ]}
      />
    </Chart>
  );
};

export default Percentage;
