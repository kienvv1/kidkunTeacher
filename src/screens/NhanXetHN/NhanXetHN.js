import React, {useEffect, useState} from 'react';
import {View,Platform, DatePickerIOS, Text, Alert,StyleSheet,useWindowDimensions, TouchableOpacity, SafeAreaView, Image, TextInput, ScrollView} from 'react-native';
import {Sizes} from '../../utils/resource';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcon from'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TabView, SceneMap ,TabBar} from 'react-native-tab-view';
import {useQuery} from 'react-query';
import {useSelector} from 'react-redux';
import {FetchApi} from '../../../src/utils/modules';
import {Loading} from '../../../src/elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm, Controller } from 'react-hook-form';
import SelectDropdown from 'react-native-select-dropdown'
import { useToast} from "react-native-toast-notifications";

import RNDateTimePicker from '@react-native-community/datetimepicker';
const NhanXetHN = ({navigation}) => {
  const [choose, setChoose] = useState(0);
  const [index, setIndex] = React.useState(0);
  const toast = useToast();
  const layout = useWindowDimensions();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [routes] = React.useState([
    { key: 'first', title: 'Nhận xét hàng ngày' },
    { key: 'second', title: 'Nhận xét tuần tháng' },
  ]);
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  
  const formattedDate = `${year}-${month}-${day}`;
  const formattedDate2 = `${day}/${month}/${year}`;

  const formatNgayThang =(date)=> {
    const dateObj = new Date(date);
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear().toString();
  
    return `${day}-${month}-${year}`;
  }
  const formatNgayThang2 =(date)=> {
    const dateObj = new Date(date);
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear().toString();
  
    return `${year}-${month}-${day}`;
  }
  const classId = useSelector(state => state?.data?.data);
  const {data, isLoading} = useQuery('getAttendance', async () => {
    const ID = await AsyncStorage.getItem('classId');
    
    let updateclassID;
    if (ID) {
      updateclassID = ID;
    } else {
      updateclassID = classId;
    }
    const  attendance = FetchApi.getAttendancein(updateclassID);
    return  attendance;
  });
  const { data:cate } = useQuery(['getCateReview'], () => FetchApi.getCateReview());
  const nameToIdMap = {};
  (cate?._data || []).forEach(item => {
    nameToIdMap[item.title] = item.id;
  });
  const idToNameMap = {};
  (cate?._data || []).forEach(item => {
    idToNameMap[item.id] = item.title;
  });
  const firstValue = (cate?._data || [])[0];
  useEffect(() => {
    if (firstValue) {
      setChoose(firstValue.category_id);
    }
  }, [firstValue]);
  const { data:reviewdate , refetch } = useQuery(
    ['getReviewDate',choose,formatNgayThang2(date)],
    async () => {
      const  listReview = FetchApi.getReviewDate(choose,formatNgayThang2(date));
      return listReview;
    },
    {
      enabled: true , // Tắt tự động tải dữ liệu ban đầu
    }
  );

  useEffect(() => {
    const loadOnFocus = async () => {
      refetch(); // Gọi hàm refetch để tải lại dữ liệu
    };
    const unsubscribe = navigation.addListener('focus', loadOnFocus);
    
  }, [navigation]); 



  if (isLoading ) {
    return <Loading />;
  }

  const FirstRoute = () => {
    
    
    return(
      <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>

      <View style={{flexDirection:'row'}}>
            
            <View style={{flex:1,marginHorizontal: 45,alignItems:'center'}}>
              <TouchableOpacity onPress={()=>navigation.navigate('ChiTietNXHN')} style={{borderWidth:1,flexDirection:'row',
       justifyContent:'center',
        alignItems:'center',
        height:50,
        borderRadius:10,
        marginTop:10,
        backgroundColor:'white',
        borderColor:'#0298D3',
        width:'100%', 
        }}>
           
      <Ionicons name={'add-circle-sharp'} size={30} color={'#0298D3'} />

        <Text allowFontScaling={false} style={{color:'black'}}>Thêm mới </Text>
             
             </TouchableOpacity>
            </View>
      </View>
        <View style={styles.date}>
        <SelectDropdown
              buttonStyle={{ width: 300, borderRadius: 10, backgroundColor: 'white', borderWidth:1, borderColor:'#0298D3' }}
          data={(cate?._data|| []).map(item => item.title)} 
          onSelect={(selectedName, index) => {
            const selectedId = nameToIdMap[selectedName];
            setChoose(selectedId);
          
            // navigation.navigate('SlideDraw', {dataprops: selectedId })
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          defaultButtonText={idToNameMap[choose]|| 'Chọn danh mục'}
        />
      </View>
        {/* <View style={styles.input}>
      <Ionicons name={'search-outline'} size={25} color={'black'} />

        <TextInput

          placeholder="tìm kiếm"
          
        />
        
      </View> */}
        <ScrollView>
        {(reviewdate?._data|| []).map((item, index) => {
           const [text, setText] = useState(item.note);
           const [submiting, setSubmiting] = useState(false);
           const handleChangeText = (newText) => {
            setText(newText);
          };
          const {
            handleSubmit,
            control,
            reset,
          } = useForm();
          const onSubmit = async data => {
            try {
              setSubmiting(true);
              // const { cate_id, content } = data;
             
                      // console.log('test put: ', text, item.id );
                      const result = await FetchApi.postUpdateReviewDate({
                        id: item.id,
                        date_at: formattedDate ,
                        note : text
                       
                      });
                      if (result._msg_code == 1) {
                        toast.show("Sửa nhận xét thành công",{
                          type: "success",
                          placement: "bottom",
                          duration: 4000,
                          offset: 30,
                          animationType: "zoom-in",
                        });
                       
                        refetch();
                      } else {
                        toast.show("Sửa nhận xét thất bại",{
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
          const onSubmit2 = async data => {
            try {
              setSubmiting(true);
            
              Alert.alert(
                'Cảnh báo',
                'Bạn muốn xoá nhận xét này?',
                [
                  {
                    text: 'Huỷ',
                    onPress: () => {
                      console.log('Hủy bỏ hành động');
                    },
                    style: 'cancel',
                  },
                  {
                    text: 'Xoá',
                    onPress: async () => {
                   
                      const result = await FetchApi.deleteReviewDate(item.id);
                      if (result._msg_code == 1) {
                        toast.show("Xoá nhận xét thành công",{
                          type: "success",
                          placement: "bottom",
                          duration: 4000,
                          offset: 30,
                          animationType: "zoom-in",
                        });
                        
                        refetch();
                      } else {
                        toast.show("Xoá nhận xét thất bại",{
                          type: "success",
                          placement: "bottom",
                          duration: 4000,
                          offset: 30,
                          animationType: "zoom-in",
                        });
                      }
                    },
                  },
                ],
                { cancelable: false } 
              );
              


                
            } catch (err) {
              console.log('err', err);
            }
          };  
    
       const count = index + 1;
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
                  }}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <Icon name="clock-o" size={20} color="#0298D3" />
                    <Text allowFontScaling={false} style={{color: 'black'}}> Lúc: 7:30</Text>
                  </View>
                  <View style={{flex: 2, flexDirection: 'row'}}>
                    <Ionicons name={'person'} size={20} color={'#0298D3'} />
    
                    <Text allowFontScaling={false} style={{color: '#0298D3'}}>
                      <Text allowFontScaling={false} style={{color: 'gray'}}>Bởi:</Text> Nguyễn Chí Nghĩa
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    height: 'auto',
                  }}>
                  <Image
                    source={require('../../utils/Images/KIDKUN_final.png')}
                    style={styles.image}
                  />
                  <View style={styles.content}>
                    <Text allowFontScaling={false} style={{color: 'black', fontWeight: '500'}}>
                      {count}. {item.student_fullname}
                    </Text>
                    
                  </View>
               
                </View>
                <View style={{ marginHorizontal:10, borderRadius:10, backgroundColor:'#F4F4F4',
                  paddingLeft:10, 
                  paddingVertical:10
                }}>
                    {/* <Text style={{color:'black'}}>{item.note} </Text> */}

                    <TextInput
                    allowFontScaling={false}
                    multiline={true}
                    value={text}
                    onChangeText={handleChangeText}
                    placeholder="Nhập giá trị..."
                    style={{color:'black'}}
                    />
                  </View>
                <View
                  style={{
                    paddingHorizontal: 5,
                    paddingVertical: 10,
                    flexDirection: 'row',
                    justifyContent:'flex-end'
                  }}>
                  
                  <TouchableOpacity onPress={onSubmit} style={{marginVertical:5,paddingVertical:7,paddingHorizontal:20, marginRight:7,backgroundColor:'#0298D3',borderRadius:100, alignItems:'center', justifyContent:'center'}}>
                
                    <Text allowFontScaling={false} style={{color:'white'}}>Sửa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onSubmit2} style={{marginVertical:5,paddingVertical:7,paddingHorizontal:20, backgroundColor:'#F30404',borderRadius:100, alignItems:'center', justifyContent:'center'}}>
                    <Text allowFontScaling={false} style={{color:'white'}}>Xoá</Text>
                    </TouchableOpacity>
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
  
  
  return(
    <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
     
     {/* <View style={styles.input}>
      <Ionicons name={'search-outline'} size={25} color={'black'} />

        <TextInput

          placeholder="tìm kiếm"
          
        />
        
      </View> */}
   
      
        <ScrollView>
        {(data?._data?.data_info || []).map((item, index) => {
            const count = index + 1;
            return (
              <View style={styles.list} key={index}>
              <TouchableOpacity onPress={()=> navigation.navigate('ChiTietNXTT',{dataProps: item})}>
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
                      uri: item.avatar_url
                    }}
                    style={styles.image}
                  />
                  <View style={styles.content}>
                    <Text allowFontScaling={false} style={{color: 'black', fontWeight: '500'}}>
                    {count}.{item.first_name} {item.last_name}
                    </Text>
                    <Text allowFontScaling={false} style={{color: 'gray', fontSize: 12, marginBottom: 5}}>
                      <Icon name="calendar" size={15} color="#EE4B4B" />
                      <Text> Ngày sinh: {item.birthday}</Text>
                    </Text>
                    <Text allowFontScaling={false} style={{color: 'gray', fontSize: 12}}>
                      <Icon name="qrcode" size={16} color="black" />
                      <Text allowFontScaling={false}> Mã học sinh: {item.student_code}</Text>
                    </Text>
                  </View>
                 
                </View>
                <View
                  style={{
                    paddingHorizontal: 5,
                    paddingVertical: 10,
                    flexDirection: 'row',
                  }}>
                 
                  
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



const onChange = (event, selectedDate) => {
  const currentDate = selectedDate || date;
  setShow(Platform.OS === 'ios');
  setDate(currentDate);
  setShow(false);
};

const showDatePicker = () => {
  setShow(true);
};


  return (
    <SafeAreaView  style={styles.container}>
     
      

     <View style={styles.header}>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={()=>navigation.goBack()}>
          <Ionicons name={'chevron-back-outline'} size={30} color={'white'} />
        </TouchableOpacity>
        <Text
        allowFontScaling={false}
          style={{color: 'white',fontWeight:700, fontSize: 20, flex: 2, textAlign: 'center'}}>
          Nhận xét
        </Text>
       
        <TouchableOpacity
        onPress={showDatePicker}
          style={{
            flexDirection: 'row',
            flex: 1,

            justifyContent: 'flex-end',
          }}>
          <Text
          allowFontScaling={false}
            style={{
              color: 'white',
              fontSize: 13,
              alignItems: 'center',
              textAlign: 'right',
              marginTop: 2,
              fontWeight:500
            }}>
            {formatNgayThang(date)}
          </Text>
          <Ionicons name={'calendar-sharp'} size={20} color={'#F5F5F5'} />
        </TouchableOpacity>
       
      </View>
      {show && (
        <RNDateTimePicker // Use DateTimePicker instead of DatePickerIOS
          value={date}
          mode="date"
          display="inline"
          onChange={onChange}
          locale="vi-VN"
        />
      )}
     
      <TabView
       
       navigationState={{ index, routes }}
       renderScene={renderScene}
       onIndexChange={setIndex}
       initialLayout={{ width: layout.width}}
       
       renderTabBar={props => <TabBar {...props}
       renderLabel={({route, color}) => (
         <Text  allowFontScaling={false} style={{ color: 'black', borderBottomColor:'#0298D3'}}>
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
    paddingVertical: 5,
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
    height: 60,
  },
  content: {
    flex: 2.5,
    justifyContent:'center'
  },
  date: {
    marginVertical: 10,
    alignItems:'center'
  },

});
export default NhanXetHN;
