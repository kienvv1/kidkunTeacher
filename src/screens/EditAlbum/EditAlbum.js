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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useToast} from "react-native-toast-notifications";
import ImagePicker from 'react-native-image-crop-picker';
import VideoPlayer from 'react-native-video-player'
import storage from '@react-native-firebase/storage';
const EditAlbum = ({navigation,route}) => {
  const [text, setText] = useState('');
  const toast = useToast();

  const [expanded, setExpanded] = useState(false);

  const id = route.params?.dataProps;

  const toggleContent = () => {
    setExpanded(!expanded);
  };
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [width, setWidth] = useState(50);
  const [height, setHeight] = useState(70);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [mediaLinks, setMediaLinks] = useState([]);
  const classId = useSelector(state => state?.data?.data);

  const uploadImageToFirebase = async (imageUri) => {
    if (!imageUri) {
      Alert.alert('Lỗi', 'Vui lòng chọn ảnh trước khi tải lên.');
      return;
    }

    setUploadingMedia(true);

    const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
    const reference = storage().ref(`images/${filename}`);

    try {
      await reference.putFile(imageUri);
      console.log('Image uploaded to Firebase successfully.');
  
      // Lấy liên kết (URL) của hình ảnh sau khi tải lên Firebase
      const imageURL = await reference.getDownloadURL();
      
      // Thêm đường link vào mảng mediaLinks
      setMediaLinks((prevLinks) => [...prevLinks, imageURL]);
  
      console.log('Image URL:', imageURL);
  
      // ...
    } catch (error) {
      console.error('Error uploading image to Firebase: ', error);
      // Alert.alert('Lỗi', 'Đã xảy ra lỗi khi tải lên hình ảnh. Vui lòng thử lại sau.');
    }

    setUploadingMedia(false);
  };

  const handleMediaPicker = () => {
    ImagePicker.openPicker({
      mediaType: 'any',
      multiple: true,
      maxFiles: 10,
    })
      .then((media) => {
        setSelectedMedia(media);
        setMediaLinks([]);
        // Gọi hàm upload cho từng tệp trong mảng selectedMedia
        media.forEach((item) => {
          uploadImageToFirebase(item.path);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
 
 
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
              // thumbnail={{uri:image.uri}}
              // endThumbnail={{uri:image.uri}}
              showDuration={true}
              autoplay
              controlsTimeout= {2000}
              disableControlsAutoHide={true}
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
                                  
              showDuration={true}
              autoplay
              controlsTimeout= {2000}
              disableControlsAutoHide={true}
              defaultMuted={true}
              pauseOnPress={true}
                               
                                  />
                      ) :null}


                <TouchableOpacity
                 style={styles.deleteButton}
                 onPress={() => deleteImage(item.id)}
                 >
                  <Ionicons name={'close-outline'} size={30} color={'white'} />
                 
               </TouchableOpacity>

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

  const deleteImage = (id) => {
    try {
      // console.log(id);
      const result = FetchApi.deleteImage(id);
      refetch()
    } catch (err) {
      console.log('err', err);
    }
  };

  const {
    handleSubmit,
    control,
    reset,
  } = useForm();

  
  const { data, isLoading, refetch } = useQuery(
    'getEditAlbum',
    async () => {
     
      const  album = FetchApi.getEditAlbum(id);
      return  album;
    },
    {
      enabled: true , // Tắt tự động tải dữ liệu ban đầu
    }
  );
  useEffect(() => {
    setText(data?.title_ps_album);
  }, [data?.title_ps_album]);
  const handleChangeText = (newText) => {
    setText(newText);
  };
  useEffect(() => {
    const loadOnFocus = async () => {
      // refetch(); // Gọi hàm refetch để tải lại dữ liệu
   
    };
  
    const unsubscribe = navigation.addListener('focus', loadOnFocus);
  
    
  }, [navigation]);

  if (isLoading ) {
    return <Loading />;
  }
  const urlFiles =[];
  (data?.data_info|| []).map((item, index) => {
   
    urlFiles.push({ uri: item.url_file ,id:item.id});
     
  });
  // console.log('test mảng: ', urlFiles);
  const editTitle = async data => {
    try {
     
          console.log(id, text);
              const result = await FetchApi.putTitleAlbum({
            
                  title: text,
                  id: id
               
              });

              
                const result1 = await FetchApi.postUpload({
            
                  album_id: id,
                  url_file: mediaLinks,
                  url_thumbnail: mediaLinks
               
              });
          
              
              if (result._msg_code == 1 || result1._msg_code ==1) {
                toast.show("Sửa album thành công",{
                  type: "success",
                  placement: "bottom",
                  duration: 4000,
                  offset: 30,
                  animationType: "zoom-in",
                });
                
                // refetch();
                navigation.navigate('Albums')
              } else {
                toast.show("Sửa album thất bại",{
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
      
          onPress={() => navigation.goBack()}>
          <Ionicons name={'chevron-back-outline'} size={30} color={'white'} />
        </TouchableOpacity>
        <Text
        allowFontScaling={false}
          style={{color: 'white',fontWeight:700, fontSize: 20, flex: 1, textAlign: 'center'}}>
          chỉnh sửa album
        </Text>
      
          <Ionicons name={'chevron-back-outline'} size={30} color={'#0298D3'} />
        

      </View>
   
     
  
      <BottomSheetModalProvider>
      <View style={styles.container}>
      <View
           
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
                  {/* <Image
                    source={{
                      uri: item.avatar
                    }}
                    style={{
                      width: 60,
                      height: 60,
                      marginHorizontal: 5,
                      borderRadius: 70,
                    }}
                  /> */}
                </View>
                <View style={{flex: 1}}>
                  <Text allowFontScaling={false}style={{color: 'black', fontSize: 18}}>
                   {/* {item.nguoi_tao} */}
                   Nguyễn Chí nghĩa
                  </Text>
                  <Text allowFontScaling={false}style={{color: 'gray'}}>9/11/2023 </Text>
                </View>
                <View>
                  <TouchableOpacity onPress={()=>editTitle()} >
                  <Text allowFontScaling={false}style={{color:'black',fontSize:15}}>Lưu</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View>
              <TextInput
                    multiline={true}
                    value={text}
                    onChangeText={handleChangeText}
                    placeholder="Nhập nội dung..." 
                    placeholderTextColor="gray" 
                    style={{color:'black',fontSize:16}}
                    />
               
              </View>
  
              <View style={{height: 300}}>
              {/* (item.data_items.data_info || []).map((dataItem, dataItemIndex) => {
                // console.log('Inner item: ', dataItem.url_file);
                urlFiles.push({ uri: dataItem.url_file });
                
              }); */}
                <ImageAlbum images={urlFiles}  />
              
              </View>
            
            
  
          </View>

       
      
          <View style={{marginTop:10,}}>
        <Text allowFontScaling={false}style={{fontSize:18, color:'black', fontWeight:600, marginLeft:14}}>Thêm ảnh/video</Text>
        <View style={{ flexDirection:'row'}}>
        <TouchableOpacity style={{backgroundColor:'white',borderRadius:10,height:100, marginLeft:14,width:'29%',marginTop:10, justifyContent:'center', alignItems:'center'}} onPress={handleMediaPicker}>
       
       <MaterialIcon
             name="add-a-photo"
             size={30}
             color="#0298D3"
             
           />
           
       
       </TouchableOpacity>
       
       {uploadingMedia ? (
        <Text allowFontScaling={false}style={{color:'black'}}>Đang tải lên...</Text>
      ) : (

        <FlatList
        horizontal={true}
           style={{marginTop:14}}
       // numColumns={2}
       data={selectedMedia}
       keyExtractor={(item, index) => index.toString()}
       renderItem={({ item }) => (
         <View style={{ marginBottom: 10 }}>
           {item.mime && item.mime.includes('image') ? (
             <Image source={{ uri: item.path }} style={{ width: 100, height: 90,marginLeft:3,borderWidth:3,borderColor:'white',borderRadius:10 }} />
           ) : item.mime && item.mime.includes('video') ? (
             <Video
               muted={true}
               source={{ uri: item.path }}
               style={{ width: 100, height: 90,marginLeft:3,borderWidth:3,borderColor:'white',borderRadius:10 }}
               controls
             />
           ) : null}
         </View>
       )}
     />
      )}
     
       
        </View>

       
     
       





      </View>
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
  deleteButton: {
    position: 'absolute',
    top: 100,
    left:20
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
export default EditAlbum;
