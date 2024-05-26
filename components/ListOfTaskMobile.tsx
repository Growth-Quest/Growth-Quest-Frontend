import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Task {
    id: string;
    task_name: string;
    type: string;
}

const ListOfTask = () => {
    const [taskList, setTaskList] = useState<Task[]>([]);

    const fetchTasks = async () => {
        try {
            const user_id = await AsyncStorage.getItem("user_id");
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

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={taskList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.taskItem}>
                        <Text style={styles.taskText}>{item.task_name}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    taskItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    taskText: {
        fontSize: 18,
    },
});

export default ListOfTask;
