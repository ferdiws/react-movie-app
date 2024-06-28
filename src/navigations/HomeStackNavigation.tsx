import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MovieDetail from '../screens/MovieDetail'
import BottomTabNavigator from './BottomTabNavigation'

const Stack = createNativeStackNavigator()

const HomeStackNavigation = (): JSX.Element => (
    <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Back' component={BottomTabNavigator} options={{headerShown: false}} />
        <Stack.Screen name='MovieDetail' component={MovieDetail} options={{headerShown: true}} />
    </Stack.Navigator>
)

export default HomeStackNavigation