import {Path, TextAnchor, Text as TextSvg} from 'react-native-svg';
import {IPaths} from '../types';

interface ILineSvg {
  d: string;
  stroke: string;
  strokeWidth: number;
  strokeDasharray: string;
  indexLast: number;
  indexPaths: IPaths[];
  midX: number;
  midY: number;
  fontSize: number;
  fillSvg: string;
  fillPath: string;
  textAnchor: TextAnchor;
  isLast: (index: number, paths: IPaths[]) => boolean;
}

export default function LineSvg({
  d,
  stroke,
  strokeWidth,
  strokeDasharray,
  indexLast,
  indexPaths,
  midX,
  midY,
  fontSize,
  fillSvg,
  fillPath,
  textAnchor,
  isLast,
}: ILineSvg) {
  return (
    <>
      <Path
        d={d}
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill={fillPath}
        strokeDasharray={strokeDasharray}
      />

      {/* Вывод длины линии рядом с ней  */}

      {!isLast(indexLast, indexPaths) && (
        <TextSvg
          x={midX}
          y={midY}
          fontSize={fontSize}
          fill={fillSvg}
          textAnchor={textAnchor}>
          {indexLast + 1}
        </TextSvg>
      )}
    </>
  );
}
