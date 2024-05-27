import axios from "axios";
import React, { useState, useEffect } from "react";
import { Text } from "react-native";

interface IUser {
  username: string;
}

interface IPlant {
  level: number;
  current_exp: number;
  health_points: number;
}

export const HomepageWeb = () => {
  const [user, setUser] = useState<IUser | null>();
  const [plant, setPlant] = useState<IPlant | null>();
  const user_id = localStorage.getItem("user_id");

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
  }, [user_id]); 

  
 const getSprite = () => {
  if (!plant) {
    console.log("Plant is null, returning default sprite.");
    return "../assets/Animated-SF1.gif";
  }
  const { health_points, level } = plant;
  if (health_points === 0) {
    console.log("Health points are 0, returning Animated-SF5.gif.");
    return "../assets/Animated-SF5.gif";
  }
  if (level >= 1 && level <= 5) {
    console.log("Level is between 1 and 5, returning Animated-SF1.gif.");
    return "../assets/Animated-SF1.gif";
  }
  if (level >= 6 && level <= 10) {
    console.log("Level is between 6 and 10, returning Animated-SF2.gif.");
    return "../assets/Animated-SF2.gif";
  }
  if (level >= 11 && level <= 15) {
    console.log("Level is between 11 and 15, returning Animated-SF3.gif.");
    return "../assets/Animated-SF3.gif";
  }
  console.log("Level is above 15, returning Animated-SF4.gif.");
  return "../assets/Animated-SF4.gif";
};


  return (
    <div className="main-background">
      <div style={{ position: "absolute", top: 10, left: 10, backgroundColor: "rgba(46, 248, 83, 0.7)", padding: "10px", borderRadius: "5px",}}>
        {user && <Text>Username: {user.username}</Text>}
        <div>
          <div>{plant && <Text>Level: {plant.level}</Text>}</div>
          <div>
            <Text>Exp: {plant?.current_exp}</Text>
          </div>
          <div>
            <Text>Health: {plant?.health_points}</Text>
          </div>
        </div>
      </div>
      <div className="gif-center-container">
        <img className="centered-gif" src={getSprite()} alt="GIF" />
      </div>
    </div>
  );
};
