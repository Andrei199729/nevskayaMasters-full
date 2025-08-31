import {StyleSheet, Text, View} from 'react-native';
import {useCallback, useEffect, useState} from 'react';
import {Input} from '../../../shared/Input/Input';
import ButtonCustom from '../../../shared/ButtonCustom/ButtonCustom';
import {validateNumber} from '../../../customFunc/customFunc';
import {RadioButton} from 'react-native-paper';
import {useDispatch, useSelector} from '../../../services/hooks';
import {
  setModalVisibleBacklight,
  setOpenFormDataSize,
} from '../../../services/actions/modalOpen';
import {setWallsData} from '../../../services/actions/room';
import {
  setIsStyleLine,
  setUpdateStrokeDasharrays,
} from '../../../services/actions/draw';
import useInput from '../../../hooks/useInput';
import {IElementWallRoom, IWallSize} from '../../../shared/types';
interface IWallSizeInput {
  id: number;
  heightRight?: {value?: string};
  heightLeft?: {value?: string};
  widthTop?: {value?: string};
  widthBottom?: {value?: string};
  wallAngleDegree?: {value?: string};
  radiusWall?: {value?: string};
  valueDegree?: {value?: string};
  arrElements?: {
    elements?: IElementWallRoom[];
  };
}
export default function AddSizeWall() {
  const dispatch = useDispatch();
  const {wallsData, numberCurrentWall, dataWall} = useSelector(
    state => state.room,
  );

  const {openFormDataSize} = useSelector(state => state.modalOpen);
  const heightLeft = useInput(dataWall?.dataEditWall?.heightLeft || '');
  const heightRight = useInput(dataWall?.dataEditWall?.heightRight || '');
  const widthTop = useInput(dataWall?.dataEditWall?.widthTop || '');
  const widthBottom = useInput(dataWall?.dataEditWall?.widthBottom || '');
  const wallAngleDegree = useInput(
    dataWall?.dataEditWall?.wallAngleDegree || '',
  );
  const radiusWall = useInput(dataWall?.dataEditWall?.radiusWall || '');
  const valueDegree = useInput(dataWall?.dataEditWall?.valueDegree || '');
  const [viewInput, setViewInput] = useState<boolean>(true);
  const onSaveSizeWall = useCallback(
    (size: IWallSizeInput, numberWall: number) => {
      if (!size) {
        console.warn('Нет данных для сохранения размера стены');
        return;
      }

      // Убедимся, что все поля имеют строковые значения
      const normalizedSize: IWallSize = {
        ...size,
        heightRight: size.heightRight?.value || '', // Заменяем undefined на пустую строку
        heightLeft: size.heightLeft?.value || '',
        widthTop: size.widthTop?.value || '',
        widthBottom: size.widthBottom?.value || '',
        wallAngleDegree: size.wallAngleDegree?.value || '',
        radiusWall: size.radiusWall?.value || '',
        valueDegree: size.valueDegree?.value || '',
      };
      // тут смотреть обновление стен

      dispatch(setWallsData(wallsData, normalizedSize, numberWall));

      dispatch(
        setIsStyleLine({
          numberWall,
          isLine: true,
        }),
      );
      if (openFormDataSize)
        dispatch(
          setIsStyleLine({
            numberWall: null,
            isLine: false,
          }),
        );
      // обновления состояния strokeDasharray

      dispatch(setUpdateStrokeDasharrays(numberWall - 1));
    },
    [wallsData, openFormDataSize, dispatch],
  );

  const handleSubmit = useCallback(() => {
    const validHeightRight = validateNumber(heightRight.value);
    const validHeightLeft = validateNumber(heightLeft.value);
    const validWidthTop = validateNumber(widthTop.value);
    const validWidthBottom = validateNumber(widthBottom.value);
    const validWallAngleDegree = validateNumber(wallAngleDegree.value);
    const validRadiusWall = validateNumber(radiusWall.value);

    if (
      validHeightRight &&
      validHeightLeft &&
      validWidthTop &&
      validWidthBottom
    ) {
      const wallData = {
        id: numberCurrentWall,
        heightRight,
        heightLeft,
        widthTop,
        widthBottom,
        wallAngleDegree,
        radiusWall,
        valueDegree,
      };
      onSaveSizeWall(wallData, numberCurrentWall + 1);
    }

    setViewInput(false);
    dispatch(setModalVisibleBacklight(false));
    dispatch(
      setOpenFormDataSize({
        isOpen: false,
        wallNumber: 0,
      }),
    );
  }, [
    heightRight,
    heightLeft,
    widthTop,
    widthBottom,
    wallAngleDegree,
    radiusWall,
    dispatch,
    numberCurrentWall,
    valueDegree,
    onSaveSizeWall,
  ]);

  useEffect(() => {
    if (dataWall.dataEditWall) {
      heightRight.onChangeText(dataWall.dataEditWall.heightRight || '');
      widthTop.onChangeText(dataWall.dataEditWall.widthTop || '');
      heightLeft.onChangeText(dataWall.dataEditWall.heightLeft || '');
      widthBottom.onChangeText(dataWall.dataEditWall.widthBottom || '');
      radiusWall.onChangeText(dataWall.dataEditWall.radiusWall || '');
      wallAngleDegree.onChangeText(dataWall.dataEditWall.wallAngleDegree || '');
      valueDegree.onChangeText(dataWall.dataEditWall.valueDegree || '');
    }
  }, [
    dataWall.dataEditWall,
    heightLeft,
    heightRight,
    radiusWall,
    valueDegree,
    wallAngleDegree,
    widthBottom,
    widthTop,
  ]);

  return (
    <>
      {viewInput && (
        <View>
          <Text>Стена №{numberCurrentWall}</Text>
          <View style={styles.wallBlock}>
            <View>
              <Text>ширина верхней стены</Text>
              <Input
                value={widthTop.value}
                onChangeText={widthTop.onChangeText}
                inputModeText={'numeric'}
              />
            </View>
            <View>
              <Text>высота правой стены</Text>
              <Input
                value={heightRight.value}
                onChangeText={heightRight.onChangeText}
                inputModeText={'numeric'}
              />
            </View>
            <View>
              <Text>ширина нижней стены</Text>
              <Input
                value={widthBottom.value}
                onChangeText={widthBottom.onChangeText}
                inputModeText={'numeric'}
              />
            </View>
            <View>
              <Text>высота левой стены</Text>
              <Input
                value={heightLeft.value}
                onChangeText={heightLeft.onChangeText}
                inputModeText={'numeric'}
              />
            </View>
            <View>
              <Text>радиус дуги стены</Text>
              <Input
                value={radiusWall.value}
                onChangeText={radiusWall.onChangeText}
                inputModeText={'numeric'}
              />
            </View>
            <View>
              <Text>градус угла стены</Text>
              <Input
                value={wallAngleDegree.value}
                onChangeText={wallAngleDegree.onChangeText}
                inputModeText={'numeric'}
              />
            </View>
            <View style={styles.container}>
              <Text style={styles.label}>Выберите тип угла:</Text>
              <View style={{padding: 20}}>
                <RadioButton.Group
                  onValueChange={newValue => valueDegree.onChangeText(newValue)}
                  value={valueDegree.value}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <RadioButton value="interior" />
                    <Text>Внутренний угол</Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <RadioButton value="external" />
                    <Text>Внешний угол</Text>
                  </View>
                </RadioButton.Group>
              </View>
            </View>
          </View>
          <ButtonCustom
            textBtn="Сохранить данные"
            disabledState={
              !heightRight.value ||
              !widthTop.value ||
              !heightLeft.value ||
              !widthBottom.value ||
              !validateNumber(heightRight.value) ||
              !validateNumber(heightLeft.value) ||
              !validateNumber(widthTop.value) ||
              !validateNumber(widthBottom.value)
            }
            onPress={handleSubmit}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wallBlock: {
    maxWidth: '100%',
    width: '100%',
  },

  checkboxContainer: {
    flexDirection: 'column',
    gap: 8,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
