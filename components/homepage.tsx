import axios from "axios";
import React from "react";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TestListMobile from "./TaskListMobile";


interface IUser {
  username: string;
}

interface IPlant {
  level: number;
  current_exp: number;
}

export const Homepage = () => {
  const [user, setUser] = useState<IUser | null>()
  const [plant, setPlant] = useState<IPlant | null>()

  useEffect(() => {
    const user_id = AsyncStorage.getItem("user_id");

    const fetchUser = async () => {
      try {
        const user = await axios.get(`https://growth-quest.onrender.com/users/get/:${user_id}`,
          {
            params: { user_id },
          }
        )
        setUser(user.data)
      } catch (error) {
        console.log('user not found', error)
      }
    }

    const fetchPlant = async () => {
      try {
        const plant = await axios.get(`https://growth-quest.onrender.com/plants/get-by-user/${user_id}`)
        setPlant(plant.data)
        console.log("plant", plant.data)
      } catch (error) {
        console.log('plant not found', error)
      }
    }

    fetchUser()
    fetchPlant()
  }, [])

  return (
    <View>
      {user && (
        <Text>Username: {user.username}</Text>
      )}
      <View>
        <View>
          <Text>Level: {plant!.level}</Text>
          <Text>Exp Level: {plant!.current_exp}</Text>
        </View>
      </View>

      <button>tasklist</button>
      <button>addtask</button>
      <button>settings</button>
    </View>


  )

}