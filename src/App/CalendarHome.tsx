import React, { useState, useCallback } from 'react';
import IconAnt from 'react-native-vector-icons/AntDesign';
import Checkbox from 'expo-checkbox';

import { View, Text, ScrollView, TouchableHighlight } from 'react-native';
import { styles } from '../styles/styles';

import { Api } from '../resources/api/api';
import { propsDataApi, propsStack } from '../../@types';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const dayOfWeek = [
    'Domingo', 
    'Segunda-Feira', 
    'Terça-Feira', 
    'Quarta-Feira', 
    'Quinta-Feira', 
    'Sexta-Feira', 
    'Sábado'
];

const monthNames = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
];

const CalendarHome = () => {

    const today = new Date();
    const date = today.toLocaleDateString().replaceAll('/', '-');

    const navigation = useNavigation<propsStack>();
    const [ tasks, setTasks ] = useState<propsDataApi>();
    const [dt, setDt] = useState(new Date().toLocaleTimeString());

    const deleteOneTask = async (taskId: string) => {
        await Api.delete(`/delete-one-task/650327aa4ce2ced30cf110d9/${taskId}`)
            .then(response=> {
                console.log(response);
            }).catch(err=> console.log(err));
    };

    const alterDataApi = async (id: string) => {
        await Api.put(`/update-task/${id}`, {
            taskCompleted: true
        }).then(response=> {
            console.log(response);
        }).catch(err=> console.log(err));
    };

    const fetchDataApi = async () => {
        await Api.get('/list-all-tasks/650327aa4ce2ced30cf110d9')
            .then(response=> {
                setTasks(response.data);
            })
            .catch(err=> console.log(err));
    };


    useFocusEffect(
        useCallback(() => {

            fetchDataApi();
            const secTimer = setInterval( () => {
                setDt(new Date().toLocaleTimeString());
            },1000);

            return () => clearInterval(secTimer);
        }, [])
    );

    return (
        <View style={styles.view}>
            <ScrollView 

                showsVerticalScrollIndicator={false} 
                style={styles.container}>
                
                <View style={{ marginBottom: 200 }}>

                    <View style={{  
                        flexDirection: 'column',
                    }}>

                        <Text style={[
                            styles.textDefaultDark,
                            { marginTop: 20 }
                        ]}>{dayOfWeek[today.getDay()]}</Text>
                    
                        <View style={{ 
                            flexDirection: 'row'
                        }}>
                            <Text style={[
                                {fontSize: 25},
                                styles.textDefaultDark
                            ]}>{`${today.getDate()} - ${monthNames[today.getMonth()]} - ${today.getFullYear()} `}</Text>
                        </View>

                    </View>

                    <Text style={[{
                        fontSize: 30,
                        marginBottom: 50
                    }, styles.textDefaultDark]}>
                        { dt }
                    </Text>

                    {tasks?.tasks.map((element, key) =>(
                        <TouchableHighlight
                            underlayColor='transparent'
                            key={key} 
                            onPress={()=> 
                                navigation.navigate('ListOneTask', 
                                    { taskId: element.taskId })
                            }>
                            <View>
                                {element.date === date ? 
                                    <View>
                                        <Text style={styles.titleItemCardGreen}>
                                            {element.date}
                                        </Text>
                                        <View style={[styles.cardTask, 
                                        ]}>

                                            <Checkbox
                                                style={styles.checkbox}
                                                value={Boolean(element.taskCompleted)}
                                                onValueChange={()=> {
                                                    alterDataApi(element.taskId);
                                                    fetchDataApi();
                                                }}
                                                color={element.description ? '#000' : undefined}
                                            />
                                            <View>
                                                <Text style={[
                                                    styles.textDefaultDark, 
                                                    styles.textWeightBold
                                                ]}>
                                                    {element.title.slice(0, 15) + '...'}
                                                </Text>
                                                <Text style={styles.textDefaultDark}>
                                                    {element.description.slice(0, 20) + '...'}
                                                </Text>
                                            </View>
                                            <View style={{ alignItems: 'center' }}>
                                                <Text style={[{ fontSize: 30 }, styles.textDefaultDark]}>
                                                    {element.hour ? element.hour : '--:--'}
                                                </Text>

                                                <TouchableHighlight 
                                                    underlayColor='transparent'
                                                    onPress={()=> {
                                                        deleteOneTask(element.taskId);
                                                        fetchDataApi();
                                                    } }>
                                                    <IconAnt name='delete' size={25} color='red'/>
                                                </TouchableHighlight>
                                            </View>
                                        </View>
                                    </View>
                                    : '' 
                                }
                            </View>
                        </TouchableHighlight>
                    ))}

                    {tasks?.tasks.slice(0, 1).map((element, key) =>(
                        <View key={key}>
                            {element.date !== date ? 
                                <Text style={[
                                    styles.textDefaultDark,
                                ]}>Você não tem nenhuma tarefa para hoje</Text> 
                                : '' 
                            }
                        </View>
                    ))}
                        
                </View>
                
            </ScrollView>
        </View>
    );
};



export default CalendarHome;