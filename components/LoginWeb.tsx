import axios from "axios";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import LoadingScreen from "./LoadingScreen";

const LoginWeb = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Start loading

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
      router.push('/password-error');
    } finally {
      setLoading(false); // Stop loading, whether success or error
    }
  };

  return (
    <div className="signup-background">
      {loading ? (
        <LoadingScreen />
      ) : (
        <div>
          <center>
            <div className="box">
              <form onSubmit={handleSubmit}>
                <div>
                <label className="signup-title">Login</label>
                <br></br>
                <br></br>
                <br></br>
                  <label htmlFor="username">
                    <label>
                      <div className="signup-text">
                        <span>Username:</span>
                      </div>
                    </label>
                  </label>
        
                  <br></br>
                  <input
                   className="input"
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <br></br>
                <div>
                  <label htmlFor="password">
                    <label>
                      <div className="signup-text">
                        <span>Password:</span>
                      </div>
                    </label>
                  </label>
                  
                  <br></br>
                  <input
                   className="input"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <br></br>
                <button className="signup" type="submit" id="submit">Login</button>
                <br></br>
                <br></br>
                <label className="signup-text">
                  Don't have an account?{" "}
                  <Pressable
                    onPress={() => {
                      router.push("/signup");
                    }}
                  >
                    Sign Up
                  </Pressable>
                </label>
              </form>
            </div>
          </center>
        </div>
      )}
    </div>
  );
};

export default LoginWeb;
