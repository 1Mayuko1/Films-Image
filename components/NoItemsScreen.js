import React from "react";
import { useFonts } from "expo-font";
import { useScreenDimensions } from '../constants/data'
import { View, Text, Dimensions, Image } from 'react-native';
import AppLoading from "expo-app-loading/build/AppLoadingNativeWrapper";

const NoItemsScreen = ({ text = '' }) => {

    const screenData = useScreenDimensions();

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
                <View
                style={{
                    height: Dimensions.get('screen').height / 1.3,
                    width: Dimensions.get('screen').width,
                    backgroundColor: '#f9e5ea'
                }}
                >
                    <View
                    style={{
                        flexDirection: screenData.isLandscape ? 'row' : 'column',
                        marginTop: screenData.isLandscape ? '10%' : 0,
                    }}
                    >
                        <Image style={{
                            marginTop: screenData.isLandscape ? 0 : '18%',
                            marginRight: screenData.isLandscape ? '10%' :
                            Dimensions.get('screen').width / 12,
                            marginLeft: screenData.isLandscape ? '10%' : 0,
                            alignSelf: 'center',
                            width: screenData.isLandscape ?
                                150 : 200,
                            height: screenData.isLandscape ?
                                150 : 200
                        }}
                           source={require('../assets/notFoundError.png')}/>
                        <Text style={{
                            lineHeight: 30,
                            textAlign: 'center',
                            marginLeft: screenData.isLandscape ? 0 : '8%',
                            marginTop: screenData.isLandscape ? 0 : '10%',
                            fontSize: screenData.isLandscape ? 18 : 20,
                            fontFamily: 'Comfortaa-VariableFont_wght',
                            width: screenData.isLandscape ?
                                Dimensions.get('screen').width / 2 :
                                Dimensions.get('screen').width / 1.2
                        }}>
                            { text }
                        </Text>
                    </View>
                </View>
        )
    }
}


export default NoItemsScreen
