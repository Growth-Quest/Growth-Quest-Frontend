import axios from "axios";
import React from "react";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import ListOfTaskWeb from "./ListOfTaskWeb";
import { useTokenValidation } from "./Authvalid/ValidToken";


interface IUser {
  username: string;
}

interface IPlant {
  level: number;
  current_exp: number;
  health_points: number
}

export const HomepageWeb = () => {
  const [user, setUser] = useState<IUser | null>();
  const [plant, setPlant] = useState<IPlant | null>();
  const user_id = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await axios.get(
          `https://growth-quest.onrender.com/users/get/${user_id}`,
          {
            params: { user_id },
          }
        );
        setUser(user.data);
      } catch (error) {
        console.log("user not found", error);
      }
    };

    const fetchPlant = async () => {
      try {
        const plant = await axios.get(
          `https://growth-quest.onrender.com/plants/get-by-user/${user_id}`,
          {
            params: { user_id },
          }
        );
        setPlant(plant.data);
        console.log("plant", plant.data);
      } catch (error) {
        console.log("plant not found", error);
      }
    };

    fetchUser();
    fetchPlant();
  }, []);

  const { tokenValid } = useTokenValidation();


  if (tokenValid === null) {
    return <div>Loading...</div>; // Or some loading spinner
  }

  if (!tokenValid) {
    return <div>Invalid token</div>; // Or redirect to login page
  }


  return (
    <div>
      {user && <Text> Username: {user.username}</Text>}
      <div>
        {plant && 
        <Text>Level: {plant.level}</Text>}
      </div>
      <div>
      <Text>Exp: {plant?.current_exp}</Text> 
      </div>
      <div>
      <Text>Health: {plant?.health_points}</Text> 
      </div>
      <ListOfTaskWeb />
      <div />
    </div>
  );
};
