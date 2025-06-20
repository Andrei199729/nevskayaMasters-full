import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import * as Keychain from 'react-native-keychain';
import Navigate from './Navigate';
import {ButtonProvider} from '../shared/ButtonContext/ButtonContext';
import {IndexWallProvider} from '../context/IndexWallContext/IndexWallContext';
import {useNavigation} from '@react-navigation/native';
import auth from '../utils/auth';
import api from '../utils/api';
function App(): React.JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState([]);
  const [products, setProducts] = useState([]);

  const [email, setEmail] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkToken() {
      try {
        const credentials = await Keychain.getGenericPassword();

        if (credentials) {
          const token = credentials.password;

          // Проверка токена
          const response = await auth.examinationValidationToken(token);

          if (response) {
            setIsAuthenticated(true);
            setEmail(response.data.email);

            // Обновляем заголовок токена в api-клиенте
            api.setToken(token);

            // Только теперь получаем данные
            const [user, product] = await Promise.all([
              api.getAboutUser(),
              api.getInitialProducts(),
            ]);

            setCurrentUser(user);
            setProducts(product);
            // console.log(user, '✅ currentUser');
            // console.log(product, '✅ productsApi');
          } else {
            await Keychain.resetGenericPassword();
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.log('❌ Ошибка проверки токена:', err);
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
          <Navigate
            isAuthenticated={isAuthenticated}
            setEmail={setEmail}
            products={products}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            setProducts={setProducts}
          />
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
