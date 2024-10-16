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

type Joke = {
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

export type InitialStateType = Delivery | Joke
  

  export const jokeInitialState: InitialStateType = {
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
  };


  const jokeReducer = (state: InitialStateType = jokeInitialState, action: UserActionsTypes): InitialStateType => {
    switch (action.type) {
        case "GET-JOKE":
            if (action.payload.joke) {
                return {
                    ...state,
                    joke: action.payload.joke,
                    setup: "",
                    delivery: "",
                };
            } else {
                return {
                    ...state,
                    setup: action.payload.setup,
                    delivery: action.payload.delivery,
                };
            }
        default:
            return state;
    }
}



export const getJokeAC = (jokeOrSetup: string, delivery?: string) => {
    return {
        type: "GET-JOKE",
        payload: {
            joke: delivery ? undefined : jokeOrSetup,
            setup: delivery ? jokeOrSetup : undefined,
            delivery: delivery || undefined,
        }
    } as const;
}




export type UserActionsTypes = ReturnType<typeof getJokeAC>

export default jokeReducer


//thunks

export const getRandomJoke = (): AppThunk => async (dispatch) => {
    try {
        const res = await jokeAPI.getRandomJoke();
        console.log(res.data);

        if ('joke' in res.data) {
            // Обрабатываем случай, когда возвращается Joke
            dispatch(getJokeAC(res.data.joke));
        } else if ('setup' in res.data && 'delivery' in res.data) {
            // Обрабатываем случай, когда возвращается Delivery
            dispatch(getJokeAC(res.data.setup, res.data.delivery));
        } else {
            console.error("Unknown data format", res.data);
        }
        
    } catch (e) {
        const msg = "getRandomJoke";
        console.error(msg, e);
        throw new Error(msg);
    }
};

