import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Animated, Pressable} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {Colors, Radius, Fonts} from '../tokens';
import CalendarIcon from '../../assets/images/icon/iconFunc/CalendarIcon';

export default function CalendarPopup({...props}) {
  const [showCalendar, setShowCalendar] = useState(false); // Состояние для управления видимостью календаря
  const [selectedDate, setSelectedDate] = useState<string>(''); // Состояние для выбранной даты

  // Обработчик нажатия кнопки
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar); // Переключение видимости календаря
  };

  // Обработка выбора дня в календаре
  const onDayPress = (day: {dateString: string}) => {
    setSelectedDate(day.dateString);
    setShowCalendar(false); // Закрытие календаря после выбора даты
  };

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setSelectedDate(formattedDate);
  }, []);

  return (
    <View>
      <Pressable {...props} onPress={toggleCalendar}>
        <View style={styles.container}>
          <Text style={styles.calendar}>{selectedDate}</Text>
          <Animated.View style={styles.calendarIcon}>
            <CalendarIcon />
          </Animated.View>
        </View>
      </Pressable>

      {showCalendar && (
        <View style={styles.calendarContainer}>
          <Calendar
            onDayPress={onDayPress} // Обработка выбора даты
            markedDates={{
              [selectedDate]: {
                selected: true,
                marked: true,
                selectedColor: 'blue',
              },
            }}
            style={styles.calendarComponent}
            theme={{
              selectedDayBackgroundColor: 'blue',
              todayTextColor: 'red',
              arrowColor: 'orange',
              monthTextColor: 'black',
              textMonthFontWeight: 'bold',
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  calendar: {
    maxWidth: '100%',
    width: '100%',
    height: 48,
    paddingVertical: 16,
    paddingHorizontal: 18,
    backgroundColor: Colors.almostWhite,
    color: Colors.black,
    borderRadius: Radius.r8,
    fontSize: Fonts.f14,
    fontFamily: Fonts.regular,
  },
  calendarContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 10,
  },

  calendarComponent: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 10,
    padding: 10,
  },
  calendarIcon: {
    position: 'absolute',
    right: 19,
    top: 15,
  },
});
