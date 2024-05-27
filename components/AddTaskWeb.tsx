import React, { useState } from "react";
import { Text, TextInput, View, StyleSheet, ImageBackground } from "react-native";
import axios from "axios";

const AddTaskWeb = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [expValue, setExpValue] = useState(0);

  const user_id = localStorage.getItem("user_id");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let calculatedExpValue = 0;
      switch (difficulty) {
        case "easy":
          calculatedExpValue = 30;
          break;
        case "medium":
          calculatedExpValue = 40;
          break;
        case "hard":
          calculatedExpValue = 50;
          break;
      }
      setExpValue(calculatedExpValue);

      const response = await axios.post(
        "https://growth-quest.onrender.com/tasks/create",
        {
          task_name: title,
          description,
          type: difficulty,
          exp_value: calculatedExpValue,
          user_id,
        }
      );
      console.log("Response: ", response.data);
      alert("Task Submitted! Check the console for the task details.");
    } catch (error: any) {
      if (error.response) {
        console.error("Error status: ", error.response.status);
        console.error("Error submitting task: ", error.response.data);
      } else if (error.request) {
        console.error("Error submitting task: No response received");
      } else {
        console.error("Error submitting task: ", error.message);
      }
      alert("Error submitting task");
      return;
    }
  };

  return (
    <ImageBackground source={require('../assets/add-tasks-bg.png')} style={styles.imageBackground}>
      <View style={styles.box}>
        <Text style={styles.heading}>Add Tasks</Text>
        <View style={styles.formContainer}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Title:</Text>
              <TextInput
                style={styles.input}
                value={title}
                placeholder="Enter task title"
                onChangeText={(text) => setTitle(text)}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description:</Text>
              <TextInput
                style={styles.input}
                value={description}
                onChangeText={(text) => setDescription(text)}
                multiline
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Difficulty:</Text>
              <select
                style={styles.picker}
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </View>
            <View style={styles.buttonContainer}>
              <button type="submit" style={styles.submitButton}>
                <Text style={styles.buttonText}>Submit Task</Text>
              </button>
            </View>
          </form>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  box: {
    height: 450,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -150 }, { translateY: -225 }],
    borderRadius: 22,
    padding: 20,
  },
  formContainer: {
    width: "100%",
  },
  form: {
    width: "100%",
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    textAlign: "center",
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    padding: 10,
    borderColor: "#ddd",
    borderRadius: 5,
    width: "100%",
    backgroundColor: "#fff", // Added background color
  },
  picker: {
    fontSize: 18,
    borderWidth: 1,
    padding: 10,
    borderColor: "#ddd",
    borderRadius: 5,
    width: "100%",
    backgroundColor: "#fff", // Added background color
  },
  buttonContainer: {
    alignItems: "center",
  },
  submitButton: {
    fontSize: 18,
    padding: 10,
    backgroundColor: "#999e99", // Updated background color
    color: "#fff",
    borderRadius: 5,
    textAlign: "center",
    borderWidth: 0,
    cursor: "pointer",
  },
  submitButtonHovered: {
    backgroundColor: "rgba(109, 107, 107, 0.7)", // Hover background color
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold", // Made the text bold
  },
  imageBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddTaskWeb;
