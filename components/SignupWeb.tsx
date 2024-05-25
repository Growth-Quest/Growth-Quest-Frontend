import React, { useState } from "react";
import axios from "axios";
import { router } from "expo-router";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://growth-quest.onrender.com/users/register",
        {
          username,
          email,
          password,
        }
      );
      console.log("Response: ", response.data);
      router.push("/");
    } catch (error: any) {
      if (error.response) {
        console.error("Error status: ", error.response.status);
        console.error("Error signing up: ", error.response.data);
      } else if (error.request) {
        console.error("Error signing up: No response received");
      } else {
        console.error("Error signing up: ", error.message);
      } 
      alert("Error signing up");
      return;
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
