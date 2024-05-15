import React from 'react'
import { Platform, View } from 'react-native'
import AddTaskMobile from '../../components/AddTaskMobile'
import AddTaskWeb from '../../components/AddTaskWeb'

const RenderAddTask = () => {
  if (Platform.OS === 'web') {
    console.log(Platform.OS)
    return <AddTaskWeb />
  } else {
    console.log(Platform.OS);
    return <AddTaskMobile />
  }
}

export default RenderAddTask