import React from 'react'
import { Tabs } from 'expo-router'

const TabLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name='home' options={{
        title: 'Home',
        headerShown: false,
      }}/>
      <Tabs.Screen name='addtask' options={{
        title: 'Add Task',
        headerShown: false,
      }} />
      <Tabs.Screen name='tasklist' options={{
        title: 'Task List',
        headerShown: false,
      }}/>
      <Tabs.Screen name='profile' options={{
        title: 'Profile',
        headerShown: false,
      }}/>
    </Tabs>
  )
}

export default TabLayout