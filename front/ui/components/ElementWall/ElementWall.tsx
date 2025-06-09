import {StyleSheet} from 'react-native';
import {Colors} from '../../../shared/tokens';
import BlockStateElements from '../BlockStateElements/BlockStateElements';
import {TStateElement} from '../../../shared/types';

interface IElementWall {
  nameElement: string;
  stateElement: TStateElement | string;
  position: number;
  onPress: () => void;
}

export default function ElementWall({
  nameElement,
  stateElement,
  position,
  onPress,
  ...props
}: IElementWall) {
  return (
    <BlockStateElements
      nameElement={nameElement}
      stateElement={stateElement}
      position={position - 1}
      onPressVisible={onPress}
    />
  );
}

const styles = StyleSheet.create({
  elementsWallContainer: {
    maxWidth: '100%',
    width: '100%',
    backgroundColor: Colors.white,
    position: 'absolute',
    top: 630,
    borderColor: Colors.black,
    borderWidth: 1,
  },

  elementVentilation: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: Colors.black,
    borderStyle: 'solid',
    borderRadius: 1000,
    backgroundColor: Colors.menuBottom,
  },

  elementDoor: {
    width: 30,
    height: 40,
    borderWidth: 1,
    borderColor: Colors.black,
    borderStyle: 'solid',
    backgroundColor: Colors.white,
  },

  elementWindow: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: Colors.black,
    borderStyle: 'solid',
  },
});
