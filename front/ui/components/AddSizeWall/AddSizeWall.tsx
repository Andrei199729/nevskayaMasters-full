import {StyleSheet, Text, View} from 'react-native';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {Input} from '../../../shared/Input/Input';
import ButtonCustom from '../../../shared/ButtonCustom/ButtonCustom';
import {validateNumber} from '../../../customFunc/customFunc';
import {IExternalSizeWall, IWallSize} from '../../../shared/types';
import {RadioButton} from 'react-native-paper';
interface IAddSizeWall {
  numberWall: number | boolean | null;
  onSaveSizeWall: (wallData: IWallSize, numberWall: number) => void;
  dataEditWall?: IExternalSizeWall;
  setModalVisibleBacklight?: Dispatch<SetStateAction<number | boolean | null>>;
  setOpenFormDataSize?: Dispatch<SetStateAction<boolean>>;
}

export default function AddSizeWall({
  numberWall,
  onSaveSizeWall,
  dataEditWall,
  setModalVisibleBacklight,
  setOpenFormDataSize,
}: IAddSizeWall) {
  const [heightRight, setHeightRight] = useState<string>(
    dataEditWall?.heightRight || '',
  );
  const [widthTop, setWidthTop] = useState<string>(
    dataEditWall?.widthTop || '',
  );
  const [heightLeft, setHeightLeft] = useState<string>(
    dataEditWall?.heightLeft || '',
  );
  const [widthBottom, setWidthBottom] = useState<string>(
    dataEditWall?.widthBottom || '',
  );
  const [wallAngleDegree, setWallAngleDegree] = useState<string>(
    dataEditWall?.wallAngleDegree || '',
  );
  const [radiusWall, setRadiusWall] = useState<string>(
    dataEditWall?.radiusWall || '',
  );

  const [valueDegree, setValueDegree] = useState(
    dataEditWall?.valueDegree || '',
  );
  const [viewInput, setViewInput] = useState<boolean>(true);

  const handleSubmit = () => {
    const validHeightRight = validateNumber(heightRight);
    const validHeightLeft = validateNumber(heightLeft);
    const validWidthTop = validateNumber(widthTop);
    const validWidthBottom = validateNumber(widthBottom);
    const validWallAngleDegree = validateNumber(wallAngleDegree);
    const validRadiusWall = validateNumber(radiusWall);

    if (
      validHeightRight &&
      validHeightLeft &&
      validWidthTop &&
      validWidthBottom
    ) {
      const numericNumberWall = typeof numberWall === 'number' ? numberWall : 0;
      const wallData = {
        id: numericNumberWall,
        heightRight,
        heightLeft,
        widthTop,
        widthBottom,
        wallAngleDegree,
        radiusWall,
        valueDegree,
      };
      onSaveSizeWall(wallData, numericNumberWall + 1);
    }
    setViewInput(false);
    setModalVisibleBacklight?.(false);
    setOpenFormDataSize?.(false);
  };

  useEffect(() => {
    if (dataEditWall) {
      setHeightRight(dataEditWall.heightRight || '');
      setWidthTop(dataEditWall.widthTop || '');
      setHeightLeft(dataEditWall.heightLeft || '');
      setWidthBottom(dataEditWall.widthBottom || '');
      setRadiusWall(dataEditWall.radiusWall || '');
      setWallAngleDegree(dataEditWall.wallAngleDegree || '');
      setValueDegree(dataEditWall.valueDegree || '');
    }
  }, [dataEditWall]);

  return (
    <>
      {viewInput && (
        <View>
          <Text>Стена №{numberWall}</Text>
          <View style={styles.wallBlock}>
            <View>
              <Text>ширина верхней стены</Text>
              <Input
                value={widthTop}
                onChangeText={setWidthTop}
                inputModeText={'numeric'}
              />
            </View>
            <View>
              <Text>высота правой стены</Text>
              <Input
                value={heightRight}
                onChangeText={setHeightRight}
                inputModeText={'numeric'}
              />
            </View>
            <View>
              <Text>ширина нижней стены</Text>
              <Input
                value={widthBottom}
                onChangeText={setWidthBottom}
                inputModeText={'numeric'}
              />
            </View>
            <View>
              <Text>высота левой стены</Text>
              <Input
                value={heightLeft}
                onChangeText={setHeightLeft}
                inputModeText={'numeric'}
              />
            </View>
            <View>
              <Text>радиус дуги стены</Text>
              <Input
                value={radiusWall}
                onChangeText={setRadiusWall}
                inputModeText={'numeric'}
              />
            </View>
            <View>
              <Text>градус угла стены</Text>
              <Input
                value={wallAngleDegree}
                onChangeText={setWallAngleDegree}
                inputModeText={'numeric'}
              />
            </View>
            <View style={styles.container}>
              <Text style={styles.label}>Выберите тип угла:</Text>
              <View style={{padding: 20}}>
                <RadioButton.Group
                  onValueChange={newValue => setValueDegree(newValue)}
                  value={valueDegree}>
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
              !heightRight ||
              !widthTop ||
              !heightLeft ||
              !widthBottom ||
              !validateNumber(heightRight) ||
              !validateNumber(heightLeft) ||
              !validateNumber(widthTop) ||
              !validateNumber(widthBottom)
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
