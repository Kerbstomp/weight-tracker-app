import React, { useState, useEffect } from "react";
import { Button, Form, Input, Menu, Segment } from "semantic-ui-react";
import WeightLineGraph from "./WeightLineGraph";
import WeightAreaChart from "./WeightAreaChart";
import Cookies from "js-cookie";

const WeightLogger = ({ userId }) => {
  const [weight, setWeight] = useState(0);
  const [data, setData] = useState([]);
  const [activeChart, setActiveChart] = useState("line-graph");

  useEffect(() => {
    getChartData();
  }, []);

  let logWeight = async () => {
    const csrfToken = Cookies.get("csrftoken");

    await fetch(`http://127.0.0.1:8000/api/weights/${userId}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFTOKEN": csrfToken,
      },
      body: weight,
    });
  };

  let getChartData = async () => {
    let response = await fetch(`http://127.0.0.1:8000/api/weights/${userId}/`);
    let weightData = await response.json();
    weightData = weightData.map((w) => {
      return {
        weight: w.weight,
        created_datetime: new Date(w.created_datetime).toLocaleDateString(),
      };
    });
    setData(weightData);
  };

  let handleOnSubmit = async (event) => {
    event.preventDefault();

    await logWeight();
    await getChartData();
  };

  let handleChange = (event) => {
    event.preventDefault();
    setWeight(event.target.value);
  };

  let handleTabClick = (event, { name }) => {
    setActiveChart(name);
  };

  function Chart(props) {
    const chart = props.chart;
    if (chart === "line-graph") {
      return <WeightLineGraph chartData={data} />;
    } else if (chart === "area-chart") {
      return <WeightAreaChart chartData={data} />;
    }
  }

  return (
    <div>
      <div style={{ marginTop: "40px" }}>
        <Segment attached="top">
          <Chart chart={activeChart} />
        </Segment>
        <Menu attached="bottom" tabular size="large">
          <Menu.Item
            name="line-graph"
            active={activeChart === "line-graph"}
            onClick={handleTabClick}
          >
            Line Graph
          </Menu.Item>
          <Menu.Item
            name="area-chart"
            active={activeChart === "area-chart"}
            onClick={handleTabClick}
          >
            Area Chart
          </Menu.Item>
        </Menu>
      </div>
      <div style={{ marginTop: "30px" }}>
        <Form onSubmit={handleOnSubmit}>
          <Form.Field>
            <label>Weight</label>
            <Input
              label="lbs"
              labelPosition="right"
              onChange={(event) => handleChange(event)}
            />
          </Form.Field>
          <Button primary>Log new weight</Button>
        </Form>
      </div>
    </div>
  );
};

export default WeightLogger;
