import {StyleSheet} from 'react-native';
import MainScreen from '../../screens/MainScreen';
import ObjectApplication from '../../../shared/ObjectApplication/ObjectApplication';
import {ObjectStatus} from '../../../shared/types';
import HeaderScreen from '../../screens/HeaderScreen';
import ButtonLink from '../../../shared/ButtonLink/ButtonLink';
import {useNavigation, useNavigationState} from '@react-navigation/native';

function Main() {
  const navigation = useNavigation();
  const currentRouteName = useNavigationState(
    state => state.routes[state.index].name,
  );
  const arrObjectApplication = [
    {status: ObjectStatus.Created},
    {status: ObjectStatus.Created},
    {status: ObjectStatus.Running},
    {status: ObjectStatus.Completed},
    {status: ObjectStatus.Created},
  ];

  return (
    <HeaderScreen>
      <MainScreen mainTitle="Объекты" path="main" pathLink="Politics">
        {arrObjectApplication.map((item, index) => {
          return <ObjectApplication key={index} status={item.status} />;
        })}
        <ButtonLink
          navigationPath={navigation}
          textBtn="Политика кофиденциальности"
          path={'Policy'}
        />
        <ButtonLink
          navigationPath={navigation}
          textBtn="Развернутый объект"
          path={'UnwrappedProduct'}
        />
      </MainScreen>
    </HeaderScreen>
  );
}

const styles = StyleSheet.create({});

export default Main;
