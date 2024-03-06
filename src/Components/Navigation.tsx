import React, { useEffect, useState } from 'react';
import IconAnt from 'react-native-vector-icons/AntDesign';

import { TouchableHighlight, View, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { propsStack } from '../../@types';
import { styles } from '../styles/styles';


const Navigation = () => {

    const [ navSate, setNavState ] = useState({ CalendarHome: false, Home: false, AddTasks: false, CompletedTasks: false });
    const navigation = useNavigation<propsStack>();

    useEffect(()=> {
        if (navSate.CalendarHome === false && navSate.Home === false && navSate.AddTasks === false && navSate.CompletedTasks === false)
            setNavState({ CalendarHome: true, Home: false, AddTasks: false, CompletedTasks: false });
    });


    return (
        <View style={{ 
            width: '100%',   
            borderRadius: 30,                                    
            position: 'absolute',                                          
            bottom: 60,
        }}>

            <View style={{ flexDirection: 'row', 
                justifyContent: 'space-evenly', 
                backgroundColor: 'black',
                width: '95%',
                alignSelf: 'center',
                borderRadius: 20,
                paddingTop: 15, 
                paddingBottom: 15
            }}>

                <TouchableHighlight 
                    style={{ alignItems: 'center' }}
                    onPress={() => {
                        navigation.navigate('CalendarHome');
                        setNavState({ CalendarHome: true, Home: false, AddTasks: false, CompletedTasks: false });
                    }}
                >
                    { navSate?.CalendarHome == true ? 
                        <>
                            <IconAnt 
                                name='calendar' 
                                size={20} 
                                color={'#6cd8af'}
                            />
                            <Text style={styles.textDefaultGreen}>Hoje</Text>
                        </> : 
                        <>
                            <IconAnt 
                                name='calendar' 
                                size={20} 
                                color={'#fff'}
                            />
                            <Text style={styles.textDefault}>Hoje</Text>
                        </>
                    }
                </TouchableHighlight>

                <TouchableHighlight
                    style={{ 
                        alignItems: 'center' 
                    }} 
                    onPress={()=>{ 
                        navigation.navigate('AddTasks');
                        setNavState({ CalendarHome: false, Home: false, AddTasks: true, CompletedTasks: false });
                    }}>
                        
                    { navSate?.AddTasks == true ? 
                        <>
                            <IconAnt 
                                name='pluscircleo' 
                                size={20} 
                                color={'#6cd8af'} />
                            <Text style={styles.textDefaultGreen}>Add Tarefa</Text>
                        </> : 
                        <>
                            <IconAnt 
                                name='pluscircleo' 
                                size={20} 
                                color={'#fff'} />
                            <Text style={styles.textDefault}>Add Tarefa</Text>
                        </>
                    }
                </TouchableHighlight>

                <TouchableHighlight 
                    style={{ alignItems: 'center' }}
                    onPress={() => {
                        navigation.navigate('Home');
                        setNavState({ CalendarHome: false, Home: true, AddTasks: false, CompletedTasks: false });
                    }}>
                    { navSate?.Home == true ? 
                        <>
                            <IconAnt 
                                name='pushpino' 
                                size={20} 
                                color={'#6cd8af'} 
                            />
                            <Text style={styles.textDefaultGreen}>Tarefas</Text>
                        </> : 
                        <>
                            <IconAnt 
                                name='pushpino' 
                                size={20} 
                                color={'#fff'} 
                            />
                            <Text style={styles.textDefault}>Tarefas</Text>
                        </>
                    }
                </TouchableHighlight>

                <TouchableHighlight 
                    style={{ alignItems: 'center' }}
                    onPress={() => {
                        navigation.navigate('CompletedTasks');
                        setNavState({ CalendarHome: false, Home: false, AddTasks: false, CompletedTasks: true });
                    }}
                >
                    { navSate?.CompletedTasks == true ? 
                        <>
                            <IconAnt 
                                name='checkcircleo' 
                                size={20} 
                                color={'#6cd8af'}
                            />
                            <Text style={styles.textDefaultGreen}>Concluidas</Text>
                        </> : 
                        <>
                            <IconAnt 
                                name='checkcircleo' 
                                size={20} 
                                color={'#fff'}
                            />
                            <Text style={styles.textDefault}>Concluidas</Text>
                        </>
                    }
                </TouchableHighlight>

            </View>

            

        </View>
    );
};

export default Navigation;