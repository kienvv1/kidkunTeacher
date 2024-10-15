import React, { useState,useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  Alert,
  Modal, 
  ActivityIndicator 
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { CheckBox } from '@rneui/themed';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SelectDropdown from 'react-native-select-dropdown'
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { FetchApi } from '../../../src/utils/modules';
import { Loading } from '../../../src/elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast} from "react-native-toast-notifications";

const DiemDanhNhanh = ({ navigation, route }) => {
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [select,setSelect] = useState({});
  const classId = useSelector(state => state?.data?.data);
  const [status,setStatus] = useState('Đi học');
  const toast = useToast();
  const [isLoadings, setIsLoading] = useState(false);
  const {data,isLoading} = useQuery('getAttendance', async () => {
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

  if (isLoading) {
    return <Loading />;
  }

  const initialData = (data?._data?.data_info || []).map((item, index) => ({id: item.student_id, name: item.first_name +' '+ item.last_name ,image:item.avatar_url, checked: false }));
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
  // console.log('ádasd; ',select);
  const countries = ["Đi học", "Muộn", "Có phép", "Không phép"]
  const now = new Date();
const hours = now.getHours();
const minutes = now.getMinutes();

// Định dạng giờ và phút thành chuỗi "HH:mm"
const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  const onSubmit = async data => {
    
    try {
      setIsLoading(true);
      const selectedStudentData = {};
      studentCheckboxes.forEach(student => {
        if (student.checked) {
          selectedStudentData[student.id] = {
            time_at: formattedTime,
            log_code: status,
          };
        }
      });
        const ID = await AsyncStorage.getItem('classId');
        let updateclassID;
        if (ID) {
          updateclassID = ID;
        } else {
          updateclassID = classId;
        }
      //  console.log({ studentID: selectedStudentData });
        const result = await FetchApi.postDiemDanhNhanh({
          class_id: updateclassID,
          attendancetype: "in",
          fr:"ad",
          info: { studentID: selectedStudentData }
         
        });
        
        if (result._msg_code == 1) {
          toast.show("Điểm danh thành công",{
            type: "success",
            placement: "bottom",
            duration: 4000,
            offset: 30,
            animationType: "zoom-in",
          });
          navigation.goBack();
        } else {
          toast.show("Điểm danh thất bại",{
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

 
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.goBack()}>
          <Ionicons name={'chevron-back-outline'} size={30} color={'white'} />
        </TouchableOpacity>
        <Text
          allowFontScaling={false}
          style={{
            color: 'white',
            fontWeight: '700',
            fontSize: 20,
            flex: 2,
            textAlign: 'center',
          }}>
          Điểm danh nhanh
        </Text>
        <View
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
              fontWeight: 500,
            }}></Text>
          <Ionicons name={'calendar-sharp'} size={20} color={'#0298D3'} />
        </View>
      </View>
      
    
      <View style={styles.content}>
   
       
        <View style={{ alignItems:'center'}}>
        <SelectDropdown
           buttonStyle={{ width: 300,borderWidth:1, borderRadius: 10,borderColor:'#0298D3', backgroundColor: 'white',marginTop:10 }}
       data={countries}
       defaultValue={status} 
       onSelect={(selectedName, index) => {
        
          setStatus(selectedName);
     
         // navigation.navigate('SlideDraw', {dataprops: selectedId })
       }}
       buttonTextAfterSelection={(selectedItem, index) => {
         return selectedItem;
       }}
       rowTextForSelection={(item, index) => {
         return item;
       }}
       
      //  defaultButtonText="Đi Học"
     />
</View>
        <Text allowFontScaling={false} style={{ color: 'black', marginLeft: 15, marginTop: 15, fontSize: 15 }}>
          Học sinh đã chọn: {studentCheckboxes.filter((checkbox) => checkbox.checked).length}/{studentCheckboxes.length}
        </Text>
        <ScrollView>
          <View style={{ marginHorizontal: 15, flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text allowFontScaling={false} style={{ color: 'black', lineHeight: 35, marginLeft: 5 }}>Chọn tất cả</Text>
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
          {studentCheckboxes.map((student, index) => (
            <View key={student.id} style={{ marginHorizontal: 15, flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
              <View style={{ flexDirection: 'row' }}>
                <Image source={{ uri: student.image }} style={{ width: 35, height: 35 }} />
                <Text allowFontScaling={false} style={{ color: 'black', lineHeight: 35, marginLeft: 5 }}>{student.name}</Text>
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
      
   
      <View style={{ flexDirection: 'row', flex: 0.15}}>
       
        <TouchableOpacity onPress={onSubmit} style={{ backgroundColor: '#0298D3', marginHorizontal: 5, marginVertical: 10, borderRadius: 100, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text allowFontScaling={false} style={{color:'white',fontWeight:700}}>Cập nhật</Text>
        </TouchableOpacity>
      </View>
      <Modal
        transparent={true}
        animationType="slide"
        visible={isLoadings}
        onRequestClose={() => {
          // Xử lý khi modal đóng (nếu cần)
        }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0298D3" />
        </View>
      </Modal>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    marginHorizontal: 7,
    flex: 1,
    
  },
});

export default DiemDanhNhanh;
