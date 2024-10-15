import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import DiemDanh from '../screens/DiemDanh/DiemDanh';
import DiemDanhVe from '../screens/DiemDanhVe/DiemDanhVe';

import DsHocSinh from '../screens/DsHocSinh/DsHocSinh';
import QuanLyDon from '../screens/QuanLyDon/QuanLyDon';
import Albums from '../screens/Albums/Albums';
import CreateAlbum from '../screens/CreateAlbum/CreateAlbum';
import NhanXetTT from '../screens/NhanXetTT/NhanXetTT';
import NhanXetHN from '../screens/NhanXetHN/NhanXetHN';
import TestScreen from '../screens/TestScreen/TestScreen';
import DiemDanhNhanh from '../screens/DiemDanhNhanh/DiemDanhNhanh';
import Notification from '../screens/Notification/Notification';
import NotificationDetail from '../screens/NotificationDetail/NotificationDetail';
import ChiTietNXTT from '../screens/ChiTietNXTT/ChiTietNXTT';
import ChiTietNXHN from '../screens/ChiTietNXHN/ChiTietNXHN';
import CreateNXTT from '../screens/CreateNXTT/CreateNXTT';
import EditAlbum from '../screens/EditAlbum/EditAlbum';

const Stack = createStackNavigator();
const AllStackNavigator = ({navigation, route}) => {
  const {initialRouteName} = route.params;
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={initialRouteName}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="DiemDanh" component={DiemDanh} />
      <Stack.Screen name="DiemDanhVe" component={DiemDanhVe} />

      <Stack.Screen name="DsHocSinh" component={DsHocSinh} />
      <Stack.Screen name="QuanLyDon" component={QuanLyDon} />
      <Stack.Screen name="Albums" component={Albums} />
      <Stack.Screen name="CreateAlbum" component={CreateAlbum} />
       <Stack.Screen name="NhanXetTT" component={NhanXetTT} />
       <Stack.Screen name="NhanXetHN" component={NhanXetHN} />
       <Stack.Screen name="TestScreen" component={TestScreen} />
       <Stack.Screen name="DiemDanhNhanh" component={DiemDanhNhanh} />
       <Stack.Screen name="Notifications" component={Notification} />
       <Stack.Screen name="Notification" component={NotificationDetail} />
       <Stack.Screen name="ChiTietNXTT" component={ChiTietNXTT} />
       <Stack.Screen name="ChiTietNXHN" component={ChiTietNXHN} />
       <Stack.Screen name="CreateNXTT" component={CreateNXTT} />
       <Stack.Screen name="EditAlbum" component={EditAlbum} />
    </Stack.Navigator>
  );
};
export default AllStackNavigator;
