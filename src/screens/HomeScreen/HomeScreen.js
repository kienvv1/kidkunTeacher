import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  useWindowDimensions
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Sizes} from '../../utils/resource';
import {TouchableCo} from '../../elements';
import {useQuery} from 'react-query';
import {useSelector} from 'react-redux';
import {FetchApi} from '../../../src/utils/modules';
import {Loading} from '../../../src/elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TabView, SceneMap ,TabBar} from 'react-native-tab-view';
import { useNavigation ,useFocusEffect} from '@react-navigation/native';


const HeaderApp = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  
  const [data, setData] = useState(null); // Dữ liệu ban đầu
  const [isLoading, setIsLoading] = useState(true); // Trạng thái loading
 

  const fetchData = async () => {
    try {
      const response = await FetchApi.getCountNotification();
      const newData = response; // Giả sử dữ liệu từ API có thuộc tính _data
      setData(newData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Gọi fetchData khi component được tạo

    const interval = setInterval(() => {
      fetchData(); // Gọi fetchData mỗi 5 giây
    }, 10000);

    // Clear interval khi component unmount
    return () => {
      clearInterval(interval);
    };
  }, []);
 
  if (isLoading) {
    return <Loading />;
  }

  return (
    <View
      style={{
        height: Sizes.device_width < Sizes.device_height ? 50 : 70,
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: 'white',
        marginTop: insets.top,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <TouchableCo
        onPress={() => {
          navigation.toggleDrawer();
        }}>
        <Ionicons name={'menu'} size={33} color={'#0298D3'} />
      </TouchableCo>

      <Image
        style={{width: 50, height: 37, borderColor: 'black'}}
        source={require('../../utils/Images/Background.png')}
      />

      <TouchableCo onPress={() => navigation.navigate('Notifications')}>
        <View style={{position: 'relative'}}>
          <Ionicons name={'notifications'} size={30} color={'#fcca03'} />
          <View
            style={{
              position: 'absolute',
              top: -7,
              right: -7,
              backgroundColor: 'red',
              borderRadius: 10,
              minWidth: 20,
              minHeight: 20,
              justifyContent: 'center', 
              alignItems: 'center',
            }}>
            <Text allowFontScaling={false}style={{color: 'white', fontSize: 12}}>
              {data?._data?.number_notifications_not_read}
            </Text>
            {/* Số lượng thông báo */}
          </View>
        </View>
      </TouchableCo>
    </View>
  );
};

const HomeScreen = ({navigation}) => {
  const layout = useWindowDimensions();
  const [isLoadings, setIsLoading] = useState(false);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Điểm danh đến' },
    { key: 'second', title: 'Điểm danh về' },
  ]);
  const classId = useSelector(state => state?.data?.data);
  useEffect(() => {
    const saveclassId = async () => {
      try {
        if (classId) {
          await AsyncStorage.setItem('classId', classId.toString());
          console.log('Đã lưu mã lớp thành công.');
        } else {
          console.log('Lưu mã lớp thất bại.');
        }
      } catch (error) {
        console.error('Lỗi khi lưu mã lớp:', error);
      }
    };

    saveclassId();
  }, []);
  



  const { data,isLoading, refetch } = useQuery(
    'getAttendance',
    async () => {
      const ID = await AsyncStorage.getItem('classId');
    
    let updateclassID;
    if (ID) {
      updateclassID = ID;
    } else {
      updateclassID = classId;
    }
    const  attendance = FetchApi.getAttendancein(updateclassID);
    return  attendance;
    },
    {
      enabled: true , // Tắt tự động tải dữ liệu ban đầu
    }
  );
  useEffect(() => {
    // console.log('test ádjsafdkjhsjdhsjhf');
    const loadOnFocus = async () => {
      refetch(); // Gọi hàm refetch để tải lại dữ liệu
      refetchout();
    };
  
    const unsubscribe = navigation.addListener('focus', loadOnFocus);
  
    
  }, [navigation]); 

  
  const { data:out, refetch:refetchout } = useQuery(
    'getAttendanceout',
    async () => {
      const ID = await AsyncStorage.getItem('classId');
    
      let updateclassID;
      if (ID) {
        updateclassID = ID;
      } else {
        updateclassID = classId;
      }
      const  attendance = FetchApi.getAttendanceout(updateclassID);
      return  attendance;
    },
    {
      enabled: true , // Tắt tự động tải dữ liệu ban đầu
    }
  );

    if (isLoading ) {
      return <Loading />;
    }
    const FirstRoute = () => {
      const navigation = useNavigation();
      const formatNgayThang =(date)=> {
        const dateObj = new Date(date);
        const day = dateObj.getDate().toString().padStart(2, '0');
        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
        const year = dateObj.getFullYear().toString();
      
        return `${day}-${month}-${year}`;
      }
        return(
          <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
          <View
             style={{
               width: '100%',
               marginTop: 10,
               justifyContent: 'center',
               alignItems: 'center',
             }}>
             <TouchableOpacity
               onPress={() =>{ navigation.navigate('DiemDanhNhanh')}}
               style={styles.button}>
               <View>
                 <Text
                 allowFontScaling={false}
                   style={{color: 'white', fontWeight: '500', fontStyle: 'italic'}}>
                   Điểm danh nhanh
                 </Text>
               </View>
             </TouchableOpacity>
           </View>
           <ScrollView>
           {(data?._data?.data_info || []).map((item, index) => {
            const count = index + 1;
            return (
              <View style={styles.list} key={index}>
                <TouchableOpacity onPress={() => navigation.navigate('DiemDanh',{dataProps: item})}>
              <View
                style={{
                  borderRadius: 10,
                  backgroundColor: 'white',
                  // marginTop: 10,
                  marginHorizontal: 10,
                  padding: 10,
                  borderWidth: 1,
                  shadowColor: '#171717',
                  shadowOffset: {width: -2, height: 4},
                  shadowOpacity: 0.2,
                  shadowRadius: 3,
                  elevation: 11,
                  borderColor: '#0298D3',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  {/* <View style={{flex: 1, flexDirection: 'row'}}>
                    <Icon name="clock-o" size={20} color="#0298D3" />
                    <Text allowFontScaling={false} style={{color: 'black'}}> {item.time_at}</Text>
                  </View> */}
                  
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    height: 'auto',
                    
                  }}>
                  <Image
                    source={{
                      uri: item.avatar_url
                    }}
                    style={styles.image}
                  />
                  <View style={styles.content}>
                    <Text allowFontScaling={false} style={{color: 'black', fontWeight: '500', fontSize:19}}>
                      {count}.{item.first_name} {item.last_name}
                    </Text>
                    <Text allowFontScaling={false}  style={{color: 'gray', fontSize: 15, marginBottom: 5, marginTop:0}}>
                      <Icon name="calendar" size={15} color="#EE4B4B" />
                      <Text allowFontScaling={false}> Ngày sinh: {formatNgayThang(item.birthday)}</Text>
                    </Text>
                    <Text allowFontScaling={false}     style={{color: 'gray', fontSize: 15}}>
                      <Icon name="qrcode" size={16} color="black" />
                      <Text> Mã học sinh: {item.student_code}</Text>
                    </Text>
                  </View>
                  {/* <View
                    style={{
                      flex: 1,
                      backgroundColor: '#0298D3',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 10,
                      marginVertical: 15,
                      borderRadius: 14,
                    }}>
                    <Text allowFontScaling={false}style={{color: 'white', fontWeight: '500'}}>Bé trai</Text>
                  </View> */}
                  
                </View>
                <View
                  style={{
                    paddingHorizontal: 5,
                    paddingVertical: 10,
                    flexDirection: 'row',
                  }}>
                  <View style={{flex: 1}}>
                    {/* <Text allowFontScaling={false}style={{color: 'black', fontSize: 15, fontWeight: '500'}}>
                      Ghi Chú: Bé về quê
                    </Text> */}
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'flex-end',
                      justifyContent: 'flex-end',
                      flexDirection: 'row',
                    }}>
                    <Icon name="check-circle" size={17} color={item.log_code === 'Đi học' || item.log_code === 'Muộn' ? 'green' : '#F5DF12'} />
                    <Text
                    allowFontScaling={false}
                      style={{
                        color: 'black',
                        fontSize: 15,
                        marginLeft: 5,
                      }}>
                      {item.log_code === '' ? 'Chưa đến' : item.log_code  }
                    </Text>
                  </View>
                </View>
              </View>
              </TouchableOpacity>
            </View>
            );
          })} 
          </ScrollView>
       </View>
        )
       
      
  
          };
    
    const SecondRoute = () => {
      const formatNgayThang =(date)=> {
        const dateObj = new Date(date);
        const day = dateObj.getDate().toString().padStart(2, '0');
        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
        const year = dateObj.getFullYear().toString();
      
        return `${day}-${month}-${year}`;
      }
      return(
        <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
        <View
           style={{
             width: '100%',
             marginTop: 10,
             justifyContent: 'center',
             alignItems: 'center',
           }}>
           
         </View>
         <ScrollView>
         {(out?._data?.data_info || []).map((item, index) => {
          const count = index + 1;
          return (
            <View style={styles.list} key={index}>
              <TouchableOpacity onPress={() => navigation.navigate('DiemDanhVe',{dataProps: item})}>
            <View
              style={{
                borderRadius: 10,
                backgroundColor: 'white',
              
                marginHorizontal: 10,
                padding: 10,
                borderWidth: 1,
                shadowColor: '#171717',
                shadowOffset: {width: -2, height: 4},
                shadowOpacity: 0.2,
                shadowRadius: 3,
                elevation: 11,
                borderColor: '#0298D3',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                {/* <View style={{flex: 1, flexDirection: 'row'}}>
                  <Icon  name="clock-o" size={20} color="#0298D3" />
                  <Text allowFontScaling={false} style={{color: 'black'}}> {item.time_at}</Text>
                </View> */}
                
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  height: 'auto',
                  
                }}>
                <Image
                  source={{
                    uri: item.avatar_url
                  }}
                  style={styles.image2}
                />
                <View style={styles.content}>
                  <Text allowFontScaling={false} style={{color: 'black', fontWeight: '500', fontSize:19}}>
                    {count}.{item.first_name} {item.last_name}
                  </Text>
                  <Text allowFontScaling={false}   style={{color: 'gray', fontSize: 15, marginBottom: 5, }}>
                    <Icon name="calendar" size={15} color="#EE4B4B" />
                    <Text allowFontScaling={false}> Ngày sinh: {formatNgayThang(item.birthday)}</Text>
                  </Text>
                  <Text allowFontScaling={false}    style={{color: 'gray', fontSize: 15, marginBottom: 5}}>
                    <Icon name="qrcode" size={16} color="black" />
                    <Text> Mã học sinh: {item.student_code}</Text>
                  </Text>
                  <Text allowFontScaling={false}    style={{color: 'gray', fontSize: 15}}>
                    <Icon name="user" size={16} color="black" />
                    <Text> Người đón: {item.relative_name}</Text>
                  </Text>
                 
                </View>
                {/* <View
                  style={{
                    flex: 1,
                    backgroundColor: '#0298D3',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 10,
                    marginVertical: 15,
                    borderRadius: 14,
                  }}>
                  <Text allowFontScaling={false}style={{color: 'white', fontWeight: '500'}}>Bé trai</Text>
                </View> */}
                
              </View>
             
            </View>
            </TouchableOpacity>
          </View>
          );
        })} 
        </ScrollView>
     </View>
      )
    };
    
    const renderScene = SceneMap({
      first: FirstRoute,
      second: SecondRoute,
    });
  return (
  
    <View style={styles.container}>
      <HeaderApp  navigation={navigation} />

      <View style={styles.date}>
       
        
      </View>
      <View style={styles.count}>
        <View style={styles.items}>
          <Text allowFontScaling={false} style={{color: '#0298D3', fontSize: 16, fontWeight: 600}}>
            {data?._data?.attendance_info?.sl_dihoc}
          </Text>
          <Text allowFontScaling={false}  style={{color: 'black',fontSize: 12}}>Đi học</Text>
        </View>
        <View style={styles.items}>
          <Text allowFontScaling={false}style={{color: '#0298D3', fontSize: 16, fontWeight: 600}}>
          {data?._data?.attendance_info?.sl_cophep}
          </Text>
          <Text allowFontScaling={false}  style={{color: 'black',fontSize: 12}}>Có phép</Text>
        </View>
        <View style={styles.items}>
          <Text allowFontScaling={false}style={{color: '#0298D3', fontSize: 16, fontWeight: 600}}>
          {data?._data?.attendance_info?.sl_muon}
          </Text>
          <Text allowFontScaling={false}  style={{color: 'black',fontSize: 12}}>Muộn</Text>
        </View>
        <View style={styles.items}>
          <Text allowFontScaling={false}style={{color: '#0298D3', fontSize: 16, fontWeight: 600}}>
          {data?._data?.attendance_info?.sl_khongphep}
          </Text>
          <Text allowFontScaling={false}  style={{color: 'black',fontSize: 12}}>Không phép</Text>
        </View>
        <View style={styles.items}>
          <Text allowFontScaling={false}style={{color: '#F0635C', fontSize: 16, fontWeight: 600}}>
          {data?._data?.attendance_info?.number_student}
          </Text>
          <Text allowFontScaling={false}  style={{color: 'black',fontSize: 12,}}>Học sinh</Text>
        </View>
      </View>
      <TabView
       
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width}}
      
      renderTabBar={props => <TabBar {...props}
      renderLabel={({route, color}) => (
        <Text allowFontScaling={false}style={{ color: 'black', borderBottomColor:'#0298D3'}}>
          {route.title}
        </Text>
      )}
      indicatorStyle={{ backgroundColor: '#0298D3' }}
      style={{backgroundColor: 'white'}}/>} 
    />
      
    </View>

  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignContent: 'center',
  },
  info: {
    marginHorizontal: 15,
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    height: 'auto',
    paddingBottom:10
  },
  date: {
    marginVertical: 10,
    marginHorizontal: 7,
    flexDirection: 'row',
  },
  count: {
  
    marginHorizontal: 7,
    flexDirection: 'row',
   
  },
  items: {
    borderWidth: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderRadius: 7,
    borderColor: '#0298D3',
    marginHorizontal: 2,
    height: 'auto',

  },
  button: {
    width: '55%',
    height: 40,
    backgroundColor: '#0298D3',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  list: {
   
    paddingVertical:10,
    marginBottom:0,
    // borderWidth:1,
    justifyContent:'center'
    

    
  },
  image: {
    flex: 0.4,
    height: '90%',
    borderRadius:100,
    borderWidth:0.2,
    marginRight:10,
    marginTop:2
  },
  image2: {
    flex: 0.4,
    height: '70%',
    borderRadius:100,
    borderWidth:0.2,
    marginRight:10,
    marginTop:2
  },
  content: { 
    flex: 2,
  
  },
});

export default HomeScreen;
