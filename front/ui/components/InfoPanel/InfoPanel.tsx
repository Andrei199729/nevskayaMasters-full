import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from '../../../services/hooks';
import {useMemo, useState} from 'react';

const InfoPanel = () => {
  // Хранит углы между линиями для отображения дополнительной информации.
  const [angles, setAngles] = useState<number[]>([]); // Массив углов между линиями
  const {paths, points} = useSelector(state => state.room);
  const renderInfoLines = useMemo(() => {
    return paths.map((line, index) => (
      <View key={index}>
        <Text>
          Линия {index + 1}: Длина = {line.length.toFixed(2)} единиц
        </Text>
        {index > 0 &&
          points[index - 1] &&
          points[index] &&
          angles[index - 1] !== undefined && (
            <Text>
              Угол с предыдущей линией ={' '}
              {angles[index - 1] ? angles[index - 1].toFixed(2) : 'N/A'}°
            </Text>
          )}
      </View>
    ));
  }, [paths, points, angles]);
  return <View style={styles.infoContainer}>{renderInfoLines}</View>;
};

const styles = StyleSheet.create({
  infoContainer: {
    marginTop: 20,
  },
});

export default InfoPanel;
