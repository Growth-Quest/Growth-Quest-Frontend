import React from 'react'
import { Tabs } from 'expo-router'

const TabLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name='home' options={{
        title: 'Home',
      }}/>
      <Tabs.Screen name='addtask' options={{
        title: 'Add Task',
      }} />
      <Tabs.Screen name='tasklist' options={{
        title: 'Task List',
      }}/>
      <Tabs.Screen name='profile' options={{
        title: 'Profile',
      }}/>
    </Tabs>
  )
}

export default TabLayout