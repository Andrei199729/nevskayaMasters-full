import {StyleSheet, Text} from 'react-native';
import React from 'react';
import HeaderScreen from '../../screens/HeaderScreen';
import MainScreen from '../../screens/MainScreen';
import {Colors, Fonts} from '../../../shared/tokens';

export default function PrivacyPolicy() {
  return (
    <HeaderScreen>
      <MainScreen mainTitle="Политика кофиденциальности" pathLink="Policy">
        <Text style={styles.textPolicy}>
          Но современная методология разработки, а также свежий взгляд на
          привычные вещи — безусловно открывает новые горизонты для позиций,
          занимаемых участниками в отношении поставленных задач #изделие
          #изделие.2
        </Text>
        <Text style={styles.textPolicy}>
          Но современная методология разработки, а также свежий взгляд на
          привычные вещи — безусловно открывает новые горизонты для позиций,
          занимаемых участниками в отношении поставленных задач #изделие
          #изделие.2
        </Text>
        <Text style={styles.textPolicy}>
          Но современная методология разработки, а также свежий взгляд на
          привычные вещи — безусловно открывает новые горизонты для позиций,
          занимаемых участниками в отношении поставленных задач #изделие
          #изделие.2
        </Text>
        <Text style={styles.textPolicy}>
          Но современная методология разработки, а также свежий взгляд на
          привычные вещи — безусловно открывает новые горизонты для позиций,
          занимаемых участниками в отношении поставленных задач #изделие
          #изделие.2
        </Text>
      </MainScreen>
    </HeaderScreen>
  );
}

const styles = StyleSheet.create({
  textPolicy: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.f12,
    color: Colors.black,
  },
});
