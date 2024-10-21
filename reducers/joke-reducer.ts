import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { jokeAPI } from '@/api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';


type BaseJoke = {
    error: boolean;
    category: string;
    type: string;
    flags: {
      nsfw: boolean;
      religious: boolean;
      political: boolean;
      racist: boolean;
      sexist: boolean;
      explicit: boolean;
    };
    id: number;
    safe: boolean;
    lang: string;
};
  
type DeliveryJoke = BaseJoke & {
setup: string;
delivery: string;
};

type SingleJoke = BaseJoke & {
joke: string;
};

type Joke = DeliveryJoke | SingleJoke;

export type JokeArr = {
  date: string;
  like: boolean;
  joke: Joke;
};

export type InitialStateType = {
  joke: Joke;
  jokeArr: JokeArr[];
};

const initialState: InitialStateType = {
  jokeArr: [],
  joke: {
    error: false,
    category: '',
    type: '',
    setup: '',
    delivery: '',
    flags: {
      nsfw: false,
      religious: false,
      political: false,
      racist: false,
      sexist: false,
      explicit: false,
    },
    id: 0,
    safe: false,
    lang: '',
  },
};

export const getRandomJoke = createAsyncThunk(
    'jokes/getRandomJoke',
    async () => {
      const response = await jokeAPI.getRandomJoke();
      const today = moment().format('YYYY-MM-DD')
      
      const storedJokes = await AsyncStorage.getItem('savedJokes');
      let jokesArray: JokeArr[] = storedJokes ? JSON.parse(storedJokes) : [];
  
      jokesArray.unshift({
        date: today,
        like: false,
        joke: response.data,
      });
  
      await AsyncStorage.setItem('savedJokes', JSON.stringify(jokesArray));
      
      return response.data;
    }
  );

const jokeSlice = createSlice({
  name: 'joke',
  initialState,
  reducers: {
    updateArr: (state, action: PayloadAction<JokeArr[]>) => {
      state.jokeArr = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRandomJoke.fulfilled, (state, action: PayloadAction<Joke>) => {
      state.joke = action.payload;
    });
  },
});

export const { updateArr } = jokeSlice.actions;

export default jokeSlice.reducer;
