import axios from "axios";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import LoadingScreen from "./LoadingScreen";

interface IUser {
  username: string;
  email: string;
}

interface IPlant {
  level: number;
  current_exp: number;
}

const Profile = () => {
  const [loading, setLoading] = useState<boolean>(true); // State for loading status
  const [user, setUser] = useState<IUser | null>(null);
  const [plant, setPlant] = useState<IPlant | null>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [newUsername, setUsername] = useState<string>("");
  const [newEmail, setEmail] = useState<string>("");

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");

    const fetchData = async () => {
      try {
        const userResponse = await axios.get(
          `https://growth-quest.onrender.com/users/get/${user_id}`
        );
        setUser(userResponse.data);

        const plantResponse = await axios.get(
          `https://growth-quest.onrender.com/plants/get-by-user/${user_id}`
        );
        setPlant(plantResponse.data);

        setLoading(false);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("plant_id");
    router.push("/");
  };

  const handleEdit = async () => {
    const user_id = localStorage.getItem("user_id");

    try {
      await axios.put(
        `https://growth-quest.onrender.com/users/update/${user_id}`,
        {
          username: newUsername,
          email: newEmail,
        }
      );
      setEditing(false);
      setUser((prevUser) =>
        prevUser
          ? { ...prevUser, username: newUsername, email: newEmail }
          : null
      );
    } catch (error) {
      console.log("Error updating user:", error);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="profile-background">
      <div className="box">
        <div className="signup-text">
          <div style={{ padding: 20 }}>
            <center>
              {user && (
                <div>
                  {editing ? (
                    <div>
                      <input
                        className="input"
                        type="text"
                        value={newUsername}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                      />
                      <br />
                      <br />
                      <input
                        className="input"
                        type="email"
                        value={newEmail}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                      />
                      <br />
                      <br />
                      <button className="signup" onClick={handleEdit}>
                        Save
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div style={{ width: "100px", height: "150px" }}>
                        <img
                          src="../assets/logo.png"
                          alt="Logo Namon"
                          style={{ width: "100%", height: "100%" }}
                        />
                      </div>
                      <p id="username">Username: {user.username}</p>
                      <p id="email">Email: {user.email}</p>
                      <button
                        className="signup"
                        id="edit-user-info"
                        onClick={() => setEditing(true)}
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              )}
              {plant && (
                <div>
                  <p id="plant-level">Level: {plant.level}</p>
                  <p id="plant-current-exp">Exp Level: {plant.current_exp}</p>
                </div>
              )}
              <div>
                <button className="signup" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
