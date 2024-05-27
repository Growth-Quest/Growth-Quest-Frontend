import axios from "axios";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";

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
      console.log("error updating user", error);
    }
  };

  return (
    <div className="profile-background">
      <div className="box">
        <div className="signup-text">
          <div style={{ padding: 20 }}>
         
            <center>
            
              {user && (
                <>
                  {editing ? (
                    <>
                      <input className="input"
                        type="text"
                        value={newUsername}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                      />
                      <br></br><br></br>
                      <input className="input"
                        type="email"
                        value={newEmail}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                      />
                      <br></br> <br></br>
                      <button className="signup" onClick={handleEdit}>Save</button>
                    </>
                  ) : (
                    <>
                      <p id="username">Username: {user.username}</p>
                      <p id="email">Email: {user.email}</p>
                      <button className="signup"
                        id="edit-user-info"
                        onClick={() => setEditing(true)}
                      >
                        Edit
                      </button>
                    </>
                  )}
                </>
              )}
              {plant && (
                <div>
                  <p id="plant-level">Level: {plant.level}</p>
                  <p id="plant-current-exp">Exp Level: {plant.current_exp}</p>
                </div>
              )}
              <div>
                <button className="signup" onClick={handleLogout}>Logout</button>
              </div>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
