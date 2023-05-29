import { useState, useEffect } from "react";
import AirChart from "./components/chart";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch("https://arduinobun.fly.dev")
        .then((res) => res.json())
        .then((data) =>
          data.map((item) => ({ ...item, timestamp: new Date(item.timestamp) }))
        )
        .then((data) => setData(data));
    };

    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const airData = data.filter((item) => item.type === "Air");
  const tempData = data.filter((item) => item.type === "Temp");
  const humData = data.filter((item) => item.type === "Hum");

  return (
    <>
      {data.length === 0 ? (
        <h4>Loading...</h4>
      ) : (
        <div
          className="App"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AirChart data={airData} />
          <AirChart data={tempData} />
          <AirChart data={humData} />
        </div>
      )}
    </>
  );
}

export default App;
