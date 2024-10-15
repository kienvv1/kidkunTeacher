import React from 'react';
import {View, Text, Button, Image, StyleSheet, SafeAreaView} from 'react-native';
import 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {setData} from './actions/dataActions';
import AppIntro from './screens/AppIntro/AppIntro';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Loading, TouchableCo} from './elements';
import {Sizes} from './utils/resource';
import {navigationRef} from './utils/modules';
import Login from './screens/Login/login';
import MainNavigator from './navigators/MainNavigator';
import { ResetFunction } from './utils/modules';
import { FetchApi } from './utils/modules';
import ChooseClass from './screens/ChooseClass/ChooseClass';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const MenuFunctionItem = ({data}) => {
  return (
    <TouchableCo onPress={data.onPress}>
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: Sizes.padding * 1.2,
          marginHorizontal: Sizes.padding,
          borderBottomColor: 'gray',
          borderBottomWidth: StyleSheet.hairlineWidth,
          justifyContent: 'space-between',
        }}>
        <Text allowFontScaling={false}style={{fontSize: Sizes.h4, color: 'black'}}>{data.label}</Text>
        <Ionicons color={'black'} name={'arrow-forward'} size={20} />
      </View>
    </TouchableCo>
  );
};
const MenuFunction = () => {
  // const navigation = useNavigation();
  const menuList = [
    {
      label: 'Chọn lớp',
      onPress: () => ResetFunction.resetToChooseClass(),
    },
    // {
    //   label: 'Danh sách học sinh',
    //   onPress: () => ResetFunction.resetToDsHocSinh(),
    // },
    {
      label: 'Đăng xuất',
      onPress: () => {
        try {
          FetchApi.logout();
          ResetFunction.resetToLogin();
        } catch (error) {}
      },
    },
  ];

  return (
    <SafeAreaView>
    <View>
      {menuList.map(item => {
        return <MenuFunctionItem data={item} key={item.label} />;
      })}
    </View>
    </SafeAreaView>
  );
};
const menu2 = ({navigation}) => {
  return <MenuFunction />;
};
const SlideDraw = ({route}) => {
  const data = route?.params?.dataprops;
  const dispatch = useDispatch();
  dispatch(setData(data));
  return (
    <Drawer.Navigator
      drawerType={'back'}
      drawerContent={menu2}
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen name="Mains" component={MainStack} />
    </Drawer.Navigator>
  );
};

const MainStack = ({navigation, route}) => {
  // const [isShow, setIsShow] = useState(true);
  // useEffect(() => {
  //   if (NavigationService.getCurrentRoute() === 'Gift') {
  //     setIsShow(false);
  //   } else {
  //     if (!isShow) {
  //       setIsShow(true);
  //     }
  //   }
  // }, [route]);

  return (
    <View style={{flex: 1}}>
      {/* {<HeaderApp navigation={navigation} />} */}

      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Main" component={MainNavigator} />
        {/* <Stack.Screen name="Web" component={MainNavigator} /> */}
      </Stack.Navigator>
    </View>
  );
};
const AppContent = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="AppIntro" component={AppIntro} />
        <Stack.Screen name="Login" component={Login} />
         <Stack.Screen name="ChooseClass" component={ChooseClass} />
        <Stack.Screen name="SlideDraw" component={SlideDraw} />
        
  
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppContent;
