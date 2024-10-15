import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, TextInput, ScrollView} from 'react-native';
import {Sizes} from '../../utils/resource';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcon from'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';

const DsHocSinh = ({navigation}) => {
  return (
    <SafeAreaView  style={styles.container}>
    
      <View style={styles.header}>
        <TouchableOpacity
      
          onPress={() => navigation.goBack()}>
          <Ionicons name={'chevron-back-outline'} size={30} color={'white'} />
        </TouchableOpacity>
        <Text
          style={{color: 'white',fontWeight:700, fontSize: 20, flex: 1, textAlign: 'center'}}>
          Danh sách học sinh
        </Text>
      
          <Ionicons name={'chevron-back-outline'} size={30} color={'#0298D3'} />
        

      </View>
      <View style={styles.input}>
      <Ionicons name={'search-outline'} size={25} color={'black'} />

        <TextInput

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
            <Text style={{marginTop:5, marginLeft:5, fontSize:15, fontWeight:600}}>Lớp: Mầm 2023</Text>
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
            <Text style={{marginTop:5, marginLeft:5, fontSize:15, fontWeight:600}}>Số học sinh: 10</Text>
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
                height: 'auto',
              }}>
              <Image
                source={require('../../utils/Images/KIDKUN_final.png')}
                style={styles.image}
              />
              <View style={styles.content}>
                <Text style={{color: 'black', fontWeight: '500'}}>
                  1.Phạm Đình Phong
                </Text>
                <Text style={{color: 'gray', fontSize: 12, marginBottom: 5}}>
                  <Icon name="calendar" size={15} color="#EE4B4B" />
                  <Text> Ngày sinh: 27/08/2020</Text>
                </Text>
                <Text style={{color: 'gray', fontSize: 12}}>
                  <Icon name="qrcode" size={16} color="black" />
                  <Text> Mã học sinh: 00001</Text>
                </Text>
              </View>
              <View
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
              </View>
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
                height: 'auto',
              }}>
              <Image
                source={require('../../utils/Images/KIDKUN_final.png')}
                style={styles.image}
              />
              <View style={styles.content}>
                <Text style={{color: 'black', fontWeight: '500'}}>
                  1.Phạm Đình Phong
                </Text>
                <Text style={{color: 'gray', fontSize: 12, marginBottom: 5}}>
                  <Icon name="calendar" size={15} color="#EE4B4B" />
                  <Text> Ngày sinh: 27/08/2020</Text>
                </Text>
                <Text style={{color: 'gray', fontSize: 12}}>
                  <Icon name="qrcode" size={16} color="black" />
                  <Text> Mã học sinh: 00001</Text>
                </Text>
              </View>
              <View
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
              </View>
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
                height: 'auto',
              }}>
              <Image
                source={require('../../utils/Images/KIDKUN_final.png')}
                style={styles.image}
              />
              <View style={styles.content}>
                <Text style={{color: 'black', fontWeight: '500'}}>
                  1.Phạm Đình Phong
                </Text>
                <Text style={{color: 'gray', fontSize: 12, marginBottom: 5}}>
                  <Icon name="calendar" size={15} color="#EE4B4B" />
                  <Text> Ngày sinh: 27/08/2020</Text>
                </Text>
                <Text style={{color: 'gray', fontSize: 12}}>
                  <Icon name="qrcode" size={16} color="black" />
                  <Text> Mã học sinh: 00001</Text>
                </Text>
              </View>
              <View
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
              </View>
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
                height: 'auto',
              }}>
              <Image
                source={require('../../utils/Images/KIDKUN_final.png')}
                style={styles.image}
              />
              <View style={styles.content}>
                <Text style={{color: 'black', fontWeight: '500'}}>
                  1.Phạm Đình Phong
                </Text>
                <Text style={{color: 'gray', fontSize: 12, marginBottom: 5}}>
                  <Icon name="calendar" size={15} color="#EE4B4B" />
                  <Text> Ngày sinh: 27/08/2020</Text>
                </Text>
                <Text style={{color: 'gray', fontSize: 12}}>
                  <Icon name="qrcode" size={16} color="black" />
                  <Text> Mã học sinh: 00001</Text>
                </Text>
              </View>
              <View
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
              </View>
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
                height: 'auto',
              }}>
              <Image
                source={require('../../utils/Images/KIDKUN_final.png')}
                style={styles.image}
              />
              <View style={styles.content}>
                <Text style={{color: 'black', fontWeight: '500'}}>
                  1.Phạm Đình Phong
                </Text>
                <Text style={{color: 'gray', fontSize: 12, marginBottom: 5}}>
                  <Icon name="calendar" size={15} color="#EE4B4B" />
                  <Text> Ngày sinh: 27/08/2020</Text>
                </Text>
                <Text style={{color: 'gray', fontSize: 12}}>
                  <Icon name="qrcode" size={16} color="black" />
                  <Text> Mã học sinh: 00001</Text>
                </Text>
              </View>
              <View
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
              </View>
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
                height: 'auto',
              }}>
              <Image
                source={require('../../utils/Images/KIDKUN_final.png')}
                style={styles.image}
              />
              <View style={styles.content}>
                <Text style={{color: 'black', fontWeight: '500'}}>
                  1.Phạm Đình Phong
                </Text>
                <Text style={{color: 'gray', fontSize: 12, marginBottom: 5}}>
                  <Icon name="calendar" size={15} color="#EE4B4B" />
                  <Text> Ngày sinh: 27/08/2020</Text>
                </Text>
                <Text style={{color: 'gray', fontSize: 12}}>
                  <Icon name="qrcode" size={16} color="black" />
                  <Text> Mã học sinh: 00001</Text>
                </Text>
              </View>
              <View
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
              </View>
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
    height: 'auto',
  },
  content: {
    flex: 2.5,
  },

});
export default DsHocSinh;
