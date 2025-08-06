import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Svg, {G} from 'react-native-svg';
import {Colors, Fonts} from '../../../shared/tokens';
import {
  DasharrayStrokeValue,
  IDrawingData,
  IPaths,
  IShape,
} from '../../../shared/types';
import LineSvg from '../../../shared/LineSvg/LineSvg';

interface IDrawElement {
  drawing: any;
  onClickLine: (index: number) => void;
  selectedLine?: number | null;
  isStyleLine: boolean;
  openFormDataSize: boolean;
  setStrokeDasharrays: Dispatch<SetStateAction<{[key: number]: string}>>;
  strokeDasharrays?: {[key: number]: string};
  numberWall: number;
  isLast: (index: number, paths: IPaths[]) => boolean;
  setCountWallDraw: (length: number) => void;
}

export default function DrawElement({
  drawing,
  onClickLine,
  selectedLine,
  isStyleLine,
  openFormDataSize,
  setStrokeDasharrays,
  strokeDasharrays,
  numberWall,
  isLast,
}: IDrawElement) {
  const [lineStrokeDasharrays, setLineStrokeDasharrays] = useState(
    DasharrayStrokeValue.Dotted,
  );

  const stateColorLineDraw = (
    selectedLineIndex: number | null | undefined,
    index: number | null,
  ) => (selectedLineIndex === index ? Colors.red : Colors.black);

  // При первом рендере все линии будут пунктирными
  // Обновляем все линии, если данные заполнены
  useEffect(() => {
    if (openFormDataSize && numberWall !== undefined) {
      setStrokeDasharrays(prev => ({
        ...prev,
        [numberWall - 1]: DasharrayStrokeValue.Solid, // Делаем текущую линию пунктирной
      }));
    }
  }, [openFormDataSize, numberWall]);

  return (
    <Pressable style={styles.container}>
      <Svg style={StyleSheet.absoluteFill}>
        {/* Рендер всех линий */}
        {drawing?.shapes?.map((line: IShape, idx: number) => {
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
            <React.Fragment key={idx}>
              <G key={idx} onPressIn={() => onClickLine(idx)}>
                <LineSvg
                  d={line.path}
                  stroke={stateColorLineDraw(selectedLine, idx)}
                  strokeWidth={4}
                  strokeDasharray={
                    strokeDasharrays &&
                    typeof strokeDasharrays[idx] === 'string'
                      ? strokeDasharrays[idx]
                      : !isStyleLine && typeof lineStrokeDasharrays === 'string'
                      ? lineStrokeDasharrays
                      : ''
                  }
                  indexLast={idx}
                  indexPaths={drawing?.shapes}
                  midX={midX}
                  midY={midY - 5}
                  fontSize={Fonts.f14}
                  fillSvg={'blue'}
                  fillPath={'none'}
                  textAnchor={'middle'}
                  isLast={isLast}
                />
              </G>
            </React.Fragment>
          );
        })}
      </Svg>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 300,
    flex: 1,
    borderColor: 'red',
    borderWidth: 3,
  },

  savedDrawing: {
    width: '100%',
    height: 400,
  },
});
