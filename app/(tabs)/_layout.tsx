import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Provider } from 'react-redux';
import store from '@/store/store';

export default function TabLayout() {

  return (
    <Provider store={store}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#9763FF',
          tabBarStyle: {
            backgroundColor: 'white', 
            borderTopColor: '#E6E6E6', 
            borderTopWidth: 1, 
            height: 60,
            paddingBottom: 10,
          },
          headerShown: false,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Today',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={'flash-outline'} color={focused ? '#9763FF' : 'gray'} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'History',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={'time-outline'} color={focused ? '#9763FF' : 'gray'} />
            ),
          }}
        />
      </Tabs>
    </Provider>
  );
}
