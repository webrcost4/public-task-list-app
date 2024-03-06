import React, { useEffect, useState } from 'react';
import IconAnt from 'react-native-vector-icons/AntDesign';

import { View, Text, ScrollView } from 'react-native';
import { Api } from '../resources/api/api';
import { propsDataApi } from '../../@types';
import { styles } from '../styles/styles';
import { TouchableHighlight } from 'react-native';
import { useRoute } from '@react-navigation/native';


const ListOneTask = () => {

    const [ tasks, setTasks ] = useState<propsDataApi>();
    const { params } = useRoute();

    const deleteOneTask = async (taskId: string) => {
        await Api.delete(`/delete-one-task/650327aa4ce2ced30cf110d9/${taskId}`)
            .then(response=> {
                console.log(response);
            }).catch(err=> console.log(err));
    };

    const fetchDataApi = async () => {
        await Api.get(`/list-one-task/${params?.taskId}`)
            .then(response=> {
                setTasks(response.data);
            })
            .catch(err=> console.log(err));
    };

    useEffect(()=> {
        fetchDataApi();
    }, []);

    return (
        <View style={styles.view}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                <View style={{ marginBottom: 150 }}>
                    <Text style={styles.titleHead}>Minha atividade</Text>
                    {tasks?.tasks.map((element, key)=>(       
                        <View key={key}>
                            {        
                                <View style={[styles.cardOneTask, 
                                    { 
                                        flexDirection: 'column'
                                    }]}>
                                    <View style={{ 
                                        width: '100%',
                                        borderBottomColor: '#E6E6E6', 
                                        borderBottomWidth: 1, 
                                        marginBottom: 10 
                                    }}>
                                        <Text style={[
                                            styles.titleItemCardGreen, 
                                            { marginBottom: 15 }
                                        ]}>
                                            {element.date}
                                        </Text>
                                    </View>
                                    <View style={{ 
                                        flexDirection: 'row', 
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        width: '100%'
                                    }}>
                                        <View>
                                            <Text style={[
                                                styles.textDefaultDark, 
                                                styles.textWeightBold
                                            ]}>{element.title}</Text>
                                            <Text style={styles.textDefaultDark}>
                                                {element.description}
                                            </Text>
                                            <Text style={[{ fontSize: 30 }, styles.textDefaultDark]}>
                                                {element.hour ? element.hour : '--:--'}
                                            </Text>
                                        </View>
                                        <View>
                                            <TouchableHighlight onPress={()=> {
                                                deleteOneTask(element.taskId);
                                                fetchDataApi();
                                            } }>
                                                <IconAnt name='delete' size={25} color='red'/>
                                            </TouchableHighlight>
                                        </View>
                                    </View>
                                </View>
                                    
                            }
                                
                        </View>
                    ))}


                </View>

                
            </ScrollView>

        </View>
    );
};



export default ListOneTask;