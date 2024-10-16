import { getRandomJoke } from '@/reducers/joke-reducer';
import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useAppDispatch, useAppSelector } from "../../store/store";


export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const joke = useAppSelector((state) => state.joke);

useEffect(()=> {
  dispatch(getRandomJoke())
}, [dispatch])

return (
  <View style={styles.container}>
  <Text style={styles.title}>Today</Text>
  <View style={styles.line} />
  <View style={styles.joke}>
      {'type' in joke && joke.type === "single" ? (
        <Text style={styles.jokeText}>{joke.joke}</Text>
      ) : (
        <View>
          <Text style={styles.jokeText}>{joke.setup }</Text>
          <Text style={styles.jokeText}>{joke.delivery}</Text>
        </View>
      )}
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
    alignItems: 'center',
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
