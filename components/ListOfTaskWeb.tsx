import axios from "axios";
import React, { useState, useEffect } from "react";
import { Text } from "react-native";

interface Task {
    id: string;
    task_name: string;
    type: string;
}


const ListOfTaskWeb = () => {
    const [taskList, setTaskList] = useState<Task[]>([]);
    const user_id = localStorage.getItem("user_id");

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
    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div>
            {taskList.map((task, index) => (
                <div key={index}>
                    <Text>{task.task_name}</Text>
                </div>
            ))}
        </div>
    )
}

export default ListOfTaskWeb