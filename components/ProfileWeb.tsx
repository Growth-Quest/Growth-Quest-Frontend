import axios from "axios";
import React, { useEffect, useState } from "react";

interface IUser {
    username: string;
    email: string;
}

interface IPlant {
    level: number;
    current_exp: number;
}

const Profile = () => {
    const [user, setUser] = useState<IUser | null>(null);
    const [plant, setPlant] = useState<IPlant | null>(null);
    const [editing, setEditing] = useState<boolean>(false);
    const [newUsername, setUsername] = useState<string>("");
    const [newEmail, setEmail] = useState<string>("");

    useEffect(() => {
        const user_id = localStorage.getItem("user_id");

        const fetchUser = async () => {
            try {
                const response = await axios.get(
                    `https://growth-quest.onrender.com/users/get/${user_id}`
                );
                setUser(response.data);
            } catch (error) {
                console.log("user not found", error);
            }
        };

        const fetchPlant = async () => {
            try {
                const response = await axios.get(
                    `https://growth-quest.onrender.com/plants/get-by-user/${user_id}`
                );
                setPlant(response.data);
                console.log("plant", response.data);
            } catch (error) {
                console.log("plant not found", error);
            }
        };

        fetchPlant();
        fetchUser();
    }, []);

    const handleEdit = async () => {
        const user_id = localStorage.getItem("user_id");

        try {
            await axios.put(
                `https://growth-quest.onrender.com/users/update/${user_id}`,
                {
                    username: newUsername,
                    email: newEmail
                }
            );
            setEditing(false);
            setUser((prevUser) => (prevUser ? { ...prevUser, username: newUsername, email: newEmail } : null));
        } catch (error) {
            console.log("error updating user", error);
        }
    }

    return (
        <div style={{ padding: 20 }}>
            {user && (
                <>
                    {editing ? (
                        <>
                            <input
                                type="text"
                                value={newUsername}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter username"
                            />
                            <input
                                type="email"
                                value={newEmail}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email"
                            />
                            <button onClick={handleEdit}>Save</button>
                        </>
                    ) : (
                        <>
                            <p>Username: {user.username}</p>
                            <p>Email: {user.email}</p>
                            <button onClick={() => setEditing(true)}>Edit</button>
                        </>
                    )}
                </>
            )}
            {plant && (
                <div>
                    <p>Level: {plant.level}</p>
                    <p>Exp Level: {plant.current_exp}</p>
                </div>
            )}
        </div>
    );
}

export default Profile;
