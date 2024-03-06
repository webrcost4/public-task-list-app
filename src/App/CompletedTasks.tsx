import React, { useCallback, useState } from 'react';
import IconAnt from 'react-native-vector-icons/AntDesign';
import Checkbox from 'expo-checkbox';

import { View, Text, ScrollView } from 'react-native';
import { Api } from '../resources/api/api';
import { propsDataApi, propsStack } from '../../@types';
import { styles } from '../styles/styles';
import { TouchableHighlight } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';


const CompletedTasks = () => {

    const navigation = useNavigation<propsStack>();
    const [ tasks, setTasks ] = useState<propsDataApi>();

    const alterDataApi = async (id: string) => {
        await Api.put(`/update-task/${id}`, {
            taskCompleted: false
        }).then(()=> {
            console.log('ok');
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
        }, [])
    );

    return (
        <View style={styles.view}>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                <View style={{ marginBottom: 200 }}>
                    <Text style={styles.titleHead}>Tarefas concluidas</Text>
                    {tasks?.tasks.map((element, key)=>(       
                        <View key={key}>
                            {   
                            
                                element.taskCompleted == true ?
                                    <TouchableHighlight 
                                        underlayColor='transparent'
                                        onPress={()=> 
                                            navigation.navigate('ListOneTask', 
                                                { taskId: element.taskId })
                                        }>
                                        <View> 
                                            <Text style={styles.titleItemCardGreen}>
                                                {element.date}
                                            </Text>
                                            <View style={styles.cardTask}>

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
                                                    ]}>{element.title.slice(0, 15) + '...'}</Text>
                                                    <Text style={styles.textLineThrough}>
                                                        {element.description.slice(0, 20) + '...'}
                                                    </Text>
                                                </View>
                                                <View style={{ alignItems: 'center' }}>
                                                    <Text style={[{ fontSize: 30 }, styles.textDefaultDark]}>
                                                        {element.hour ? element.hour : '--:--'}
                                                    </Text>

                                                    <TouchableHighlight 
                                                        underlayColor='transparent'>
                                                        <IconAnt 
                                                            name='delete' 
                                                            size={25} 
                                                            color='red'/>
                                                    </TouchableHighlight>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableHighlight>
                                        
                                    : <View></View>

                                    
                            }
                                
                        </View>
                    ))}
                </View>

                
            </ScrollView>

        </View>
    );
};



export default CompletedTasks;