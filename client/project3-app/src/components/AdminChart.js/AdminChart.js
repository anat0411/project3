import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import io from "socket.io-client";

function AdminChart() {
  const [data, setData] = useState([]);
  const [vacationDestination, setVacationDestination] = useState([]);
  const [followDataSorted, setFollowDataSorted] = useState([]);
  const history = useHistory();

  const getData = async () => {
    const res = await fetch("http://localhost:3001/admin/chart", {
      method: "GET",
      mode: "cors",
      credentials: "include",
    });
    if (res.status === 403) {
      history.push("/login/admin");
    } else {
      const followData = await res.json();
      console.log(followData);
      setData(followData);
      let followDataSorted = {};
      followData.forEach((vacation) => {
        const key = vacation.vacationDestination;
        if (followDataSorted[key])
          followDataSorted[key] = followDataSorted[key] + 1;
        else followDataSorted[key] = 1;
      });
      setFollowDataSorted(followDataSorted);
      console.log(Object.keys(followDataSorted));
    }
  };

  useEffect(() => {
    getData();
    const socket = io.connect("http://localhost:3001", { query: "id=admin" });
    socket.on("updateFollow", () => {
      setTimeout(() => {
        getData();
      }, 500);
    });
    console.log(socket);
  }, []);

  const dataForChart = {
    labels: Object.keys(followDataSorted),
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: Object.values(followDataSorted),
      },
    ],
  };
  return (
    <div>
      <h2>Admin Charts</h2>
      <Bar
        data={dataForChart}
        width={100}
        height={500}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
}

export default AdminChart;
