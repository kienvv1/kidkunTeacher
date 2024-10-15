import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, TextInput, ScrollView, useWindowDimensions,Alert} from 'react-native';
import {Sizes} from '../../utils/resource';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcon from'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TabView, SceneMap ,TabBar} from 'react-native-tab-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useQuery} from 'react-query';
import {useSelector} from 'react-redux';
import {Loading} from '../../../src/elements';
import { FetchApi } from '../../utils/modules';
import SelectDropdown from 'react-native-select-dropdown'
import { useToast} from "react-native-toast-notifications";

const QuanLyDon = ({navigation}) => {
  const [choose, setChoose] = useState(0);
  const toast = useToast();
  const classId = useSelector(state => state?.data?.data);
  const layout = useWindowDimensions();
  const[comfirm,setComfirm] = useState(0);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Xin  nghỉ' },
    { key: 'second', title: 'Lời nhắn' },
  ]);


 

  const {data, isLoading, refetch } = useQuery(
    'getOffTeacher',
    async () => {
      const  OffTeacher = FetchApi.getOffTeacher();
      return OffTeacher;
    },
    {
      enabled: true , // Tắt tự động tải dữ liệu ban đầu
    }
  );
  const {data:cd, refetch:refetchcd } = useQuery(
    'getOffTeachercd',
    async () => {
      const  OffTeachercd = FetchApi.getOffTeachercd();
      return OffTeachercd;
    },
    {
      enabled: true , // Tắt tự động tải dữ liệu ban đầu
    }
  );
  const {data:adviceCate} = useQuery(['getadviceCate'], () => FetchApi.getAdviceTeacherCate());


  const firstValue = (adviceCate?._data || [])[0];
  useEffect(() => {
    if (firstValue) {
      setChoose(firstValue.category_id);
    }
  }, [firstValue]);
 
  const {data:advice,refetch:refetchadvice } = useQuery(['getAdvice', choose], async () => {
    const ID = await AsyncStorage.getItem('classId');
    
    let updateclassID;
    if (ID) {
      updateclassID = ID;
    } else {
      updateclassID = classId;
    }
    const  attendance = FetchApi.getListAdviceTeacher(choose,updateclassID);
    return  attendance;
  });
  
  const {data:advicecd,refetch:refetchadvicecd } = useQuery(['getAdvicecd', choose], async () => {
    const ID = await AsyncStorage.getItem('classId');
    
    let updateclassID;
    if (ID) {
      updateclassID = ID;
    } else {
      updateclassID = classId;
    }
    const  attendance = FetchApi.getListAdviceTeachercd(choose,updateclassID);
    return  attendance;
  });
  useEffect(() => {
    const loadOnFocus = async () => {
      refetch(); // Gọi hàm refetch để tải lại dữ liệu
      refetchcd();
      refetchadvice();
      refetchadvicecd();
    };
  
    const unsubscribe = navigation.addListener('focus', loadOnFocus);
  
    
  }, [navigation]); 
    if (isLoading) {
      return <Loading />;
    }
 
    const onSubmit = async (id) => {
      
        try {
         
          console.log('test put:', id);
          
          const result = await FetchApi.putOffTeacher(id);
          if (result._msg_code == 1) {
            
            toast.show("xác nhận thành công",{
              type: "success",
              placement: "bottom",
              duration: 4000,
              offset: 30,
              animationType: "zoom-in",
            });
            refetchcd();
            refetch();
            
          } else {
            toast.show("Xác nhận thất bại",{
              type: "danger",
              placement: "bottom",
              duration: 4000,
              offset: 30,
              animationType: "zoom-in",
            });
          }
        } catch (err) {
          console.log('err', err);
        }
      };
      const onSubmit2 = async (id) => {
      
        try {
         
          console.log('test put:', id);
          
          const result = await FetchApi.putTeacherAdvice(id);
          if (result._msg_code == 1) {
            navigation.navigate('QuanLyDon');
            Alert.alert('Xác nhận thành công'); 
            refetchadvice();
            refetchadvicecd();
            
          } else {
            Alert.alert('Xác nhận thất bại!');
          }
        } catch (err) {
          console.log('err', err);
        }
      };

      
    
  
  const FirstRoute = () => {
  
      
      return(
        <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
         
      {/* <View style={{
          paddingLeft:10,
          flexDirection:'row',
         
          }}>
                  <Ionicons name={'calendar-sharp'} size={20} color={'#0298D3'} />
            <Text allowFontScaling={false}style={{ fontSize:15,width:'60%', fontWeight:600}}>Bạn đang xem đơn từ ngày 11/09/2023 tới tương lai </Text>
        </View>
      <View style={styles.input}>
      <Ionicons name={'search-outline'} size={25} color={'black'} />

        <TextInput

          placeholder="tìm kiếm"
          
        />
        
      </View> */}
      {/* <View style={{
          paddingLeft:10,
          flexDirection:'row',
         
          }}>
        <MaterialIcon
              name="school"
              size={30}
              color="black"
              
            />
            <Text allowFontScaling={false}style={{marginTop:5, marginLeft:5,color:'black', fontSize:15, fontWeight:600}}>Lớp: {data?._data?.class_name}</Text>
        </View> */}
        {/* <View style={{
          paddingLeft:10,
          flexDirection:'row',
         
          }}>
        <MaterialIcon
              name="people"
              size={30}
              color="black"
              
            />
            <Text allowFontScaling={false}style={{marginTop:5, marginLeft:5, fontSize:15, fontWeight:600}}>Số học sinh: 10</Text>
        </View> */}
        <ScrollView>
        {(cd?._data?.data_info || []).map((item, index) => {
            const handleConfirmation = () => {
              const id = item.id; // Trích xuất giá trị id từ item
              onSubmit(id); // Gọi hàm onSubmit với giá trị id
            }
            return (
              <View style={styles.list} key={index}>
              <View
                style={{
                  borderRadius: 10,
                  backgroundColor: 'white',
                  marginTop: 10,
                  marginHorizontal: 10,
                  padding: 5,
                  
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
                    height: 'auto',
                 
                  }}>
                  <Image
                    source={{uri: item.avatar_relative}}
                    style={styles.image}
                  />
                  <View style={styles.content}>
                    <Text allowFontScaling={false}style={{color: 'black', fontWeight: '500'}}>
                      {item.student_name}
                    </Text>
                    <Text allowFontScaling={false}style={{color: 'black', fontSize: 12, marginBottom: 5}}>
                      <Icon name="calendar" size={15} color="#0298D3" />
                      <Text>  Từ ngày {item.from_date} đến {item.to_date}</Text>
                    </Text>
                   
                  </View>
                  
                </View>
                  <View style={{ marginHorizontal:10, borderRadius:10, backgroundColor:'#F4F4F4',
                  paddingLeft:10, 
                  paddingVertical:10
                }}>
                    <Text allowFontScaling={false}style={{color:'black'}}>{item.description} </Text>
                  </View>
                  <View style={{ flexDirection:'row'}}>
                <View style={{flex:1, paddingLeft:12, paddingTop:5}}>
                  <Text allowFontScaling={false}style={{color:'red'}}>chưa xác nhận </Text>
                </View>
                <TouchableOpacity   onPress={handleConfirmation} style={{flex:0.6,marginVertical:5,paddingVertical:10, backgroundColor:'#0298D3',borderRadius:10, alignItems:'center', justifyContent:'center'}}>
                <View >
                  
                <Text style={{color:'white'}} allowFontScaling={false}>Xác nhận</Text>
               
                </View>
                </TouchableOpacity>
              </View>
              </View>
            </View>
            );
          })} 
        {(data?._data?.data_info || []).map((item, index) => {
            
            return (
              <View style={styles.list} key={index}>
              <View
                style={{
                  borderRadius: 10,
                  backgroundColor: 'white',
                  marginTop: 10,
                  marginHorizontal: 10,
                  padding: 5,
                  
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
                    height: 'auto',
                 
                  }}>
                  <Image
                    source={{
                      uri: item?.avatar_relative
                    }}
                    style={styles.image}
                  />
                  <View style={styles.content}>
                    <Text allowFontScaling={false}style={{color: 'black', fontWeight: '500'}}>
                      {item?.student_name}
                    </Text>
                    <Text allowFontScaling={false}style={{color: 'black', fontSize: 12, marginBottom: 5}}>
                      <Icon name="calendar" size={15} color="#0298D3" />
                      <Text>  Từ ngày {item?.from_date} đến {item?.to_date}</Text>
                    </Text>
                   
                  </View>
                  
                </View>
                  <View style={{ marginHorizontal:10, borderRadius:10, backgroundColor:'#F4F4F4',
                  paddingLeft:10, 
                  paddingVertical:10
                }}>
                    <Text allowFontScaling={false}style={{color:'black'}}>{item?.description} </Text>
                  </View>
                  <View style={{ alignItems:'flex-end'}}>
                    <View style={{flex:1, paddingLeft:12, paddingTop:5}}>
                      <Text allowFontScaling={false}style={{color:'#0298D3'}}>Đã duyệt </Text>
                    </View>
                   
                  </View>
              </View>
            </View>
            );
          })} 
         
        
     
      </ScrollView>
       </View>
      )
        };
  
  const SecondRoute = () => {
    const [defaultItem, setDefaultItem] = useState('Chọn danh ');
    const nameToIdMap = {};
    (adviceCate?._data || []).forEach(item => {
      nameToIdMap[item?.title] = item?.category_id;
    });
    const idToNameMap = {};
    (adviceCate?._data || []).forEach(item => {
      idToNameMap[item?.category_id] = item?.title;
    });
    const countries = ["Egypt", "Canada", "Australia", "Ireland"]
    return(
      <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
       
    {/* <View style={{
        paddingLeft:10,
        flexDirection:'row',
       
        }}>
                <Ionicons name={'calendar-sharp'} size={20} color={'#0298D3'} />
          <Text allowFontScaling={false}style={{ fontSize:15,width:'60%', fontWeight:600}}>Bạn đang xem đơn từ ngày 11/09/2023 tới tương lai </Text>
      </View>
    <View style={styles.input}>
    <Ionicons name={'search-outline'} size={25} color={'black'} />

      <TextInput

        placeholder="tìm kiếm"
        
      />
      
    </View> */}
    {/* <View style={{
        paddingLeft:10,
        flexDirection:'row',
       
        }}>
      <MaterialIcon
            name="school"
            size={30}
            color="black"
            
          />
          <Text allowFontScaling={false}style={{marginTop:5, marginLeft:5,color:'black', fontSize:15, fontWeight:600}}>Lớp: {data?._data?.class_name}</Text>
      </View> */}
      {/* <View style={{
        paddingLeft:10,
        flexDirection:'row',
       
        }}>
      <MaterialIcon
            name="people"
            size={30}
            color="black"
            
          />
          <Text allowFontScaling={false}style={{marginTop:5, marginLeft:5, fontSize:15, fontWeight:600}}>Số học sinh: 10</Text>
      </View> */}
      <View style={{alignItems:'center',marginTop:10}}>
        <SelectDropdown
              buttonStyle={{ width: 300, borderRadius: 10, backgroundColor: 'white', borderWidth:1, borderColor:'#0298D3' }}
          data={(adviceCate?._data|| []).map(item => item.title)} 
          onSelect={(selectedItem, index) => {
            const selectedId = nameToIdMap[selectedItem];
            setChoose(selectedId);
          	console.log(selectedItem, index)
            
            // navigation.navigate('SlideDraw', {dataprops: selectedId })
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            console.log(selectedItem)
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          defaultButtonText={idToNameMap[choose]}
        />
    </View>
      <ScrollView>
      {(advicecd?._data?.data_info || []).map((item, index) => {
          const handleConfirmation = () => {
            const id = item.advice_id; // Trích xuất giá trị id từ item
            
            onSubmit2(id); // Gọi hàm onSubmit với giá trị id
          }
          return (
            <View style={styles.list} key={index}>
            <View
              style={{
                borderRadius: 10,
                backgroundColor: 'white',
                marginTop: 10,
                marginHorizontal: 10,
                padding: 5,
                
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
                  height: 'auto',
               
                }}>
                <Image
                  source={{uri: item.avatar_user}}
                  style={styles.image}
                />
                <View style={styles.content}>
                  <Text allowFontScaling={false}style={{color: 'black', fontWeight: '500'}}>
                    {item.student_name}
                  </Text>
                  <Text allowFontScaling={false}style={{color: 'black', fontSize: 12, marginBottom: 5}}>
                    <Icon name="calendar" size={15} color="#0298D3" />
                    <Text> Gửi lúc: {item?.date_at}</Text>
                  </Text>
                 
                </View>
                
              </View>
                <View style={{ marginHorizontal:10, borderRadius:10, backgroundColor:'#F4F4F4',
                paddingLeft:10, 
                paddingVertical:10
              }}>
                  <Text allowFontScaling={false}style={{color:'black'}} >{item.content} </Text>
                </View>
                <View style={{ flexDirection:'row'}}>
              <View style={{flex:1, paddingLeft:12, paddingTop:5}}>
                <Text allowFontScaling={false}style={{color:'red'}}>chưa xác nhận </Text>
              </View>
              <TouchableOpacity   onPress={handleConfirmation} style={{flex:0.6,marginVertical:5,paddingVertical:10, backgroundColor:'#0298D3',borderRadius:10, alignItems:'center', justifyContent:'center'}}>
              <View >
                
              <Text style={{color:'white'}} allowFontScaling={false}>Xác nhận</Text>
             
              </View>
              </TouchableOpacity>
            </View>
            </View>
          </View>
          );
        })} 
      {(advice?._data?.data_info || []).map((item, index) => {
          
          return (
            <View style={styles.list} key={index}>
            <View
              style={{
                borderRadius: 10,
                backgroundColor: 'white',
                marginTop: 10,
                marginHorizontal: 10,
                padding: 5,
                
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
                  height: 'auto',
               
                }}>
                <Image
                  source={{
                    uri: item?.avatar_user
                  }}
                  style={styles.image}
                />
                <View style={styles.content}>
                  <Text allowFontScaling={false}style={{color: 'black', fontWeight: '500'}}>
                    {item?.student_name}
                  </Text>
                  <Text allowFontScaling={false}style={{color: 'black', fontSize: 12, marginBottom: 5}}>
                    <Icon name="calendar" size={15} color="#0298D3" />
                    <Text> Gửi lúc: {item?.date_at}</Text>
                  </Text>
                 
                </View>
                
              </View>
                <View style={{ marginHorizontal:10, borderRadius:10, backgroundColor:'#F4F4F4',
                paddingLeft:10, 
                paddingVertical:10
              }}>
                  <Text allowFontScaling={false}style={{color:'black'}} >{item?.content} </Text>
                </View>
                <View style={{ alignItems:'flex-end'}}>
                  <View style={{flex:1, paddingLeft:12, paddingTop:5}}>
                    <Text allowFontScaling={false}style={{color:'#0298D3'}}>Đã duyệt </Text>
                  </View>
                  
                </View>
            </View>
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
    <SafeAreaView  style={styles.container}>
     
      <View style={styles.header}>
        <TouchableOpacity
      
          onPress={() => navigation.goBack()}>
          <Ionicons name={'chevron-back-outline'} size={30} color={'white'} />
        </TouchableOpacity>
        <Text
         allowFontScaling={false}
          style={{color: 'white',fontWeight:700, fontSize: 20, flex: 1, textAlign: 'center'}}>
          Quản lý đơn
        </Text>
      
          <Ionicons name={'chevron-back-outline'} size={30} color={'#0298D3'} />
        

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
     
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    height: 50,
    paddingHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: '#0298D3',
    // marginTop: insets.top,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    borderWidth:1,
    flexDirection:'row',
    backgroundColor:'white',
    paddingVertical: 8,
    borderRadius:10,    marginHorizontal:20,
    marginVertical:20,
    fontSize: 16,
  },
  list: {
    marginTop: 5,
    height: 'auto',
  },
  image: {
    flex: 0.5,
    width: '35%',
    height: 70,
    marginLeft:10,
    marginBottom:5
  },
  content: {
    flex: 2.5,
  },
  date: {
    marginVertical: 10,
    marginHorizontal: 7,
    flexDirection: 'row',
  },

});
export default QuanLyDon;
