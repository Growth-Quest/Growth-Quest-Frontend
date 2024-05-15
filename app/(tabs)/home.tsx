import React from 'react'
import { Pressable, View, Text } from 'react-native'
import { router } from 'expo-router'

const Homepage = () => {
  return (
    <View>
      <Text>
        Welcome to the homepage!
      </Text>
      <Pressable onPress={ () => {
        router.navigate('/')
      }}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  )
}

export default Homepage

// note for tommorrow: add auth.