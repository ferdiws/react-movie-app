import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import HomeStackNavigation from './src/navigations/HomeStackNavigation'

export default function App(): JSX.Element {
  return (
    <NavigationContainer>
      <HomeStackNavigation />
    </NavigationContainer>
  )
}