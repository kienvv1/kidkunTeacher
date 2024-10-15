import React, {useEffect, useMemo, useState, useRef} from 'react';
import {View, Text, StyleSheet,Modal, ImageBackground,Animated, TouchableOpacity, SafeAreaView, Image, TextInput, ScrollView, Alert} from 'react-native';
import {Sizes} from '../../utils/resource';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcon from'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import Swiper from 'react-native-swiper';
import {Icons} from '../../elements';
import {useQuery} from 'react-query';
import {useSelector} from 'react-redux';
import {FetchApi} from '../../../src/utils/modules';
import {Loading} from '../../../src/elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectDropdown from 'react-native-select-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useForm, Controller } from 'react-hook-form';
import { useToast} from "react-native-toast-notifications";

const CreateNXTT = ({navigation,route}) => {
    const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('Empty');
  const [selectedItem, setSelectedItem] = useState(null);
  const [submiting, setSubmiting] = useState(false);
  const [choose, setChoose] = useState('');

  const toast = useToast();

  const datas = route.params?.dataProps;
  // console.log('test datas ', datas);
  let studentId = null;
  studentId = datas.student_id;
 
  // setStudenId(datas.student_id);
  // console.log(id);
  function getCurrentYear() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    return currentYear;
  }
  
  function getCurrentMonth() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    return currentMonth+1;
  }
  // Sử dụng hàm để lấy ra năm hiện tại
  const currentYear = getCurrentYear();
  const currentMonth = getCurrentMonth();

  const [years, setYears] = useState(currentYear);
  const [months, setMonths] = useState(currentMonth);
  const [weeks, setWeeks] = useState(null);
    const year = [];
    for (let i = 2022; i <= 2030; i++) {
        year.push(`Năm ${i}`);
      }
      const valueMapping = {};
      for (let i = 2022; i <= 2030; i++) {
        const yearName = `Năm ${i}`;
        const yearValue = `${i}`;
        valueMapping[yearName] = yearValue;
      }
    const onSelect = (selectedItem, index) => {
      setSelectedItem(selectedItem);
      const selectedValue = valueMapping[selectedItem]; // Lấy giá trị tương ứng
      setYears(selectedValue);
   
    };

///chọn tháng

  // const month = [];
  //   for (let i = 1; i <= 12; i++) {
  //       month.push(`Tháng ${i}`);
  //     }
  //     const valueMappingMonth = {};
  //     for (let i = 1; i <= 12; i++) {
  //       const monthName = `Tháng ${i}`;
  //       const monthValue = `${i}`;
  //       valueMappingMonth[monthName] = monthValue;
  //     }
  //   const onSelect2 = (selectedItem, index) => {
  //     setSelectedItem(selectedItem);
  //     const selectedValue = valueMappingMonth[selectedItem]; // Lấy giá trị tương ứng
  //     setMonths(selectedValue);
   
  //   };
   
