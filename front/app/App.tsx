import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import * as Keychain from 'react-native-keychain';
import Navigate from './Navigate';
import {ButtonProvider} from '../shared/ButtonContext/ButtonContext';
import {IndexWallProvider} from '../context/IndexWallContext/IndexWallContext';
import {useNavigation} from '@react-navigation/native';
import auth from '../utils/auth';
function App(): React.JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // useEffect(() => {
  //   async function checkToken() {
  //     try {
  //       const credentials = await Keychain.getGenericPassword();
  //       if (credentials) {
  //         // Токен найден — пользователь авторизован
  //         setIsAuthenticated(true);
  //       } else {
  //         // Нет токена — показываем экран входа
  //         setIsAuthenticated(false);
  //         // auth.examinationValidationToken();
  //       }
  //     } catch (err) {
  //       setIsAuthenticated(false);
  //     }
  //   }
  //   checkToken();
  // }, []);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkToken() {
      try {
        // 1. Получаем сохранённые данные (логин и пароль/токен)
        const credentials = await Keychain.getGenericPassword();

        if (credentials) {
          const token = credentials.password;

          // 2. Отправляем токен на сервер для проверки
          const response = await auth.examinationValidationToken(token);

          if (response) {
            // Токен валиден, ставим пользователя авторизованным
            setIsAuthenticated(true);
          } else {
            // Токен не валиден, удаляем из хранилища
            await Keychain.resetGenericPassword();
            setIsAuthenticated(false);
          }
        } else {
          // Токена нет — не авторизован
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.log('Ошибка проверки токена:', err);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }

    checkToken();
  }, []);

  return (
    <IndexWallProvider>
      <SafeAreaView style={styles.container}>
        <ButtonProvider>
          <Navigate isAuthenticated={isAuthenticated} />
        </ButtonProvider>
      </SafeAreaView>
    </IndexWallProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default App;
