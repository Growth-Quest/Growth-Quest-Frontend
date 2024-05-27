import React, { useState } from "react";
import axios from "axios";
import { router } from "expo-router";
import { Text, StyleSheet, Pressable } from "react-native";
import "./index.css";

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
        const responseData = error.response.data;
        if (responseData && responseData.message) {
          alert(responseData.message); 
        } else {
          console.error("Error status: ", error.response.status);
          console.error("Error signing up: ", responseData);
        }
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
      <div className="signup-background">
        <center>
          <div className="box-signup">
            <form onSubmit={handleSubmit}>
              <div>
                <label className="signup-title">Create an Account</label>
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
                <label htmlFor="email">
                  <label>
                    <div className="signup-text">
                      <span>Email:</span>
                    </div>
                  </label>
                </label>
                <br></br>

                <input
                  className="input"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              <button className="signup" type="submit">
                Sign Up
              </button>
              <br></br>
              <label className="signup-text">
                Already have an account?{" "}
                <Pressable
                  onPress={() => {
                    router.push("/");
                  }}
                >
                  <br></br>
                  <div className="button-style">Login</div>
                </Pressable>
              </label>
            </form>
          </div>
        </center>
      </div>
    </div>
  );
};

export default Signup;