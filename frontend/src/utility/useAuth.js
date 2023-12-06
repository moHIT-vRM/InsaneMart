import { useCallback } from "react";

export const useAuth = () => {
  const authFetch = useCallback(async (input, init) => {
    // if (state.token === 'loading' || !state.token) return new Promise(() => {
    // })
    try {
      const resp = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}${input}`,
        {
          method: "GET",
          ...init,
          headers: {
            // Authorization: state.token ?? '',
            "Content-Type": "application/json",
            ...init?.headers,
          },
        }
      );
      return resp;
    } catch (err) {
      if (err.status && (err.status === 401 || err.status === 403)) {
        return null;
      }
    }
  }, []);
  return {
    authFetch,
  };
};
