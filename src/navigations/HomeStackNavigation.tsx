import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MovieDetail from '../screens/MovieDetail'
import Home from '../screens/Home'

const Stack = createNativeStackNavigator()

const HomeStackNavigation = (): JSX.Element => (
    <Stack.Navigator>
        <Stack.Screen name='Back' component={Home} options={{headerShown: false}} />
        <Stack.Screen name='MovieDetail' component={MovieDetail} options={{headerShown: true}} />
    </Stack.Navigator>
)

export default HomeStackNavigation