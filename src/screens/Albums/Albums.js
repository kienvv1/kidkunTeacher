import React, {useEffect, useMemo, useState, useRef} from 'react';
import {View, Text, StyleSheet,Modal,FlatList , KeyboardAvoidingView,ImageBackground,Animated,Alert, TouchableOpacity, SafeAreaView, Image, TextInput, ScrollView} from 'react-native';
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
import { useForm, Controller } from 'react-hook-form';

import VideoPlayer from 'react-native-video-player'
const ImageAlbum = ({images}) => {
    const [showHiddenImages, setShowHiddenImages] = useState(false);
    let imageSizeStyle;
    let imageView;
    const [isVisible2, setIsVisible2] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  
    const openImageModal = index => {
      setSelectedImageIndex(index);
    };
  
    const closeImageModal = () => {
      setSelectedImageIndex(null);
    };
    if (Array.isArray(images) && images.length === 1) {
      imageSizeStyle = styles.singleImage;
      imageView = styles.singleView;
    } else if (Array.isArray(images) && images.length === 2) {
      imageSizeStyle = styles.twoImages; 
      imageView = styles.twoView;
    } else if (Array.isArray(images) && images.length >= 3) {
      imageSizeStyle = styles.threeImages;
      imageView = styles.twoView;
    } else {
      // Xử lý trường hợp mảng images không tồn tại hoặc rỗng
      imageSizeStyle = styles.singleImage; // Hoặc bất kỳ kích thước nào bạn muốn
    }
    const isImageOrVideoUrl =(url)=> {
      // Danh sách các phần mở rộng thông thường của ảnh và video
      const imageExtensionPattern = /\.(jpg|jpeg|png|gif|bmp|webp|svg|tiff)/i;
      
     const videoExtensionPattern = /\.(mp4|avi|mov|mkv|wmv)/i;
    
     if (imageExtensionPattern.test(url)) {
      return 'image';
    } else if (videoExtensionPattern.test(url)) {
      return 'video';
    }
  
    return null;
    }
    return (
      <ScrollView>
        <View style={styles.imageContainer}>
          {images.slice(0, 3).map((image, index) => (
            <View style={imageView} key={index}>
              <TouchableOpacity onPress={() => openImageModal(index)}>
              {isImageOrVideoUrl(image.uri)==='image' ? (
             <Image
               key={index}
               source={{uri:image.uri}}
               style={imageSizeStyle}
             />
           ) : isImageOrVideoUrl(image.uri)==='video' ? (
            <VideoPlayer
              video={{uri:image.uri}}
              key={index}
              style={imageSizeStyle}
              // thumbnail={{uri: "https://baconmockup.com/370/210/"}}
              // endThumbnail={{uri: "https://baconmockup.com/370/210/"}}
              showDuration={true}
              autoplay
              // controlsTimeout= {2000}
              // disableControlsAutoHide={true}
              defaultMuted={true}
              pauseOnPress={true}
            />
           ) : null}
              </TouchableOpacity>
              <Modal visible={selectedImageIndex !== null} transparent>
                <Swiper
                  style={styles.wrapper}
                  index={selectedImageIndex}
                  loop={false}
                  showsButtons={false}
                  paginationStyle={styles.pagination}>
                  {images.map(item => (
                    <View style={styles.slide} key={item.id}>
                    {isImageOrVideoUrl(item.uri)==='image' ? (
                        <Image
                        style={styles.modalImage}
                        resizeMode="contain"
                        source={{uri: item.uri}}
                      />
                      ) : isImageOrVideoUrl(item.uri)==='video' ? (
                             <VideoPlayer
                                    style={styles.modalImage}
                                    video={{uri:item.uri}}
              //                       thumbnail={{uri: "https://baconmockup.com/370/210/"}}
              // endThumbnail={{uri: "https://baconmockup.com/370/210/"}}
              showDuration={true}
              autoplay
              controlsTimeout= {2000}
              disableControlsAutoHide={true}
              defaultMuted={true}
              pauseOnPress={false}
                               
                                  />
                      ) :null}

                    </View>
                  ))}
                </Swiper>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={closeImageModal}>
                  <Text allowFontScaling={false}style={styles.closeButtonText}>Đóng</Text>
                </TouchableOpacity>
              </Modal>
            </View>
          ))}
  
          {Array.isArray(images) && images.length > 3 && (
            <View style={styles.hiddenImage}>
              {images.length > 4 ? (
                <ImageBackground
                  source={{uri: images[3].uri}}
                  style={styles.imageBackground}>
                  <TouchableOpacity
                    onPress={() => openImageModal(3)}
                    style={styles.overlay}>
                    <Text allowFontScaling={false}style={{fontSize: 20,color:'white'}}>+{images.length - 4}</Text>
                  </TouchableOpacity>
                </ImageBackground>
              ) : images.length === 4 ? (
                <ImageBackground
                  source={{uri: images[images.length - 1].uri}}
                  style={styles.imageBackground}></ImageBackground>
              ) : null}
            </View>
          )}
        </View>
      </ScrollView>
    );
};
const Albums = ({navigation}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [choose, setChoose] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [submiting, setSubmiting] = useState(false);
  const [isEmty,setIsEmty] = useState(false);
  const maxChars = 100;
  const toggleContent = () => {
    setExpanded(!expanded);
  };
  const formatDate=(inputDate)=> {
    const date = new Date(inputDate);
  
    const day = date.getDate();
    const month = date.getMonth() + 1; // Lưu ý rằng tháng trong Date bắt đầu từ 0, vì vậy phải cộng thêm 1.
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
    const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year} lúc ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  
    return formattedDate;
  
  
}
  
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isBottomSheetOpen1, setIsBottomSheetOpen1] = useState(false);
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const overlayOpacity1 = useRef(new Animated.Value(0)).current;
  const bottomSheetModalRef = useRef(null);
  const bottomSheetModalRef1 = useRef(null);
  const bottomSheetModalRef2 = useRef(null);
  const snapPoints = useMemo(() => ['50%', '50%'], []);
  const snapPoints1 = useMemo(() => ['50%', '50%'], []);
  const {
    handleSubmit,
    control,
    reset,
  } = useForm();

  
  const openBottomSheet1 = () => {
    Animated.timing(overlayOpacity1, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setIsBottomSheetOpen1(true);
      // bottomSheetModalRef1.current?.present();
    });
  };
  const closeBottomSheet1 = () => {
    Animated.timing(overlayOpacity1, {
      toValue: 0,
      duration: 50,
      useNativeDriver: false,
    }).start(() => {
      setIsBottomSheetOpen1(false);
    });
  };

  const openBottomSheet = () => {
    Animated.timing(overlayOpacity, {
      toValue: 0.5,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setIsBottomSheetOpen(true);
      bottomSheetModalRef.current?.present();
    });
  };
  const closeBottomSheet = () => {
    Animated.timing(overlayOpacity, {
      toValue: 0,
      duration: 50,
      useNativeDriver: false,
    }).start(() => {
      bottomSheetModalRef.current?.close();
      setIsBottomSheetOpen(false);
    });
  };

  const handleOverlayPress = () => {
    // Khi nhấn lên overlay, đóng bottom sheet
    closeBottomSheet();
    closeBottomSheet1();
    refetch();
  };
  
 
  const handleSheetChanges = index => {
    if (index === -1) {
      setIsBottomSheetOpen(false);
    } else {
      setIsBottomSheetOpen(true);
    }
  };
 
  const classId = useSelector(state => state?.data?.data);

  const { data:datacomment, refetch:refetchcomment } = useQuery(
    ['getComment',choose],
    async () => {
      const  comment = FetchApi.getListComment(choose);
      return  comment;
    },
    {
      enabled: true , // Tắt tự động tải dữ liệu ban đầu
    }
  );
  
  const { data, isLoading, refetch } = useQuery(
    'getAlbum',
    async () => {
      const ID = await AsyncStorage.getItem('classId');
      let updateclassID;
      if (ID) {
        updateclassID = ID;
      } else {
        updateclassID = classId;
      }
      const  album = FetchApi.getListAlbum(updateclassID);
      return  album;
    },
    {
      enabled: true , // Tắt tự động tải dữ liệu ban đầu
    }
  );
  useEffect(() => {
    const loadOnFocus = async () => {
      refetch(); // Gọi hàm refetch để tải lại dữ liệu
      refetchcomment();
      console.log(choose);
    };
  
    const unsubscribe = navigation.addListener('focus', loadOnFocus);
  
    
  }, [navigation]);

  if (isLoading ) {
    return <Loading />;
  }

  const onSubmit = async data => {
    try {
      
      setSubmiting(true);
      // const { cate_id, content } = data;
      Alert.alert(
        'Cảnh báo',
        'Bạn muốn xoá bài đăng này?',
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
              // console.log('test put: ', text, item.id );
              const result = await FetchApi.deleteAlbum(choose);
              if (result._msg_code == 1) {
                // Alert.alert('sửa nhận xét thành công');
                // ResetFunction.resetToOff();
                // navigation.navigate('NhanXetHN')
                refetch();
              } else {
                // Alert.alert('sửa nhận xét thất bại');
                console.log('sửa nhận xét thất bại');
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
  
  const onSubmit2 = async data => {
    try {
      
      setSubmiting(true);
      const { comment } = data;

      // const { cate_id, content } = data;
      console.log('test bình luận: ', comment,choose);
      // const result = await FetchApi.deleteAlbum(choose);
      const result = await FetchApi.postComment({
        album_id: choose,
       title: comment
       
      });
      refetchcomment();
      reset();
        
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
          Album
        </Text>
      
          <Ionicons name={'chevron-back-outline'} size={30} color={'#0298D3'} />
        

      </View>
   
     
      <TouchableOpacity 
        onPress={()=>navigation.navigate('CreateAlbum')}
      style={{borderWidth:1,flexDirection:'row',
       justifyContent:'center',
        alignItems:'center',
        marginHorizontal:'20%',
        borderRadius:10,
        marginVertical:10,
        backgroundColor:'white',
        borderColor:'#0298D3'
        
        }}>
     
      <Ionicons name={'add-circle-sharp'} size={30} color={'#0298D3'} />

        <Text allowFontScaling={false} style={{color:'black',fontSize:18}}>Thêm mới album</Text>
      
      </TouchableOpacity>
      <BottomSheetModalProvider>
      <View style={styles.container}>
      <FlatList
      style={{ width: '100%' }}
      data={data?.data_info || []}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => {
        const urlFiles = [];
         
        let dataItemIndex;
            (item.data_items.data_info || []).map((dataItem, dataIndex) => {
              // console.log('Inner item: ', dataItem.url_file);
              urlFiles.push({ uri: dataItem.url_file,id:dataIndex});
              
            });
            const onSubmit1 = async data => {
              try {
                
                setSubmiting(true);
                console.log(item.id)
                
                const result = await FetchApi.postLike({
                  album_id: item.id
                });
                refetch();
                  
              } catch (err) {
                console.log('err', err);
              }
            };
            // const onSubmit2 = async data => {
            //   try {
                
            //     setSubmiting(true);
            //     const { comment } = data;

            //     // const { cate_id, content } = data;
            //     console.log('test bình luận: ', comment,choose);
            //     // const result = await FetchApi.deleteAlbum(choose);
            //     const result = await FetchApi.postComment({
            //       album_id: choose,
            //      title: comment
                 
            //     });
            //     refetchcomment();
            //     reset();
                  
            //   } catch (err) {
            //     console.log('err', err);
            //   }
            // };

        return (
          <View
            key={index}
            style={{
              marginTop: 5,
              padding: 10,
              borderRadius: 5,
              backgroundColor: 'white',
              width: '100%',
            }}
          >
             <View style={{flexDirection: 'row'}}>
                <View>
                  <Image
                    source={{
                      uri: 'https://zpsocial-f45-org.zadn.vn/28efe032a8d4478a1ec5.jpg'
                    }}
                    style={{
                      width: 60,
                      height: 60,
                      marginHorizontal: 5,
                      borderRadius: 70,
                    }}
                  />
                </View>
                <View style={{flex: 1}}>
                  <Text allowFontScaling={false}style={{color: 'black', fontSize: 18}}>
                   {item.nguoi_tao}
                  </Text>
                  <Text allowFontScaling={false}style={{color: 'gray'}}>{formatDate(item.ngay_tao)} </Text>
                </View>
                <View>
                  <TouchableOpacity onPress={()=>{
                    openBottomSheet(),
                    setChoose(item.id)
                  }}>
                    <Ionicons
                      name={'ellipsis-horizontal'}
                      size={20}
                      color={'black'}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <Text
                allowFontScaling={false}
                  style={styles.text}
                  numberOfLines={expanded ? undefined : 3}>
                  {item.title}
                </Text>
                {item.title.length > maxChars && (
                  <TouchableOpacity onPress={toggleContent}>
                    <Text allowFontScaling={false}style={styles.readMore}>
                      {expanded ? 'Rút gọn' : 'Xem thêm'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
  
              <View style={{height: 300}}>
              {/* (item.data_items.data_info || []).map((dataItem, dataItemIndex) => {
                // console.log('Inner item: ', dataItem.url_file);
                urlFiles.push({ uri: dataItem.url_file });
                
              }); */}
                <ImageAlbum images={urlFiles} key={index}  />
              
              </View>
              <View style={{flexDirection: 'row',marginTop:20}}>
                <TouchableOpacity onPress={onSubmit1}>
                  <View style={{flexDirection: 'row', marginRight: 10}}>
                    <Ionicons name={'heart-sharp'} size={25} color={item.status_like==='1'?'red':'gray'} />
                    <Text allowFontScaling={false}style={{color: 'black', fontSize: 17}}>{item.number_like}</Text>
                  </View>
                </TouchableOpacity>
  
                <TouchableOpacity 
               
                onPress={()=>{
                  openBottomSheet1();
                  setChoose(item.id)
                }}
               
                >
                  <View style={{flexDirection: 'row'}}>
                    <Ionicons
                      name={'chatbox-ellipses-outline'}
                      size={25}
                      color={'black'}
                    />
                    <Text allowFontScaling={false}style={{color: 'black', fontSize: 17}}>{item.count_comment}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            
            <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          onChange={handleSheetChanges}
          snapPoints={snapPoints}>
          <View
            style={{
              width: '100%',
              height: 300,
              backgroundColor: 'white',
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              padding: 20,
            }}>
            <TouchableOpacity onPress={()=>navigation.navigate('EditAlbum',{dataProps: choose})}>
              <View style={{flexDirection: 'row', marginBottom: 25}}>
                <View>
                  <Ionicons name={'pencil-outline'} size={37} color={'gray'} />
                </View>
                <View style={{marginLeft: 12,flex:1}}>
                  <Text allowFontScaling={false}style={{color: 'black', fontSize: 17, fontWeight: 300}}>
                    Chỉnh sửa bài đăng
                  </Text>
                  <Text allowFontScaling={false}style={{color: 'gray', fontSize: 14}}>
                    Bao gồm quyền xem bài đăng, nội dung ảnh/video...
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity  onPress={onSubmit}>
              <View style={{flexDirection: 'row', marginBottom: 25}}>
                <View>
                  <Ionicons name={'trash-outline'} size={37} color={'gray'} />
                </View>
                <View style={{marginLeft: 12}}>
                  <Text allowFontScaling={false}style={{color: 'black', fontSize: 17, fontWeight: 300}}>
                    Xóa bài đăng
                  </Text>
                  <Text allowFontScaling={false}style={{color: 'gray', fontSize: 14}}>
                    Bài đăng này sẽ bị xóa khỏi nhật ký
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </BottomSheetModal>
       
          </View>
        );
      }}
    />

    {isBottomSheetOpen1 && (
          <Animated.View
            style={[styles.overlay1, {opacity: overlayOpacity1}]}
          >
         <View
    style={{
     
      width: '100%',
      flex:1,
      backgroundColor: 'white',
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      padding: 20,
      
    }}
  >
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Icons name={'close'} size={21} color={'rgba(0, 0, 0, 0)'} />
      <Text allowFontScaling={false}style={{ fontSize: 20, color: 'black', textAlign: 'center' }}>
        Bình luận
      </Text>
      <TouchableOpacity onPress={handleOverlayPress}>
        <Icons name={'close'} size={24} color={'black'} />
      </TouchableOpacity>
    </View>

    <View
      style={{
        marginVertical: 10,
      }}
    >
      <Text allowFontScaling={false}style={{ color: 'gray' }}>Có {datacomment?.data_info?.length} bình luận</Text>
    </View>
    <FlatList
     
      data={datacomment?.data_info || []}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => {
        const onSubmit4 = async (data) => {
          try {
            setSubmiting(true);
            const result = await FetchApi.deleteComment(item.id);
            refetchcomment();
          } catch (err) {
            console.log('err', err);
          }
        }
        return (
          <View style={{ marginBottom: 20 }} key={index}>
            <View style={{ flexDirection: 'row' }}>
              <View>
                <Image
                  source={{
                    uri: item.avatar,
                  }}
                  style={{
                    width: 35,
                    height: 35,
                    marginRight: 10,
                    borderRadius: 70,
                  }}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                allowFontScaling={false}
                  style={{
                    color: 'black',
                    marginBottom: 5,
                    fontSize: 16,
                    fontWeight: 500,
                  }}
                >
                  {item.name}
                </Text>
                <Text allowFontScaling={false}style={{ color: 'black', fontSize: 15 }}>{item.title}</Text>
              </View>
              <TouchableOpacity onPress={onSubmit4}>
                <Text allowFontScaling={false} style={{ color: 'black', fontSize: 15 }}>
                  Xoá
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }
    }
    />
    
  </View>

   <KeyboardAvoidingView

      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={190}
    >
  <View
    style={{
      
      flexDirection: 'row', 
      paddingBottom:20,
      paddingTop:20,
      marginHorizontal:10,
      
    }}
  >
    <Controller
      control={control}
      name="comment"
      defaultValue=""
      rules={{ required: 'Chưa nhập comment' }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextInput
        allowFontScaling={false}
        onChangeText={(text) => {
          onChange(text); // Gọi hàm onChange để quản lý trạng thái của Controller
          // const isNotEmpty = !!text; // Kiểm tra xem TextInput có nội dung không
          // Sử dụng biến isNotEmpty theo cách mà bạn muốn
          setIsEmty(text);
        }}
          value={value}
          placeholder="Nhập bình luận..."
          placeholderTextColor={'gray'}
          style={{ width: '90%',color:'black', paddingVertical:0,paddingHorizontal:10,borderBottomWidth:0.2,borderColor:'gray' }}
          multiline={true}
          maxLength={255}
        />
      )}
    />
    <TouchableOpacity onPress={handleSubmit(onSubmit2)} style={{ width: '10%', justifyContent: 'center' }}>
      <Ionicons name={'send-sharp'} size={25} color={isEmty ? '#0298D3' : 'gray'} />
    </TouchableOpacity>
  </View>
  </KeyboardAvoidingView> 

          </Animated.View>
        )}

        {isBottomSheetOpen && (
          <Animated.View
            style={[styles.overlay, {opacity: overlayOpacity}]}
            onTouchStart={handleOverlayPress} // Bắt sự kiện nhấn lên overlay
          />
        )}
      
        
      </View>
    </BottomSheetModalProvider>
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
    flex: 1,
    width: '35%',
    height: 70,
  },
  content: {
    flex: 2.5,
  },
  date: {
    marginVertical: 10,
    marginHorizontal: 7,
    flexDirection: 'row',
  },
  info: {
    marginTop:10,
    marginHorizontal: 15,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    height: 120,
  },
  text: {
    color: 'black',
    marginHorizontal: 10,
    fontSize:17
  },
  readMore: {
    color: 'gray',
    marginHorizontal: 10,
    paddingVertical: 5,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  singleImage: {
    width: '100%', // Hiển thị ảnh toàn màn hình
    height: 300, // Hoặc bất kỳ kích thước nào bạn muốn
  },
  twoImages: {
    width: '100%', // Hiển thị 2 ảnh cùng hàng
    height: 300, // Hoặc bất kỳ kích thước nào bạn muốn
  },
  threeImages: {
    width: '100%', // Hiển thị 2 ảnh cùng hàng
    height: 150, // Hoặc bất kỳ kích thước nào bạn muốn
    margin: 0.5,
  },

  hiddenImage: {
    margin: 0.5,
    width: '49%', // Hiển thị cho số lượng ảnh đã ẩn
    height: 150, // Hoặc bất kỳ kích thước nào bạn muốn
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Hoặc màu nền khác
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Đặt overlay để che kín ImageBackground
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu nền mờ (rgba để có độ trong suốt)
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay1: {
    ...StyleSheet.absoluteFillObject, // Đặt overlay để che kín ImageBackground
    backgroundColor:'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Đảm bảo hình ảnh nền nằm vừa khung
  },
  singleView: {
    width: '100%',
  },
  twoView: {
    width: '49%',
    margin: 1,
  },
  modalImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  pagination: {
    bottom: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 100,
    right: 20,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 20,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },

});
export default Albums;
