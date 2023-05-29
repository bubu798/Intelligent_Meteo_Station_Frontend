import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Label,
} from "recharts";

function AirChart({ data }) {
  const minY = Math.min(...data.map((item) => item.value));
  const maxY = Math.max(...data.map((item) => item.value));
  const meanY =
    data.reduce((total, item) => total + item.value, 0) / data.length;
  return (
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="timestamp" label={"time"} tick={false} />
      <YAxis
        domain={[minY - minY * 0.01, maxY + maxY * 0.02]}
        label={data[0].type}
      />
      <Tooltip />
      <Line
        type="natural"
        dataKey="value"
        stroke="#8884d8"
        strokeWidth={2}
        dot={false}
      />
      <ReferenceLine y={meanY} stroke="blue" strokeWidth={2}>
        <Label
          value={`Mean ${meanY.toFixed(2)}`}
          offset={10}
          position="insideBottomLeft"
        />
      </ReferenceLine>
    </LineChart>
  );
}

export default AirChart;
