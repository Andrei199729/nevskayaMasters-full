import {View, StyleSheet} from 'react-native';
import ModalSizesElement from '../ModalSizesElement/ModalSizesElement';
import {IElement, TStateElement} from '../../../shared/types';
import BlockStateElements from '../BlockStateElements/BlockStateElements';
import {Dispatch, SetStateAction} from 'react';

interface IElementWallAdd {
  nameElement: string;
  stateElement: TStateElement | string;
  position: number;
  onPressVisible: () => void;
  addedElement?: boolean;
  setVisible: (index: number, isVisible: boolean) => void;
  element: IElement;
  isVisible: {[key: number]: boolean};
  editElement: any;
  wallIndex: number;
}

export default function ElementWallAdd({
  nameElement,
  stateElement,
  position,
  onPressVisible,
  addedElement,
  setVisible,
  element,
  isVisible,
  editElement,
  wallIndex,
  ...props
}: IElementWallAdd) {
  return (
    <View style={{position: addedElement ? 'relative' : 'static'}}>
      <BlockStateElements
        nameElement={nameElement}
        stateElement={stateElement}
        position={position}
        onPressVisible={onPressVisible}
      />
      <ModalSizesElement
        position={position}
        nameElement={nameElement}
        isVisible={isVisible}
        setVisible={setVisible}
        element={element}
        editElement={editElement}
        wallIndex={wallIndex}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
