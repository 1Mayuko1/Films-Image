import React, { useState } from 'react';
import {
    StyleSheet, View,
    Dimensions, Image,
    Text, ScrollView,
    TouchableNativeFeedback,
} from 'react-native';
import NoItemsScreen from '../components/NoItemsScreen'
import { Card } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Appbar } from 'react-native-paper';
import SearchBar from "react-native-dynamic-search-bar";
import * as Network from 'expo-network';
import { useSelector, useDispatch } from 'react-redux';
import { addFilm } from '../redux/actions';
import Loader from '../components/Loader';
import { useFonts } from "expo-font";
import ErrorScreen from "./ErrorScreen";
import StartScreen from "./StartScreen";
import AppLoading from "expo-app-loading/build/AppLoadingNativeWrapper";
import { MainSearchBarTheme } from '../constants/data'

const orientation = () => {
    const dim = Dimensions.get('screen');
    if (dim.height >= dim.width) {
        return portrait_styles
    } else {
        return landscape_styles
    }
}

function Movie({ navigation }){

    const [term, setTerm] = React.useState('')
    const [loading, setLoading] = useState(false);

    const { filmsData } = useSelector(state => state.filmsReducer);
    const dispatch = useDispatch();

    const addToStorage = films => dispatch(addFilm(films));

    const handleAddFilm = films => {
        addToStorage(films);
    };

    const filteredItems = (items, term) => {
        if(term.length === 0) {
            return null
        }
        if(term.trim().length === 0) {
            return null
        }
        return items.filter((item) => {
            if(
                item.Title
                    .replace(/[^a-zA-Z ]/g, "")
                    .toLowerCase()
                    .indexOf(term)> -1 ){
                return (
                    item
                )
            }
        })
    }

    const getUniqueListBy = (arr, key) => {
        return [...new Map(arr.map(item => [item[key], item])).values()]
    }

    const visibleItems = filteredItems(filmsData, term)

    const currentFilteredItems = async (text) => {

        setLoading(true)

        let fetchedFilms = []

        const validText = text
            .toLowerCase()
            .replace(/[^a-zA-Z ]/g, "")
            .replace(/\s+/g, ' ')
            .trim()
            .replace(/,/g, '')

        setTerm(validText)

        if (validText.length < 2) {
            return null
        } else if((await Network.getNetworkStateAsync()).isConnected) {
            let url = `https://www.omdbapi.com/?apikey=2965961d&s=${validText}&page=1`
            const fetchResult = await fetch(url);
            const loadedData = await fetchResult.json()
                .catch(error => {console.log(error)});
            fetchedFilms = [
                ...filteredItems(filmsData, validText),
                ...loadedData.Search
            ]
        } else {
            return (
                <ErrorScreen/>
            )
        }
        handleAddFilm(
            getUniqueListBy(
                [...fetchedFilms, ...filmsData],
                'imdbID'
            )
        )
        setLoading(false)
    }

    const goMovie = () => {
        navigation.navigate('Movie');
    }

    const deleteElement = (id) => {
        const idx = filmsData.findIndex((el) => el.imdbID === id)
        const newData = [...filmsData.slice(0, idx),...filmsData.slice(idx + 1)]
        handleAddFilm( newData )
    };

    const [isLoaded] = useFonts({
        'Comfortaa-VariableFont_wght':
            require('../assets/fonts/Comfortaa-VariableFont_wght.ttf')
    });

    if(!isLoaded) {
        return (
            <AppLoading />
        )
    } else {
        return (
            <ScrollView style={{
                backgroundColor: '#f9e5ea',
                height: Dimensions.get('screen').height,
            }}>
                <View>
                    <Appbar.Header theme={MainSearchBarTheme}>
                        <Appbar.Action icon="home" onPress={goMovie}/>
                        <SearchBar
                            placeholder="Search here"
                            onChangeText={(text) =>
                                currentFilteredItems(text)
                            }
                            style={{flex: 1}}
                            onClearPress={() => setTerm('')}
                        />
                        <Appbar.Action
                            icon="plus"
                            onPress={() => {
                                navigation.navigate('AddForm', {
                                    movieData: filmsData,
                                });
                            }}
                        />
                    </Appbar.Header>
                </View>
                <View style={orientation().MainContainer}>
                    {
                        term.length < 3 ?
                            <StartScreen text={
                                'Hi there! What will we look for today? Enter at least three English letters and let\'s go.'
                            }/> :
                        visibleItems.length === 0 ?
                            <View>
                                <Loader sloading={loading}/>
                                    <NoItemsScreen
                                        text={
                                            'Oops, I can\'t find movies in' +
                                            ' the database with that title.' +
                                            ' Please check your internet connection and' +
                                            ' try again or find a movie that' +
                                            ' already exists in the database'
                                        }
                                    />
                            </View> :
                        visibleItems.map((item, index) => {
                            return (
                                <TouchableNativeFeedback
                                    style={orientation().CardContainer}
                                    key={index}
                                    onPress={() => {
                                        navigation.navigate('Details', {
                                            Id: item.imdbID,
                                        });
                                    }}
                                >
                                    <Card
                                        containerStyle={{
                                            backgroundColor: '#C48B98',
                                            borderRadius: 30,
                                        }}
                                    >
                                        <View style={{
                                            flexDirection: 'column',
                                            flexWrap: 'wrap',
                                        }}>
                                            <View style={{
                                                alignSelf: 'center',
                                                marginBottom: 3,
                                            }}>
                                                <Icon
                                                    onPress={() => {
                                                        deleteElement(item.imdbID)
                                                    }}
                                                    style={[{
                                                        color: '#000',
                                                        flex: 0,
                                                    }]}
                                                    size={30}
                                                    name={'trash'}
                                                />
                                            </View>
                                            <Text style={orientation().title}>{
                                                item.Title.length >= 60 ?
                                                    item.Title.slice(0, 50 - 1) + '…'
                                                    : item.Title }
                                            </Text>
                                        </View>
                                        <View style={orientation().ViewContainer}>
                                            <Image
                                                resizeMode="cover"
                                                source={
                                                    item.Poster === 'N/A' ?
                                                        require('../assets/nothing.jpg') :
                                                        {uri: item.Poster}
                                                }
                                                style={orientation().img}
                                            />
                                            <View style={orientation().TextContainer}>
                                                <Text style={orientation().description}>{
                                                    item.Type === '' ? 'movie' : item.Type
                                                }</Text>
                                                <Text style={orientation().description}>{
                                                    item.Year === '' ?
                                                        ', year unknown' :
                                                        ' from ' + (item.Year).toString()
                                                }</Text>
                                            </View>
                                        </View>
                                    </Card>
                                </TouchableNativeFeedback>
                            )
                        })
                    }
                </View>
            </ScrollView>
        )
    }
}

