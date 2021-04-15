import React, {useEffect, useState} from 'react';
import { Dimensions } from "react-native";

export const MainSearchBarTheme = {
    dark: false,
    colors: {
        primary: '#E3C588',
        background: '#ffe0e1',
        card: 'rgb(255, 255, 255)',
        text: 'rgb(28, 28, 30)',
        border: 'rgb(199, 199, 204)',
        notification: 'rgb(255, 69, 58)',
    },
};

export const MainBtnTheme = {
    dark: false,
    colors: {
        primary: '#40bab3',
        background: 'rgb(242, 242, 242)',
        text: 'rgb(28, 28, 30)',
        fontWeight: 'bold'
    },
};

export const MainBottomTabsTheme = {
    dark: false,
    colors: {
        primary: '#823967',
        background: 'rgb(242, 242, 242)',
        card: '#E3C588',
        text: 'rgb(28, 28, 30)',
        border: 'rgb(199, 199, 204)',
        notification: 'rgb(255, 69, 58)',
    },
};

export const useScreenDimensions = () => {
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

export const data = [50, 32, 16, 8, 4, 2, 0.5, 0, 0.5, 2, 4, 8, 16, 32, 50];
export const labels = [-5, "", "", "", "", "", "", "", "", "", 0, "", "", "", "", "", "", "", "", "", 5];
