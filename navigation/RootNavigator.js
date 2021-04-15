import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome'
import AboutMe from "../components/AboutMe";
import Chart from "../components/Chart";
import Movie from "../components/Movie";
import Info from "../components/Info";
import AddForm from "../components/AddForm";
import Images from "../components/Images";
import { MainBottomTabsTheme } from '../constants/data'

const Stack = createStackNavigator();

const movieStackScreen = () => {
    return(
        <Stack.Navigator initialRouteName="Movie">
            <Stack.Screen
                name="Movie"
                component={ Movie }
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
        <NavigationContainer theme={MainBottomTabsTheme}>
            <Tab.Navigator
                shifting={true}
                sceneAnimationEnabled={true}
                initialRouteName="AboutMe"
                activeColor="#EAE7ED"
                labelStyle={{ fontSize: 12 }}
            >
                <Tab.Screen
                    name="Home"
                    component={AboutMe}
                    options={{
                        tabBarLabel: 'AboutMe',
                        tabBarIcon: () => (
                            <View>
                                <Icon
                                    style={[{color: '#F9F3E7'}]}
                                    size={25}
                                    name={'info'}
                                />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={Chart}
                    options={{
                        tabBarLabel: 'Chart',
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
