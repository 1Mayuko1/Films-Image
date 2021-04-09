import React, {useEffect, useState} from 'react';
import {
    StyleSheet, View, Dimensions,
    Image, Text,
    ScrollView,
    LogBox, TouchableNativeFeedback, ActivityIndicator,
} from 'react-native';
import MoviesList from '../MoviesList.json'
import StatusMessage from './statusMessage'
import { Card } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Appbar} from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';
import SearchBar from "react-native-dynamic-search-bar";
import * as Network from 'expo-network';
import { useSelector, useDispatch } from 'react-redux';
import { addFilm } from '../redux/actions';

// Стейт зберігається але потрібно зробити так щоб він при перезаході
// не звертався до апіхи а вертав інфу з редакса

// Не понятно чого воно не зберігає данні в редакс після перезахода
// addItem
// Info fix
// при загрузці данних спінер
// видалити дублікати з масиву фільмів


const orientation = () => {
    const dim = Dimensions.get('screen');
    if (dim.height >= dim.width) {
        return portrait_styles
    } else {
        return landscape_styles
    }
}

const MyTheme = {
    dark: false,
    colors: {
        primary: '#beae8d',
        background: 'rgb(242, 242, 242)',
        card: 'rgb(255, 255, 255)',
        text: 'rgb(28, 28, 30)',
        border: 'rgb(199, 199, 204)',
        notification: 'rgb(255, 69, 58)',
    },
};

let data = [];

MoviesList.Search.map((item, i) => (
    data.push(item)
))


function Movie({navigation}){

    const [movieData, setMovieData] = React.useState([])
    const [term, setTerm] = React.useState('')
    const [loading, setLoading] = useState(false);

    const startLoading = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    };

    const { filmsData } = useSelector(state => state.filmsReducer);
    const dispatch = useDispatch();

    const addToStorage = films => dispatch(addFilm(films));

    const handleAddFilm = films => {
        addToStorage(films);
    };

    const filteredItems = (items, term) => {
        if(term.length === 0) {
            return null
        } else if(term.trim().length === 0) {
            return null
        } else {
            console.log(items)
            return items.filter((item) => {
                if (
                    item.Title
                        .replace(/[^a-zA-Z ]/g, "")
                        .toLowerCase()
                        .indexOf(term) > -1
                ){
                    return (
                        item
                    )
                }
            })
        }
    }

    LogBox.ignoreAllLogs();

    const visibleItems = filteredItems(filmsData, term)

    const currentFilteredItems = async (text) => {

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
            handleAddFilm([
                ...loadedData.Search
            ])
        } else {

        }
    }

    const goHome = () => {
        navigation.navigate('Home');
    }

    const deleteElement = (id) => {
        const idx = filmsData.findIndex((el) => el.imdbID === id)
        const newData = [...filmsData.slice(0, idx),...filmsData.slice(idx + 1)]
        handleAddFilm( newData )
    };

    return (
        <ScrollView>
            <View>
                <Appbar.Header theme={MyTheme}>
                    <Appbar.Action icon="home" onPress={goHome} />
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
                                movieData:  filmsData,
                            });
                        }}
                    />
                </Appbar.Header>
            </View>
            <View style={orientation().MainContainer}>
                {
                    term.length < 3 ?
                        <StatusMessage
                            text={'Enter at least 3 English letters'}
                        /> :
                        visibleItems.length === 0 ?
                            <>
                                <StatusMessage
                                    text={'Try turning on the Internet or finding a movie that already exists in the database'}
                                    additionalText={'No internet connection or some server issues'}
                                />
                            </> :
                            visibleItems.map((item, index) => {
                                return(
                                    <TouchableNativeFeedback
                                        style={orientation().CardContainer}
                                        key={index}
                                        onPress={() => {
                                            navigation.navigate('Details', {
                                                Id: item.imdbID,
                                            });
                                        }}
                                    >
                                        <Card>
                                            <View style={{
                                                flex: 1,
                                                flexDirection: 'row',
                                                flexWrap: 'wrap',
                                            }}>
                                                <Text style={orientation().title}>{
                                                    item.Title.length >= 60 ?
                                                        item.Title.slice(0, 50 - 1) + '…'
                                                        : item.Title
                                                }</Text>
                                                <View style={{
                                                    marginLeft: 10,
                                                    width: 20,
                                                }}>
                                                    <Icon
                                                        onPress={() => {
                                                            deleteElement(item.imdbID)
                                                        }}
                                                        style={[{
                                                            color: '#ff7271',
                                                            flex: 0,
                                                        }]}
                                                        size={25}
                                                        name={'trash'}
                                                    />
                                                </View>
                                            </View>
                                            <Card.Divider/>
                                            <View style={orientation().ViewContainer}>
                                                <Image
                                                    resizeMode="cover"
                                                    source={
                                                        item.Poster === 'N/A' ?
                                                            require('../assets/nothing.jpg') :
                                                            { uri: item.Poster }
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
