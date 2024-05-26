import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ITask {
  id: string
  task_name: string;
  description: string;
  type: string;
  status: string;
}

const TaskListMobile = () => {
  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<{[key: string]: string}>({});

  const fetchTasks = async () => {
    try {
      const user_id = await AsyncStorage.getItem("user_id");
      console.log("user id: ", user_id);
      const response = await axios.get(
        "https://growth-quest.onrender.com/tasks/get-by-user/" + user_id);
      console.log("Response: ", response.data);
      setTaskList(response.data);
    } catch (error) {
      console.error("Error fetching tasks: ", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []); // Adding an empty dependency array to ensure this runs only once after component mounts

  const handleTaskStatus = async (task_id: string, value: string) => {
    try {
      const response = await axios.post(
        "https://growth-quest.onrender.com/tasks/update-status",
        {
          status: value,
          task_id,
        }
      );
      if(value = 'Done'){
        alert("Congratulations on completing your task")
      }else{
        alert("Nice try")
      }
      console.log("Response: ", response.data);
      fetchTasks();
    } catch (error) {
      console.error("Error updating task status: ", error);
    }
  }

  return (
    <View>
      {taskList.map((task, index) => (
        <View key={index}>
          <Text>{task.task_name}</Text>
          <Text>{task.description}</Text>
          <Text>{task.type}</Text>
          <View>
          <Button
                title="Done"
                onPress={() => handleTaskStatus(task.id, "done")}
                color="green"
              />          
              </View>
          <View>
          <Button
                title="Done"
                onPress={() => handleTaskStatus(task.id, "give up")}
                color="red"
              />    
            </View>
        </View>
      ))}
    </View>
  );
};


export default TaskListMobile;
