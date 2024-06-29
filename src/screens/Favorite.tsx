import React, { useEffect, useState } from 'react'
import { View, ScrollView, StatusBar, StyleSheet } from 'react-native'
import MovieItem from '../components/movies/MovieItem'
import { Movie } from '../types/app'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Favorite(): JSX.Element {
  const [favMovies, setFavMovies] = useState<Movie[]>([])

  const getFavoriteMovies = async () => {
    const initialData: string | null = await AsyncStorage.getItem(
      '@FavoriteList'
    )

    const data = JSON.parse(initialData as string)
    setFavMovies(data)
  }

  useEffect(() => {
    getFavoriteMovies()
  }, [favMovies])

  return (
    <ScrollView>
      <View  style={styles.container}>
        {favMovies.map((movie) => (
          <View key={movie.id} style={styles.movieItem}>
            <MovieItem
              movie={movie}
              size={{
                width: 100,
                height: 160,
              }}
              coverType={'poster'}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight ?? 48,
    marginHorizontal: 'auto',
    width: 360,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  movieItem: {
    marginTop: 16,
    flex: 1,
    minWidth: 100,
    maxWidth: 100,
    height: 160,
  },
})