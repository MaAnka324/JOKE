import { jokeAPI } from "@/api/api";
import {AppThunk} from "../store/store";

type Delivery = {
    error: boolean;
    category: string;
    type: string;
    setup: string | undefined;
    delivery: string | undefined;
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
}

type SingleJoke = {
    error: boolean;
    category: string;
    type: string;
    joke: string;
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
}

type Joke = Delivery | SingleJoke

type JokeArr = {
    date: string
    like: boolean
    joke: Joke
}

export type InitialStateType = {
    joke: Joke
    jokeArr: JokeArr[]
}
  

  export const jokeInitialState: InitialStateType = {
    jokeArr: [],
    joke: {
    error: false,
    category: "",
    type: "",
    setup: "",
    delivery: "",
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
    lang: "",
    }
  };


  const jokeReducer = (state: InitialStateType = jokeInitialState, action: UserActionsTypes): InitialStateType => {
    switch (action.type) {
        case "GET-JOKE":
                return {
                    ...state,
                    joke: action.jokeObj
                }
        case "UPDATE-ARRAY":
            return {
                ...state,
                jokeArr: action.jokeArr
            }
                            
        default:
            return state;
    }
}



export const getJokeAC = (jokeObj: Joke) => {
    return {
        type: "GET-JOKE",
        jokeObj
    } as const;
}

export const updateArr = (jokeArr: JokeArr[]) => {
    return {
        type: "UPDATE-ARRAY",
        jokeArr
    } as const;
}



export type UserActionsTypes = ReturnType<typeof getJokeAC>
| ReturnType<typeof updateArr>

export default jokeReducer


//thunks
export const getRandomJoke = (): AppThunk => async (dispatch) => {
    try {
        const res = await jokeAPI.getRandomJoke();
        console.log(res.data);
        dispatch(getJokeAC(res.data));
    } catch (e) {
        const msg = "getRandomJoke";
        console.error(msg, e);
        throw new Error(msg);
    }
};

