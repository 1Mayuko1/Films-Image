import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View, Switch, Dimensions} from 'react-native';
import {LineChart, PieChart} from "react-native-chart-kit";
import {data , labels} from '../constants/data'

const portrait_styles = StyleSheet.create({
    container: {
        flex: 0,
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: '30%',
    },
    switch: {
        flex: 0,
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '15%'
    },
});

const landscape_styles = StyleSheet.create({
    container: {
        flex: 0,
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: '5%',
    },
    switch: {
        flex: 0,
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },

});

const isPortraitForSwitch = () => {
    const dim = Dimensions.get('screen');
    if (dim.height >= dim.width) {
        return portrait_styles.switch
    } else {
        return landscape_styles.switch
    }
}

const isPortraitForContainer = () => {
    const dim = Dimensions.get('screen');
    if (dim.height >= dim.width) {
        return portrait_styles.container
    } else {
        return landscape_styles.container
    }
}

function Home({ navigation }){

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    if (isEnabled) {
        return (
            <View style={isPortraitForContainer()}>
                <Text>Show Line Chart</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#767577" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    style={isPortraitForSwitch()}
                />
                <PieChart
                    data={[
                        {
                            name: 'Green',
                            percent: 35,
                            color: '#21ce9c',
                            legendFontColor: '#7F7F7F',
                            legendFontSize: 15,
                        },
                        {
                            name: 'Yellow',
                            percent: 40,
                            color: '#ffcc00',
                            legendFontColor: '#7F7F7F',
                            legendFontSize: 15,
                        },
                        {
                            name: 'Red',
                            percent: 25,
                            color: '#de3163',
                            legendFontColor: '#7F7F7F',
                            legendFontSize: 15,
                        },
                    ]}
                    width={Dimensions.get('window').width - 16}
                    height={Dimensions.get("window").height / 3}
                    chartConfig={{
                        backgroundColor: '#1cc910',
                        backgroundGradientFrom: '#eff3ff',
                        backgroundGradientTo: '#efefef',
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                    }}
                    style={{
                        marginVertical: 0,
                        borderRadius: 16
                    }}
                    accessor="percent"
                    backgroundColor="transparent"
                    paddingLeft="15"
                    absolute
                />
            </View>
        )
    } else {
        return (
            <View style={isPortraitForContainer()}>
                <Text>Show Pie Chart</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    style={isPortraitForSwitch()}
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
                    height={Dimensions.get("window").height / 2}
                    yAxisInterval={1}
                    chartConfig={{
                        backgroundColor: "#f5f5f5",
                        backgroundGradientFrom: "#f5f5f5",
                        backgroundGradientTo: "#f5f5f5",
                        decimalPlaces: 1,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "0",
                            strokeWidth: "0",
                            stroke: "#000",
                            barPercentage: '1'
                        }
                    }}

                    style={{
                        marginVertical: 0,
                        borderRadius: 16
                    }}

                />
            </View>
        )
    }
}

export default Home
