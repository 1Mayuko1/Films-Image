import React, { useEffect } from 'react';
import {
    Dimensions, Image,
    ScrollView, StyleSheet,
    Text, TouchableHighlight,
    View
} from 'react-native';
import * as Network from 'expo-network';
import { useDispatch, useSelector } from "react-redux";
import { addFilmInfo } from "../redux/actions";
import Loader from "../components/Loader";
import NoItemsScreen from "./NoItemsScreen";


const orientation = () => {
    const dim = Dimensions.get('screen');
    if (dim.height >= dim.width) {
        return portrait_styles
    } else {
        return landscape_styles
    }
}

const Info = ({route}) => {

    const { Id } = route.params;

    const { filmInfoStorageData } = useSelector(state => state.filmsReducer);
    const dispatch = useDispatch();

    const addToStorage = films => dispatch(addFilmInfo(films));

    const handleAddFilmInfo = films => {
        addToStorage(films);
    };

    const getUniqueInfoList = (arr, key) => {
        return [...new Map(arr.map(item => [item[key], item])).values()]
    }

    useEffect(() => {
        let cleanupFunction = false;
        const fetchData = async () => {
            try {
                if((await Network.getNetworkStateAsync()).isConnected) {
                    fetch(`https://www.omdbapi.com/?apikey=2965961d&i=${Id}`)
                        .then(response => response.json())
                        .then(
                            (data) => {
                                const filteredFilmInfo =
                                    getUniqueInfoList(
                                        [data, ...filmInfoStorageData],
                                        'imdbID'
                                    )
                                handleAddFilmInfo(filteredFilmInfo)
                            }
                        )
                    }
                } catch (e) {
                    console.error(e.message)
            }
        };
        fetchData();
        return () => cleanupFunction = true;
    }, []);

    let checkingForExistInDatabase = []

    return (
        <ScrollView style={{backgroundColor: '#f9e5ea'}}>
            <View>
                <Loader loading={true}/>
                <View style={{ flex: 0, alignItems: 'center', justifyContent: 'center' }}>
                    {
                        filmInfoStorageData.length === 0 ?
                            <View key={Id}>
                                <NoItemsScreen
                                    text={
                                        'Oops, I can\'t find movies details in' +
                                        ' the database with that movie.' +
                                        ' Please check your internet connection and' +
                                        ' try again or find a movie that' +
                                        ' already exists in the database'
                                    }
                                />
                            </View> :
                        filmInfoStorageData.map(item => {
                            if( item.imdbID === Id ) {
                                checkingForExistInDatabase.push('')
                                return(
                                    <View key={Id}>
                                        <View style={orientation().mainTopContainer}>
                                            <TouchableHighlight style={orientation().imgContainer}>
                                                <Image
                                                    resizeMode="cover"
                                                    source={
                                                        item.Poster === 'N/A' ?
                                                            require('../assets/nothing.jpg') :
                                                            {uri: item.Poster}
                                                    }
                                                    style={orientation().img}
                                                />
                                            </TouchableHighlight>
                                            <View style={orientation().topRightContainer}>
                                                <Text style={orientation().txtTitle}>
                                                    {item.Title}
                                                </Text>
                                                <View>
                                                    <Text
                                                        style={orientation().topTxt
                                                        }>
                                                        Year - {item.Year}
                                                    </Text>
                                                </View>
                                                <View>
                                                    <Text
                                                        style={orientation().topTxt
                                                        }>
                                                        Rating: {item.imdbRating}
                                                    </Text>
                                                    <Text
                                                        style={orientation().topTxt
                                                        }>
                                                        {item.imdbVotes} people voted
                                                    </Text>
                                                </View>
                                                <View>
                                                    <Text
                                                        style={orientation().topTxt
                                                        }>
                                                        {item.Genre}
                                                    </Text>
                                                </View>
                                                <View>
                                                    <Text
                                                        style={orientation().topTxt
                                                        }>
                                                        Duration - {item.Runtime}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={orientation().bottomTxtContainer}>
                                            <Text style={orientation().bottomTitleTxt}>Type</Text>
                                            <Text style={orientation().bottomTxt}>{item.Type}</Text>
                                            <Text style={orientation().bottomTitleTxt}>Director</Text>
                                            <Text style={orientation().bottomTxt}>{item.Director}</Text>
                                            <Text style={orientation().bottomTitleTxt}>Writer</Text>
                                            <Text style={orientation().bottomTxt}>{item.Writer}</Text>
                                            <Text style={orientation().bottomTitleTxt}>Main Cast</Text>
                                            <Text style={orientation().bottomTxt}>{item.Actors}</Text>
                                            <Text style={orientation().bottomTitleTxt}>Synopsis</Text>
                                            <Text style={orientation().bottomTxt}>{item.Plot}</Text>
                                            <Text style={orientation().bottomTitleTxt}>Released</Text>
                                            <Text style={orientation().bottomTxt}>{item.Released}</Text>
                                            <Text style={orientation().bottomTitleTxt}>Other information</Text>
                                            <Text style={orientation().bottomTxt}>
                                                The original language of this film - {item.Language}.
                                                It was released in {item.Country} by {item.Production}.
                                                Also this film was awarded {item.Awards},
                                                as well the film was rated by {item.Rated}
                                            </Text>
                                        </View>
                                    </View>
                                )
                            }
                        })
                    }
                </View>
                <View key={Id}>
                    {
                        checkingForExistInDatabase.length === 0 ?
                            <NoItemsScreen
                                text={
                                    'Oops, I can\'t find movies details in' +
                                    ' the database with that movie.' +
                                    ' Please check your internet connection and' +
                                    ' try again or find a movie that' +
                                    ' already exists in the database'
                                }
                            /> :
                        null
                    }
                </View>
            </View>
        </ScrollView>
    )
}

const portrait_styles = StyleSheet.create({
    mainTopContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: "center",
    },
    topRightContainer: {
        width: 180
    },
    imgContainer: {
        marginLeft: '2%',
        marginTop: 25,
        height: 255,
        width: 155,
    },
    img: {
        height: 245,
        width: 145,
        borderRadius: 20,
    },
    txtTitle: {
        width: 200,
        fontSize: 22,
        marginBottom: 5,
        fontWeight: 'bold'
    },
    topTxt: {
        color: '#292929',
        fontSize: 18,
        marginBottom: 5,
    },
    bottomTxtContainer: {
        marginLeft: 10,
        marginRight: 10
    },
    bottomTitleTxt: {
        color: '#292929',
        fontSize: 20,
        marginBottom: 5,
        fontWeight: 'bold'
    },
    bottomTxt:{
        color: '#292929',
        fontSize: 18,
        marginBottom: 5,
    },
});

const landscape_styles = StyleSheet.create({
    mainTopContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: "center",
    },
    topRightContainer: {
        width: 180,
    },
    imgContainer: {
        marginLeft: '1%',
        marginTop: 25,
        height: 255,
        width: 155,
    },
    img: {
        height: 245,
        width: 145,
        borderRadius: 20,
    },
    txtTitle: {
        width: 230,
        fontSize: 22,
        marginBottom: 5,
        fontWeight: 'bold'
    },
    topTxt: {
        color: '#292929',
        width: 190,
        fontSize: 18,
        marginBottom: 5,
    },
    bottomTxtContainer: {
        marginLeft: 10,
        marginRight: 10
    },
    bottomTitleTxt: {
        color: '#292929',
        fontSize: 20,
        marginBottom: 5,
        fontWeight: 'bold'
    },
    bottomTxt:{
        color: '#292929',
        fontSize: 18,
        marginBottom: 5,
    },
});

export default Info
