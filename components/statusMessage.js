import React, { useState, useEffect} from "react";
import { View, Text,  Dimensions} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';


const StatusMessage = ({ text, additionalText = ''}) => {

    const [loading, setLoading] = useState(false);

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

    const startLoading = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    };

    return (
        <View style={{
            height: screenData.isLandscape === true ?
                Dimensions.get('screen').height / 1.2 :
                Dimensions.get('screen').height / 1.2,
            flex:1,
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center'
        }}>
            <Spinner visible={ loading } />
            {
                additionalText === '' ?
                    <Text style={{
                        fontSize: 20,
                        width: screenData.isLandscape === true ?
                            Dimensions.get('screen').width / 1.5 :
                            Dimensions.get('screen').width / 1.5,
                        textAlign: 'center'
                    }}>
                        { text }
                    </Text> :
                    <View>
                        <Text style={{
                            fontSize: 20,
                            width: screenData.isLandscape === true ?
                                Dimensions.get('screen').width / 1.5 :
                                Dimensions.get('screen').width / 1.5,
                            textAlign: 'center',
                            marginBottom: 20
                        }}>
                            { additionalText }
                        </Text>
                        <Text style={{
                            fontSize: 20,
                            width: screenData.isLandscape === true ?
                                Dimensions.get('screen').width / 1.5 :
                                Dimensions.get('screen').width / 1.5,
                            textAlign: 'center'
                        }}>
                            { text }
                        </Text>
                    </View>
            }
        </View>
    )
}

export default StatusMessage
