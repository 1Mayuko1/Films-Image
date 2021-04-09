import React from 'react';
import {View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome'
import Home from "../components/home";
import Profile from "../components/profile";
import Movie from "../components/movie";
import Info from "../components/info";
import AddForm from "../components/addForm";
import Images from "../components/images";

const MyTheme = {
    dark: false,
    colors: {
        primary: '#475861',
        background: 'rgb(242, 242, 242)',
        card: '#beae8d',
        text: 'rgb(28, 28, 30)',
        border: 'rgb(199, 199, 204)',
        notification: 'rgb(255, 69, 58)',
    },
};

const Stack = createStackNavigator();

const movieStackScreen = () => {
    return(
        <Stack.Navigator initialRouteName="Movie">
            <Stack.Screen
                name="Movie"
                component={Movie}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Movie',
                    tabBarIcon: () => (
                        <View>
                            <Icon
                                name={'film'}
                            />
                        </View>
                    ),
                }}
            />
            <Stack.Screen
                name="Details"
                component={Info}
            />
            <Stack.Screen
                name="AddForm"
                component={AddForm}
            />
        </Stack.Navigator>
    )
}

const Tab = createMaterialBottomTabNavigator();

const RootNavigator = () => {
    return (
        <NavigationContainer theme={MyTheme}>
            <Tab.Navigator
                shifting={true}
                sceneAnimationEnabled={false}
                initialRouteName="Home"
                activeColor="#EAE7ED"
                labelStyle={{ fontSize: 12 }}
            >
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        tabBarLabel: 'Chart',
                        tabBarIcon: () => (
                            <View>
                                <Icon
                                    style={[{color: '#F9F3E7'}]}
                                    size={25}
                                    name={'area-chart'}
                                />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                        tabBarLabel: 'Pie',
                        tabBarIcon: () => (
                            <View>
                                <Icon
                                    style={[{color: '#F9F3E7'}]}
                                    size={25}
                                    name={'pie-chart'}
                                />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name='Movie'
                    options={{
                        tabBarLabel: 'Movie',
                        tabBarIcon: () => (
                            <View>
                                <Icon
                                    style={[{color: '#F9F3E7'}]}
                                    size={25}
                                    name={'film'}
                                />
                            </View>
                        ),
                    }}
                    component={movieStackScreen}
                />
                <Tab.Screen
                    name='Images'
                    options={{
                        tabBarLabel: 'Images',
                        tabBarIcon: () => (
                            <View>
                                <Icon
                                    style={[{color: '#F9F3E7'}]}
                                    size={25}
                                    name={'file-image-o'}
                                />
                            </View>
                        ),
                    }}
                    component={Images}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default RootNavigator
