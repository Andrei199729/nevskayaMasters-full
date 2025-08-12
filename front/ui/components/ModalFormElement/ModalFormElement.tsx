import {Modal, View, Text, StyleSheet} from 'react-native';
import {Dispatch, SetStateAction, useEffect} from 'react';
import {IElement, IElementData} from '../../../shared/types';
import {Colors} from '../../../shared/tokens';
import {Input} from '../../../shared/Input/Input';
import ButtonCustom from '../../../shared/ButtonCustom/ButtonCustom';
import useInput from '../../../hooks/useInput';
import {useDispatch, useSelector} from '../../../services/hooks';
import {
  setElementModalVisible,
  setElementsWallModalVisible,
  setIsVisibleEditModal,
} from '../../../services/actions/modalOpen';

interface IModalFormElement {
  nameElementWall: string;
  numberWall: number;

  onSaveElementSize: (
    element: IElementData,
    wallId: number,
    elementId?: number,
  ) => void;
  dataEditElement?: IElementData;
  editElement?: any;
  wallIndex: number;
  clickButtonEdit?: any;
}

export default function ModalFormElement({
  numberWall,
  nameElementWall,
  onSaveElementSize,
  dataEditElement,
  editElement,
  wallIndex,
  clickButtonEdit,
  ...props
}: IModalFormElement) {
  const dispatch = useDispatch();
  const {isVisibleEditModal, elementModal} = useSelector(
    state => state.modalOpen,
  );

  const {numberCurrentWall} = useSelector(state => state.room);

  const locationElementTop = useInput(
    dataEditElement?.locationElementTop || '',
  );
  const locationElementRight = useInput(
    dataEditElement?.locationElementRight || '',
  );
  const locationElementLeft = useInput(
    dataEditElement?.locationElementLeft || '',
  );
  const locationElementBottom = useInput(
    dataEditElement?.locationElementBottom || '',
  );
  const widthTop = useInput(dataEditElement?.widthTop || '');
  const widthBottom = useInput(dataEditElement?.widthBottom || '');
  const heightLeft = useInput(dataEditElement?.heightLeft || '');
  const heightRight = useInput(dataEditElement?.heightRight || '');
  const radiusElement = useInput(dataEditElement?.radiusElement || '');

  const onSaveDataElement = () => {
    const numericNumberWall = typeof numberWall === 'number' ? numberWall : 0;
    const numberElement = numericNumberWall - 1;
    const updatedDataObjectSizeElement = {
      nameElementWall,
      locationElementTop: locationElementTop.value,
      locationElementRight: locationElementRight.value,
      locationElementLeft: locationElementLeft.value,
      locationElementBottom: locationElementBottom.value,
      widthTop: widthTop.value,
      widthBottom: widthBottom.value,
      heightLeft: heightLeft.value,
      heightRight: heightRight.value,
      radiusElement: radiusElement.value,
    };

    onSaveElementSize(updatedDataObjectSizeElement, numberElement);
    // editElement(updatedDataObjectSizeElement, numberCurrentWall, numberWall);
    dispatch(
      setElementsWallModalVisible({
        isVisible: false,
        wallNumber: null,
      }),
    );

    dispatch(
      setElementModalVisible({
        isVisible: false,
        wallNumber: null,
        wallNumberElement: null,
      }),
    );
  };

  const stateFormElemnt = clickButtonEdit
    ? isVisibleEditModal.isVisible
    : elementModal.isVisible;

  useEffect(() => {
    if (dataEditElement) {
      locationElementTop.onChangeText(dataEditElement.locationElementTop || '');
      locationElementBottom.onChangeText(
        dataEditElement.locationElementBottom || '',
      );
      locationElementLeft.onChangeText(
        dataEditElement.locationElementLeft || '',
      );
      locationElementRight.onChangeText(
        dataEditElement.locationElementRight || '',
      );
      widthTop.onChangeText(dataEditElement.widthTop || '');
      widthBottom.onChangeText(dataEditElement.widthBottom || '');
      heightLeft.onChangeText(dataEditElement.heightLeft || '');
      heightRight.onChangeText(dataEditElement.heightRight || '');
      radiusElement.onChangeText(dataEditElement.radiusElement || '');
    }
  }, [dataEditElement]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={stateFormElemnt}
      onRequestClose={() =>
        dispatch(
          setElementModalVisible({
            isVisible: false,
            wallNumber: null,
            wallNumberElement: null,
          }),
        )
      }>
      <View
        style={{
          backgroundColor: Colors.white,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: Colors.black,
        }}>
        <Text>
          {numberWall} {nameElementWall}
        </Text>
        <View>
          <Text>1 расположение сверху</Text>
          <Input
            value={locationElementTop.value}
            onChangeText={locationElementTop.onChangeText}
            inputModeText={'numeric'}
          />
        </View>
        <View>
          <Text>2 расположение справа</Text>
          <Input
            value={locationElementRight.value}
            onChangeText={locationElementRight.onChangeText}
            inputModeText={'numeric'}
          />
        </View>
        <View>
          <Text>3 расположение снизу</Text>
          <Input
            value={locationElementBottom.value}
            onChangeText={locationElementBottom.onChangeText}
            inputModeText={'numeric'}
          />
        </View>
        <View>
          <Text>4 расположение слева</Text>
          <Input
            value={locationElementLeft.value}
            onChangeText={locationElementLeft.onChangeText}
            inputModeText={'numeric'}
          />
        </View>
        <View>
          <Text>5 размер элемента сверху</Text>
          <Input
            value={widthTop.value}
            onChangeText={widthTop.onChangeText}
            inputModeText={'numeric'}
          />
        </View>
        <View>
          <Text>6 размер элемента справа</Text>
          <Input
            value={heightRight.value}
            onChangeText={heightRight.onChangeText}
            inputModeText={'numeric'}
          />
        </View>
        <View>
          <Text>7 размер элемента снизу</Text>
          <Input
            value={widthBottom.value}
            onChangeText={widthBottom.onChangeText}
            inputModeText={'numeric'}
          />
        </View>
        <View>
          <Text>8 размер элемента слева</Text>
          <Input
            value={heightLeft.value}
            onChangeText={heightLeft.onChangeText}
            inputModeText={'numeric'}
          />
        </View>
        <View>
          <Text>9 радиус элемента</Text>
          <Input
            value={radiusElement.value}
            onChangeText={radiusElement.onChangeText}
            inputModeText={'numeric'}
          />
        </View>
        <ButtonCustom textBtn="Сохранить данные" onPress={onSaveDataElement} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({});
