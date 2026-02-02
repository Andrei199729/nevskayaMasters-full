import MainScreen from '../../screens/MainScreen';
import HeaderScreen from '../../screens/HeaderScreen';
import ButtonLink from '../../../shared/ButtonLink/ButtonLink';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import ObjectApplication from '../../../shared/ObjectApplication/ObjectApplication';
import {checkUserAuth} from '../../../services/actions/user';
import {useDispatch, useSelector} from '../../../services/hooks';
import {getApartmentsInitial} from '../../../services/actions/apartment';
import {IApartments, RootStackParamList} from '../../../shared/types';
import Loader from '../Loader/Loader';
import {InteractionManager} from 'react-native';
function Main() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(true);
  const {apartments, loading: loadingApartments} = useSelector(
    state => state.apartment,
  );
  const {userData, loading: loadingUser} = useSelector(state => state.user);
  const userId = userData?.data?._id;

  const myApartments = Array.isArray(apartments)
    ? apartments.filter(a => a.owner === userId)
    : [];

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

  // держим loader до полной загрузки данных

  useFocusEffect(
    useCallback(() => {
      dispatch(getApartmentsInitial());
    }, [dispatch]),
  );

  useEffect(() => {
    if (loadingApartments) {
      setShowLoader(true);
    } else {
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [loadingApartments]);

  if (showLoader) return <Loader />;

  return (
    <HeaderScreen>
      <MainScreen mainTitle="Объекты" path="main" pathLink="Politics">
        {Array.isArray(myApartments) &&
          myApartments?.map((item: IApartments, index: number) => {
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

export default Main;
