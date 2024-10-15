import React, { useEffect, useMemo, useState, useRef } from 'react';
import { View, Text, StyleSheet,Alert, TouchableOpacity, SafeAreaView, Image, TextInput, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { FetchApi } from '../../../src/utils/modules';
import { Loading } from '../../../src/elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectDropdown from 'react-native-select-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useForm, Controller } from 'react-hook-form';
import { CheckBox } from '@rneui/themed';
import { useToast} from "react-native-toast-notifications";

const ChiTietNXHN = ({ navigation }) => { 
  const [selectedItem, setSelectedItem] = useState(null);
  const [submiting, setSubmiting] = useState(false);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [select,setSelect] = useState({});
  const [cateId,setCateId] = useState(null);
  const [contents, setContent] = useState('');
  const toast = useToast();

  const classId = useSelector(state => state?.data?.data);
  const { data } = useQuery(['getCateReview'], () => FetchApi.getCateReview());
  const { data:option } = useQuery(['getOption',cateId], () => FetchApi.getOption(cateId));

  const {data:list} = useQuery('getAttendance', async () => {
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
 

  
  const initialData = (list?._data?.data_info || []).map((item, index) => ({id: item.student_id, name: item.first_name +' '+ item.last_name ,image:item.avatar_url, checked: false }));
const [studentCheckboxes, setStudentCheckboxes] = useState(initialData);
  const toggleSelectAll = () => {
    setSelectAllChecked(!selectAllChecked);

    const updatedCheckboxes = studentCheckboxes.map((checkbox) => ({
      ...checkbox,
      checked: !selectAllChecked,
    }));
    setStudentCheckboxes(updatedCheckboxes);

    // Log object có dạng mong muốn
    if (!selectAllChecked) {
      const selectedIds = {};
      updatedCheckboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          selectedIds[checkbox.id] = checkbox.id.toString();
        }
      });
      setSelect(selectedIds);
    }
  };

  const toggleStudentCheckbox = (id) => {
    const updatedCheckboxes = studentCheckboxes.map((checkbox) =>
      checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : checkbox
    );
    setStudentCheckboxes(updatedCheckboxes);

    
    logSelectedCheckboxes(updatedCheckboxes);
  };

  const logSelectedCheckboxes = (updatedCheckboxes) => {
    const selectedIds = {};

    updatedCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        selectedIds[checkbox.id.toString()] = checkbox.id.toString();
      }
    });
    setSelect(selectedIds);
    
  };
  


  const nameToIdMap = {};
  (data?._data || []).forEach(item => {
    nameToIdMap[item.title] = item.id;
  });
  const nameToIdMap1 = {};
  (option?._data || []).forEach(item => {
    nameToIdMap[item.title] = item.id;
  });
  
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  
  const formattedDate = `${year}-${month}-${day}`;
  const {
    handleSubmit,
    control,
    reset,
  } = useForm();
  
  const onSubmit = async data => {
    try {
      setSubmiting(true);
      const { cate_id, content } = data;
      
     
        const ID = await AsyncStorage.getItem('classId');
        let updateclassID;
        if (ID) {
          updateclassID = ID;
        } else {
          updateclassID = classId;
        }
        const result = await FetchApi.postReviewDate({
          date_at:formattedDate,
          category_review_id: cate_id,
          ps_class_id: updateclassID,
          note: contents,
          student_ids: select,
         
        });
        if (result._msg_code == 1) {
          toast.show("Thêm nhận xét thành công",{
            type: "success",
            placement: "bottom",
            duration: 4000,
            offset: 30,
            animationType: "zoom-in",
          });
          // ResetFunction.resetToOff();
          navigation.goBack();
        } else {
          toast.show("thêm nhận xét thất bại",{
            type: "danget",
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

  return (

    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity

          onPress={() => navigation.goBack()}>
          <Ionicons name={'chevron-back-outline'} size={30} color={'white'} />
        </TouchableOpacity>
        <Text
         allowFontScaling={false}
          style={{ color: 'white', fontWeight: 700, fontSize: 20, flex: 1, textAlign: 'center' }}>
          Nhận xét hàng ngày
        </Text>

        <Ionicons name={'chevron-back-outline'} size={30} color={'#0298D3'} />

      </View>

        <View style={styles.content2}>
        <KeyboardAwareScrollView
        extraScrollHeight={70}
        enableOnAndroid={true}
        style={{ flex: 1 }}
      >
          <View style={{ paddingHorizontal: 10 ,marginTop:10}}>
          
            <View style={{ alignItems: 'center', }}>
              <Controller
                control={control}
                name="cate_id"
                defaultValue=""
                rules={{ required: 'Chưa chọn chủ đề' }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <View style={{ alignItems: 'center' }}>
                    {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
                    <SelectDropdown
                      buttonStyle={{ width: 300,borderWidth:0.5, borderRadius: 10,borderColor:'#0298D3', backgroundColor: 'white', marginBottom: 10 }}
                      data={(data?._data || []).map(item => item.title)} // Hiển thị danh sách name
                      onSelect={(selectedName, index) => {
                        const selectedId = nameToIdMap[selectedName];
                        setCateId(selectedId);
                        onChange(selectedId); 
                      }}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                      }}
                      rowTextForSelection={(item, index) => {
                        return item;
                      }}
                      defaultButtonText="Chọn chủ đề"
                    />
                  </View>
                )}
              />
            </View>
          </View>
          <View style={{ paddingHorizontal: 10 ,marginTop:5}}>
            <View style={{ alignItems: 'center', }}>
              <Controller
                control={control}
                name="option_id"
                defaultValue=""
                rules={{}}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <View style={{ alignItems: 'center' }}>
                   
                    <SelectDropdown
                      buttonStyle={{ width: 300,borderWidth:0.5, borderRadius: 10,borderColor:'#0298D3', backgroundColor: 'white', marginBottom: 10 }}
                      data={(option?._data || []).map(item => item.title)} // Hiển thị danh sách name
                      onSelect={(selectedName, index) => {
                        // console.log(selectedName);
                        setContent(selectedName);
                        const selectedId = nameToIdMap1[selectedName];
                        // setCateId(selectedId);
                        onChange(selectedId); 
                      }}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                      }}
                      rowTextForSelection={(item, index) => {
                        return item;
                      }}
                      defaultButtonText="Chọn nội dung"
                    />
                  </View>
                )}
              />
            </View>
          </View>        
          <View style={{ paddingHorizontal: 10 }}>

            <Controller
              control={control}
              name="content"
              defaultValue={contents}
              // rules={{ required: 'Chưa nhập nội dung' }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <View>
                  {error && (
                    <Text
                      style={{
                        color: 'red',
                        fontSize: 14,
                        marginTop: 5,
                        marginHorizontal: 20
                      }}>
                      {error.message}
                    </Text>
                  )}
                  <TextInput
                  value={contents}
                    multiline={true}
                    style={styles.input2}
                    placeholder="Nhập nội dung..."
                    onChangeText={(text) => {
                      // value= content;
                      setContent(text); // Cập nhật giá trị từ biến customValue
                      onChange(text); // Cập nhật giá trị trường "content"
                    }}
                    maxLength={255}
                  />
                </View>

              )}
            />

          </View>

          </KeyboardAwareScrollView>
          <Text allowFontScaling={false} style={{ color: 'black', marginLeft: 15, marginTop: 9, fontSize: 15 }}>
          Học sinh đã chọn: {studentCheckboxes.filter((checkbox) => checkbox.checked).length}/{studentCheckboxes.length}
        </Text>
        
          <View style={{ marginHorizontal: 15, flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: 'black', lineHeight: 35, marginLeft: 5 }}>Chọn tất cả</Text>
            </View>
            <CheckBox
              checked={selectAllChecked}
              onPress={toggleSelectAll}
              iconType="material-community"
              checkedIcon="checkbox-outline"
              uncheckedIcon={'checkbox-blank-outline'}
              right={true}
              containerStyle={{ backgroundColor: 'transparent' }}
            />
          </View>
         <ScrollView style={{flex:1}}>
          {studentCheckboxes.map((student, index) => (
            <View key={student.id} style={{ marginHorizontal: 15, flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
              <View style={{ flexDirection: 'row' }}>
                <Image source={{ uri: student.image }} style={{ width: 35, height: 35 }} />
                <Text style={{ color: 'black', lineHeight: 35, marginLeft: 5 }}>{student.name}</Text>
              </View>
              <CheckBox
                checked={student.checked}
                onPress={() => toggleStudentCheckbox(student.id)}
                iconType="material-community"
                checkedIcon="checkbox-outline"
                uncheckedIcon={'checkbox-blank-outline'}
                right={true}
                containerStyle={{ backgroundColor: 'transparent' }}
              />
            </View>
          ))}
        </ScrollView>
        </View>
      
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleSubmit(onSubmit)} style={{ width: '95%', backgroundColor: '#0298D3', borderRadius: 100,height:'100%', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: 15, fontWeight: 700 }}>Thêm</Text>
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
    borderWidth: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 8,
    borderRadius: 10,
    marginVertical: 20,
    fontSize: 16,

  },
  input2: {
    borderWidth: 0.5,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 10,
    fontSize: 16,
    height: 100,
    color:'black',
    borderColor:'#0298D3'
    
  },
  list: {
    marginTop: 5,
    height: 'auto',
    flex: 0.25,

  },
  image: {
    flex: 1,
    height: 75,
  },
  content: {
    flex: 2.5,

    marginLeft: 10,
  },
  content2: {
    flex: 1.7,

  },
  footer: {
    flex: 0.15,
  
    justifyContent: 'center',
    alignItems: 'center'

  }

});
export default ChiTietNXHN;
