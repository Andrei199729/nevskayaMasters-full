import {StyleSheet} from 'react-native';
import MainScreen from '../../screens/MainScreen';
import HeaderScreen from '../../screens/HeaderScreen';
import ButtonLink from '../../../shared/ButtonLink/ButtonLink';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback, useEffect} from 'react';
import ObjectApplication from '../../../shared/ObjectApplication/ObjectApplication';
import {checkUserAuth} from '../../../services/actions/user';
import {useDispatch, useSelector} from '../../../services/hooks';
import {getApartmentsInitial} from '../../../services/actions/apartment';

function Main() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {apartments} = useSelector(state => state.apartment);

  // const currentRouteName = useNavigationState(
  //   state => state.routes[state.index].name,
  // );
  // const arrObjectApplication = [
  //   {status: ObjectStatus.Created},
  //   {status: ObjectStatus.Created},
  //   {status: ObjectStatus.Running},
  //   {status: ObjectStatus.Completed},
  //   {status: ObjectStatus.Created},
  // ];
  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      dispatch(getApartmentsInitial());
    }, [dispatch]),
  );

  return (
    <HeaderScreen>
      <MainScreen mainTitle="Объекты" path="main" pathLink="Politics">
        {Array.isArray(apartments) &&
          apartments?.map((item: any, index: number) => {
            return <ObjectApplication key={index} item={item} />;
          })}
        <ButtonLink
          navigationPath={navigation}
          textBtn="Политика кофиденциальности"
          path={'Policy'}
        />
      </MainScreen>
    </HeaderScreen>
  );
}

const styles = StyleSheet.create({});

export default Main;
