import React, {useEffect, useMemo, useState, useRef} from 'react';
import {View, Text,useWindowDimensions, StyleSheet,Alert, TouchableOpacity, SafeAreaView, Image, TextInput, ScrollView} from 'react-native';
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

import HTML from 'react-native-render-html';

import { useToast} from "react-native-toast-notifications";

import { useForm, Controller } from 'react-hook-form';

const ChiTietNXTT = ({navigation,route}) => {
    const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');
  const toast = useToast();
  const [selectedItem, setSelectedItem] = useState(null);
  const [submiting, setSubmiting] = useState(false);
  const [commentValues, setCommentValues] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const contentWidth = useWindowDimensions().width;
  const datas = route.params?.dataProps;

   const {
    handleSubmit,
    control,
    reset,
    // formState: { errors },
    // formState: { errors: errorss },
  } = useForm();
  
  const { data,isLoading, refetch } = useQuery(
    'getListReviewWeek',
    async () => {
      const  listReview = FetchApi. getListReviewWeek(datas.student_id);
      return listReview;
    },
    {
      enabled: true , // Tắt tự động tải dữ liệu ban đầu
    }
  );
 
  // console.log(commentValues);
  useEffect(() => {
    const loadOnFocus = async () => {
      // setCommentValues(data?._data.map((item) => item.comment || ''));

      refetch(); // Gọi hàm refetch để tải lại dữ liệu
    };
    const unsubscribe = navigation.addListener('focus', loadOnFocus);
    
  }, [navigation]); 
 
  useEffect(() => {
    if (data?._data) {
      // Dữ liệu đã tải xong, nên khởi tạo commentValues
      setCommentValues(data?._data.map((item) => item.comment || ''));
      // console.log('test object: ', commentValues)
      setIsDataLoaded(true);
    }
  }, [data]);
  if (isLoading || !isDataLoaded) {
    return <Loading />;
  }
 
  // console.log('test: ', text);
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

      <View style={styles.list} >
              <View
                style={{
                  borderRadius: 10,
                  backgroundColor: 'white',
                  marginTop: 10,
                  marginHorizontal: 10,
                  padding: 5,
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
                    height: 'auto',
                    
                  }}>
                  <Image
                    source={{
                      uri: datas.avatar_url
                    }}
                    style={styles.image}
                  />
                  <View style={styles.content}>
                    <Text allowFontScaling={false} style={{color: 'black',marginTop:5, fontWeight: '500', fontSize:19}}>
                        {datas?.first_name} {datas?.last_name}
                    </Text>
                    <Text allowFontScaling={false}    style={{color: 'gray', fontSize: 15, marginBottom: 5, marginTop:17}}>
                      <Icon name="calendar" size={15} color="#EE4B4B" />
                      <Text> Ngày sinh: {datas?.birthday}</Text>
                    </Text>
                    <Text allowFontScaling={false}     style={{color: 'gray', fontSize: 15}}>
                      <Icon name="qrcode" size={16} color="black" />
                      <Text> Mã học sinh: {datas?.student_code}</Text>
                    </Text>
                  </View>
                 
                  
                </View>
              
              </View>
              
        </View>
        <TouchableOpacity 
        onPress={()=>navigation.navigate('CreateNXTT',{dataProps: datas})}
      style={{borderWidth:1,flexDirection:'row',
       justifyContent:'center',
        alignItems:'center',
        marginHorizontal:'20%',
        borderRadius:10,
        marginVertical:10,
        backgroundColor:'white',
        borderColor:'#0298D3',
        height:50
        }}>
     
      <Ionicons name={'add-circle-sharp'} size={30} color={'#0298D3'} />

        <Text allowFontScaling={false} style={{color:'black',fontSize:18}}>Thêm mới nhận xét</Text>
      
      </TouchableOpacity>
        {data?._data.length === 0 ? (
        <View style={{justifyContent:'center',height:100,alignItems:'center'}}>
          <Text allowFontScaling={false}style={{ color: 'black' }}>Chưa có nhận xét</Text>
        </View>
      ) : (
        <ScrollView>
        {(data?._data|| []).map((item, index) => {
          // console.log('test object: ',commentValues[index]);
          const onSubmitUpdate = async data => {
            try {
              setSubmiting(true);
              // const { cate_id, content } = data;
            
              // console.log(commentValues[index])
        
              const result = await FetchApi.updateListReviewWeek({
                id: item.id,
                comment: commentValues[index]
               
              });
              toast.show("Sửa nhận xét thành công",{
                type: "success",
                placement: "bottom",
                duration: 4000,
                offset: 30,
                animationType: "zoom-in",
              });
              refetch();
                
            } catch (err) {
              console.log('err', err);
            }
          };
          const onSubmitDelete = async data => {
            try {
              setSubmiting(true);
            console.log(item.id);
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
                   
                      const result = await FetchApi.deleteListReviewWeek(item.id);
                      if (result._msg_code == 1) {
                        const newCommentValues = commentValues.filter((_, i) => i !== index);
              setCommentValues(newCommentValues);
              toast.show("xoá nhận xét thành công",{
                type: "success",
                placement: "bottom",
                duration: 4000,
                offset: 30,
                animationType: "zoom-in",
              });
                        refetch();
                      } else {
                        Alert.alert('Xoá nhận xét thất bại');
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
          return(
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
              {/* <View
                style={{
                  flexDirection: 'row',
                }}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Icon name="clock-o" size={20} color="#0298D3" />
                  <Text allowFontScaling={false}style={{color: 'black'}}> Lúc: 7:30</Text>
                </View>
                <View style={{flex: 2, flexDirection: 'row'}}>
                  <Ionicons name={'person'} size={20} color={'#0298D3'} />
  
                  <Text allowFontScaling={false}style={{color: '#0298D3'}}>
                    <Text allowFontScaling={false}style={{color: 'gray'}}>Bởi:</Text> Nguyễn Chí Nghĩa
                  </Text>
                </View>
              </View> */}
              <View
                style={{
                  flexDirection: 'row',
                  height: 'auto',
                }}>
                {/* <Image
                  source={require('../../utils/Images/KIDKUN-final.1.png')}
                  style={styles.image}
                /> */}
                <View style={styles.content}>
                 
                  <Text allowFontScaling={false} style={{color: 'black', fontWeight: '500',}}>
                    Tiêu đề: {item.title}
                  </Text>
                  {/* <Text allowFontScaling={false}  style={{color: 'black', fontWeight: '500',}}>
                    Tuần: {item.ps_week}
                  </Text> */}
                </View>
             
              </View>
              <View style={{ marginHorizontal:10, borderRadius:10, backgroundColor:'#F4F4F4',
                paddingLeft:10, 
                paddingVertical:10,
                marginTop:10
              }}>
                  {/* <Text allowFontScaling={false}style={{color:'black'}}>{item.note} </Text> */}

                  {/* <TextInput
                  allowFontScaling={false}
                  value={commentValues[index]}
                  onChangeText={(newText) => {
                    const newCommentValues = [...commentValues];
                    newCommentValues[index] = newText;
                    setCommentValues(newCommentValues);
                    
                  }} 
                  placeholder="Nhập nhận xét..."
                  style={{color:'black'}}
                  multiline={true}
                  
                  /> */}
                  <HTML
        containerStyle={{flex: 1, width: '100%'}}
        ignoredStyles={['height', 'display', 'width']}
        contentWidth={contentWidth}
        source={{html: commentValues[index]}}
        baseStyle={{color: 'black'}}
        defaultTextProps={{selectable:true}}
        // tagsStyles={{
        //   p: {color: 'black'},
        //   h1: {color: 'black'},
        //   span: {color: 'black'},
        // }}
        ignoredDomTags={['source']}
      />
                </View>
              <View
                style={{
                  paddingHorizontal: 5,
                  paddingVertical: 10,
                  flexDirection: 'row',
                  justifyContent:'flex-end'
                }}>
                
                {/* <TouchableOpacity onPress={onSubmitUpdate} style={{marginVertical:5,paddingVertical:7,paddingHorizontal:20, marginRight:7,backgroundColor:'#0298D3',borderRadius:100, alignItems:'center', justifyContent:'center'}}>
              
                  <Text allowFontScaling={false}style={{color:'white'}}>Sửa</Text>
                  </TouchableOpacity> */}
                  <TouchableOpacity onPress={onSubmitDelete} style={{marginVertical:5,paddingVertical:7,paddingHorizontal:20, backgroundColor:'#F30404',borderRadius:100, alignItems:'center', justifyContent:'center'}}>
                  <Text allowFontScaling={false}style={{color:'white'}}>Xoá</Text>
                  </TouchableOpacity>
              </View>
            </View>
          </View>
          )
        })}
            
          
            </ScrollView>
)}
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
    
  },
  input2: {
    borderWidth:0.5,
    flexDirection:'row',
    backgroundColor:'white',
    paddingVertical: 20,
    borderRadius:10, 
    marginVertical:10,
    fontSize: 16, 
    
  },
  list: {
    marginTop: 10,
    height: 'auto',
    // flex:0.25,
  
  },
  image: {
    flex: 0.67,
    height: 'auto' ,
  },
  content: {
    flex: 2.5,
   
    marginLeft:10,
  },
  content2: {
    flex: 1,
    
  },
  footer:{
    flex:0.1,
   
    justifyContent:'center',
    alignItems:'center'

  }

});
export default ChiTietNXTT;
