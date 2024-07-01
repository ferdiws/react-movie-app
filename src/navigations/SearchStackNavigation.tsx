import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MovieDetail from '../screens/MovieDetail'
import Search from '../screens/Search'
import SearchResult from '../screens/SearchResult'

const Stack = createNativeStackNavigator()

const SearchStackNavigation = (): JSX.Element => (
    <Stack.Navigator>
        <Stack.Screen name='Find' component={Search} options={{headerShown: false}} />
        <Stack.Screen name='MovieDetail' component={MovieDetail} options={{headerShown: true}} />
        <Stack.Screen name='SearchResult' component={SearchResult} options={{headerShown: true}} />
    </Stack.Navigator>
)

export default SearchStackNavigation