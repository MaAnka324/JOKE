import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAppSelector } from '@/store/store';
import { ButtonLike } from '@/components/ButtonLike';

export default function TabTwoScreen() {
  const jokes = useAppSelector((state) => state.joke.jokeArr);

  useEffect(() => {}, [jokes]);

  return (
    <ScrollView style={styles.container}>
      {jokes.length > 0 ? (
        jokes.map((item, index) => {
          if (!item || !item.joke) return null;
          return (
            <View key={index} style={styles.jokeContainer}>
             
              {item.joke.setup && item.joke.delivery ? (
                <>
                  <Text style={styles.setupText}>{item.joke.setup}</Text>
                  <Text style={styles.deliveryText}>{item.joke.delivery}</Text>
                </>
              ) : (
                <Text style={styles.jokeText}>{item.joke.joke}</Text>
              )}
              <ButtonLike id={item.joke.id}/>
              <Text>{item.date}</Text>
            </View>
          );
        })
      ) : (
        <Text>No jokes available</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  jokeContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  jokeText: {
    fontSize: 18,
    marginBottom: 8,
  },
  setupText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deliveryText: {
    fontSize: 16,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 14,
    color: 'gray',
  },
  flagsText: {
    fontSize: 12,
    color: 'blue',
  },
});
