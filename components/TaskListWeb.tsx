import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

interface Task {
  task_name: string;
  description: string;
  type: string;
}

const TaskListWeb = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const user_id = localStorage.getItem("user_id");

  const handlelistFetch = async () => {
    try {
      console.log("user id: ", user_id);
      const response = await axios.get(
        "https://growth-quest.onrender.com/tasks/get-by-user",
        {
          params: {
            user_id,
          },
        }
      );
      console.log("Response: ", response.data);
      setTaskList(response.data);
    } catch (error) {
      console.error("Error fetching tasks: ", error);
    }
  };

  useEffect(() => {
    handlelistFetch();
  });

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

export default TaskListWeb;
