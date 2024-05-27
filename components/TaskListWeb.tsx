import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, View, Text, StyleSheet, ImageBackground } from "react-native";

interface Task {
  id: string;
  task_name: string;
  description: string;
  type: string;
}

const TaskListWeb = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const user_id = localStorage.getItem("user_id");
  const plant_id = localStorage.getItem("plant_id");

  const fetchTasks = async () => {
    try {
      const response = await axios.post(
        "https://growth-quest.onrender.com/tasks/get-by-status",
        {
          user_id,
          status: "ongoing",
        }
      );
      setTaskList(response.data);
    } catch (error) {
      console.error("Error fetching tasks: ", error);
    }
  };

  const handleDone = async (task_id: string) => {
    try {
      const response = await axios.put(
        "https://growth-quest.onrender.com/tasks/task-done",
        {
          task_id,
          plant_id,
        }
      );
      alert("Task Complete");
      await fetchTasks();
    } catch (error) {
      console.error("Error updating task status: ", error);
    }
  };

  const handleFailed = async (task_id: string) => {
    try {
      const response = await axios.put(
        "https://growth-quest.onrender.com/tasks/task-failed",
        {
          task_id,
          plant_id,
        }
      );
      alert("Task Failed");
      await fetchTasks();
    } catch (error) {
      console.error("Error updating task status: ", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <ImageBackground source={require('../assets/add-tasks-bg.png')} style={styles.imageBackground}>
      <View style={styles.container}>
        {taskList.map((task, index) => (
          <View key={index} style={styles.taskContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text>Task Name: </Text>
              <Text style={styles.taskName}>{task.task_name}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text>Task Description: </Text>
              <Text style={styles.taskDescription}>{task.description}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text>Task Difficulty: </Text>
              <Text style={styles.taskType}>{task.type}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <View>
                <Button
                  title="Done"
                  onPress={() => handleDone(task.id)}
                  color="green"
                />
              </View>
              <View style={styles.giveUpButton}>
                <Button
                  title="Give Up"
                  onPress={() => handleFailed(task.id)}
                  color="red"
                />
              </View>
            </View>
          </View>
        ))}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  taskContainer: {
    marginBottom: 25,
    padding: 25,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Background color for the task container
  },
  taskName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  taskDescription: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  taskType: {
    fontSize: 14,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  giveUpButton: {
    marginLeft: 10,
  },
  imageBackground: {
    flex: 1,
    width: '100%', // Adjust width if needed
    height: '100%', // Adjust height if needed
  },
});

export default TaskListWeb;
