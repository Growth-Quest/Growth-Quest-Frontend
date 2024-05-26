import React from 'react'
import { Button, Text, View } from 'react-native'
import { router } from 'expo-router'

const ErrorLandingPage = () => {
  return (
    <View>
      <Text>Wrong Password</Text>
       <Button title='Return' onPress={() => router.push('/')}/>
    </View>
  )
}

export default ErrorLandingPage