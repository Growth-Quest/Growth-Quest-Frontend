import React, { useState } from "react";
import { Text, TextInput, View, Button, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";

const AddTaskMobile = () => {
  // State for each input field
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("medium");

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://growth-quest.onrender.com/tasks/create",
        {
          task_name: title,
          description,
          type: difficulty,
        }
      );
      console.log("Response: ", response.data);
      alert("Task Submitted! Check the console for the task details.");
    } catch (error) {
      console.error("Error submitting task: ", error);
      alert("Error submitting task");
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
          onChangeText={setTitle}
        />
      </View>
      <View>
        <Text>Description:</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          multiline // If you want to allow multiple lines of input
        />
      </View>
      <View>
        <Text>Difficulty:</Text>
        {/* <Picker
          selectedValue={difficulty}
          style={styles.picker}
          onValueChange={setDifficulty}
        >
          <Picker.Item label="Easy" value="easy" />
          <Picker.Item label="Medium" value="medium" />
          <Picker.Item label="Hard" value="hard" />
        </Picker> */}
        <RNPickerSelect
          onValueChange={() => setDifficulty}
          items={[
            { label: "easy", value: "easy" },
            { label: "medium", value: "medium" },
            { label: "hard", value: "hard" },
          ]}
        />
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
    width: "100%", // Ensure full width
  },
  picker: {
    fontSize: 18,
    marginBottom: 15,
    borderWidth: 1,
    padding: 10,
    borderColor: "#ddd",
    width: "100%", // Ensure full width
  },
});

export default AddTaskMobile;