///chọn tuần
 const week = [];
    for (let i = 1; i <= 52; i++) {
        week.push(`Tuần ${i}`);
      }
      const valueMappingweek = {};
      for (let i = 1; i <= 52; i++) {
        const weekName = `Tuần ${i}`;
        const weekValue = `${i}`;
        valueMappingweek[weekName] = weekValue;
      }
    const onSelect3 = (selectedItem, index) => {
      setSelectedItem(selectedItem);
      const selectedValue = valueMappingweek[selectedItem]; // Lấy giá trị tương ứng
      setWeeks(selectedValue);
   
    };
    const {data} = useQuery(['getListWeek'], () => FetchApi.getListWeek(years));

   
    const nameToIdMap = {};
    (data?._data?.dscactuan || []).forEach(item => {
      nameToIdMap[item?.dateofweek] = item?.tuan;
      
    });
   
   const {
    handleSubmit,
    control,
    reset,
    // formState: { errors },
    // formState: { errors: errorss },
  } = useForm();
  const onSubmit = async data => {
    try {
      setSubmiting(true);
      const {  content } = data;
    
      console.log( content ,years, months, choose)
     
      const result = await FetchApi.postSaveReviewWeek({
        week: choose,
        // month: months,sss
        title:`Nhận xét tuần ${choose}`,
        comment:content ,
        student_id:studentId
       
      });
      console.log('resuilt: ', result);
      if(result._msg_code==1){
     
        toast.show("Thêm mới nhận xét thành công",{
          type: "success",
          placement: "bottom",
          duration: 4000,
          offset: 30,
          animationType: "zoom-in",
        });
        navigation.goBack();
      }else{
        toast.show("Thêm mới nhận xét thất bại",{
          type: "danger",
          placement: "bottom",
          duration: 4000,
          offset: 30,
          animationType: "zoom-in",
        });
        // toast.show("Thêm mới nhận xét thành công",{
        //   type: "success",
        //   placement: "bottom",
        //   duration: 4000,
        //   offset: 30,
        //   animationType: "zoom-in",
        // });
      }
      
      
        
    } catch (err) {
      console.log('err', err);
    }
  };
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
          Nhận xét tuần tháng
        </Text>
      
          <Ionicons name={'chevron-back-outline'} size={30} color={'#0298D3'} />
        

      </View>
     
      <KeyboardAwareScrollView
    extraScrollHeight={70}
    enableOnAndroid={true}
    style={{flex:1}}
    >
      <View style={styles.list} >
              <View
                style={{
                  borderRadius: 10,
                  backgroundColor: 'white',
                  marginTop: 10,
                  marginHorizontal: 10,
                  padding: 5,
                //   borderWidth: 1,
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
                      uri: datas.avatar_url
                    }}
                    style={styles.image}
                  />
                  <View style={styles.content}>
                    <Text allowFontScaling={false} style={{color: 'black', fontWeight: '500', fontSize:19}}>
                        {datas?.first_name} {datas?.last_name}
                    </Text>
                    <Text    allowFontScaling={false} style={{color: 'gray', fontSize: 15, marginBottom: 5, marginTop:17}}>
                      <Icon name="calendar" size={15} color="#EE4B4B" />
                      <Text> Ngày sinh: {datas?.birthday}</Text>
                    </Text>
                    <Text     allowFontScaling={false} style={{color: 'gray', fontSize: 15}}>
                      <Icon name="qrcode" size={16} color="black" />
                      <Text> Mã học sinh: {datas?.student_code}</Text>
                    </Text>
                  </View>
                 
                  
                </View>
              
              </View>
              
        </View>
        
      <View style={styles.content2}>
        <View style={{flexDirection:'row',marginHorizontal:9}}>
        {/* <View style={{paddingHorizontal:0, marginTop:10,marginHorizontal:2,flex:1}}>
            <View style={{alignItems:'center'}}>
            <SelectDropdown
            data={year}
            buttonStyle={{backgroundColor: 'white',borderColor:'#0298D3', borderWidth:1, borderRadius:10,width:'auto'}}
            style={{borderWidth: 1}}
            defaultButtonText={'Năm '+currentYear}
            buttonTextStyle={{fontSize: 16, color: 'black' }}
            onSelect={onSelect}
            defaultValueByIndex={year.indexOf(selectedItem)}
          />
            </View>
        </View>
        <View style={{paddingHorizontal:0,marginTop:10,marginHorizontal:2,flex:1}}>
            <View style={{alignItems:'center',}}>
            <SelectDropdown
            data={month}
            buttonStyle={{backgroundColor: 'white',borderColor:'#0298D3', borderWidth:1,width:'auto' ,borderRadius:10}}
            style={{borderWidth: 1}}
            defaultButtonText={'Tháng '+currentMonth}
            buttonTextStyle={{fontSize: 16, color: 'black' }}
            onSelect={onSelect2}
            defaultValueByIndex={month.indexOf(selectedItem)}
          />
            </View>
        </View> */}
        
        </View>
        <View style={{paddingHorizontal:10,marginTop:10,marginHorizontal:2,flex:1}}>
            <View style={{alignItems:'center', }}>
            <SelectDropdown
            
            data={(data?._data?.dscactuan|| []).map(item => item.dateofweek)} 
            buttonStyle={{backgroundColor: 'white',borderColor:'#0298D3', borderWidth:1, width:'auto',borderRadius:10}}
            style={{borderWidth: 1}}
           
            defaultButtonText='Tuần'
            buttonTextStyle={{fontSize: 16, color: 'black' }}
            onSelect={(selectedItem, index) => {
              const selectedId = nameToIdMap[selectedItem];
              setChoose(selectedId);
              console.log(selectedItem)
              
              // navigation.navigate('SlideDraw', {dataprops: selectedId })
            }}
            defaultValueByIndex={week.indexOf(selectedItem)}
          />
            </View>
        </View>
       
        <View style={{paddingHorizontal:10}}>
            
            <Controller
                  control={control}
                  name="content"
                  defaultValue=""
                  rules={{ required: 'Chưa nhập nội dung' }}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <View>
                       {error && (
                    <Text
                    allowFontScaling={false}
                      style={{
                        color: 'red',
                        fontSize: 14,
                        marginTop: 5,
                        marginHorizontal:20
                      }}>
                      {error.message}
                    </Text>
                  )}
                    <TextInput
                    allowFontScaling={false}
         multiline={true}
        style={styles.input2}
          placeholder="Nhập nội dung..."
          placeholderTextColor="gray" 
          onChangeText={onChange}
          maxLength={255}
        />
                  </View>
                 
                  )}
                />
           
        </View>
      </View>
      </KeyboardAwareScrollView>
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleSubmit(onSubmit)} style={{width:'95%',backgroundColor:'#0298D3', borderRadius:100,flex:1, justifyContent:'center', alignItems:'center'}}>
            <Text allowFontScaling={false} style={{color:'white',fontSize:15,fontWeight:700}}>Thêm mới</Text>
        </TouchableOpacity>
        
      </View>
    
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
    borderWidth:0.5,
    flexDirection:'row',
    backgroundColor:'white',
    paddingVertical: 8,
    borderRadius:10, 
    marginVertical:20,
    fontSize: 16, 
    color:'black',
  },
  input2: {
    borderWidth:0.2,
    flexDirection:'row',
    backgroundColor:'white',
    paddingVertical: 20,
    borderRadius:10, 
    marginVertical:30,
    fontSize: 16, 
    height:120,
    color:'black',
  },
  list: {
    marginTop: 5,
    height: 'auto',
    flex:0.25,
  
  },
  image: {
    flex: 0.7,
    height: 77,
  },
  content: {
    flex: 2.5,
   
    marginLeft:10,
  },
  content2: {
    flex: 1,
    marginTop:5
    
  },
  footer:{
    flex:0.1,
   
    justifyContent:'center',
    alignItems:'center'

  }

});
export default CreateNXTT;
