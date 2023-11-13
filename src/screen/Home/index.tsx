import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  NativeSyntheticEvent,
  Image,
  NativeScrollEvent,
   RefreshControl,
} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {AppTheme, useTheme} from '../../themes';
import {Text} from '../../component/text';
import {RootState} from '../../store';
import {NewsHome, appActions} from '../../store/appReducer';
import {apiOnGetData} from '../../api';
// import { FlatList } from 'react-native-reanimated/lib/typescript/Animated';

type Props = {};

const HomeScreen = (props: Props) => {
  const theme = useTheme();
  const styles = rootStyles(theme);
  const profile = useSelector<RootState, any>(
    state => state.appReducer?.profile,
  );
  const data = useSelector<RootState, NewsHome[]>(
    state => state.appReducer?.dataHome as any,
  );
  const dispatch = useDispatch();
  const page = React.useRef<number>(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const [dataHome,setDataHome] = React.useState<NewsHome[]>(data)
  const flatListRef = React.useRef<FlatList>(null)
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  React.useEffect(() => {
    const onGetData = async () => {
      const res = await apiOnGetData(page.current);
      dispatch(appActions.onSetData(res.news));
    };
    onGetData();
  }, [refreshing]);

  const onLoadingMore = React.useCallback(async () => {
    const res = await apiOnGetData(page.current + 1);
    setDataHome(prevData => prevData.concat(res.news));
    
    // dispatch(appActions.onSetData([...res.news]));
  }, [data]);

  const renderHome = React.useCallback(
    (item: NewsHome) => {
      return (
        <TouchableOpacity style={styles.cardStyle}>
          <View style={{justifyContent: 'center', alignContent: 'center'}}>
            <Image
              source={{uri: item.cover}}
              style={styles.imageCardStyle}
              resizeMode="cover"
            />
          </View>
          <View style={{marginTop: 20, marginHorizontal: 10}}>
            <Text fontWeight="bold" fontSize={16} color="#000">
              {item.title}
            </Text>
            <Text
              // fontWeight="bold"
              fontSize={12}
              numberOfLines={2}
              color="#000">
              {item.description}
            </Text>
          </View>
        </TouchableOpacity>
      );
    },
    [data,refreshing],
  );





 

  return (
    <View style={styles.root}>
      <View style={styles.contentHeader}>
        <Text color="#000">Xin chào, Khách </Text>
        {Object.keys(profile)?.length > 0 ? (
          <Text color="#000">{profile?.name}</Text>
        ) : (
          <TouchableOpacity
            onPress={() => dispatch(appActions.onSetLoginToken(null))}
            style={{
              backgroundColor: 'black',
              width: 140,
            }}>
            <Text color="black">Đăng nhập</Text>
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={dataHome}
        keyExtractor={(item: any, index: number) => index.toString()}
        renderItem={({item}: {item: NewsHome}) => renderHome(item)}
        decelerationRate={'fast'}
        initialNumToRender={3}
        // onMomentumScrollEnd={onScrollEnd}
        onEndReached={onLoadingMore}
        onEndReachedThreshold={0.1}
          ref={flatListRef}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default React.memo(HomeScreen);

const rootStyles = (theme: AppTheme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    contentHeader: {
      // backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: 20,
      marginBottom: 20,
    },
    cardStyle: {
      height: 300,
      backgroundColor: 'white',
      marginHorizontal: 20,
      marginVertical: 20,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.32,
      shadowRadius: 5.46,

      elevation: 9,
    },
    imageCardStyle: {
      width: '100%',
      height: 200,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
  });
