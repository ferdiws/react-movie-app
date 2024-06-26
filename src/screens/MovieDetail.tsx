import React, { useState, useEffect } from 'react'
import { Text, View, ScrollView, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import { API_ACCESS_TOKEN } from '@env'
import type { Movie } from '../types/app'
import { FontAwesome } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import MovieList from '../components/movies/MovieList'
import AsyncStorage from '@react-native-async-storage/async-storage'

const MovieDetail = ({ route }: any): JSX.Element => {
  const { id } = route.params
  const [movie, setMovie] = useState<Movie>()
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    getMovieDetail()
  }, [])

  const getMovieDetail = (): void => {
    const url = `https://api.themoviedb.org/3/movie/${id}`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    }

    fetch(url, options)
      .then(async (response) => await response.json())
      .then((response) => {
        console.log(response)
        setMovie(response)
      })
      .catch((errorResponse) => {
        console.log(errorResponse)
      })
  }

  const formattedDate = (): string => {
    const milliDate = movie?.release_date === undefined ? new Date() : Date.parse(movie?.release_date!.toString())
    const date = new Date(milliDate)
    const formattedDate = date.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })
    return formattedDate
  }

  const addFavorite = async (movie: Movie): Promise<void> => {
    try {
      const initialData: string | null = await AsyncStorage.getItem(
        '@FavoriteList'
      )
      console.log(initialData)
      let favMovieList: Movie[] = []
  
      if (initialData !== null) {
        favMovieList = [...JSON.parse(initialData), movie]
      } else {
        favMovieList = [movie]
      }
  
      await AsyncStorage.setItem('@FavoriteList', JSON.stringify(favMovieList))
      setIsFavorite(true)
    } catch (error) {
      console.log(error)
    }
  }

  const removeFavorite = async (id: number): Promise<void> => {
    try {
      const initialData: string | null = await AsyncStorage.getItem(
        '@FavoriteList'
      )
      console.log(initialData)
      const parsedDataLocalStorage: Movie[] = JSON.parse(initialData as string)
      const removedData = parsedDataLocalStorage.filter(
        (movie) => movie.id !== id
      )

      await AsyncStorage.setItem("@FavoriteList", JSON.stringify(removedData))
      
      setIsFavorite(false)
    } catch (error) {
      console.log(error)
    }
  }

  const checkIsFavorite = async (id: number): Promise<void> => {
    try {
      const initialData: string | null = await AsyncStorage.getItem(
        '@FavoriteList'
      )
      const parsedDataLocalStorage: Movie[] = JSON.parse(initialData as string)

      if (initialData !== null) {
        const foundFavorite = parsedDataLocalStorage.find((movie) => movie.id === id)
        if (foundFavorite) {
          setIsFavorite(true);
        } else {
          setIsFavorite(false);
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkIsFavorite(movie?.id as number);
  }, [movie]);

  return (
    <ScrollView
      style={{
        display: 'flex',
      }}
    >
      <ImageBackground
        resizeMode='cover'
        style={styles.imageBackground}
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`,
        }}
      >
        <LinearGradient
          colors={['#00000000', 'rgba(0, 0, 0, 0.7)']}
          locations={[0.6, 0.8]}
          style={styles.gradientStyle}
        >
          <Text style={styles.movieTitle}>{movie?.title}</Text>
          <View style={styles.iconContainer}>
            <View style={styles.ratingContainer}>
              <FontAwesome name="star" size={16} color="yellow" />
              <Text style={styles.rating}>{movie?.vote_average.toFixed(1)}</Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => {
                if (isFavorite) {
                  removeFavorite(movie?.id as number)
                } else {
                  addFavorite(movie as Movie)
                }
              }}>
                <FontAwesome name={isFavorite ? "heart" : "heart-o"} size={16} color="pink" />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
      <View style={styles.contentContainer}>
        <Text style={styles.overview}>{movie?.overview}</Text>
        <View style={styles.detailContent}>
          <View style={{flex: 1}}>
            <Text style={styles.subtitle}>Original Language</Text>
            <Text style={styles.subtitleDetail}>{movie?.original_language}</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.subtitle}>Popularity</Text>
            <Text style={styles.subtitleDetail}>{movie?.popularity.toFixed(2)}</Text>
          </View>
        </View>
        <View style={styles.detailContent}>
          <View style={{flex: 1}}>
            <Text style={styles.subtitle}>Release Date</Text>
            <Text style={styles.subtitleDetail}>{formattedDate()}</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.subtitle}>Vote Count</Text>
            <Text style={styles.subtitleDetail}>{movie?.vote_count}</Text>
          </View>
        </View>
      </View>
      <MovieList
        title={'Recommendation'}
        path={`/movie/${id}/recommendations`}
        coverType={'poster'}
        key={'Recommendation'}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  imageBackground: {
    height: 220,
  },
  movieTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginStart:8,
  },
  gradientStyle: {
    padding: 8,
    height: '100%',
    width: '100%',
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  ratingContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginStart: 8,
    gap: 2,
  },
  rating: {
    color: 'yellow',
    fontWeight: '700',
  },
  contentContainer: {
    padding: 16,
    marginBottom: 8
  },
  overview: {
    fontSize: 12,
    fontWeight: 'regular'
  },
  detailContent: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'row'
  },
  subtitle: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: 'bold'
  },
  subtitleDetail: {
    marginTop:4,
    fontSize: 12,
    fontWeight: 'regular'
  },
})

export default MovieDetail