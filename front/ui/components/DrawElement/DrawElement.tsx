import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Dimensions, Pressable, StyleSheet} from 'react-native';
import Svg, {G} from 'react-native-svg';
import {Colors, Fonts} from '../../../shared/tokens';
import {
  DasharrayStrokeValue,
  IDrawingData,
  IShape,
} from '../../../shared/types';
import LineSvg from '../../../shared/LineSvg/LineSvg';
import {useDispatch, useSelector} from '../../../services/hooks';
import {
  setCurrentLineDasharrays,
  setSelectedLine,
} from '../../../services/actions/draw';

interface IDrawElement {
  drawing: IDrawingData;
  numberWallIndex: number;
  setCountWallDraw: (length: number) => void;
}

export default function DrawElement({drawing, numberWallIndex}: IDrawElement) {
  const dispatch = useDispatch();
  const {openFormDataSize} = useSelector(state => state.modalOpen);
  const {isStyleLine, selectedLine, strokeDasharrays} = useSelector(
    state => state.draw,
  );

  const stateColorLineDraw = useCallback(
    (index: number | null) =>
      selectedLine === index ? Colors.red : Colors.black,
    [selectedLine],
  );

  const handleSelectLine = useCallback(
    (index: number) => {
      dispatch(setSelectedLine(index));
    },
    [dispatch],
  );
  // При первом рендере все линии будут пунктирными
  // Обновляем все линии, если данные заполнены
  useEffect(() => {
    if (openFormDataSize && numberWallIndex !== undefined) {
      dispatch(
        setCurrentLineDasharrays({
          index: numberWallIndex,
          strockLine: DasharrayStrokeValue.Solid,
        }),
      );
    }
  }, [openFormDataSize, numberWallIndex, dispatch]);

  const renderedLines = useMemo(() => {
    /* Рендер всех линий */
    return drawing?.shapes?.map((line: IShape, idx: number) => {
      const pathParts = line.path.split(' ');
      const startCoords = pathParts[0].slice(1).split(',');
      const endCoords = pathParts[pathParts.length - 1].slice(1).split(',');

      const startX = parseFloat(startCoords[0]);
      const startY = parseFloat(startCoords[1]);
      const endX = parseFloat(endCoords[0]);
      const endY = parseFloat(endCoords[1]);

      // Определяем позицию текста (примерно в середине линии)
      const midX = (startX + endX) / 2;
      const midY = (startY + endY) / 2;

      return (
        <G key={idx} onPressIn={() => handleSelectLine(idx)}>
          <LineSvg
            d={line.path}
            stroke={stateColorLineDraw(idx)}
            strokeWidth={4}
            strokeDasharray={
              // strokeDasharrays && typeof strokeDasharrays[idx] === 'string'
              //   ? strokeDasharrays[idx]
              //   : isStyleLine && typeof DasharrayStrokeValue.Dotted === 'string'
              //   ? DasharrayStrokeValue.Dotted
              //   : ''
              strokeDasharrays?.[idx] ??
              (isStyleLine ? DasharrayStrokeValue.Dotted : '')
            }
            indexLast={idx}
            indexPaths={drawing?.shapes}
            midX={midX - 10}
            midY={midY - 5}
            fontSize={Fonts.f14}
            fillSvg={'blue'}
            fillPath={'none'}
            textAnchor={'middle'}
          />
        </G>
      );
    });
  }, [
    drawing?.shapes,
    stateColorLineDraw,
    strokeDasharrays,
    isStyleLine,
    handleSelectLine,
  ]);

  return (
    <Pressable style={styles.container}>
      <Svg style={{flex: 1}}>{renderedLines}</Svg>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 400,
    flex: 1,
    borderColor: Colors.red,
    borderWidth: 3,
  },
});
