import {useContext, useEffect} from "react";
import {store} from "../../hooks/store";

export default function UserUpdate({runMutation}) {
  const { state, dispatch } = useContext(store);

  useEffect(() => {
    console.log('run', state.user)
    runMutation({
      ...state.user
    })
  }, [state.user])
  return ''
}