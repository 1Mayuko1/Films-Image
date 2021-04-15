import React, { useState, useEffect } from 'react';
import {
    View, Text,
    ScrollView, StatusBar,
    Dimensions, StyleSheet,
    Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Appbar } from 'react-native-paper';
import SearchBar from "react-native-dynamic-search-bar";
import Gallery from "./Galery";
import { useScreenDimensions, MainSearchBarTheme } from "../constants/data";
import { useSelector, useDispatch } from 'react-redux';
import * as Network from 'expo-network';
import { addImages } from "../redux/actions";
import NoItemsScreen from "./NoItemsScreen";
import Loader from "./Loader";


const orientation = () => {
    const dimension = Dimensions.get('screen');
    if (dimension.height >= dimension.width) {
        return portrait_styles
    } else {
        return landscape_styles
    }
}

const arraySubSplitter = (arr = [], maxArrSize = 10) => {

    const result = [];

    for (let i = 0; i < Math.ceil(arr.length / maxArrSize); i++) {
        result[i] = arr.slice(i * maxArrSize, (i * maxArrSize) + maxArrSize);
    }

    return result;
};

const Images = ({ navigation }) => {

    const { imageStorage } = useSelector(state => state.filmsReducer);
    const dispatch = useDispatch();

    const addToStorage = img => dispatch(addImages(img));

    const handleAddImage = img => {
        addToStorage(img);
    };

    const [placeholder, setPlaceholder] = useState('Клікни на зображення');

    const goHome = () => {
        navigation.navigate('Home');
    }

    useEffect(() => {
        const url = `https://pixabay.com/api/?key=19193969-87191e5db266905fe8936d565&q=fun+party&image_type=photo&per_page=30`;
        let cleanupFunction = false;
        const fetchData = async () => {
            try {
                if((await Network.getNetworkStateAsync()).isConnected) {
                    const fetchResult = await fetch(url);
                    const loadedData = await fetchResult.json();
                    const loadedDataURIs = loadedData['hits'].map((lD) => ({ uri: lD['largeImageURL'] }));
                    if(imageStorage.length <= 0) {
                        handleAddImage(loadedDataURIs)
                    }
                }
            } catch (e) {
                console.error(e.message)
            }
        };
        fetchData();
        return () => cleanupFunction = true;
    }, []);

    const pickImage = async () => {
        const pickedImage = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            base64: true,
            aspect: [4, 3],
            quality: 1
        });

        if (pickedImage.cancelled) {
            Alert.alert('Шота не пашло', '☹️☹️☹️');
        } else {
            const newImageItem = {
                // 'uri': `data:image/png;base64,${pickedImage.base64}`
                'uri': pickedImage.uri
            }
            handleAddImage([...imageStorage, newImageItem])
        }
    };

    const screenData = useScreenDimensions();

    const galleryComponent = arraySubSplitter(imageStorage).map(
        image => {
            return (
                <Gallery
                    key={image[0].uri}
                    gallery={image}
                    width={screenData.width / 4}
                    height={
                        screenData.isLandscape === true ?
                            screenData.height / 2.3 :
                            screenData.height / 6.5
                    }
                />
            )
        }
    );

    console.log(imageStorage.length)

    return (
        <>
            <Loader loading={true}/>
            <View>
                <Appbar.Header theme={ MainSearchBarTheme }>
                    <Appbar.Action icon="home" onPress={goHome} />
                    <SearchBar
                        placeholder={placeholder}
                        style={{flex: 1}}
                    />
                    <Appbar.Action
                        icon="plus"
                        onPress={pickImage}
                    />
                </Appbar.Header>
            </View>
            <View style={orientation().galleryContainer}>
                {
                    imageStorage.length <= 0 ?
                        <NoItemsScreen
                            text={
                                'Oops, I can\'t find movies details in' +
                                ' the database with that movie.' +
                                ' Please check your internet connection and' +
                                ' try again or find a movie that' +
                                ' already exists in the database'
                            }
                        /> :
                        <ScrollView style={orientation().imgContainer}>
                            { galleryComponent }
                        </ScrollView>
                }
            </View>
        </>
    );
}

const portrait_styles = StyleSheet.create({
    imgContainer: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
    },
    galleryContainer: {
        flex: 1,
        backgroundColor: '#f9e5ea',
        height: Dimensions.get('screen').height,
        marginTop: StatusBar.currentHeight
    },
    picker: {
        alignSelf: "center",
        width: "100%"
    },
    emptyView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    },
})


const landscape_styles = StyleSheet.create({
    imgContainer: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
    },
    galleryContainer: {
        flex: 1,
        marginTop: StatusBar.currentHeight
    },
    picker: {
        alignSelf: "center",
        width: "100%"
    },
    emptyView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    },
})

export default Images
