import React, {useState, useEffect,useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, Alert} from 'react-native';
import {Sizes} from '../../utils/resource';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcon from'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useQuery} from 'react-query';
import {useSelector} from 'react-redux';
import {FetchApi, ResetFunction} from '../../../src/utils/modules';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Loading} from '../../../src/elements';
import SelectDropdown from 'react-native-select-dropdown'
import { useToast} from "react-native-toast-notifications";

const DiemDanhVe = ({navigation,route}) => {
  
  const [choose, setChoose] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [select, setSelect] = useState(0);
  const classId = useSelector(state => state?.data?.data);
  const datas = route.params?.dataProps;
  const toast = useToast();
  const dropdownRef = useRef(null);
  const {data, isLoading} = useQuery('getAttendanceDetail', async () => {
    const ID = await AsyncStorage.getItem('classId');
    
    let updateclassID;
    if (ID) {
      updateclassID = ID;
    } else {
      updateclassID = classId;
    }
    const  attendancedetail = FetchApi.getAttendanceDetail( datas.student_id,updateclassID, 'in');
    return  attendancedetail;
  });


  useEffect(() => {
    const timer = setTimeout(() => {
      if (dropdownRef.current) {
        dropdownRef.current.openDropdown(); // Mở dropdown sau khi màn hình được mount
      }
    }, 500); // Thời gian chờ trước khi mở dropdown, có thể điều chỉnh

    return () => clearTimeout(timer); // Xóa timer khi component unmount
  }, []);

    if (isLoading) {
      return <Loading />;
    }
      
    const nameToIdMap = {};
    (data?._data?.relative_info || []).forEach(item => {
      nameToIdMap[item.text_name] = item.relative_id;
    });

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
   
    const ResetToHome =()=>{
      ResetFunction.resetToHome();
    }
    
   
    const onSubmit = async () => {
    //   if (selectedIndex === -1) {
    //     Alert.alert('Vui lòng chọn một trạng thái điểm danh');
    //     return; // Không cho cập nhật nếu không có checkbox nào được chọn
    //   }
      try {
        const ID = await AsyncStorage.getItem('classId');
    
        let updateclassID;
        if (ID) {
          updateclassID = ID;
        } else {
          updateclassID = classId;
        }
        console.log('test post:',updateclassID, 'in',datas.student_id,select,data._data.date_at,'1',data._data.time_at,data._data.log_code);
        
        const result = await FetchApi.postAttendanceDetail({
          class_id : updateclassID,
           attendancetype:'out',
           student_id: datas.student_id,
           relative_id: select,
           date_at: data._data.date_at,
           status:'1',
           time_at:data._data.time_at,
           log_code:data._data.log_code,
        });
        if (result._msg_code == 1) {
          toast.show("Cập nhật điểm danh thành công",{
            type: "success",
            placement: "bottom",
            duration: 4000,
            offset: 30,
            animationType: "zoom-in",
          });
          navigation.goBack();
        } else {
          toast.show("Cập nhật điểm danh thất bại",{
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
          Điểm danh về
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
              fontWeight:500
            }}>
            {data._data.date_at}
          </Text>
          <Ionicons name={'calendar-sharp'} size={20} color={'#F5F5F5'} />
        </View>
      </View>
      
        <View style={styles.content}>
        <View
              style={{
                flexDirection: 'row',
           
                marginTop:10
              }}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Icon name="clock-o" size={20} color="#0298D3" />
                <Text allowFontScaling={false} style={{color: 'black',marginTop:2}}> Lúc: {data._data.time_at}</Text>
              </View>
              
          </View>
          <View style={{flexDirection:'row'}}>
          <Image
            source={{
              url: data._data.avatar_url
            }}
            style={{
              width: 35,
              height: 35,
              
              borderRadius: 50,
              marginTop: 5,
            }}
          />
          <Text allowFontScaling={false} style={{marginTop:10, fontSize:16,color:'black' ,fontWeight:500}}>
          {data._data.first_name} {data._data.last_name}
          </Text>
          </View>
          <View style={{ flex:2, alignItems:'center'}}>
     
      
     <SelectDropdown
      ref={dropdownRef}
            
           buttonStyle={{ width: 300,borderWidth:1, borderRadius: 10,borderColor:'#0298D3', backgroundColor: 'white',marginTop:10 }}
       data={(data?._data?.relative_info || []).map(item => item.text_name)} 
       onSelect={(selectedName, index) => {
         const selectedId = nameToIdMap[selectedName];
         setSelect(selectedId );
         console.log(selectedId );
         // navigation.navigate('SlideDraw', {dataprops: selectedId })
       }}
       buttonTextAfterSelection={(selectedItem, index) => {
         return selectedItem;
       }}
       rowTextForSelection={(item, index) => {
         return item;
       }}
       
       defaultButtonText="Chọn người đón"
     />
 </View>
        </View>
       
      
    <View style={{ flexDirection:'row',flex:1}}>
     
     <TouchableOpacity onPress={onSubmit}  style={{backgroundColor:'#0298D3',marginHorizontal:5, marginVertical:20,borderRadius:100, flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text allowFontScaling={false} style={{color:'white', fontWeight:700}}>Cập nhật</Text>
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
  content:{
 
    
    backgroundColor:'white',
    marginHorizontal:7,
    flex:5
  }
});
export default DiemDanhVe;
