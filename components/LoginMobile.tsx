import axios from "axios";
import React, { useState } from "react";
import { Pressable, Text, View, TextInput, Button, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

const LoginWeb = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true); // Start loading

    try {
      const response = await axios.post(
        "https://growth-quest.onrender.com/users/login",
        {
          username,
          password,
        }
      );
      console.log("Login response:", response.data);
      localStorage.setItem("user_id", response.data.userId);
      localStorage.setItem("plant_id", response.data.plant_id);
      router.push("/home");
    } catch (error: any) {
      if (error.response) {
        console.error("Error status:", error.response.status);
        console.error("Error logging in:", error.response.data);
      } else if (error.request) {
        console.error("Error logging in: No response received");
      } else {
        console.error("Error logging in:", error.message);
      }
      alert("Error logging in");
    } finally {
      setLoading(false); // Stop loading, whether success or error
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.box}>
          <Text style={styles.title}>Login</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Username:</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password:</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>
          <Button title="Login" onPress={handleSubmit} />
          <Text style={styles.signupText}>
            Don't have an account?{" "}
            <Text
              style={styles.signupLink}
              onPress={() => {
                router.push("/signup");
              }}
            >
              Sign Up
            </Text>
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  box: {
    padding: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  signupText: {
    marginTop: 20,
    textAlign: "center",
  },
  signupLink: {
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default LoginWeb;
