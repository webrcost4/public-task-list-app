import React, { useState } from 'react';
import { Api } from '../../resources/api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, TextInput, TouchableHighlight, View } from 'react-native';
import { styles } from '../../styles/styles';
import { propsStack } from '../../../@types';
import { useNavigation } from '@react-navigation/native';

interface IUser {
	name: string;
	userId: string;
	email: string;
	_id: string;
}

export function Register() {

    const [user, setUser] = useState({});

    const navigation = useNavigation<propsStack>();
    // const [userId, setUserId] = useState<string>();

    // useEffect(()=> {
    //     // getStorage();
    // });

    const setStoreData = async (name: string, userId: string) => {
        try {
            await AsyncStorage.setItem('name', name);
            await AsyncStorage.setItem('userId', userId);
        } catch (e) {
            // saving error
        }
    };


    const fetchApi = async () => {
        try {
            
            await Api.post('/create-user', user)
                .then((response)=> {
                    
                    const {name, userId}: IUser = response.data;
                    setStoreData(name, userId);

                    navigation.navigate('Home');

                }).catch(err=> console.log(err));
                

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={[styles.view, {
            justifyContent: 'center'
        }]}>
            <View style={styles.container}>

                <Text style={styles.titleHead}>Cadastre-se</Text>

                <Text style={styles.textDefaultDark}>* Nome</Text>
                <TextInput
                    editable
                    multiline
                    numberOfLines={4}
                    maxLength={40}
                    onChangeText={(e)=>setUser({ ...user, name: e })}
                    style={[styles.formInput, styles.my10]}
                    placeholder='joão'
                />

                <Text style={styles.textDefaultDark}>* Email</Text>
                <TextInput
                    editable
                    multiline
                    numberOfLines={4}
                    maxLength={1000}
                    textContentType='emailAddress'
                    onChangeText={(e)=>setUser({ ...user, email: e })}
                    style={[styles.formInput, styles.my10]}
                    placeholder='joao@email.com'
                    
                />

                <TouchableHighlight 
                    style={styles.buttonDft} 
                    onPress={()=>{
                        fetchApi();
                    }}>
                    <Text 
                        style={
                            styles.textDefaultGreen
                        }>
                            Entrar
                    </Text>
                </TouchableHighlight>
                    
            </View>
        </View>
    );
}