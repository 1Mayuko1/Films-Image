import React from 'react';
import {
    View, StyleSheet,
    Alert, TouchableHighlight,
} from 'react-native';
import Image from 'react-native-image-progress';

const styles = StyleSheet.create({
    imageBlockContainer: {
        display: "flex",
        flexDirection: "row"
    },
    smallImageContainer: {
        display: "flex",
        flexDirection: "column"
    }
})

const Gallery = ({ gallery, width, height, color}) => {

    const normalImageSize = {
        width: width,
        height: height,
        backgroundColor: color,
    }

    const doubledImageSize = {
        width: width * 2,
        height: height * 2,
        backgroundColor: color,
    };

    const onPressImage = () => {
        Alert.alert('You cutie ❤️')
    };

    const ImageItem = (uri, optionsStyles = normalImageSize) => (
        <TouchableHighlight onPress={onPressImage}>
            <Image
                style={optionsStyles}
                source={uri}
                threshold={150}
            />
        </TouchableHighlight>
    );

    return (
        <>
            <View style={styles.imageBlockContainer}>
                <View style={styles.smallImageContainer}>
                    {gallery[0] && ImageItem(gallery[0])}
                    {gallery[1] && ImageItem(gallery[1])}
                </View>
                {gallery[2] && ImageItem(gallery[2], doubledImageSize)}
                <View style={styles.smallImageContainer}>
                    {gallery[3] && ImageItem(gallery[3])}
                    {gallery[4] && ImageItem(gallery[4])}
                </View>
            </View>
            <View style={styles.imageBlockContainer}>
                {gallery[5] && ImageItem(gallery[5], doubledImageSize)}
                <View style={styles.smallImageContainer}>
                    {gallery[6] && ImageItem(gallery[6])}
                    {gallery[7] && ImageItem(gallery[7])}
                </View>
                <View style={styles.smallImageContainer}>
                    {gallery[8] && ImageItem(gallery[8])}
                    {gallery[9] && ImageItem(gallery[9])}
                </View>
            </View>
        </>
    );
};

export default Gallery
