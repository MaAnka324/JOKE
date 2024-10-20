import { ButtonLike } from '@/components/ButtonLike';
import {  getRandomJoke, updateArr } from '@/reducers/joke-reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { useAppDispatch, useAppSelector } from "../../store/store";


export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const jokeState = useAppSelector((state) => state.joke);
  const today = moment().format('YYYY-MM-DD')
  let [jokesArr, setJokesArr] = useState(null) 
  let [todayJoke, setTodayJoke] = useState(null)
  let [update, setUpdate] = useState(false)

useEffect(()=> {
  const loadJoke = async () => {
    try {
      const storedJokes = await AsyncStorage.getItem('savedJokes');

      if(storedJokes != null) {
        const j = JSON.parse(storedJokes)
        dispatch(updateArr(j))

        const jokeToday = j.find(j => j.date === today);

        if(jokeToday){
          setJokesArr(j)
          setTodayJoke(jokeToday)
        }else {
          await fetchJoke();
        }
      }else{
          await fetchJoke();
      }
    } catch (e) {
      console.error("Failed to load joke from storage", e);
    } 
  };

  const fetchJoke = async () => {
    try {
      await dispatch(getRandomJoke());
      newJoke()
    } catch (e) {
      console.error("Failed to fetch joke", e);
    }
  };

  loadJoke();
}, [dispatch, today, update])

  const newJoke = async () => {
    try{
      if(jokeState.joke.id !== 0){
        const storedJokes = await AsyncStorage.getItem('savedJokes');
    let jokesArray = storedJokes ? JSON.parse(storedJokes) : [];

    jokesArray.unshift({date: today, like: false, joke: jokeState.joke});

    await AsyncStorage.setItem('savedJokes', JSON.stringify(jokesArray));

    setUpdate(!update)
      }
    }catch(e){
      console.error("Failed to save joke from in storage", e);
    }
  }


if (todayJoke === null || jokesArr === null) {
  return <Text>LOADING</Text>
}

return (
  <View style={styles.container}>
  <Text style={styles.title}>Today</Text>
  <View style={styles.line} />
  <View style={styles.joke}>
      {todayJoke?.joke?.joke ? (
        <Text style={styles.jokeText}>{todayJoke.joke.joke}</Text>
      ) : (
        <View>
          <Text style={styles.jokeText}>{todayJoke.joke.setup }</Text>
          <Text style={styles.jokeText}>{todayJoke.joke.delivery}</Text>
        </View>
      )}
      <ButtonLike 
      id={todayJoke.joke.id}
      component={'today'}
      />
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  joke: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 100,
    padding: 20
  },
  jokeText: {
    fontSize: 24,
    marginBottom: 10,
    alignItems: 'center',
    fontWeight: '500',
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: '#E6E6E6',
    marginBottom: 200,
  },
});
