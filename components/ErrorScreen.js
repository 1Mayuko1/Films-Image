import React, { useState, useEffect, useCallback} from "react";
import {
    View, Modal,
    Text, Dimensions,
    Image, StyleSheet,
} from 'react-native';
import { Restart } from 'fiction-expo-restart';
import { Button } from 'react-native-elements';
import { useFonts } from "expo-font";
import { MainBtnTheme } from '../constants/data'
import AppLoading from "expo-app-loading/build/AppLoadingNativeWrapper";


const ErrorScreen = ({ text = 'Error' }) => {

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
            <Modal style={styles.modalContainer}>
                {
                    <View style={styles.container}>
                        <Image style={styles.img} source={require('../assets/bullying.png')}/>
                        <Text style={styles.txt}>
                            { text }
                        </Text>
                        <Button
                            theme={ MainBtnTheme }
                            style={styles.btn}
                            title="Try again"
                            onPress={Restart}
                        />
                    </View>
                }
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: '#f9e5ea',
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        marginTop: '47%',
        marginBottom: 10,
        alignSelf: 'center',
        width: 200,
        height: 200,
    },
    btn: {
        width: Dimensions.get('screen').width / 4,
        height: 100,
        alignSelf: 'center',
    },
    txt: {
        lineHeight: 30,
        fontFamily: 'Comfortaa-VariableFont_wght',
        width: Dimensions.get('screen').width / 1.5,
        marginBottom: 10,
        fontSize: 20,
        textAlign: 'center',
        alignSelf: 'center',
    },
});


export default ErrorScreen
