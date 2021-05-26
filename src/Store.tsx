import React, {Context, Dispatch, ReactElement, useContext, useReducer, createContext} from "react";
import Project from "./types/Project";

export interface Store {
  favorites: Project[]
}

export const initialStore: Store = {
  favorites: []
}

interface RemoveFromFavorites {
  type: 'REMOVE_FROM_FAVORITES';
  project: Project
}

interface AddToFavorites {
  type: 'ADD_TO_FAVORITES';
  project: Project
}

type Actions = RemoveFromFavorites | AddToFavorites

export function reducer(store: Store, action: Actions): Store {
  switch (action.type) {
  case 'ADD_TO_FAVORITES':
    return {...store, favorites: [...store.favorites, action.project]}
  case 'REMOVE_FROM_FAVORITES': {
    const index = store.favorites.map(favorite => favorite.id).indexOf(action.project.id)
    return {...store, favorites: store.favorites.filter((_favorite, i) => i !== index)}
  }
  default:
    return store;
  }
}

interface StoreContext {
  store: Store;
  dispatch: Dispatch<Actions>;
}

const StoreContext = createContext({} as StoreContext);

export const useStore = (): StoreContext => useContext(StoreContext);

export function StoreProvider(props: {children: ReactElement}): ReactElement {
  const [store, dispatch] = useReducer(reducer, initialStore);
  return (
    <StoreContext.Provider value={{store, dispatch}}>
      {props.children}
    </StoreContext.Provider>
  );
}
