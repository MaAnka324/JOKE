import { StyleSheet, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from "@/store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateArr } from "@/reducers/joke-reducer";
import React, { useEffect, useState } from "react";
import { TabBarIcon } from './navigation/TabBarIcon';

type Like = {
    id: number
    component?: string
}

export const ButtonLike = ({ id, component }: Like) => {
    const dispatch = useAppDispatch();
    const jokeArr = useAppSelector((state) => state.joke.jokeArr);

    let [like, setLike] = useState<boolean | undefined>(false)

    const likeHandler = async () => {

        const updatedArr = jokeArr.map(item => {
            return item.joke.id === id 
            ? { ...item, like: !item.like }
            : item
        })

        try{
            await AsyncStorage.setItem('savedJokes', JSON.stringify(updatedArr));
            dispatch(updateArr(updatedArr))
        }catch(e){
            console.error("Failed to update like joke", e);
        }
    }

    useEffect(()=> {
        const likeValue = jokeArr.find(j => j.joke.id === id)
        setLike(likeValue?.like)
    })

    const size = component === 'today' ? 70 : 50;

    return (
        <TouchableOpacity 
        style={[styles.roundButton, 
            {
                backgroundColor: like ? '#9763FF' : '#EAE0FF',
                width: size,
                height: size,
            }
        ]}  
        onPress={likeHandler}>
            <TabBarIcon 
            size={component == 'today' ? 35 : 28} 
            name={like ? 'heart' : 'heart-outline'} 
            color={like ? 'white' : '#9763FF'} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    roundButton: {
        borderRadius: 35, 
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
});