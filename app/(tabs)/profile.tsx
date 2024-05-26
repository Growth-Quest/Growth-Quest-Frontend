import React from 'react'
import { Platform } from 'react-native'
import ProfileMobile from '../../components/ProfileMobile'
import ProfileWeb from '../../components/ProfileWeb'

const RenderProfile = () => {
  if (Platform.OS === 'web') {
    console.log(Platform.OS)
    return <ProfileWeb />
  } else {
    console.log(Platform.OS);
    return <ProfileMobile />
  }
}

export default RenderProfile