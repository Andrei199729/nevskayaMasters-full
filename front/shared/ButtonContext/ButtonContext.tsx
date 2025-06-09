import React, {createContext, useState, ReactNode} from 'react';

interface ButtonContextProps {
  activeButtonIndex: number | null;
  setActiveButtonIndex: (index: number | null) => void;
}

const ButtonContext = createContext<ButtonContextProps>({
  activeButtonIndex: null,
  setActiveButtonIndex: () => {},
});

export const ButtonProvider = ({children}: {children: ReactNode}) => {
  const [activeButtonIndex, setActiveButtonIndex] = useState<number | null>(
    null,
  );

  return (
    <ButtonContext.Provider value={{activeButtonIndex, setActiveButtonIndex}}>
      {children}
    </ButtonContext.Provider>
  );
};

export default ButtonContext;
