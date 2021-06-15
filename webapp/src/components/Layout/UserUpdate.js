import { useContext, useEffect } from "react";
import { store } from "../../hooks/store";

export default function UserUpdate({ runMutation, user = null }) {
  const { state } = useContext(store);

  useEffect(() => {
    runMutation({
      ...(user != null ? user : state.user),
    });
  }, [state.user, user, runMutation]);
  return "";
}
