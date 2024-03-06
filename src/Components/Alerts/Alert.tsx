import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { styles } from '../../styles/styles';

type BlinkProps = {
  typeAlert: 'error' | 'success' | null | undefined
};

const Alert = (props: BlinkProps) => {

    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(()=>{
        fadeIn();
        setTimeout(()=> {
            fadeOut();
        }, 3000);
    }, []);

    const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    };

    const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
        }).start();
    };
  
    return (
        <View style={{ 
            position: 'absolute'
        }}> 
            {props.typeAlert === 'success' ? 
                <Animated.View style={{
                    backgroundColor: '#6cd8af',
                    padding: 30,
                    borderRadius: 10, 
                    marginTop: 30, 
                    opacity: fadeAnim,
                    minWidth: '100%',
                    alignItems: 'center',
                }}>
                    <Text style={styles.textDefault}>Adicionado com sucesso</Text>
                </Animated.View> 
                : 
                <Animated.View style={{
                    backgroundColor: 'red',
                    padding: 30,
                    borderRadius: 10, 
                    marginTop: 30, 
                    opacity: fadeAnim,
                    minWidth: '100%',
                    alignItems: 'center',
                }}>
                    <Text style={styles.textDefault}>Erro na tentativa tente novamente.</Text>
                </Animated.View>
            }
        </View>
    );
};


export default Alert;