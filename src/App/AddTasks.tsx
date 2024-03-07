import React, { useState } from 'react';

import { TextInputMask } from 'react-native-masked-text';
import { View, Text, ScrollView, TextInput, TouchableHighlight } from 'react-native';
import { styles } from '../styles/styles';
import { Api } from '../resources/api/api';
import Alert from '../Components/Alerts/Alert';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddTasks = () => {

    const [alert, setAlert] = useState<boolean>(false);
    const [typeAlert, setTypeAlert] = useState<'error' | 'success' | null>();

    const [userId, setUserId] = useState<string | null>();

    (async () => {
        try {
            const userStor = await AsyncStorage.getItem('userId');
            setUserId(userStor);
        } catch (error) {
            console.log(error);
        }
    })();

    function useAlert(type: 'error' | 'success') {

        setAlert(true);

        if (type === 'success')
            setTypeAlert('success');
        else if (type === 'error')
            setTypeAlert('error');
        
        setTimeout(()=> {
            setAlert(false);
            setTypeAlert(null);
        }, 3000);
    }

    const [ data, setData ] = useState({
        title: '',
        description: '',
        date: '',
        hour: ''
    });
    // DD/MM/YYYY
    const fetchData = async () => {

        const { title, description, date, hour } = data;

        if (date.length >= 10 && title.length >= 1 && description.length >= 1)
            await Api.post('/add-new-task', {
                title,
                description,
                date,
                hour,
                userId,
                taskCompleted: false,
            }).then(()=> {
                useAlert('success');
            }).catch((err)=> {console.log(err);useAlert('error');} );
        else
            useAlert('error');
    };

    return (
        <View style={styles.view}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                <View style={{ marginBottom: 200 }}>

                    <Text style={styles.titleHead}>Adicionar atividade</Text>

                    <Text style={styles.textDefaultDark}>* Titulo da atividade</Text>
                    <TextInput
                        editable
                        multiline
                        numberOfLines={4}
                        maxLength={40}
                        onChangeText={(e)=>setData({ ...data, title: e })}
                        style={[styles.formInput, styles.my10]}
                        placeholder='Dar banho no meu pet'
                    />

                    <Text style={styles.textDefaultDark}>* Descrição da atividade</Text>
                    <TextInput
                        editable
                        multiline
                        numberOfLines={4}
                        maxLength={1000}
                        onChangeText={(e)=>setData({ ...data, description: e })}
                        style={[styles.formDescInput, styles.my10]}
                        placeholder='Vou da banho no meu pet com shampoo importado.'
                    
                    />

                
                    <View style={styles.dFlex}>
                        <View style={{ width: '45%' }}>
                            <Text style={[styles.textDefaultDark]}>* Data</Text>
                            <TextInputMask 
                                type='datetime'
                                options={{
                                    format: 'DD-MM-YYYY'
                                }}
                                value={String(data.date)}
                                onChangeText={e => {
                                    setData({...data, date: e });
                                }}
                                style={styles.formDate}
                                placeholder={'10-09-2023'}
                            />
                        </View>
                        
                        <View style={{ width: '45%' }}>
                            <Text style={[styles.textDefaultDark]}>Hora</Text>
                            <TextInputMask 
                                type='datetime'
                                options={{
                                    format: 'HH:mm'
                                }}
                                value={String(data.hour)}
                                onChangeText={e => {
                                    setData({...data, hour: e });
                                }}
                                style={styles.formDate}
                                placeholder='10:30'
                            />
                        </View>

                    </View>


                    <TouchableHighlight 
                        style={styles.buttonDft} 
                        onPress={()=>{
                            fetchData();
                        }}>
                        <Text 
                            style={
                                styles.textDefaultGreen
                            }>
                            Adicionar
                        </Text>
                    </TouchableHighlight>
                </View>

                { alert === true ? <Alert typeAlert={typeAlert} /> : '' }

            </ScrollView>
        </View>
    );
};

export default AddTasks;