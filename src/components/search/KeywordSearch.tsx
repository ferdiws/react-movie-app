import { API_ACCESS_TOKEN } from "@env"
import { useState } from "react"
import { FontAwesome } from '@expo/vector-icons'
import { StyleSheet, Text, TextInput, View, ScrollView, FlatList } from "react-native"
import { Movie } from "../../types/app"
import MovieItem from "../movies/MovieItem"

const KeywordSearch = (): JSX.Element => {
    const [searchMovies, setSearchMovies] = useState<Movie[]>([])

    const getSearchMovie = (keyword: string) => {
        const url = `https://api.themoviedb.org/3/search/movie?query=${keyword}`
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${API_ACCESS_TOKEN}`,
            },
        }
    
        fetch(url, options)
            .then(async (response) => await response.json())
            .then((response) => {
                setSearchMovies(response.results)
            })
            .catch((errorResponse) => {
                console.error(errorResponse)
            })
    }

    return(
        <View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search"
                    onChangeText={(text) => getSearchMovie(text)}
                />
                <FontAwesome style={styles.icon} name='search' size={20} color='black' />
            </View>
            <View>
                {searchMovies.length === 0 ? (
                    <Text style={{ textAlign: "center", marginTop: 120, fontSize: 20 }}>No movie found</Text>
                ) : (
                    <FlatList
                        data={searchMovies}
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
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        marginTop: 16,
        borderRadius: 50,
        marginBottom: 16,
        backgroundColor: '#dfdfdf',
        justifyContent: 'center'
    },
    searchInput: {
        paddingVertical: 16,
        paddingStart: 24,
        paddingEnd: 48,
        fontSize: 16,
        fontWeight: 'regular',
        color: 'black'
    },
    icon: {
        position: 'absolute',
        top: 16,
        right: 24,
    },
})

export default KeywordSearch