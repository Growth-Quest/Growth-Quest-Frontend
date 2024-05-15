import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Task {
  task_name: string;
  description: string;
  type: string;
}

const TaskListMobile = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);

  const fetchTasks = async () => {
    try {
      const user_id = await AsyncStorage.getItem("user_id");
      console.log("user id: ", user_id);
      const response = await axios.get(
        "https://growth-quest.onrender.com/tasks/get-by-user",
        {
          params: { user_id },
        }
      );
      console.log("Response: ", response.data);
      setTaskList(response.data);
    } catch (error) {
      console.error("Error fetching tasks: ", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []); // Adding an empty dependency array to ensure this runs only once after component mounts

  return (
    <View>
      {taskList.map((task, index) => (
        <View key={index}>
          <Text>{task.task_name}</Text>
          <Text>{task.description}</Text>
          <Text>{task.type}</Text>
        </View>
      ))}
    </View>
  );
};

export default TaskListMobile;
