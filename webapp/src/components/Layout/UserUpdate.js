import {useContext, useEffect} from "react";
import {store} from "../../hooks/store";

export default function UserUpdate({runMutation}) {
  const { state } = useContext(store);

  useEffect(() => {
    runMutation({
      ...state.user
    })
  }, [state.user, runMutation])
  return ''
}