import React, { useCallback, useState } from 'react';
import IconAnt from 'react-native-vector-icons/AntDesign';
import Checkbox from 'expo-checkbox';

import { View, Text, ScrollView } from 'react-native';
import { Api } from '../resources/api/api';
import { propsDataApi, propsStack } from '../../@types';
import { styles } from '../styles/styles';
import { TouchableHighlight } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useUserContext } from '../context/UserContext';
import { formatDate } from '../resources/functions/functiosn';


const Home = () => {

    const navigation = useNavigation<propsStack>();
    const [ tasks, setTasks ] = useState<propsDataApi>();

    const { user } = useUserContext();
    

    const deleteOneTask = async (taskId: string) => {
        await Api.delete(`/delete-one-task/${user.name}/${taskId}`)
            .then(response=> {
                console.log(response);
            }).catch(err=> console.log(err));
    };

    const alterDataApi = async (id: string) => {
        await Api.put('/update-task', {
            userId: user.userId,
            taskId: id,
            taskCompleted: true
        }).then(()=> {
            fetchDataApi();
        }).catch(err=> console.log(err));
    };

    const fetchDataApi = async () => {
        await Api.get(`/list-all-tasks/${user.userId}`)
            .then(response=> {
                setTasks(response.data[0]);
            })
            .catch(err=> console.log(err));
    };

    useFocusEffect(
        useCallback(() => {
            fetchDataApi();
        }, [])
    );

    return (
        <View style={styles.view}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>

                <View style={{ marginBottom: 200 }}>
                    <Text style={styles.titleHead}>Minhas atividades</Text>
                    

                    {tasks?.tasks.map((element, key)=>(       
                        <View key={key}>
                            {        
                                element.taskCompleted === false ?
                                    
                                    <View>
                                        <Text style={styles.titleItemCardGreen}>
                                            {formatDate(element.date)}
                                        </Text>
                                        <View style={styles.cardTask}>

                                            <Checkbox
                                                style={styles.checkbox}
                                                value={Boolean(element.taskCompleted)}
                                                onValueChange={()=> {
                                                    alterDataApi(element.taskId);
                                                }}
                                                color={element.description ? '#000' : undefined}
                                            />
                                            <TouchableHighlight 
                                                underlayColor='transparent'
                                                onPress={()=> 
                                                    navigation.navigate('ListOneTask', 
                                                        { taskId: element.taskId })
                                                }>
                                                <View>
                                                    <Text style={[
                                                        styles.textDefaultDark, 
                                                        styles.textWeightBold
                                                    ]}>{element.title.slice(0, 15) + '...'}</Text>
                                                    <Text style={styles.textDefaultDark}>
                                                        {element.description.slice(0, 20) + '...'}
                                                    </Text>
                                                </View>
                                            </TouchableHighlight>
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
                                        
                                    : <View></View>
                                    
                            }
                                
                        </View>
                    ))}


                </View>

                
            </ScrollView>

        </View>
    );
};



export default Home;