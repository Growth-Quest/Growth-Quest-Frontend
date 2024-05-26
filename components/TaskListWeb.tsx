import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, View, Text, StyleSheet } from "react-native";

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
      console.log("user id: ", user_id);
      const response = await axios.post(
        "https://growth-quest.onrender.com/tasks/get-by-status",
        {
          user_id,
          status: "ongoing",
        }
      );
      console.log("Response: ", response.data);
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
      console.log("Response: ", response.data);
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
      console.log("Response: ", response.data);
      fetchTasks();
    } catch (error) {
      console.error("Error updating task status: ", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <View style={styles.container}>
      {taskList.map((task, index) => (
        <View key={index} style={styles.taskContainer} id={"task-" + index}>
          <Text style={styles.taskName}>{task.task_name}</Text>
          <Text style={styles.taskDescription}>{task.description}</Text>
          <Text style={styles.taskType}>{task.type}</Text>
          <View style={styles.buttonContainer}>
            <View>
              <button
                id={"done-button-" + index}
                title="Done"
                onClick={() => handleDone(task.id)}
                color="green"
              >
                Done
              </button>
            </View>
            <View style={styles.giveUpButton}>
              <button
                id={ "give-up-button-" + index }
                title="Give Up"
                onClick={() => handleFailed(task.id)}
                color="red"
              >
                Give Up
              </button>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  taskContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  taskName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  taskDescription: {
    fontSize: 14,
    marginBottom: 5,
  },
  taskType: {
    fontSize: 14,
    fontStyle: "italic",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  giveUpButton: {
    marginLeft: 10,
  },
});

export default TaskListWeb;
