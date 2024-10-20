import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAppSelector } from '@/store/store';
import { ButtonLike } from '@/components/ButtonLike';

export default function TabTwoScreen() {
  const jokes = useAppSelector((state) => state.joke.jokeArr);

  useEffect(() => {}, [jokes]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>History</Text>
      <View style={styles.line} />
      <ScrollView >
        {jokes.length > 0 ? (
          jokes.map((item, index) => {
            if (!item || !item.joke) return null;
            return (
              <View key={index} style={styles.jokeContainer}>
                <View style={styles.jokeAndLike}>
                  {item.joke.setup && item.joke.delivery ? (
                    <>
                    <View style={styles.jokeTextContainer}>
                      <Text style={styles.jokeText}>{item.joke.setup}</Text>
                      <Text style={styles.jokeText}>{item.joke.delivery}</Text>
                    </View>
                    </>
                  ) : (
                    <View style={styles.jokeTextContainer}>
                      <Text style={styles.jokeText}>{item.joke.joke}</Text>
                    </View>
                  )}
                  <ButtonLike id={item.joke.id}/>
                </View>
                <View style={styles.line} />
              </View>
            );
          })
        ) : (
          <Text>No jokes available</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  jokeContainer: {
    padding: 10,
    borderRadius: 8,
  },
  jokeAndLike: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  jokeText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 8,
  },
  jokeTextContainer: {
    width: '80%',
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 100,
    padding: 20
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: '#E6E6E6',
  },
});
