import { useEffect, useState } from "react";

import { Chart, Interval, Tooltip, Legend } from "bizcharts";

import axios from "axios";
import { baseUrl } from "../../Utils/baseUrl";

import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../Redux/actionCreators";

import dayjs from "dayjs";

import "dayjs/locale/es";

import Swal from "sweetalert2";

dayjs.locale("es");

const YearResume = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${baseUrl}/charts/last`, {
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        res.data.date.forEach((e) => {
          e.name = dayjs(e.date).format("MMMM - YYYY");
        });
        setData(res.data.date);
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

  return (
    <Chart
      height={400}
      autoFit
      data={data}
      interactions={["active-region"]}
      padding={[30, 30, 30, 50]}
    >
      <Interval
        position="name*total"
        color={["total", (total) => (total >= 0 ? "#36c361" : "#ff5957")]}
      />
      <Legend visible={false} />
      <Tooltip shared />
    </Chart>
  );
};

export default YearResume;
