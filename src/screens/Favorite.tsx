import React, { useEffect, useState } from 'react'
import { View, ScrollView, StatusBar, StyleSheet, FlatList } from 'react-native'
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
        <FlatList
          data={favMovies}
          numColumns={3}
          columnWrapperStyle={{ gap: 10, paddingHorizontal: 12 }}
          contentContainerStyle={{ gap: 10, paddingBottom: 20 }}
          keyExtractor={(movie, idx) => movie.title + idx}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <MovieItem
                movie={item}
                size={{
                  width: 100,
                  height: 160,
                }}
                coverType={'poster'}
              />
            )
          }}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight ?? 60,
    alignItems: 'center'
  },
})