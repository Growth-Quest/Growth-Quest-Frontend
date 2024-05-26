import React, { useState } from "react";
import { Text, TextInput, View, StyleSheet, Button, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddTaskWeb = () => {
  // State for each input field
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [expValue, setExpValue] = useState(0);

  // Handle form submission
  const handleSubmit = async () => {
    try {
      let expValue;
      switch(difficulty) {
        case "easy":
          expValue = 10;
          break;
        case "medium":
          expValue = 20;
          break;
        case "hard":
          expValue = 30;
          break;
        default:
          expValue = 0;
      }

      const user_id = await AsyncStorage.getItem("user_id");

      if (!user_id) {
        console.log("No user ID found in local storage");
        return;
      }

      const response = await axios.post(
        "https://growth-quest.onrender.com/tasks/create",
        {
          task_name: title,
          description,
          type: difficulty,
          exp_value: expValue,
          user_id
        }
      );
      console.log("Response: ", response.data);
      Alert.alert("Task Submitted!", "Check the console for the task details.");
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
      Alert.alert("Error", "Error submitting task");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Tasks</Text>
      <View>
        <Text>Title:</Text>
        <TextInput
          style={styles.input}
          value={title}
          placeholder="Enter task title"
          onChangeText={(text) => setTitle(text)}
        />
      </View>
      <View>
        <Text>Description:</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={(text) => setDescription(text)}
          multiline // Allows multiple lines of input
        />
      </View>
      <View>
        <Text>Difficulty:</Text>
        <Picker
          selectedValue={difficulty}
          style={styles.picker}
          onValueChange={(itemValue) => setDifficulty(itemValue)}
        >
          <Picker.Item label="Easy" value="easy" />
          <Picker.Item label="Medium" value="medium" />
          <Picker.Item label="Hard" value="hard" />
        </Picker>
      </View>
      <Button title="Submit Task" onPress={handleSubmit} />
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
    height: 50,
    width: 150,
    marginBottom: 15,
    borderWidth: 1,
    padding: 10,
    borderColor: "#ddd",
  },
});

export default AddTaskWeb;