const portrait_styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: "center",
        justifyContent: "center",
    },
    CardContainer: {
        flex: 0,
        alignItems: "center",
        justifyContent: "space-between",
    },
    ViewContainer: {
        height: 300,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        width: Dimensions.get('screen').width / 1.6,
        flex: 0,
        textAlign: 'center',
        alignItems: "center",
        marginBottom: 10,
    },
    TextContainer: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
    },
    description: {
        fontSize: 20,
        flex: 0,
        textAlign: 'center',
        alignItems: "center",
        flexWrap: 'wrap',
    },
    img: {
        height: 250,
        width: 165,
        borderRadius: 20,
        marginBottom: 10,
    },
    emptyView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
    },
});

const landscape_styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: "center",
        justifyContent: 'space-around'
    },
    CardContainer: {
        flex: 0,
        alignItems: "center",
        justifyContent: "space-between",
    },
    ViewContainer: {
        height: 300,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        width: 250,
        flex: 0,
        textAlign: 'center',
        alignItems: "center",
        marginBottom: 10,
    },
    TextContainer: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
    },
    description: {
        fontSize: 20,
        flex: 0,
        textAlign: 'center',
        alignItems: "center",
        flexWrap: 'wrap',
    },
    img: {
        height: 250,
        width: 150,
        marginBottom: 10,
    },
    emptyView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: '100%',
    },
});

export default Movie
