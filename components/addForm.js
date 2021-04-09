import React, { useState } from 'react';
import { View,
    Text, ScrollView,
    TouchableOpacity
} from 'react-native';
import { Button } from 'react-native-elements'
import { FloatingLabelInput } from 'react-native-floating-label-input';
import {useDispatch, useSelector} from "react-redux";
import {addFilm} from "../redux/actions";

const submitBtn = {
    width: '50%',
    dark: false,
    colors: {
        primary: '#beae8d',
        background: 'rgb(242, 242, 242)',
        borderRadius: '20%'
    },
};


const AddForm = ({navigation, route}) => {

    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [year, setYear] = useState('');

    const { filmsData } = useSelector(state => state.filmsReducer);
    const dispatch = useDispatch();

    const addToStorage = films => dispatch(addFilm(films));

    const handleAddFilm = films => {
        addToStorage(films);
    };

    let idForNewItem = 100;

    const submit = () => {

    const parsed = parseInt(year);

    if(title === '') {
        setTitle('You must entered Title')
        setTimeout(() => {
            setTitle('')
        }, 2000);
    } else if (type === ''){
        setType('You must entered Type')
        setTimeout(() => {
            setType('')
        }, 2000);
    } else if (isNaN(parsed)) {
        setYear('The year must be a number')
        setTimeout(() => {
            setYear('')
        }, 2000);
    } else {
        const newItem = {
            Title: title,
            Year: year,
            imdbID: idForNewItem++,
            Type: type,
            Poster: 'N/A',
        }

        const newData = [...filmsData, newItem]

        handleAddFilm(newData)

        navigation.navigate('Movie')
    }
}

    return (
        <ScrollView
            keyboardShouldPersistTaps="handled"
        >
            <View style={{padding: 50, flex: 1}}>
                <View style={{marginBottom: 20}}>
                    <FloatingLabelInput
                        countdownLabel="chars left"
                        placeholder={''}
                        maxLength={100}
                        showCountdown={true}
                        style={{color: '#fff'}}
                        label={'Title'}
                        value={title}
                        rightComponent={(
                            <TouchableOpacity
                                style={{
                                    alignContent:'center',
                                    justifyContent:'center'
                                }}
                                onPress={()=>{
                                    setTitle('')
                                }}>
                                <Text>✕</Text>
                            </TouchableOpacity>
                        )}
                        onChangeText={(val) => setTitle(val)}
                    />
                </View>
                <View style={{marginBottom: 20}}>
                    <FloatingLabelInput
                        label={'Type'}
                        value={type}
                        rightComponent={(
                            <TouchableOpacity
                                style={{
                                    alignContent:'center',
                                    justifyContent:'center'
                                }}
                                onPress={()=>{
                                    setType('')
                                }}>
                                <Text>✕</Text>
                            </TouchableOpacity>
                        )}
                        onChangeText={(val) => setType(val)}
                    />
                </View>
                <View style={{marginBottom: 20}}>
                    <FloatingLabelInput
                        keyboardType="numeric"
                        mask="9999"
                        label={'Year'}
                        value={year}
                        rightComponent={(
                            <TouchableOpacity
                                style={{
                                    alignContent:'center',
                                    justifyContent:'center'
                                }}
                                onPress={()=>{
                                    setYear('')
                                }}>
                                <Text>✕</Text>
                            </TouchableOpacity>
                        )}
                        onChangeText={(val) => setYear(val)}
                    />
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Button
                        onPress={() => {
                            submit()
                        }}
                        theme={submitBtn}
                        title="Add"
                        color="#000"
                        buttonStyle={{ width: 150 }}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

export default AddForm
