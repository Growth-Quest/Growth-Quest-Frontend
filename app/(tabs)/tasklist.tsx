import React from 'react'
import { Platform } from 'react-native'
import TaskListMobile from '../../components/TaskListMobile'
import TaskListWeb from '../../components/TaskListWeb'

const RenderTaskList = () => {
  if (Platform.OS === 'web') {
    console.log(Platform.OS)
    return <TaskListWeb />
  } else {
    console.log(Platform.OS);
    return <TaskListMobile />
  }
}

export default RenderTaskList