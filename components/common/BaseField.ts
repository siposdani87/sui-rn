import { useState } from 'react';

export default function useBaseField(props) {
  const [clearError, setClearError] = useState(false);
  const [error, setError] = useState(null);

  const newError = clearError !== props.error ? props.error : null;
  if (error !== newError) {
    setError(newError);
  }

  function onChange() {
    if (error) {
      setClearError(error);
    }
    setError(null);
  }

  function onValueChange(value) {
    onChange();
    props.onValueChange(value);
  }

  return [error, onChange, onValueChange];
}
