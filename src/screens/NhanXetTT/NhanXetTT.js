import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, TextInput, ScrollView} from 'react-native';
import {Sizes} from '../../utils/resource';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcon from'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';

const NhanXetTT = ({navigation}) => {
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
          Nhận Xét
        </Text>
      
          <Ionicons name={'chevron-back-outline'} size={30} color={'#0298D3'} />
        

      </View>
      <View style={styles.date}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          
            
            height:40
          }}>
          <Text
          allowFontScaling={false}
            style={{color: 'black', marginTop: 5, fontSize: 15, marginLeft: 5}}>
            Nhận xét hàng ngày
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomColor: '#0298D3',
            borderBottomWidth: 1,
          }}>
          <Text
          allowFontScaling={false}
            style={{
              color: 'black',

              fontSize: 15,
              marginTop: 5,
              marginLeft: 5,
            }}>
            Nhận xét hàng tuần
          </Text>
        </View>
      </View>
      <View style={{
          paddingLeft:10,
          flexDirection:'row',
         
          }}>
                  <Ionicons name={'calendar-sharp'} size={20} color={'#0298D3'} />
            <Text allowFontScaling={false} style={{ fontSize:15,width:'60%', fontWeight:600}}>Bạn đang xem nhận xét từ ngày 11/09/2023  </Text>
        </View>
      <View style={styles.input}>
      <Ionicons name={'search-outline'} size={25} color={'black'} />

        <TextInput
  allowFontScaling={false}
          placeholder="tìm kiếm"
          
        />
        
      </View>
      <View style={{
          paddingLeft:10,
          flexDirection:'row',
         
          }}>
        <MaterialIcon
              name="school"
              size={30}
              color="black"
              
            />
            <Text allowFontScaling={false} style={{marginTop:5, marginLeft:5, fontSize:15, fontWeight:600}}>Lớp: Mầm 2023</Text>
        </View>
        <View style={{
          paddingLeft:10,
          flexDirection:'row',
         
          }}>
        <MaterialIcon
              name="people"
              size={30}
              color="black"
              
            />
            <Text allowFontScaling={false} style={{marginTop:5, marginLeft:5, fontSize:15, fontWeight:600}}>Số học sinh: 10</Text>
        </View>
        <ScrollView>
        <View style={styles.list}>
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
            
            <View
              style={{
                flexDirection: 'row',
                height: 40,
              }}>
              <Image
                source={require('../../utils/Images/KIDKUN_final.png')}
                style={styles.image}
              />
              <View style={styles.content}>
                <Text allowFontScaling={false} style={{color: 'black', fontWeight: '500'}}>
                  1.Phạm Đình Phong
                </Text>
                
              </View>
              {/* <View
                style={{
                  flex: 1,
                  backgroundColor: '#0298D3',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 10,
                  marginVertical: 15,
                  borderRadius: 14,
                }}>
                <Text style={{color: 'white', fontWeight: '500'}}>Bé trai</Text>
              </View> */}
            </View>
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 10,
                flexDirection: 'row',
              }}>
             
              
            </View>
          </View>
        </View>
        <View style={styles.list}>
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
            
            <View
              style={{
                flexDirection: 'row',
                height: 40,
              }}>
              <Image
                source={require('../../utils/Images/KIDKUN_final.png')}
                style={styles.image}
              />
              <View style={styles.content}>
                <Text allowFontScaling={false} style={{color: 'black', fontWeight: '500'}}>
                  1.Phạm Đình Phong
                </Text>
                
              </View>
              {/* <View
                style={{
                  flex: 1,
                  backgroundColor: '#0298D3',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 10,
                  marginVertical: 15,
                  borderRadius: 14,
                }}>
                <Text style={{color: 'white', fontWeight: '500'}}>Bé trai</Text>
              </View> */}
            </View>
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 10,
                flexDirection: 'row',
              }}>
             
              
            </View>
          </View>
        </View>
        <View style={styles.list}>
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
            
            <View
              style={{
                flexDirection: 'row',
                height: 40,
              }}>
              <Image
                source={require('../../utils/Images/KIDKUN_final.png')}
                style={styles.image}
              />
              <View style={styles.content}>
                <Text style={{color: 'black', fontWeight: '500'}}>
                  1.Phạm Đình Phong
                </Text>
                
              </View>
              {/* <View
                style={{
                  flex: 1,
                  backgroundColor: '#0298D3',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 10,
                  marginVertical: 15,
                  borderRadius: 14,
                }}>
                <Text style={{color: 'white', fontWeight: '500'}}>Bé trai</Text>
              </View> */}
            </View>
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 10,
                flexDirection: 'row',
              }}>
             
              
            </View>
          </View>
        </View>
      </ScrollView>
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
    paddingVertical: 5,
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
    
    height: 56,
  },
  content: {
    flex: 2.5,
    justifyContent:'center'
  },
  date: {
    marginVertical: 10,
    marginHorizontal: 7,
    flexDirection: 'row',
  },

});
export default NhanXetTT;
