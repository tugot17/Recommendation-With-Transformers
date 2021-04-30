// store.js
import { createContext, useReducer } from "react";
import { menuElements } from "../config";
import useLocalStorage from "./useLocalStorage";

const initialState = { menu: menuElements.APPS };
const store = createContext(initialState);
const { Provider } = store;

const ACTIONS = {
  SET_MENU: "SET_MENU",
  ADD_USER_GAME: "ADD_USER_GAME",
  REMOVE_USER_GAME: "REMOVE_USER_GAME",
  SET_USER: "UPDATE_USER",
};

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const StateProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", {
    games: [],
    userId: uuidv4(),
    name: "",
    color: "#7b1fa2",
    created: new Date().toLocaleDateString("en-GB", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  });
  const [state, dispatch] = useReducer(
    (state, action) => {
      let newUser = {};

      switch (action.type) {
        case ACTIONS.SET_MENU:
          return { ...state, menu: action.value, user };
        case ACTIONS.SET_USER:
          newUser = { ...state.user, ...action.value };
          setUser(newUser);
          return { ...state, user: newUser };
        case ACTIONS.ADD_USER_GAME:
          newUser = {
            ...state.user,
            games: [...state.user.games, action.value],
          };
          setUser(newUser);
          return { ...state, user: newUser };
        case ACTIONS.REMOVE_USER_GAME:
          newUser = {
            ...state.user,
            games: state.user.games.filter((el) => el !== action.value),
          };
          setUser(newUser);
          return { ...state, user: newUser };
        default:
          throw new Error();
      }
    },
    { ...initialState, user }
  );
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider, ACTIONS };
