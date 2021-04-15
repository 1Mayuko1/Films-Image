import React from "react";
import { View, Text, Dimensions, Image } from 'react-native';
import { useScreenDimensions } from '../constants/data'

const StartScreen = ({ text = '' }) => {

    const dimW = Dimensions.get('screen').width
    const dimH =  Dimensions.get('screen').height

    const screenData = useScreenDimensions();

    return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: screenData.isLandscape ?
                '2%' :
                dimH / 3
        }}>
            <Image style={{
                marginBottom: screenData.isLandscape ?
                    dimH / 10 : dimH / 20,
                alignSelf: 'center',
                width: screenData.isLandscape ?
                    dimW / 4 : dimW / 2,
                height: screenData.isLandscape ?
                    dimH / 2.5 : dimH / 4,
            }} source={require('../assets/movie.png')}/>
            <Text style={{
                width: dimW / 1.3,
                lineHeight: 30,
                fontSize:  screenData.isLandscape ? 20 : 25,
                fontFamily: 'Comfortaa-VariableFont_wght',
                textAlign: 'center',
                alignSelf: 'center',
            }}>
                { text }
            </Text>
        </View>
    )
}


export default StartScreen
