import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from '../styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Header = () => {

    const [name, setName] = useState<string | null>();

    const getLocalStorage = async () => {
        try {
            const nameStor = await AsyncStorage.getItem('name');
            setName(nameStor);
        } catch (error) {
            console.log(error);
        }
    };

    getLocalStorage();

    return(
        <View style={{ 
            paddingTop: 35,
            paddingBottom: 10, 
            backgroundColor: '#f9f7f0',
            borderBottomWidth: 1,
            borderBottomColor: '#E6E6E6'
        }}>
            <View style={{ 
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                alignSelf: 'center',
                width: '90%',
            }}>
                <Image
                    style={{
                        width: 45, 
                        height: 45, 
                        borderRadius: 100, 
                        borderColor: '#6cd8af', 
                        borderWidth: 3
                    }}
                    source={require('../../assets/profile.jpg')}
                />
                <Text style={styles.textDefaultDark}>{name}</Text>
            </View>
        </View>
    );
};


export default Header;