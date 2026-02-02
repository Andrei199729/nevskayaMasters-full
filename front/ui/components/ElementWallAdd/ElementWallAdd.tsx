import {StyleSheet, View} from 'react-native';
import ModalSizesElement from '../ModalSizesElement/ModalSizesElement';
import {IElementWallRoom, Mode, TStateElement} from '../../../shared/types';
import BlockStateElements from '../BlockStateElements/BlockStateElements';

interface IElementWallAdd {
  nameElement: string;
  stateElement: TStateElement | string;
  position: number;
  onPressVisible: () => void;
  addedElement?: boolean;
  element: IElementWallRoom;
  wallIndex: number;
  mode: Mode;
}

export default function ElementWallAdd({
  nameElement,
  stateElement,
  position,
  onPressVisible,
  addedElement,
  element,
  wallIndex,
  mode,
}: IElementWallAdd) {
  const containerStyle = [addedElement ? styles.added : styles.notAdded];
  return (
    <View style={containerStyle}>
      <BlockStateElements
        nameElement={nameElement}
        stateElement={stateElement}
        position={position}
        onPressVisible={onPressVisible}
      />
      <ModalSizesElement
        position={position}
        nameElement={nameElement}
        element={element}
        wallIndex={wallIndex}
        mode={mode}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  added: {
    position: 'relative',
  },
  notAdded: {
    position: 'static',
  },
});
