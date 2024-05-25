import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
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

  const handleTaskStatus = async (task_id: string, value: string) => {
    try {
      const response = await axios.post(
        "https://growth-quest.onrender.com/tasks/update-status",
        {
          status: value,
          task_id,
        }
      );
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
          <Picker
            selectedValue={selectedStatus[task.id] || task.status}
            onValueChange={(itemValue) => {
              setSelectedStatus((prevState) => ({
                ...prevState,
                [task.id]: itemValue,
              }));
              handleTaskStatus(task.id, itemValue);
            }}
            style={styles.picker}
          >
            <Picker.Item label="Pending" value="pending" />
            <Picker.Item label="In Progress" value="in_progress" />
            <Picker.Item label="Completed" value="completed" />
          </Picker>
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
    padding: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  taskName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskDescription: {
    fontSize: 14,
    marginBottom: 10,
  },
  taskType: {
    fontSize: 14,
    marginBottom: 10,
    fontStyle: 'italic',
  },
  picker: {
    height: 50,
    width: 150,
  },
});

export default TaskListMobile;
