import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MovieDetail from '../screens/MovieDetail'
import Favorite from '../screens/Favorite'

const Stack = createNativeStackNavigator()

const FavoriteStackNavigation = (): JSX.Element => (
    <Stack.Navigator>
        <Stack.Screen name='Fav' component={Favorite} options={{headerShown: false}} />
        <Stack.Screen name='MovieDetail' component={MovieDetail} options={{headerShown: true}} />
    </Stack.Navigator>
)

export default FavoriteStackNavigation