import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


interface IUser {
    username: string;
    email: string;
}

interface IPlant {
    level: number;
    current_exp: number;
}

const ProfileMobile = () => {
    const [user, setUser] = useState<IUser | null>();
    const [plant, setPlant] = useState<IPlant | null>();
    const [editing, setEditing] = useState<boolean>(false);
    const [newUsername, setUsername] = useState<string>("");
    const [newEmail, setEmail] = useState<string>("");

    useEffect(() => {
        const user_id = AsyncStorage.getItem("user_id");

        const fetchUser = async () => {
            try {
                const user = await axios.get(
                    `https://growth-quest.onrender.com/users/get/:${user_id}`
                );
                setUser(user.data);
            } catch (error) {
                console.log("user not found", error);
            }
        };

        const fetchPlant = async () => {
            try {
                const plant = await axios.get(
                    `https://growth-quest.onrender.com/plants/get-by-user/${user_id}`
                );
                setPlant(plant.data);
                console.log("plant", plant.data);
            } catch (error) {
                console.log("plant not found", error);
            }
        };

        fetchPlant();
        fetchUser();
    }, []);

    const handleEdit = async () => {
        const user_id = AsyncStorage.getItem("user_id");

        try {
            await axios.put(
                `https://growth-quest.onrender.com/users/update/:${user_id}`,
                {
                    username: newUsername,
                    email: newEmail
                }
            );
            setEditing(false);
            setUser((prevUser) => (prevUser ? { ...prevUser, username: newUsername, 
            email: newEmail
             } : null));
        } catch (error) {
            console.log("error updating user", error);
        }
    }

    return (
<View>
    {user && (
        <>
            {editing ? (
                <>
                    <TextInput
                        value={newUsername}
                        onChangeText={setUsername}
                        placeholder="Enter username"
                    />
                    <TextInput
                        value={newEmail}
                        onChangeText={setEmail}
                        placeholder="Enter email"
                    />
                    <Button title="Save" onPress={handleEdit} />
                </>
            ) : (
                <>
                    <Text>Username: {user.username}</Text>
                    <Text>Email: {user.email}</Text>
                    <Button title="Edit" onPress={() => setEditing(true)} />
                </>
            )}
        </>
    )}
        <View>
          <Text>Level: {plant!.level}</Text>
          <Text>Exp Level: {plant!.current_exp}</Text>
        </View>
</View>

    );
}

export default ProfileMobile;