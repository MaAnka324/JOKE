import { applyMiddleware, combineReducers, createStore } from "redux";
import jokeReducer, {
  jokeInitialState,
  UserActionsTypes,
} from "../reducers/joke-reducer";
import { thunk, ThunkAction, ThunkDispatch } from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  joke: jokeReducer,
});

const middleware = [thunk];

const initialState: Partial<RootState> = {
  joke: jokeInitialState,
};

const store = createStore(
  rootReducer,
  initialState as any,
  applyMiddleware(...middleware),
);

export type AppDispatchType = ThunkDispatch<RootState, any, AppActionsType>;
export const useAppDispatch = () => useDispatch<AppDispatchType>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppActionsType =
  | UserActionsTypes

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AppActionsType
>;

export default store;
