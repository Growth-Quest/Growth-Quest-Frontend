import React from 'react'
import { Stack } from 'expo-router'

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{
        headerShown: false,
        
      }}/>
      <Stack.Screen name='(tabs)' options={{
        headerShown: false,
      }}/>

      <Stack.Screen name='signup' options={{
        headerShown: false,
      }}/>
      <Stack.Screen name='password-error' options={{
        headerShown: false,
      }}/>
    </Stack>
  )
}

export default RootLayout