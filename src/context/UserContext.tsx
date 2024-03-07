import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

interface UserProviderProps {
    children: ReactNode;
}

interface UserContextProps {
    user: {
        name: string;
        userId: string;
    };
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);

export default function UserProvider ({children}: UserProviderProps) {

    const [user, setUser] = useState({name: '', userId:''});

    /* 
    ** Get data user in localStorage
    */
    async function getDataUser () {
        try {
            const nameStorage = await AsyncStorage.getItem('name');
            const userStorage = await AsyncStorage.getItem('userId');

            if(nameStorage && userStorage !== null)
                setUser({ name: nameStorage, userId: userStorage });

        } catch (error) {
            console.log(error);
        }
    }

    /* 
    ** get Data users in load the app
    */
    useEffect(()=> {
        getDataUser();
    }, []);

    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    );
}


/* 
** Create context aplication
*/
export const useUserContext = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error('useAudio must be used within an NavPlayProvider');
    }
    return context;
};