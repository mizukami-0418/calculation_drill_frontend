import React, { useEffect, useState } from "react";
import { fetchMessage } from "./utils/api";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getMessage = async () => {
      try {
        const data = await fetchMessage();
        setMessage(data.message);
      } catch (error) {
        console.error("Error fetching data:", error);
        setMessage("Failed to load message"); // エラーハンドリング
      }
    };
    getMessage();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{message || "Loading..."}</h1>
    </div>
  );
}

export default App;
