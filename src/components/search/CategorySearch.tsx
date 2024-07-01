import { API_ACCESS_TOKEN } from "@env"
import { useEffect, useState } from "react"
import { useNavigation, StackActions } from '@react-navigation/native'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"

interface Genre {
    id: number
    name: string
}

const CategorySearch = (): JSX.Element => {
    const [genres, setGenres] = useState<Genre[]>([])
    const [selectedGenre, setSelectedGenre] = useState<Genre>()
    const navigation = useNavigation()
    const pushAction = StackActions.push('SearchResult', { id: selectedGenre?.id, name: selectedGenre?.name })

    useEffect(() => {
        getMovieGenres()
    }, [])

    const getMovieGenres = () => {
        const url = "https://api.themoviedb.org/3/genre/movie/list"
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
                setGenres(response.genres)
            })
            .catch((errorResponse) => {
                console.error(errorResponse)
            });
    }

    return(
        <View style={{display: "flex", flex: 2}}>
            <FlatList
                data={genres}
                numColumns={2}
                columnWrapperStyle={{ gap: 10 }}
                contentContainerStyle={{ paddingBottom: 5 }}
                keyExtractor={(genre, idx) => genre.name + idx}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            style={{
                                marginTop: 16,
                                display: 'flex',
                                justifyContent: 'center',
                                flexDirection: 'row',
                                backgroundColor: selectedGenre?.id === item.id ? '#8978A4' : '#C0B4D5',
                                flex: 1,
                                borderRadius: 10,
                                paddingVertical: 16,
                                maxWidth: 175
                            }}
                            onPress={() => {
                                setSelectedGenre(item)
                            }}
                        >
                            <Text style={styles.genreName}>{item.name}</Text>
                        </TouchableOpacity>
                    )
                }}
            />
            <TouchableOpacity
                style={styles.searchButton}
                onPress={() => {
                    navigation.dispatch(pushAction)
                }}
            >
                <Text style={styles.btnText}>Search</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    genreName: {
        color: 'black'
    },
    searchButton: {
        backgroundColor: '#8978A4',
        alignItems: 'center',
        paddingVertical: 16,
        borderRadius: 50
    },
    btnText: {
        color: 'white',
        fontSize: 18
    }
})

export default CategorySearch