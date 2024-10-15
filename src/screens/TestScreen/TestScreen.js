import React, {useCallback, useMemo, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  Modal,
  Animated,
  TextInput,
  SafeAreaView,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {Sizes} from '../../utils/resource';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BottomSheet} from '@rneui/themed';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';

import {Icons} from '../../elements';

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

  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        {images.slice(0, 3).map((image, index) => (
          <View style={imageView}>
            <TouchableOpacity onPress={() => openImageModal(index)}>
              <Image
                key={index}
                source={{uri: image.uri}}
                style={imageSizeStyle}
              />
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
                    <Image
                      style={styles.modalImage}
                      resizeMode="contain"
                      source={{uri: item.uri}}
                    />
                  </View>
                ))}
              </Swiper>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={closeImageModal}>
                <Text style={styles.closeButtonText}>Đóng</Text>
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
                  <Text style={{fontSize: 20}}>+{images.length - 4}</Text>
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
const TestScreen = ({navigation}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const maxChars = 100;
  const toggleContent = () => {
    setExpanded(!expanded);
  };

  const content = `Content, today, comes in all shapes and sizes, from the written word to an engaging video. A good content marketing strategy uses a mix of different types of content to reach your target audience. Some examples of content include blogs, emailers, newsletters, social media posts, case studies, and more.`;
  const images = [
    {
      uri: 'https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-1/371353182_1701935433608526_1478257769910819945_n.jpg?stp=dst-jpg_p320x320&_nc_cat=107&ccb=1-7&_nc_sid=fe8171&_nc_ohc=hQHVtoG5uocAX9gs6tJ&_nc_ht=scontent.fhan14-1.fna&oh=00_AfALvp6I4Fuw4JBwcoRYBgBZrW6Q8V_H5o3ZQkEdhmGCiQ&oe=650B959B',
    },
    {
      uri: 'https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-1/371353182_1701935433608526_1478257769910819945_n.jpg?stp=dst-jpg_p320x320&_nc_cat=107&ccb=1-7&_nc_sid=fe8171&_nc_ohc=hQHVtoG5uocAX9gs6tJ&_nc_ht=scontent.fhan14-1.fna&oh=00_AfALvp6I4Fuw4JBwcoRYBgBZrW6Q8V_H5o3ZQkEdhmGCiQ&oe=650B959B',
    },
    {
      uri: 'https://scontent.fhan14-4.fna.fbcdn.net/v/t39.30808-6/327220704_920911562441498_5253036051895912909_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=1b51e3&_nc_ohc=y-HzMnxButYAX9KWsIJ&_nc_ht=scontent.fhan14-4.fna&oh=00_AfBIJ9_vDPAY6B9Mk3XvtdhbUvIvdRMCW6poCy-0FzjpHA&oe=650869B9',
    },
    {
      uri: 'https://zpsocial-f54-org.zadn.vn/4645a09e3259d3078a48.jpg',
    },
    {
      uri: 'https://scontent.fhan14-4.fna.fbcdn.net/v/t39.30808-6/327220704_920911562441498_5253036051895912909_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=1b51e3&_nc_ohc=y-HzMnxButYAX9KWsIJ&_nc_ht=scontent.fhan14-4.fna&oh=00_AfBIJ9_vDPAY6B9Mk3XvtdhbUvIvdRMCW6poCy-0FzjpHA&oe=650869B9',
    },
    {
      uri: 'https://scontent.fhan14-4.fna.fbcdn.net/v/t39.30808-6/327220704_920911562441498_5253036051895912909_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=1b51e3&_nc_ohc=y-HzMnxButYAX9KWsIJ&_nc_ht=scontent.fhan14-4.fna&oh=00_AfBIJ9_vDPAY6B9Mk3XvtdhbUvIvdRMCW6poCy-0FzjpHA&oe=650869B9',
    },
    {
      uri: 'https://scontent.fhan14-4.fna.fbcdn.net/v/t39.30808-6/327220704_920911562441498_5253036051895912909_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=1b51e3&_nc_ohc=y-HzMnxButYAX9KWsIJ&_nc_ht=scontent.fhan14-4.fna&oh=00_AfBIJ9_vDPAY6B9Mk3XvtdhbUvIvdRMCW6poCy-0FzjpHA&oe=650869B9',
    },
    {
      uri: 'https://scontent.fhan14-4.fna.fbcdn.net/v/t39.30808-6/327220704_920911562441498_5253036051895912909_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=1b51e3&_nc_ohc=y-HzMnxButYAX9KWsIJ&_nc_ht=scontent.fhan14-4.fna&oh=00_AfBIJ9_vDPAY6B9Mk3XvtdhbUvIvdRMCW6poCy-0FzjpHA&oe=650869B9',
    },
    {
      uri: 'https://scontent.fhan14-4.fna.fbcdn.net/v/t39.30808-6/327220704_920911562441498_5253036051895912909_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=1b51e3&_nc_ohc=y-HzMnxButYAX9KWsIJ&_nc_ht=scontent.fhan14-4.fna&oh=00_AfBIJ9_vDPAY6B9Mk3XvtdhbUvIvdRMCW6poCy-0FzjpHA&oe=650869B9',
    },
  ];

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const bottomSheetModalRef = useRef(null);
  const bottomSheetModalRef1 = useRef(null);
  const snapPoints = useMemo(() => ['50%', '50%'], []);
  const openBottomSheet1 = () => {
    Animated.timing(overlayOpacity, {
      toValue: 0.5,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setIsBottomSheetOpen(true);
      // bottomSheetModalRef1.current?.present();
    });
  };
  const closeBottomSheet1 = () => {
    Animated.timing(overlayOpacity, {
      toValue: 0,
      duration: 50,
      useNativeDriver: false,
    }).start(() => {
      bottomSheetModalRef1.current?.close();
      setIsBottomSheetOpen(false);
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
  };
  const handleSheetChanges = index => {
    if (index === -1) {
      setIsBottomSheetOpen(false);
    } else {
      setIsBottomSheetOpen(true);
    }
  };
  return (
    
      <SafeAreaView style={styles.container}>
       <BottomSheetModalProvider>
          <View
            style={{
              height: 50,
              paddingHorizontal: 15,
              paddingVertical: 10,
              backgroundColor: 'white',
              // marginTop: insets.top,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name={'arrow-back-outline'} size={30} color={'black'} />
            </TouchableOpacity>
            <Text style={{color: 'black', fontSize: 20}}>TestScreen</Text>
            <Ionicons name={'add-circle-sharp'} size={30} color={'white'} />
          </View>
          <ScrollView style={{width: '100%'}}>
          <View
            style={{
              marginTop: 5,
              padding: 10,
              borderRadius: 5,
              backgroundColor: 'white',
              width: '100%',
            }}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Image
                  source={{
                    uri: 'https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-1/371353182_1701935433608526_1478257769910819945_n.jpg?stp=dst-jpg_p320x320&_nc_cat=107&ccb=1-7&_nc_sid=fe8171&_nc_ohc=hQHVtoG5uocAX9gs6tJ&_nc_ht=scontent.fhan14-1.fna&oh=00_AfALvp6I4Fuw4JBwcoRYBgBZrW6Q8V_H5o3ZQkEdhmGCiQ&oe=650B959B',
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
                <Text style={{color: 'black', fontSize: 18}}>
                  Nguyễn Chí Nghĩa
                </Text>
                <Text style={{color: 'gray'}}>10/9 lúc 08:30</Text>
              </View>
              <View>
                <TouchableOpacity onPress={openBottomSheet}>
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
                style={styles.text}
                numberOfLines={expanded ? undefined : 3}>
                {content}
              </Text>
              {content.length > maxChars && (
                <TouchableOpacity onPress={toggleContent}>
                  <Text style={styles.readMore}>
                    {expanded ? 'Rút gọn' : 'Xem thêm'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={{height: 300}}>
              {/* <ImageAlbum images={images} /> */}
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity>
                <View style={{flexDirection: 'row', marginRight: 10}}>
                  <Ionicons name={'heart-sharp'} size={25} color={'red'} />
                  <Text style={{color: 'black', fontSize: 17}}>10</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={openBottomSheet1}>
                <View style={{flexDirection: 'row'}}>
                  <Ionicons
                    name={'chatbox-ellipses-outline'}
                    size={25}
                    color={'black'}
                  />
                  <Text style={{color: 'black', fontSize: 17}}>10</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        {isBottomSheetOpen && (
          
          <Animated.View
            style={[styles.overlay]}
            // onTouchStart={handleOverlayPress} // Bắt sự kiện nhấn lên overlay
          >
          
           <View
            style={{
              width: '100%',
              height: '91%',
              backgroundColor: 'white',
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              padding: 20,
              borderWidth:3
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
             
                marginTop:50
              }}>
              <Icons name={'close'} size={21} color={'rgba(0, 0, 0, 0)'} />
              <Text style={{fontSize: 20, color: 'black', textAlign: 'center'}}>
                Bình luận
              </Text>
              <TouchableOpacity onPress={handleOverlayPress}>
                <Icons name={'close'} size={24} color={'black'} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row'}}>
                <Ionicons name={'heart-sharp'} size={25} color={'red'} />
                <Text style={{color: 'black', fontSize: 19}}>10</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={{color: 'gray', fontSize: 14}}>Thích bởi</Text>
                <Image
                  source={{
                    uri: 'https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-1/371353182_1701935433608526_1478257769910819945_n.jpg?stp=dst-jpg_p320x320&_nc_cat=107&ccb=1-7&_nc_sid=fe8171&_nc_ohc=hQHVtoG5uocAX9gs6tJ&_nc_ht=scontent.fhan14-1.fna&oh=00_AfALvp6I4Fuw4JBwcoRYBgBZrW6Q8V_H5o3ZQkEdhmGCiQ&oe=650B959B',
                  }}
                  style={{
                    width: 20,
                    height: 20,
                    marginHorizontal: 5,
                    borderRadius: 70,
                  }}
                />
              </View>
            </View>
            <View
              style={{
                marginVertical: 10,
              }}>
              <Text style={{color: 'gray'}}>Có 10 bình luận</Text>
            </View>
            <ScrollView>
              <View style={{marginBottom: 20}}>
                <View style={{flexDirection: 'row'}}>
                  <View>
                    <Image
                      source={{
                        uri: 'https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-1/371353182_1701935433608526_1478257769910819945_n.jpg?stp=dst-jpg_p320x320&_nc_cat=107&ccb=1-7&_nc_sid=fe8171&_nc_ohc=hQHVtoG5uocAX9gs6tJ&_nc_ht=scontent.fhan14-1.fna&oh=00_AfALvp6I4Fuw4JBwcoRYBgBZrW6Q8V_H5o3ZQkEdhmGCiQ&oe=650B959B',
                      }}
                      style={{
                        width: 35,
                        height: 35,
                        marginRight: 10,
                        borderRadius: 70,
                      }}
                    />
                  </View>
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        color: 'black',
                        marginBottom: 5,
                        fontSize: 16,
                        fontWeight: 500,
                      }}>
                      Nguyễn Chí Nghĩa
                    </Text>
                    <Text style={{color: 'black', fontSize: 15}}>
                      Ảnh đẹp và bổ mắt đấy
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity onPress={openBottomSheet}>
                      <Ionicons
                        name={'heart-outline'}
                        size={25}
                        color={'gray'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{color: 'gray', marginLeft: 45}}>
                      2 ngày trước
                    </Text>
                    <Text
                      style={{color: 'black', marginLeft: 5, fontWeight: 600}}>
                      Trả lời
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <Text style={{color: 'gray', fontSize: 14}}>
                      1 lượt thích
                    </Text>
                    <Image
                      source={{
                        uri: 'https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-1/371353182_1701935433608526_1478257769910819945_n.jpg?stp=dst-jpg_p320x320&_nc_cat=107&ccb=1-7&_nc_sid=fe8171&_nc_ohc=hQHVtoG5uocAX9gs6tJ&_nc_ht=scontent.fhan14-1.fna&oh=00_AfALvp6I4Fuw4JBwcoRYBgBZrW6Q8V_H5o3ZQkEdhmGCiQ&oe=650B959B',
                      }}
                      style={{
                        width: 15,
                        height: 15,
                        marginHorizontal: 5,
                        marginVertical: 2,
                        borderRadius: 70,
                      }}
                    />
                  </View>
                </View>
              </View>
              <View style={{marginBottom: 20}}>
                <View style={{flexDirection: 'row'}}>
                  <View>
                    <Image
                      source={{
                        uri: 'https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-1/371353182_1701935433608526_1478257769910819945_n.jpg?stp=dst-jpg_p320x320&_nc_cat=107&ccb=1-7&_nc_sid=fe8171&_nc_ohc=hQHVtoG5uocAX9gs6tJ&_nc_ht=scontent.fhan14-1.fna&oh=00_AfALvp6I4Fuw4JBwcoRYBgBZrW6Q8V_H5o3ZQkEdhmGCiQ&oe=650B959B',
                      }}
                      style={{
                        width: 35,
                        height: 35,
                        marginRight: 10,
                        borderRadius: 70,
                      }}
                    />
                  </View>
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        color: 'black',
                        marginBottom: 5,
                        fontSize: 16,
                        fontWeight: 500,
                      }}>
                      Nguyễn Chí Nghĩa
                    </Text>
                    <Text style={{color: 'black', fontSize: 15}}>
                      Ảnh đẹp và bổ mắt đấy
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity onPress={openBottomSheet}>
                      <Ionicons
                        name={'heart-outline'}
                        size={25}
                        color={'gray'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{color: 'gray', marginLeft: 45}}>
                      2 ngày trước
                    </Text>
                    <Text
                      style={{color: 'black', marginLeft: 5, fontWeight: 600}}>
                      Trả lời
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <Text style={{color: 'gray', fontSize: 14}}>
                      1 lượt thích
                    </Text>
                    <Image
                      source={{
                        uri: 'https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-1/371353182_1701935433608526_1478257769910819945_n.jpg?stp=dst-jpg_p320x320&_nc_cat=107&ccb=1-7&_nc_sid=fe8171&_nc_ohc=hQHVtoG5uocAX9gs6tJ&_nc_ht=scontent.fhan14-1.fna&oh=00_AfALvp6I4Fuw4JBwcoRYBgBZrW6Q8V_H5o3ZQkEdhmGCiQ&oe=650B959B',
                      }}
                      style={{
                        width: 15,
                        height: 15,
                        marginHorizontal: 5,
                        marginVertical: 2,
                        borderRadius: 70,
                      }}
                    />
                  </View>
                </View>
              </View>
              <View style={{marginBottom: 20}}>
                <View style={{flexDirection: 'row'}}>
                  <View>
                    <Image
                      source={{
                        uri: 'https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-1/371353182_1701935433608526_1478257769910819945_n.jpg?stp=dst-jpg_p320x320&_nc_cat=107&ccb=1-7&_nc_sid=fe8171&_nc_ohc=hQHVtoG5uocAX9gs6tJ&_nc_ht=scontent.fhan14-1.fna&oh=00_AfALvp6I4Fuw4JBwcoRYBgBZrW6Q8V_H5o3ZQkEdhmGCiQ&oe=650B959B',
                      }}
                      style={{
                        width: 35,
                        height: 35,
                        marginRight: 10,
                        borderRadius: 70,
                      }}
                    />
                  </View>
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        color: 'black',
                        marginBottom: 5,
                        fontSize: 16,
                        fontWeight: 500,
                      }}>
                      Nguyễn Chí Nghĩa
                    </Text>
                    <Text style={{color: 'black', fontSize: 15}}>
                      Ảnh đẹp và bổ mắt đấy
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity onPress={openBottomSheet}>
                      <Ionicons
                        name={'heart-outline'}
                        size={25}
                        color={'gray'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{color: 'gray', marginLeft: 45}}>
                      2 ngày trước
                    </Text>
                    <Text
                      style={{color: 'black', marginLeft: 5, fontWeight: 600}}>
                      Trả lời
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <Text style={{color: 'gray', fontSize: 14}}>
                      1 lượt thích
                    </Text>
                    <Image
                      source={{
                        uri: 'https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-1/371353182_1701935433608526_1478257769910819945_n.jpg?stp=dst-jpg_p320x320&_nc_cat=107&ccb=1-7&_nc_sid=fe8171&_nc_ohc=hQHVtoG5uocAX9gs6tJ&_nc_ht=scontent.fhan14-1.fna&oh=00_AfALvp6I4Fuw4JBwcoRYBgBZrW6Q8V_H5o3ZQkEdhmGCiQ&oe=650B959B',
                      }}
                      style={{
                        width: 15,
                        height: 15,
                        marginHorizontal: 5,
                        marginVertical: 2,
                        borderRadius: 70,
                      }}
                    />
                  </View>
                </View>
              </View>
              <View style={{marginBottom: 20}}>
                <View style={{flexDirection: 'row'}}>
                  <View>
                    <Image
                      source={{
                        uri: 'https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-1/371353182_1701935433608526_1478257769910819945_n.jpg?stp=dst-jpg_p320x320&_nc_cat=107&ccb=1-7&_nc_sid=fe8171&_nc_ohc=hQHVtoG5uocAX9gs6tJ&_nc_ht=scontent.fhan14-1.fna&oh=00_AfALvp6I4Fuw4JBwcoRYBgBZrW6Q8V_H5o3ZQkEdhmGCiQ&oe=650B959B',
                      }}
                      style={{
                        width: 35,
                        height: 35,
                        marginRight: 10,
                        borderRadius: 70,
                      }}
                    />
                  </View>
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        color: 'black',
                        marginBottom: 5,
                        fontSize: 16,
                        fontWeight: 500,
                      }}>
                      Nguyễn Chí Nghĩa
                    </Text>
                    <Text style={{color: 'black', fontSize: 15}}>
                      Ảnh đẹp và bổ mắt đấy
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity onPress={openBottomSheet}>
                      <Ionicons
                        name={'heart-outline'}
                        size={25}
                        color={'gray'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{color: 'gray', marginLeft: 45}}>
                      2 ngày trước
                    </Text>
                    <Text
                      style={{color: 'black', marginLeft: 5, fontWeight: 600}}>
                      Trả lời
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <Text style={{color: 'gray', fontSize: 14}}>
                      1 lượt thích
                    </Text>
                    <Image
                      source={{
                        uri: 'https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-1/371353182_1701935433608526_1478257769910819945_n.jpg?stp=dst-jpg_p320x320&_nc_cat=107&ccb=1-7&_nc_sid=fe8171&_nc_ohc=hQHVtoG5uocAX9gs6tJ&_nc_ht=scontent.fhan14-1.fna&oh=00_AfALvp6I4Fuw4JBwcoRYBgBZrW6Q8V_H5o3ZQkEdhmGCiQ&oe=650B959B',
                      }}
                      style={{
                        width: 15,
                        height: 15,
                        marginHorizontal: 5,
                        marginVertical: 2,
                        borderRadius: 70,
                      }}
                    />
                  </View>
                </View>
              </View>
              <View style={{marginBottom: 20}}>
                <View style={{flexDirection: 'row'}}>
                  <View>
                    <Image
                      source={{
                        uri: 'https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-1/371353182_1701935433608526_1478257769910819945_n.jpg?stp=dst-jpg_p320x320&_nc_cat=107&ccb=1-7&_nc_sid=fe8171&_nc_ohc=hQHVtoG5uocAX9gs6tJ&_nc_ht=scontent.fhan14-1.fna&oh=00_AfALvp6I4Fuw4JBwcoRYBgBZrW6Q8V_H5o3ZQkEdhmGCiQ&oe=650B959B',
                      }}
                      style={{
                        width: 35,
                        height: 35,
                        marginRight: 10,
                        borderRadius: 70,
                      }}
                    />
                  </View>
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        color: 'black',
                        marginBottom: 5,
                        fontSize: 16,
                        fontWeight: 500,
                      }}>
                      Nguyễn Chí Nghĩa
                    </Text>
                    <Text style={{color: 'black', fontSize: 15}}>
                      Ảnh đẹp và bổ mắt đấy
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity onPress={openBottomSheet}>
                      <Ionicons
                        name={'heart-outline'}
                        size={25}
                        color={'gray'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{color: 'gray', marginLeft: 45}}>
                      2 ngày trước
                    </Text>
                    <Text
                      style={{color: 'black', marginLeft: 5, fontWeight: 600}}>
                      Trả lời
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <Text style={{color: 'gray', fontSize: 14}}>
                      1 lượt thích
                    </Text>
                    <Image
                      source={{
                        uri: 'https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-1/371353182_1701935433608526_1478257769910819945_n.jpg?stp=dst-jpg_p320x320&_nc_cat=107&ccb=1-7&_nc_sid=fe8171&_nc_ohc=hQHVtoG5uocAX9gs6tJ&_nc_ht=scontent.fhan14-1.fna&oh=00_AfALvp6I4Fuw4JBwcoRYBgBZrW6Q8V_H5o3ZQkEdhmGCiQ&oe=650B959B',
                      }}
                      style={{
                        width: 15,
                        height: 15,
                        marginHorizontal: 5,
                        marginVertical: 2,
                        borderRadius: 70,
                      }}
                    />
                  </View>
                </View>
              </View>
              <View style={{marginBottom: 20}}>
                <View style={{flexDirection: 'row'}}>
                  <View>
                    <Image
                      source={{
                        uri: 'https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-1/371353182_1701935433608526_1478257769910819945_n.jpg?stp=dst-jpg_p320x320&_nc_cat=107&ccb=1-7&_nc_sid=fe8171&_nc_ohc=hQHVtoG5uocAX9gs6tJ&_nc_ht=scontent.fhan14-1.fna&oh=00_AfALvp6I4Fuw4JBwcoRYBgBZrW6Q8V_H5o3ZQkEdhmGCiQ&oe=650B959B',
                      }}
                      style={{
                        width: 35,
                        height: 35,
                        marginRight: 10,
                        borderRadius: 70,
                      }}
                    />
                  </View>
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        color: 'black',
                        marginBottom: 5,
                        fontSize: 16,
                        fontWeight: 500,
                      }}>
                      Nguyễn Chí Nghĩa
                    </Text>
                    <Text style={{color: 'black', fontSize: 15}}>
                      Ảnh đẹp và bổ mắt đấy
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity onPress={openBottomSheet}>
                      <Ionicons
                        name={'heart-outline'}
                        size={25}
                        color={'gray'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{color: 'gray', marginLeft: 45}}>
                      2 ngày trước
                    </Text>
                    <Text
                      style={{color: 'black', marginLeft: 5, fontWeight: 600}}>
                      Trả lời
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <Text style={{color: 'gray', fontSize: 14}}>
                      1 lượt thích
                    </Text>
                    <Image
                      source={{
                        uri: 'https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-1/371353182_1701935433608526_1478257769910819945_n.jpg?stp=dst-jpg_p320x320&_nc_cat=107&ccb=1-7&_nc_sid=fe8171&_nc_ohc=hQHVtoG5uocAX9gs6tJ&_nc_ht=scontent.fhan14-1.fna&oh=00_AfALvp6I4Fuw4JBwcoRYBgBZrW6Q8V_H5o3ZQkEdhmGCiQ&oe=650B959B',
                      }}
                      style={{
                        width: 15,
                        height: 15,
                        marginHorizontal: 5,
                        marginVertical: 2,
                        borderRadius: 70,
                      }}
                    />
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
          <View
            style={{
              borderWidth: 0.5,
              flexDirection: 'row',
              width: '100%',
              height: '9%',
            }}>
            <TextInput
              placeholder="Nhập bình luận"
              placeholderTextColor={'gray'}
              style={{width: '90%'}}
            />
            <Ionicons
              style={{marginVertical: 10}}
              name={'send-sharp'}
              size={25}
              color={'gray'}
            />
          </View>
         
            </Animated.View>
          
        )}
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
            <TouchableOpacity>
              <View style={{flexDirection: 'row', marginBottom: 25}}>
                <View>
                  <Ionicons name={'trash-outline'} size={37} color={'gray'} />
                </View>
                <View style={{marginLeft: 12}}>
                  <Text style={{color: 'black', fontSize: 17, fontWeight: 300}}>
                    Xóa bài đăng
                  </Text>
                  <Text style={{color: 'gray', fontSize: 14}}>
                    Bài đăng này sẽ bị xóa khỏi nhật ký
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={{flexDirection: 'row'}}>
                <View>
                  <Icon name="warning" size={37} color="gray" />
                </View>
                <View style={{marginLeft: 12}}>
                  <Text
                    style={{
                      color: 'black',
                      marginTop: 5,
                      fontSize: 17,
                      fontWeight: 300,
                    }}>
                    Báo xấu
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </BottomSheetModal>
        <BottomSheetModal
          ref={bottomSheetModalRef1}
          index={1}
          onChange={handleSheetChanges}
          snapPoints={['50%', '98%']}>
          <View
            style={{
              width: '100%',
              height: '91%',
              backgroundColor: 'white',
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              padding: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Icons name={'close'} size={21} color={'rgba(0, 0, 0, 0)'} />
              <Text style={{fontSize: 20, color: 'black', textAlign: 'center'}}>
                Bình luận
              </Text>
              <TouchableOpacity onPress={handleOverlayPress}>
                <Icons name={'close'} size={24} color={'black'} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row'}}>
                <Ionicons name={'heart-sharp'} size={25} color={'red'} />
                <Text style={{color: 'black', fontSize: 19}}>10</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={{color: 'gray', fontSize: 14}}>Thích bởi</Text>
                <Image
                  source={{
                    uri: 'https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-1/371353182_1701935433608526_1478257769910819945_n.jpg?stp=dst-jpg_p320x320&_nc_cat=107&ccb=1-7&_nc_sid=fe8171&_nc_ohc=hQHVtoG5uocAX9gs6tJ&_nc_ht=scontent.fhan14-1.fna&oh=00_AfALvp6I4Fuw4JBwcoRYBgBZrW6Q8V_H5o3ZQkEdhmGCiQ&oe=650B959B',
                  }}
                  style={{
                    width: 20,
                    height: 20,
                    marginHorizontal: 5,
                    borderRadius: 70,
                  }}
                />
              </View>
            </View>
            <View
              style={{
                marginVertical: 10,
              }}>
              <Text style={{color: 'gray'}}>Có 10 bình luận</Text>
            </View>
            <ScrollView>
              <View style={{marginBottom: 20}}>
                <View style={{flexDirection: 'row'}}>
                  <View>
                    <Image
                      source={{
                        uri: 'https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-1/371353182_1701935433608526_1478257769910819945_n.jpg?stp=dst-jpg_p320x320&_nc_cat=107&ccb=1-7&_nc_sid=fe8171&_nc_ohc=hQHVtoG5uocAX9gs6tJ&_nc_ht=scontent.fhan14-1.fna&oh=00_AfALvp6I4Fuw4JBwcoRYBgBZrW6Q8V_H5o3ZQkEdhmGCiQ&oe=650B959B',
                      }}
                      style={{
                        width: 35,
                        height: 35,
                        marginRight: 10,
                        borderRadius: 70,
                      }}
                    />
                  </View>
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        color: 'black',
                        marginBottom: 5,
                        fontSize: 16,
                        fontWeight: 500,
                      }}>
                      Nguyễn Chí Nghĩa
                    </Text>
                    <Text style={{color: 'black', fontSize: 15}}>
                      Ảnh đẹp và bổ mắt đấy
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity onPress={openBottomSheet}>
                      <Ionicons
                        name={'heart-outline'}
                        size={25}
                        color={'gray'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{color: 'gray', marginLeft: 45}}>
                      2 ngày trước
                    </Text>
                    <Text
                      style={{color: 'black', marginLeft: 5, fontWeight: 600}}>
                      Trả lời
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <Text style={{color: 'gray', fontSize: 14}}>
                      1 lượt thích
                    </Text>
                    <Image
                      source={{
                        uri: 'https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-1/371353182_1701935433608526_1478257769910819945_n.jpg?stp=dst-jpg_p320x320&_nc_cat=107&ccb=1-7&_nc_sid=fe8171&_nc_ohc=hQHVtoG5uocAX9gs6tJ&_nc_ht=scontent.fhan14-1.fna&oh=00_AfALvp6I4Fuw4JBwcoRYBgBZrW6Q8V_H5o3ZQkEdhmGCiQ&oe=650B959B',
                      }}
                      style={{
                        width: 15,
                        height: 15,
                        marginHorizontal: 5,
                        marginVertical: 2,
                        borderRadius: 70,
                      }}
                    />
                  </View>
                </View>
              </View>
              <View style={{marginBottom: 20}}>
                <View style={{flexDirection: 'row'}}>
                  <View>
                    <Image
                      source={{
                        uri: 'https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-1/371353182_1701935433608526_1478257769910819945_n.jpg?stp=dst-jpg_p320x320&_nc_cat=107&ccb=1-7&_nc_sid=fe8171&_nc_ohc=hQHVtoG5uocAX9gs6tJ&_nc_ht=scontent.fhan14-1.fna&oh=00_AfALvp6I4Fuw4JBwcoRYBgBZrW6Q8V_H5o3ZQkEdhmGCiQ&oe=650B959B',
                      }}
                      style={{
                        width: 35,
                        height: 35,
                        marginRight: 10,
                        borderRadius: 70,
                      }}
                    />
                  </View>
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        color: 'black',
                        marginBottom: 5,
                        fontSize: 16,
                        fontWeight: 500,
                      }}>
                      Nguyễn Chí Nghĩa
                    </Text>
                    <Text style={{color: 'black', fontSize: 15}}>
                      Ảnh đẹp và bổ mắt đấy
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity onPress={openBottomSheet}>
                      <Ionicons
                        name={'heart-outline'}
                        size={25}
                        color={'gray'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{color: 'gray', marginLeft: 45}}>
                      2 ngày trước
                    </Text>
                    <Text
                      style={{color: 'black', marginLeft: 5, fontWeight: 600}}>
                      Trả lời
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <Text style={{color: 'gray', fontSize: 14}}>
                      1 lượt thích
                    </Text>
                    <Image
                      source={{
                        uri: 'https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-1/371353182_1701935433608526_1478257769910819945_n.jpg?stp=dst-jpg_p320x320&_nc_cat=107&ccb=1-7&_nc_sid=fe8171&_nc_ohc=hQHVtoG5uocAX9gs6tJ&_nc_ht=scontent.fhan14-1.fna&oh=00_AfALvp6I4Fuw4JBwcoRYBgBZrW6Q8V_H5o3ZQkEdhmGCiQ&oe=650B959B',
                      }}
                      style={{
                        width: 15,
                        height: 15,
                        marginHorizontal: 5,
                        marginVertical: 2,
                        borderRadius: 70,
                      }}
                    />
                  </View>
                </View>
              </View>
              <View style={{marginBottom: 20}}>
                <View style={{flexDirection: 'row'}}>
                  <View>
                    <Image
                      source={{
                        uri: 'https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-1/371353182_1701935433608526_1478257769910819945_n.jpg?stp=dst-jpg_p320x320&_nc_cat=107&ccb=1-7&_nc_sid=fe8171&_nc_ohc=hQHVtoG5uocAX9gs6tJ&_nc_ht=scontent.fhan14-1.fna&oh=00_AfALvp6I4Fuw4JBwcoRYBgBZrW6Q8V_H5o3ZQkEdhmGCiQ&oe=650B959B',
                      }}
                      style={{
                        width: 35,
                        height: 35,
                        marginRight: 10,
                        borderRadius: 70,
                      }}
                    />
                  </View>
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        color: 'black',
                        marginBottom: 5,
                        fontSize: 16,
                        fontWeight: 500,
                      }}>
                      Nguyễn Chí Nghĩa
                    </Text>
                    <Text style={{color: 'black', fontSize: 15}}>
                      Ảnh đẹp và bổ mắt đấy
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity onPress={openBottomSheet}>
                      <Ionicons
                        name={'heart-outline'}
                        size={25}
                        color={'gray'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{color: 'gray', marginLeft: 45}}>
                      2 ngày trước
                    </Text>
                    <Text
                      style={{color: 'black', marginLeft: 5, fontWeight: 600}}>
                      Trả lời
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <Text style={{color: 'gray', fontSize: 14}}>
                      1 lượt thích
                    </Text>
                    <Image
                      source={{
                        uri: 'https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-1/371353182_1701935433608526_1478257769910819945_n.jpg?stp=dst-jpg_p320x320&_nc_cat=107&ccb=1-7&_nc_sid=fe8171&_nc_ohc=hQHVtoG5uocAX9gs6tJ&_nc_ht=scontent.fhan14-1.fna&oh=00_AfALvp6I4Fuw4JBwcoRYBgBZrW6Q8V_H5o3ZQkEdhmGCiQ&oe=650B959B',
                      }}
                      style={{
                        width: 15,
                        height: 15,
                        marginHorizontal: 5,
                        marginVertical: 2,
                        borderRadius: 70,
                      }}
                    />
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
          <View
            style={{
              borderWidth: 0.5,
              flexDirection: 'row',
              width: '100%',
              height: '9%',
            }}>
            <TextInput
              placeholder="Nhập bình luận"
              placeholderTextColor={'gray'}
              style={{width: '90%'}}
            />
            <Ionicons
              style={{marginVertical: 10}}
              name={'send-sharp'}
              size={25}
              color={'gray'}
            />
          </View>
        </BottomSheetModal>
         </BottomSheetModalProvider>
      </SafeAreaView>
   
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  text: {
    color: 'black',
    marginHorizontal: 10,
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
    backgroundColor: 'white', // Màu nền mờ (rgba để có độ trong suốt)
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:1,
  
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
    top: 20,
    right: 20,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
export default TestScreen;
