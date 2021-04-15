import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, View, Switch, Dimensions, LogBox} from 'react-native';
import {LineChart, PieChart} from "react-native-chart-kit";
import {data, labels, MainSearchBarTheme, useScreenDimensions} from '../constants/data'
import {Appbar} from "react-native-paper";
import SearchBar from "react-native-dynamic-search-bar";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading/build/AppLoadingNativeWrapper";
import * as SplashScreen from "expo-splash-screen";

const Chart = ({ navigation }) => {

    const screenData = useScreenDimensions();

    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const goMovie = () => {
        navigation.navigate('Movie');
    }

    const [isLoaded] = useFonts({
        'Comfortaa-VariableFont_wght':
            require('../assets/fonts/Comfortaa-VariableFont_wght.ttf')
    });

    if(!isLoaded) {
        return (
            <AppLoading />
        )
    } else if (isEnabled){
        return (
            <View style={styles.mainContainer}>
                <View>
                    <Appbar.Header theme={ MainSearchBarTheme }>
                        <Appbar.Action icon="home" onPress={goMovie} />
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
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: screenData.isLandscape ? '2%' : '10%',
                }}>
                    <Text style={{
                        fontSize: 18,
                        fontFamily: 'Comfortaa-VariableFont_wght',
                    }}>
                        Show Line Chart
                    </Text>
                    <Switch
                        trackColor={{ false: "#90C7D9", true: "#90C7D9" }}
                        thumbColor={isEnabled ? "#E3C588" : "#E3C588"}
                        ios_backgroundColor="#90C7D9"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                        style={{
                            flex: 0,
                            marginTop: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: screenData.isLandscape ? 10 : '25%'
                        }}
                    />
                    <PieChart
                        data={[
                            {
                                percent: 35,
                                color: '#21ce9c',
                            },
                            {
                                percent: 40,
                                color: '#ffcc00',
                            },
                            {
                                percent: 25,
                                color: '#de3163',
                            },
                        ]}
                        hasLegend={false}
                        width={
                            screenData.isLandscape ?
                                Dimensions.get('screen').width :
                                Dimensions.get('screen').width
                        }
                        height={
                            screenData.isLandscape ?
                                Dimensions.get("screen").height / 1.8:
                                Dimensions.get("screen").height / 3
                        }
                        chartConfig={{
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        }}
                        style={{
                            alignItems: "center",
                            marginLeft: '50%',
                        }}
                        accessor="percent"
                        absolute
                        backgroundColor={'#f9e5ea'}
                        paddingLeft={''}
                    />
                </View>
            </View>
        )
    } else {
        return (
            <View style={styles.mainContainer}>
                <View>
                    <Appbar.Header theme={ MainSearchBarTheme }>
                        <Appbar.Action icon="home" onPress={goMovie} />
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
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: screenData.isLandscape ? '2%' : '10%',
                }}>
                    <Text style={{
                        fontSize: 18,
                        fontFamily: 'Comfortaa-VariableFont_wght',
                    }}>
                        Show Pie Chart
                    </Text>
                    <Switch
                        trackColor={{ false: "#E3C588", true: "#E3C588" }}
                        thumbColor={isEnabled ? "#823967" : "#823967"}
                        ios_backgroundColor="#90C7D9"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                        style={{
                            flex: 0,
                            marginTop: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: screenData.isLandscape ? 10 : '20%'
                        }}
                    />
                    <LineChart
                        data={{
                            labels: labels,
                            datasets: [
                                {
                                    data: data
                                }
                            ]
                        }}
                        width={Dimensions.get("window").width}
                        height={Dimensions.get("window").height / 2 }
                        chartConfig={{
                            backgroundColor: "#f9e5ea",
                            backgroundGradientFrom: "#f9e5ea",
                            backgroundGradientTo: "#f9e5ea",
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            propsForDots: {
                                r: "0",
                                strokeWidth: "0",
                                stroke: "#000",
                                barPercentage: '1'
                            }
                        }}

                        style={{
                            marginLeft: screenData.isLandscape ?
                                0 : '-8%'
                        }}
                        withInnerLines={false}
                        withOuterLines={false}
                        withHorizontalLabels={false}
                        withVerticalLabels={false}
                        withShadow={false}
                    />
                </View>
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

export default Chart
