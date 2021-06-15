import { useEffect, useRef, useReducer } from 'react';

const ACTIONS = {
  FETCHING: 'FETCHING',
  FETCHED: 'FETCHED',
  FETCH_ERROR: 'FETCH_ERROR'
}

const useFetch = (url, postData) => {
  const cache = useRef({});
  const stringPostData = JSON.stringify(postData);

  const initialState = {
    status: 'idle',
    error: null,
    data: [],
  };

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case ACTIONS.FETCHING:
        return { ...initialState, status: ACTIONS.FETCHING };
      case ACTIONS.FETCHED:
        return { ...initialState, status: ACTIONS.FETCHED, data: action.payload };
      case ACTIONS.FETCH_ERROR:
        return { ...initialState, status: ACTIONS.FETCH_ERROR, error: action.payload };
      default:
        return state;
    }
  }, initialState);

  useEffect(() => {
    let cancelRequest = false;
    if (!url) return;

    const fetchData = async () => {
      dispatch({ type: ACTIONS.FETCHING });
      if (cache.current[JSON.stringify(postData)]) {
        const data = cache.current[url+JSON.stringify(postData)];
        dispatch({ type: ACTIONS.FETCHED, payload: data });
      } else {
        try {
          const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
              'Content-Type': 'application/json',
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(postData)
          });
          const data = await response.json();
          cache.current[url] = data;
          if (cancelRequest) return;
          dispatch({ type: ACTIONS.FETCHED, payload: data });
        } catch (error) {
          if (cancelRequest) return;
          dispatch({ type: ACTIONS.FETCH_ERROR, payload: error.message });
        }
      }
    };

    fetchData();

    return function cleanup() {
      cancelRequest = true;
    };
  }, [url, stringPostData, postData]);

  return state;
};

export {
  useFetch, ACTIONS
}