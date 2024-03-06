import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from '../styles/styles';



const Header = () => {
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
                <Text style={styles.textDefaultDark}>Weber costa</Text>
            </View>
        </View>
    );
};


export default Header;