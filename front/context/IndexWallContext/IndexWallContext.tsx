import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

interface IndexWallContextProps {
  activeWallIndex: number | boolean | null;
  setActiveWallIndex: Dispatch<SetStateAction<number | boolean | null>>;
}

const IndexWallContext = createContext<IndexWallContextProps>({
  activeWallIndex: 0,
  setActiveWallIndex: () => {},
});

export const IndexWallProvider = ({children}: {children: ReactNode}) => {
  const [activeWallIndex, setActiveWallIndex] = useState<
    number | boolean | null
  >(0);

  return (
    <IndexWallContext.Provider value={{activeWallIndex, setActiveWallIndex}}>
      {children}
    </IndexWallContext.Provider>
  );
};

export default IndexWallContext;
