import { useState } from 'react';

export default function useBaseField(props) {
  const [clearError, setClearError] = useState(false);
  const [error, setError] = useState(null);

  const newError = clearError !== props.error ? props.error : null;
  if (error !== newError) {
    setError(newError);
  }

  function onErrorChange() {
    if (error) {
      setClearError(error);
    }
    setError(null);
  }

  return [error, onErrorChange];
}
