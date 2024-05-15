import React from 'react'
import { Platform } from 'react-native'
import SignupMobile from '../components/SignupMobile'
import SignupWeb from '../components/SignupWeb'

const RenderSignup = () => {
  if (Platform.OS === 'web') {
    console.log(Platform.OS)
    return <SignupWeb />
  } else {
    console.log(Platform.OS);
    return <SignupMobile />
  }
}

export default RenderSignup