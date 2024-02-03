import React, { useState, useEffect } from "react";
import "./App.css";
// components
import BmiResult from "./components/BmiResult";

function App() {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (weight > 0 && height > 0) {
      const calculatedBmi = weight / (height / 100) ** 2;
      setBmi(calculatedBmi);
    }
  }, [weight, height]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setError(""); // Reset error message on new input
    if (name === "weight") {
      if (Number(value) < 40 || Number(value) > 200) {
        setError("น้ำหนักต้องอยู่ระหว่าง 40 ถึง 200 กิโลกรัม");
      } else {
        setWeight(Number(value));
      }
    } else if (name === "height") {
      if (Number(value) < 120 || Number(value) > 250) {
        setError("ส่วนสูงต้องอยู่ระหว่าง 120 ถึง 250 เซนติเมตร");
      } else {
        setHeight(Number(value));
      }
    }
  };

  const handleClear = () => {
    window.location.reload();
  };

  return (
    <div className="bmi-app">
      <h1 className="title">BMI Calculator</h1>
      {error && <p className="error">{error}</p>}
      <p className="subtitle">โปรแกรมคำนวณค่าดัชนีมวลกาย - BMI</p>
      <label htmlFor="weight">น้ำหนัก (kg)</label>
      <input
        type="number"
        name="weight"
        min="40"
        max="200"
        onChange={handleOnChange}
      />
      <label htmlFor="height">ส่วนสูง (cm)</label>
      <input
        type="number"
        name="height"
        min="120"
        max="250"
        onChange={handleOnChange}
      />
      <hr />
      <button onClick={handleClear}>Clear</button>
      <BmiResult bmi={bmi} />
    </div>
  );
}

export default App;
