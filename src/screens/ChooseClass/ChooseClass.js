import React, { useState ,useEffect,useRef} from 'react';
import {View, StyleSheet,Image, SafeAreaView} from 'react-native';
import {Loading} from '../../elements';
import {useQuery} from 'react-query';
import {FetchApi} from '../../utils/modules';
import SelectDropdown from 'react-native-select-dropdown';
import { useFocusEffect } from '@react-navigation/native';
const ChooseClass = ({navigation}) => {
 

    const {data, isLoading} = useQuery(['Home'], () => FetchApi.home());
   
    const dropdownRef = useRef(null);

    useEffect(() => {
      const timer = setTimeout(() => {
        if (dropdownRef.current) {
          dropdownRef.current.openDropdown(); // Mở dropdown sau khi màn hình được mount
        }
      }, 200); // Thời gian chờ trước khi mở dropdown, có thể điều chỉnh
  
      return () => clearTimeout(timer); // Xóa timer khi component unmount
    }, []);
      
    if (isLoading) {
      return <Loading />;
    }
    
    const nameToIdMap = {};
  (data?._data?.class_info || []).forEach(item => {
    nameToIdMap[item.class_name] = item.class_id;
  });

 
  
  return (
    <SafeAreaView  style={{
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
      }}>
    
      <View style={styles.image}>
        <Image
          source={require('../../utils/Images/Background.png')}
          style={styles.avatar}
        />
      </View>
      
      <SelectDropdown
       ref={dropdownRef}
                buttonStyle={{ width: 300,borderWidth:1, borderRadius: 10,borderColor:'#0298D3', backgroundColor: 'white',marginTop:10 }}
          data={(data?._data?.class_info || []).map(item => item.class_name)} 
          onSelect={(selectedName, index) => {
            const selectedId = nameToIdMap[selectedName];
            console.log(selectedId );
            navigation.navigate('SlideDraw', {dataprops: selectedId })
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          defaultButtonText="Chọn Lớp"
        />
      
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
   button:{
    marginTop:20,
    borderWidth:1,
    justifyContent:'center',
    alignItems:'center',
    width:'50%',
    padding:10,
    borderRadius:100,
    
    },
  text1: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
   
  },
  image: {
    overflow: 'hidden', // Giữ cho hình ảnh không bị tràn ra khỏi khung
    marginTop: 50,
 
    width:'100%',
    flex:0.4,
    alignItems:'center'
  },
  avatar: {
    width: 271,
    height:200

   
  },
  choose: {
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 80,
    width: 270,

    borderRadius: 18,
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
  },
  textch: {
    flex: 0.9,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
});
export default ChooseClass;
