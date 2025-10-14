import {useState} from 'react';

function useInput(initialValue: string) {
  const [value, setValue] = useState<string>(initialValue);
  const [isActive, setIsActive] = useState<boolean>(true);

  const onChangeText = (text: string) => {
    if (text.length > 0) {
      setIsActive(false);
      setValue(text);
    } else {
      setIsActive(true);
    }
  };

  const onChangeTextNotLength = (text: string) => {
    setValue(text);
    setIsActive(text.length === 0);
  };
  const reset = () => setValue('');
  return {value, isActive, onChangeText, onChangeTextNotLength, reset};
}

export default useInput;
