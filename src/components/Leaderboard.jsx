import React, { useEffect, useState } from "react";
import { get } from "../api/api";

const LeaderboardJSX = () => {
  const [response, setResponse] = useState([]);

  useEffect(() => {
    async function checkLeaderboard() {
      try {
        const res = await get("/api/leaderboard/leaderboard");
        setResponse(res);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    }
    checkLeaderboard();
  }, []);

  return (
    <div>
      {response.map((e, index) => (
        <p key={index}>{e.username}</p>
      ))}
    </div>
  );
};

export default LeaderboardJSX;
  