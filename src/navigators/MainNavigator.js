import * as React from 'react';
import 'react-native-gesture-handler';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
 import MaterialIcon from'react-native-vector-icons/MaterialIcons';

import {View, StyleSheet,Text} from 'react-native';
import AllStackNavigator from './AllStackNavigation';

const MainNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <View style={styles.container}>
      <Tab.Navigator
        initialRouteName="TabHome"
        screenOptions={({route}) => ({
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            // backgroundColor: '#9DD646',
          
            height: 85,
            // position: 'relative',
          },
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let iconLibrary;

            if (route.name === 'TabHome') {
              iconName = focused ? 'home-sharp' : 'home-outline';
              iconLibrary = 'Ionicons';
            } else if (route.name === 'TabDon') {
              iconName = focused ? 'document-text' : 'document-text-outline';
              iconLibrary = 'Ionicons';
            } else if (route.name === 'TabNhanXet') {
              iconName = focused ? 'create' : 'create-outline';
              iconLibrary = 'Ionicons';
            } else if (route.name === 'TabLoiNhan') {
              iconName = focused ? 'restaurant' : 'restaurant-outline';
              iconLibrary = 'AntDesign';
            } else if (route.name === 'TabAlbum') {
              iconName = focused ? 'images' : 'images-outline';
              iconLibrary = 'Ionicons';
            }

            // You can return any component that you like here!
            // return (
            //   <>
            //     {iconLibrary === 'Ionicons' && (
            //       <Ionicons name={iconName} size={35} color={color} />
            //     )}
                
            //     {iconLibrary === 'MaterialIcon' && (
            //       <MaterialIcon name={iconName} size={35} color={color} />
            //     )}
            //   </>
            // );
          },
          tabBarActiveTintColor: '#0298D3',
          tabBarInactiveTintColor: '#0298D3',
        })}>
        {/* <Tab.Screen name="Đơn" component={HoatDong} /> */}

        <Tab.Screen
          name="TabHome"
          component={AllStackNavigator}
          options={({ route }) => ({
            tabBarLabel: ({focused, color, size}) => {
            
            let iconName;
            let iconLibrary;

            if (route.name === 'TabHome') {
              iconName = focused ? 'home-sharp' : 'home-outline';
              iconLibrary = 'Ionicons';
            } else if (route.name === 'TabDon') {
              iconName = focused ? 'document-text' : 'document-text-outline';
              iconLibrary = 'Ionicons';
            } else if (route.name === 'TabNhanXet') {
              iconName = focused ? 'create' : 'create-outline';
              iconLibrary = 'Ionicons';
            } else if (route.name === 'TabLoiNhan') {
              iconName = focused ? 'restaurant' : 'restaurant-outline';
              iconLibrary = 'AntDesign';
            } else if (route.name === 'TabAlbum') {
              iconName = focused ? 'images' : 'images-outline';
              iconLibrary = 'Ionicons';
            }
            return(
              <View style={{alignItems:'center'}}>
              <Ionicons name={iconName} size={35} color={color} />
              <Text allowFontScaling={false} style={{ fontSize: 12, color: 'black' }}>
              Trang chủ
            </Text>
            </View>
             
            )
          }
          })}
          initialParams={{
            initialRouteName: 'Home',
          }}
        />
        <Tab.Screen
          name="TabDon"
          component={AllStackNavigator}
          options={({ route }) => ({
            tabBarLabel: ({focused, color, size}) => {
            
              let iconName;
              let iconLibrary;
  
              if (route.name === 'TabHome') {
                iconName = focused ? 'home-sharp' : 'home-outline';
                iconLibrary = 'Ionicons';
              } else if (route.name === 'TabDon') {
                iconName = focused ? 'document-text' : 'document-text-outline';
                iconLibrary = 'Ionicons';
              } else if (route.name === 'TabNhanXet') {
                iconName = focused ? 'create' : 'create-outline';
                iconLibrary = 'Ionicons';
              } else if (route.name === 'TabLoiNhan') {
                iconName = focused ? 'restaurant' : 'restaurant-outline';
                iconLibrary = 'AntDesign';
              } else if (route.name === 'TabAlbum') {
                iconName = focused ? 'images' : 'images-outline';
                iconLibrary = 'Ionicons';
              }
              return(
                <View style={{alignItems:'center'}}>
                <Ionicons name={iconName} size={35} color={color} />
                <Text allowFontScaling={false} style={{ fontSize: 12, color: 'black' }}>
                Đơn
              </Text>
              </View>
               
              )
            }
          })}
          initialParams={{
            initialRouteName: 'QuanLyDon',
          }}
        />

        <Tab.Screen
          name="TabNhanXet"
          component={AllStackNavigator}
          options={({ route }) => ({
            tabBarLabel: ({focused, color, size}) => {
            
              let iconName;
              let iconLibrary;
  
              if (route.name === 'TabHome') {
                iconName = focused ? 'home-sharp' : 'home-outline';
                iconLibrary = 'Ionicons';
              } else if (route.name === 'TabDon') {
                iconName = focused ? 'document-text' : 'document-text-outline';
                iconLibrary = 'Ionicons';
              } else if (route.name === 'TabNhanXet') {
                iconName = focused ? 'create' : 'create-outline';
                iconLibrary = 'Ionicons';
              } else if (route.name === 'TabLoiNhan') {
                iconName = focused ? 'restaurant' : 'restaurant-outline';
                iconLibrary = 'AntDesign';
              } else if (route.name === 'TabAlbum') {
                iconName = focused ? 'images' : 'images-outline';
                iconLibrary = 'Ionicons';
              }
              return(
                <View style={{alignItems:'center'}}>
                <Ionicons name={iconName} size={35} color={color} />
                <Text allowFontScaling={false} style={{ fontSize: 12, color: 'black' }}>
                Nhận xét
              </Text>
              </View>
               
              )
            }
          })}
          initialParams={{
            initialRouteName: 'NhanXetHN',
          }}
        />
       
         <Tab.Screen
          name="TabAlbum"
          component={AllStackNavigator}
          options={({ route }) => ({
          
            tabBarLabel: ({focused, color, size}) => {
            
              let iconName;
              let iconLibrary;
  
              if (route.name === 'TabHome') {
                iconName = focused ? 'home-sharp' : 'home-outline';
                iconLibrary = 'Ionicons';
              } else if (route.name === 'TabDon') {
                iconName = focused ? 'document-text' : 'document-text-outline';
                iconLibrary = 'Ionicons';
              } else if (route.name === 'TabNhanXet') {
                iconName = focused ? 'create' : 'create-outline';
                iconLibrary = 'Ionicons';
              } else if (route.name === 'TabLoiNhan') {
                iconName = focused ? 'restaurant' : 'restaurant-outline';
                iconLibrary = 'AntDesign';
              } else if (route.name === 'TabAlbum') {
                iconName = focused ? 'images' : 'images-outline';
                iconLibrary = 'Ionicons';
              }
              return(
                <View style={{alignItems:'center'}}>
                <Ionicons name={iconName} size={35} color={color} />
                <Text allowFontScaling={false} style={{ fontSize: 12, color: 'black' }}>
                Album
              </Text>
              </View>
               
              )
            }
          })}
          initialParams={{
            initialRouteName: 'Albums',
          }}
        />
        {/* <Tab.Screen
        name="TabAlbum"
        component={AllStackNavigator}
        options={{
          tabBarLabel: 'TabAlbum',
          tabBarLabelStyle: {color: 'black', fontSize: 11,flex:0.3},
        }}
        initialParams={{
          initialRouteName: 'Albums',
        }}
      /> */}
      </Tab.Navigator>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  floatingAction: {
    position: 'absolute',
    zIndex: 999,
    top: 100,
  },
});
export default MainNavigator;
