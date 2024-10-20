// import { TouchableOpacity } from "react-native-gesture-handler"
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from "@/store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateArr } from "@/reducers/joke-reducer";
import { useEffect, useState } from "react";


type Like = {
    id: number
}

export const ButtonLike = (props: Like) => {
    const dispatch = useAppDispatch();
    const jokeArr = useAppSelector((state) => state.joke.jokeArr);

    let [like, setLike] = useState<boolean | undefined>(false)

    const likeHandler = async () => {

        const updatedArr = jokeArr.map(item => {
            return item.joke.id === props.id 
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
        const likeValue = jokeArr.find(j => j.joke.id === props.id)
        setLike(likeValue?.like)
    })

    return (
        <TouchableOpacity onPress={likeHandler}>
            <Text>{like ? '❤️' : '🩶'}</Text>
        </TouchableOpacity>
    )
}