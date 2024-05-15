import React from 'react'
import { Platform } from 'react-native'
import LoginMobile from '../components/LoginMobile'
import LoginWeb from '../components/LoginWeb'

const RenderLogin = () => {
  if (Platform.OS === 'web') {
    console.log(Platform.OS)
    return <LoginWeb />
  } else {
    console.log(Platform.OS);
    return <LoginMobile />
  }
}

export default RenderLogin