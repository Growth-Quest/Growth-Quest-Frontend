import axios from "axios";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";

const LoginWeb = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://growth-quest.onrender.com/users/login",
        {
          username,
          password,
        }
      );
      console.log("Login response :", response.data);
      localStorage.setItem("user_id", response.data.userId);
      localStorage.setItem("plant_id", response.data.plant_id)
      router.push("/home");
    } catch (error: any) {
      if (error.response) {
        console.error("Error status: ", error.response.status);
        console.error("Error logging in: ", error.response.data);
      } else if (error.request) {
        console.error("Error logging in: No response received");
      } else {
        console.error("Error logging in: ", error.message);
      }
      alert("Error logging in");
      return;
    }
  };

  return (
    <div>
      <h2>Login</h2>
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
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        <Pressable onPress={ () => {
          router.push("/signup");
        }}>Signup</Pressable>
      </form>
    </div>
  );
};

export default LoginWeb;
