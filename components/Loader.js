import React, { useState } from 'react';
import {
    View, Modal,
    ActivityIndicator,
    Dimensions, Image
} from 'react-native';
import { useScreenDimensions } from '../constants/data'

const Loader = ({ loading }) => {

    const screenData = useScreenDimensions();

    const [loadInTime, setLoadInTime] = useState(loading);

    // if(loadInTime) {
    //     setTimeout( () => {
    //         setLoadInTime(false)
    //     },3000);
    // }

    setTimeout( () => {
        setLoadInTime(false)
    },2000);

    return (
        <Modal
            transparent={true}
            animationType={'none'}
            visible={ loadInTime }
            supportedOrientations={['portrait', 'landscape']}
        >
            <View style={{
                height: Dimensions.get('screen').height,
                alignItems: 'center',
                flexDirection: screenData.isLandscape ? 'row' : 'column',
                justifyContent: 'space-around',
                backgroundColor: '#f9e5ea'
            }}>
                <Image style={{
                    alignSelf: 'center',
                    width: 200,
                    height: 200,
                    marginBottom: screenData.isLandscape ? 10 : 0
                }} source={require('../assets/load.png')}/>
                <ActivityIndicator animating={ loadInTime } size={"large"} color="#000"/>
            </View>
        </Modal>
    )
}

export default Loader;
