import React, { useState } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";
import axios from "axios";

const AddTaskWeb = () => {
  // State for each input field
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("medium");

  const user_id = localStorage.getItem("user_id");

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the form from refreshing the page

    try {
      const response = await axios.post(
        "https://growth-quest.onrender.com/tasks/create",
        {
          task_name: title,
          description,
          type: difficulty,
          user_id
        }
      );
      console.log("Response: ", response.data);
      alert("Task Submitted! Check the console for the task details.");
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error status: ", error.response.status);
        console.error("Error submitting task: ", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error submitting task: No response received");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error submitting task: ", error.message);
      }
      alert("Error submitting task");
      return;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Tasks</Text>
      <form onSubmit={handleSubmit}>
        <View>
          <Text>
            Title:
            <TextInput
              style={styles.input}
              value={title}
              placeholder="Enter task title"
              onChangeText={(text) => setTitle(text)}
            />
          </Text>
        </View>
        <View>
          <Text>
            Description
            <TextInput
              style={styles.input}
              value={description}
              onChangeText={(text) => setDescription(text)}
              multiline // If you want to allow multiple lines of input
            />
          </Text>
        </View>
        <View>
          <Text>
            Difficulty:
            <select
              style={styles.picker}
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </Text>
        </View>
        <button type="submit">
          <Text>Submit Task</Text>
        </button>
      </form>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    fontSize: 18,
    marginBottom: 15,
    borderWidth: 1,
    padding: 10,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  picker: {
    fontSize: 18,
    marginBottom: 15,
    borderWidth: 1,
    padding: 10,
    borderColor: "#ddd",
  },
});

export default AddTaskWeb