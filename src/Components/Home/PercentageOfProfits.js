import { useState, useEffect } from "react";
import { Chart, Interval, Tooltip, Axis, Coordinate } from "bizcharts";

import axios from "axios";
import { baseUrl } from "../../Utils/baseUrl";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../Redux/actionCreators";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

const Percentage = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const navigator = useHistory();
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${baseUrl}/charts/profits`, {
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        const dt = [];

        res.data.data.forEach((e) => {
          let added = false;
          dt.forEach((d) => {
            if (d.type === e.type) {
              d.total += e.total;
              added = true;
            }
          });
          if (!added) {
            dt.push({ type: e.type, total: e.total });
          }
        });

        dt.forEach((e) => {
          e.percentage = (e.total / res.data.total) * 100;
        });
        setData(dt);
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
