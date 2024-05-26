import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTokenValidation } from "./Authvalid/ValidToken";

interface IUser {
  username: string;
}

interface IPlant {
  level: number;
  current_exp: number;
  health_points: number;
}

export const HomepageMobile = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [plant, setPlant] = useState<IPlant | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user_id = await AsyncStorage.getItem("user_id");

      if (!user_id) {
        console.log("No user ID found in local storage");
        return;
      }

      try {
        const userResponse = await axios.get(
          `https://growth-quest.onrender.com/users/get/${user_id}`,
          {
            params: { user_id },
          }
        );
        setUser(userResponse.data);
      } catch (error) {
        console.log("user not found", error);
      }

      try {
        const plantResponse = await axios.get(
          `https://growth-quest.onrender.com/plants/get-by-user/${user_id}`,
          {
            params: { user_id },
          }
        );
        setPlant(plantResponse.data);
        console.log("plant", plantResponse.data);
      } catch (error) {
        console.log("plant not found", error);
      }
    };

    fetchUserData();
  }, []);

  const { tokenValid } = useTokenValidation();


  if (tokenValid === null) {
    return <div>Loading...</div>; // Or some loading spinner
  }

  if (!tokenValid) {
    return <div>Invalid token</div>; // Or redirect to login page
  }

  return (
    <View style={styles.container}>
      {user && <Text>Username: {user.username}</Text>}
      {plant && (
        <>
          <Text>Level: {plant.level}</Text>
          <Text>Exp: {plant.current_exp}</Text>
          <Text>Health: {plant.health_points}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
