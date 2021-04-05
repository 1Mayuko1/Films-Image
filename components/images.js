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
import Gallery from "./galery";
import Image from "react-native-image-progress";
import {Asset} from "expo-asset";
import AppLoading from 'expo-app-loading';

const portrait_styles = StyleSheet.create({
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

const orientation = () => {
    const dimension = Dimensions.get('screen');
    if (dimension.height >= dimension.width) {
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
    },
    gridView: {
        marginTop: 10,
        flex: 1,
    },
};

const arraySubSplitter = (arr = [], maxArrSize = 10) => {

    const result = [];

    for (let i = 0; i < Math.ceil(arr.length / maxArrSize); i++) {
        result[i] = arr.slice(i * maxArrSize, (i * maxArrSize) + maxArrSize);
    }

    return result;
};

const Images = ({ navigation }) => {

    const [gallery, setGallery] = useState([]);

    const [isReady, setIsReady] = useState(false);

    const [placeholder, setPlaceholder] = useState('Клікни на зображення');

    const goHome = () => {
        navigation.navigate('Home');
    }

    useEffect(() => {
        const url = `https://pixabay.com/api/?key=19193969-87191e5db266905fe8936d565&q=fun+party&image_type=photo&per_page=30`;

        (async () => {
            const fetchResult = await fetch(url);
            const loadedData = await fetchResult.json();
            const loadedDataURIs = loadedData['hits'].map((lD) => ({ uri: lD['largeImageURL'] }));
            setGallery(loadedDataURIs);
        })();
    }, []);


    const pickImage = async () => {
        const pickedImage = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 4],
            quality: 1
        });

        if (pickedImage.cancelled) {
            Alert.alert('Шота не пашло', '☹️☹️☹️');
        } else {
            setGallery(prevState => [...prevState, { uri: pickedImage.uri }])
        }

    };

    function cacheImages(images) {
        return images.map(image => {
            if (typeof image.uri === 'string') {
                console.log(image.uri)
                return Image.prefetch(image.uri);
            } else {
                console.log('else ', image)
                return Asset.fromModule(image).downloadAsync();
            }
        });
    }

    const _loadAssetsAsync = async () => {
        const imageAssets = cacheImages(data);
        await Promise.all([...imageAssets]);
    }

    const useScreenDimensions = () => {
        const [screenData, setScreenData] = useState(Dimensions.get('screen'));

        useEffect(() => {
            const onChange = (result) => {
                setScreenData(result.screen);
            };

            Dimensions.addEventListener('change', onChange);

            return () => Dimensions.removeEventListener('change', onChange);
        });

        return {
            ...screenData,
            isLandscape: screenData.width > screenData.height,
        };
    };

    const screenData = useScreenDimensions();

    const galleryComponent = arraySubSplitter(gallery).map(
        image => {
            if (!isReady) {
                return (
                    <AppLoading
                        key={image[0].uri}
                        startAsync={_loadAssetsAsync}
                        onFinish={() => setIsReady(true)}
                        onError={console.warn}
                    />
                );
            } else {
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
        }
    );

    return (
        <>
            <View>
                <Appbar.Header theme={MyTheme}>
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
                    gallery.length !== 0 && (
                    <ScrollView style={orientation().imgContainer}>
                        { galleryComponent }
                    </ScrollView>
                )}
                {
                    gallery.length === 0 &&
                    <View style={orientation().emptyView}>
                        <Text
                            style={{ fontStyle: "italic"}}
                        >
                            Барак
                        </Text>
                    </View>
                }
            </View>
        </>
    );
};

export default Images
