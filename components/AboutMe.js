import React, {useEffect, useState, useCallback} from "react";
import {
    View, Text,
    StyleSheet, Dimensions,
    Image, Alert
} from 'react-native'
import SearchBar from "react-native-dynamic-search-bar";
import { Appbar } from 'react-native-paper';
import { Button } from "react-native-elements";
import { MainSearchBarTheme, MainBtnTheme, useScreenDimensions } from '../constants/data'
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading/build/AppLoadingNativeWrapper";

const AboutMe = ({ navigation }) => {

    const goMovie = () => {
        navigation.navigate('Movie');
    }

    const screenData = useScreenDimensions();

    const [isLoaded] = useFonts({
        'GloriaHallelujah-Regular':
            require('../assets/fonts/GloriaHallelujah-Regular.ttf'),
    });

    if(!isLoaded) {
        return (
            <AppLoading />
        )
    } else {
        return (
            <View style={styles.mainContainer}>
                <View>
                    <Appbar.Header theme={MainSearchBarTheme}>
                        <Appbar.Action icon="home" onPress={goMovie}/>
                        <SearchBar
                            placeholder="Search here"
                            style={{flex: 1}}
                        />
                        <Appbar.Action
                            icon="plus"
                            onPress={() => {
                                navigation.navigate('AddForm');
                            }}
                        />
                    </Appbar.Header>
                </View>
                <View style={{
                    flex: 0,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    width: screenData.isLandscape ? '95%' : '90%',
                    alignSelf: 'center',
                    justifyContent: 'space-evenly',
                    marginBottom: screenData.isLandscape ? 0 : '5%',
                }}>
                    <Image style={{
                        marginTop: screenData.isLandscape ? 10 : '20%',
                        marginBottom: 10,
                        alignSelf: 'center',
                        width: screenData.isLandscape ?
                            Dimensions.get('screen').width / 3.37
                            : Dimensions.get('screen').width / 2.5,
                        height: screenData.isLandscape ?
                            Dimensions.get('screen').height / 1.9 :
                            Dimensions.get('screen').height / 4.5
                    }} source={require('../assets/hello.png')}/>
                    <Text style={{
                        textAlign: 'center',
                        alignSelf: 'center',
                        fontSize: screenData.isLandscape ? 18 : 20,
                        fontFamily: 'GloriaHallelujah-Regular',
                        width: screenData.isLandscape ?
                            Dimensions.get('screen').width / 2 :
                            '95%'
                    }}>
                        I am Vladislav Kondratsky,
                        the developer of this application.
                        Find something to see here today.
                        Ooh, yeah, and don't forget about the amazing
                        pictures on the last tab. Have fun.
                    </Text>
                </View>
                <Button
                    theme={MainBtnTheme}
                    style={{
                        width: screenData.isLandscape ?
                            Dimensions.get('screen').width / 5 :
                            Dimensions.get('screen').width / 4,
                        height: 100,
                        alignSelf: 'center',
                    }}
                    title="Gotcha !"
                    onPress={goMovie}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#f9e5ea',
        height: Dimensions.get('screen').height,
    },
});

export default AboutMe
