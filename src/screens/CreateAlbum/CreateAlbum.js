import React, { useState } from 'react';
import {View, Text, StyleSheet,KeyboardAvoidingView, TouchableOpacity, SafeAreaView, Image, TextInput, ScrollView,Alert, FlatList} from 'react-native';
import {Sizes} from '../../utils/resource';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcon from'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import Video from 'react-native-video';
import storage from '@react-native-firebase/storage';
import { useForm, Controller } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { FetchApi } from '../../utils/modules';
import { ResetFunction } from '../../utils/modules';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateAlbum = ({navigation}) => {
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
       
        // Gọi hàm upload cho từng tệp trong mảng selectedMedia
        media.forEach((item) => {
          uploadImageToFirebase(item.path);
        });
        setMediaLinks([]);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  

    const {
      handleSubmit,
      control,
      reset,
      // formState: { errors },
      // formState: { errors: errorss },
    } = useForm();
    const [submiting, setSubmiting] = useState(false);


    const onSubmit = async data => {
      try {
        setSubmiting(true);
        const { nameAlbum,note} = data;
        // console.log('test mảng', mediaLinks);
        // console.log('test data: ',nameAlbum ,dec);
        
        const ID = await AsyncStorage.getItem('classId');
        let updateclassID;
        if (ID) {
          updateclassID = ID;
        } else {
          updateclassID = classId;
        }
        
        if (selectedMedia.length === 0 ) {
         
          Alert.alert('Vui lòng chọn ít nhất 1 ảnh')
        }else if(mediaLinks.length === 0 && selectedMedia.length > 0) {
          Alert.alert('Bạn chưa thể tạo album ')
        }else {
          
          const result = await FetchApi.postAlbum({
            class_id: updateclassID,
            title: nameAlbum,
          
            url_file: mediaLinks,
            url_thumbnail: mediaLinks,
          });
          if (result._msg_code == 1) {
            Alert.alert(result._msg_text);
           
            navigation.goBack();
          } else {
            Alert.alert(result._msg_text);
          }
        }

       
      } catch (err) {
        console.log('err', err);
      }
  
      // reset({ nameAlbum: '' , dec:''});
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
          style={{color: 'white',fontWeight:700,fontSize: 20, flex: 1, textAlign: 'center'}}>
          Tạo album
        </Text>
      
          <Ionicons name={'chevron-back-outline'} size={30} color={'#0298D3'} />
        

      </View>
      <View style={{flex:1}}>
      <View style={{marginTop:10}}>
       

        <Controller
                  control={control}
                  name="nameAlbum"
                  defaultValue=""
                  rules={{ required: 'Chưa nhập nội dung' }}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <View>
                       {error && (
                    <Text
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
           multiline={true}
          style={styles.input}
          placeholder="Nhập nội dung..."
          placeholderTextColor="gray"
          onChangeText={onChange}
          maxLength={255}
        />
        </View>
                 
                  )}
                />
        
        
      </View>
      <View style={{marginTop:10,}}>
        <Text style={{fontSize:18, color:'black', fontWeight:600, marginLeft:14}}>Thêm ảnh/video</Text>
        <View style={{ flexDirection:'row'}}>
        <TouchableOpacity style={{backgroundColor:'white',borderRadius:10,height:100, marginLeft:14,width:'29%',marginTop:10, justifyContent:'center', alignItems:'center'}} onPress={handleMediaPicker}>
       
       <MaterialIcon
             name="add-a-photo"
             size={30}
             color="#0298D3"
             
           />
           
       
       </TouchableOpacity>
       
       {uploadingMedia ? (
        <Text style={{color:'black'}}>Đang tải lên...</Text>
      ) : (

        <FlatList
        horizontal={true}
           style={{marginTop:10}}
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
               style={{ width: 100, height: 90,marginLeft:3,borderWidth:3,borderColor:'white',borderRadius:10  }}
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
      <View style={{ flexDirection:'row',flex:1, alignItems:'flex-end' }}>
     <TouchableOpacity 
     onPress={handleSubmit(onSubmit)}
     style={{backgroundColor:'#0298D3',marginHorizontal:10,borderRadius:100,flex:1, justifyContent:'center', alignItems:'center'}}
     >
   
        <Text style={{color:'white',fontWeight:700,padding:20}}>Tạo album</Text>
     
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
    borderWidth:0.3,
    height:100,
    backgroundColor:'white',
    color:'black',
    paddingLeft:10,
    borderRadius:10,    
    marginHorizontal:20,
    marginVertical:10,
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
 
  

});
export default CreateAlbum;
