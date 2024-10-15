import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
  Platform,
  DatePickerIOS,
  Modal,
  TimePickerAndroid,
  ViewBase,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Sizes } from '../../utils/resource';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { FetchApi, ResetFunction } from '../../../src/utils/modules';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Loading } from '../../../src/elements';
import { CheckBox } from '@rneui/themed';
import { useToast } from 'react-native-toast-notifications';

const DiemDanh = ({ navigation, route }) => {
  const [choose, setChoose] = useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const classId = useSelector((state) => state?.data?.data);
  const datas = route.params?.dataProps;

 
  const [modalVisible, setModalVisible] = useState(false);

  const [selectedItems, setSelectedItems] = useState([]);

  // // Hàm xử lý sự kiện khi checkbox thay đổi
  // const handleCheckboxChange = (itemId) => {
  //   const updatedSelection = [...selectedItems];

  //   if (updatedSelection.includes(itemId)) {
  //     const index = updatedSelection.indexOf(itemId);
  //     updatedSelection.splice(index, 1);
  //   } else {
  //     updatedSelection.push(itemId);
  //   }

  //   setSelectedItems(updatedSelection);
  // };

  const handleClockClick = () => {
    setModalVisible(true);
  };

  const handleTimeChange = (event, newTime) => {
    setModalVisible(false);
    if (newTime) {
      setSelectedTime(newTime);
    }
  };

  const toast = useToast();
  const { data, isLoading } = useQuery('getAttendanceDetail', async () => {
    const ID = await AsyncStorage.getItem('classId');

    let updateclassID;
    if (ID) {
      updateclassID = ID;
    } else {
      updateclassID = classId;
    }
    const attendancedetail = FetchApi.getAttendanceDetail(datas.student_id, updateclassID, 'in');
    return attendancedetail;
  });
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [originalTime, setOriginalTime] = useState(data?._data?.time_at);
  // console.log('API Response:', data?._data?.time_at);

  
  

  const [select,setSelect] = useState({});
  const initialData = (data?._data?.servicedd_info || []).map((item, index) => ({id: item.service_id,title:item.title, checked:item.is_status }));
  const [serviceCheckboxes, setServiceCheckboxes] = useState(initialData);
  useEffect(() => {
    const parsedTime = data?._data?.time_at ? new Date(data._data.time_at) : null;

    if (parsedTime instanceof Date && !isNaN(parsedTime)) {
      setSelectedTime(parsedTime);
    } else {
      // If the provided time is invalid, set it to the current time
      setSelectedTime(new Date());
    }
  if (data?._data?.servicedd_info) {
    const initialData = data?._data?.servicedd_info.map((item, index) => ({
      id: item.service_id,
      title: item.title,
      checked: item.is_status,
    }));
    setServiceCheckboxes(initialData);
  }
}, [data]);

  const toggleServiceCheckbox = (id) => {
    const updatedCheckboxes = serviceCheckboxes.map((checkbox) =>
      checkbox.id === id ? { ...checkbox, checked: checkbox.checked === 1 ? 0 : 1 } : checkbox
    );
    console.log('Updated Checkboxes:', updatedCheckboxes);
    setServiceCheckboxes(updatedCheckboxes);
    logSelectedCheckboxes(updatedCheckboxes);
  };
  
  
  const logSelectedCheckboxes = (updatedCheckboxes) => {
    const selectedIds = {};

    updatedCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        selectedIds[checkbox.id.toString()] = checkbox.id.toString();
      }
    })
    setSelect(selectedIds);
  };
  
  useEffect(() => {
    if (selectedIndex === -1 && datas.log_code === 'Đi học') {
      setSelectedIndex(0);
      setChoose('Đi học');
    } else if (selectedIndex === -1 && datas.log_code === 'Muộn') {
      setSelectedIndex(1);
      setChoose('Muộn');
    } else if (selectedIndex === -1 && datas.log_code === 'Có phép') {
      setSelectedIndex(2);
      setChoose('Có phép');
    } else if (selectedIndex === -1 && datas.log_code === 'Không phép') {
      setSelectedIndex(3);
      setChoose('Không phép');
    }
  }, [datas.log_code, selectedIndex]);

  if (isLoading) {
    return <Loading />;
  }

  const handleCheckBox0Press = () => {
    setSelectedIndex(0);
    setChoose('Đi học');
  };
  const handleCheckBox1Press = () => {
    setSelectedIndex(1);
    setChoose('Muộn');
  };
  const handleCheckBox2Press = () => {
    setSelectedIndex(2);
    setChoose('Có phép');
  };

  const handleCheckBox3Press = () => {
    setSelectedIndex(3);
    setChoose('Không phép');
  };

  const onSubmit = async () => {
    if (selectedIndex === -1) {
      Alert.alert('Vui lòng chọn một trạng thái điểm danh');
      return;
    }

    try {
      const ID = await AsyncStorage.getItem('classId');
      let updateclassID;
      if (ID) {
        updateclassID = ID;
      } else {
        updateclassID = classId;
      }
      const selectedServiceData = {};
      serviceCheckboxes.forEach(service => {
        if (service.checked) {
          selectedServiceData[service.id] = service.id;
        }
      });
      const timeAT = selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' , hour12: false });

      // console.log(timeAT);
      const result = await FetchApi.postAttendanceDetail({
        class_id: updateclassID,
        attendancetype: 'in',
        student_id: datas.student_id,
        relative_id: null,
        date_at: data?._data.date_at,
        status: '1',
        time_at: timeAT,
        log_code: choose,
        service_id: selectedServiceData,
      });

      if (result._msg_code == 1) {
        toast.show('Cập nhật điểm danh thành công', {
          type: 'success',
          placement: 'bottom',
          duration: 4000,
          offset: 30,
          animationType: 'zoom-in',
        });
        navigation.goBack();
      } else {
        toast.show('Cập nhật điểm danh thất bại', {
          type: 'danger',
          placement: 'bottom',
          duration: 4000,
          offset: 30,
          animationType: 'zoom-in',
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
        <Text allowFontScaling={false} style={{ color: 'white', fontWeight: 700, fontSize: 20, flex: 2, textAlign: 'center' }}>
          Điểm danh đến
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
            }}>
            {data?._data?.date_at}
          </Text>
          <Ionicons name={'calendar-sharp'} size={20} color={'#F5F5F5'} />
        </View>
      </View>

      <View style={styles.content}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={handleClockClick}>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Icon name="clock-o" size={20} color="#0298D3" />
              <Text
  allowFontScaling={false}
  style={{ color: 'black', justifyContent: 'center', alignItems: 'center', marginTop: 1 }}>
  {' '}
  {data?._data?.time_at === ''
    ? selectedTime instanceof Date
      ? selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : ''
    : data?._data?.time_at}
  {' '}
</Text>


            </View>
          </TouchableOpacity>
          {modalVisible && (
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}>
              <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <View style={{ backgroundColor: 'white' }}>
                  {Platform.OS === 'ios' ? (
                    <DatePickerIOS date={selectedTime} mode="time" onDateChange={handleTimeChange} />
                  ) : (
                    <DateTimePicker
                      value={selectedTime}
                      mode="time"
                      is24Hour={true}
                      display="default"
                      onChange={(event, newTime) => handleTimeChange(event, newTime)}
                    />
                  )}
                </View>
              </View>
            </Modal>
          )}
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Image
            source={{
              uri: data?._data?.avatar_url,
            }}
            style={{
              width: 35,
              height: 35,
              borderRadius: 50,
              marginTop: 5,
            }}
          />
          <Text allowFontScaling={false} style={{ marginTop: 10, color: 'black', fontSize: 16, fontWeight: 500 }}>
            {data?._data?.first_name} {data?._data?.last_name}
          </Text>
        </View>

        <View>
          <CheckBox
            title="Đi học"
            checked={selectedIndex === 0}
            onPress={handleCheckBox0Press}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
          />
          <CheckBox
            title="Muộn"
            checked={selectedIndex === 1}
            onPress={handleCheckBox1Press}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
          />
          <CheckBox
            title="Có phép"
            checked={selectedIndex === 2}
            onPress={handleCheckBox2Press}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
          />
          <CheckBox
            title="Không phép"
            checked={selectedIndex === 3}
            onPress={handleCheckBox3Press}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
          />
        </View>

        <View>
          <View>
            <Text style={{ marginTop: 10, color: 'black', fontSize: 16, fontWeight: 500 }}> DỊCH VỤ THEO ĐIỂM DANH </Text>
          </View>
          {serviceCheckboxes.map((service, index) => (
          <View style={styles.checkboxContainer} key={service.id}>
          
            
              <CheckBox
                title = {service.title}
                checked={service.checked}
                onPress={() => toggleServiceCheckbox(service.id)}
                iconType="material-community"
                checkedIcon="checkbox-outline"
                uncheckedIcon={'checkbox-blank-outline'}
                right={true}
                containerStyle={{ backgroundColor: 'transparent' }}
              />
            
          
          </View>
          ))}
        </View>
      </View>

      <View style={{ flexDirection: 'row', flex: 1 }}>
        <TouchableOpacity
          onPress={onSubmit}
          style={{ backgroundColor: '#0298D3', marginHorizontal: 5, marginVertical: 20, borderRadius: 100, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text allowFontScaling={false} style={{ color: 'white', fontWeight: 800 }}>
            Cập nhật
          </Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    backgroundColor: 'white',
    marginHorizontal: 7,
    flex: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
});

export default DiemDanh;
