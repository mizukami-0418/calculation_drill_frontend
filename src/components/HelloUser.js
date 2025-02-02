import React, { useEffect, useState } from "react";
import { fetchHello } from "../utils/api";

const HelloUser = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getHello = async () => {
      try {
        const data = await fetchHello();
        setMessage(data.message);
      } catch (error) {
        console.error("Error fetching data:", error);
        setMessage("Failed to load message"); // エラーハンドリング
      }
    };
    getHello();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{message || "Loading..."}</h1>
    </div>
  );
};

export default HelloUser;
