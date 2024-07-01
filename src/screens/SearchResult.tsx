import { useEffect, useState } from "react"
import { FlatList, StyleSheet, Text, View } from "react-native"
import { Movie } from "../types/app"
import { API_ACCESS_TOKEN } from "@env"
import MovieItem from "../components/movies/MovieItem"

const SearchResult = ({ route }: any): JSX.Element => {
    const { id, name } = route.params
    const [movies, setMovies] = useState<Movie[]>([])

    useEffect(() => {
        getMoviesByGenre()
    }, [])

    const getMoviesByGenre = () => {
        const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${id}`;
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${API_ACCESS_TOKEN}`,
            },
        };

        fetch(url, options)
            .then(async (response) => await response.json())
            .then((response) => {
                setMovies(response.results)
            })
            .catch((errorResponse) => {
                console.error(errorResponse);
            });
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Result of {name} Genre</Text>
            <FlatList
                data={movies}
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
    )
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 20,
    }
  })

export default SearchResult