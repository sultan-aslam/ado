import { useEffect, useState } from 'react';

const usePersistedState = (key, initialValue) => {
  // Load the state from localStorage, or use the initial value if not found
  const [state, setState] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  // Update localStorage whenever the state changes
  useEffect(() => {
    if (state !== initialValue) {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [state, initialValue, key]);

  return [state, setState];
};

export default usePersistedState;
