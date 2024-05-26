import React from "react";
import { HomepageWeb } from "../../components/HomepageWeb";
import { HomepageMobile } from "../../components/HomepageMobile";
import { Platform } from "react-native";

const Home = () => {
  if (Platform.OS === 'web') {
    console.log(Platform.OS)
    return <HomepageWeb />
  } else {
    console.log(Platform.OS);
    return <HomepageMobile />
  }
}

export default Home