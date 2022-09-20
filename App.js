import React, { Component, createRef, useEffect, useState } from "react";
import { Button, View, Text, FlatList, ScrollView, ActivityIndicator, ImageBackground, StyleSheet, TouchableWithoutFeedback, Appearance, Image, Platform, Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toilet from "./assets/icons/toilet-solid.svg";
import NoToilet from "./assets/icons/no-toilet-solid.svg";
import WheelChair from "./assets/icons/wheelchair-solid.svg";
import Camera from "./assets/icons/camera-solid.svg";
import GenderInclusive from "./assets/icons/transgender-alt-solid.svg";
import GeoLocation from "./assets/icons/geo-location.svg";
import Clock from "./assets/icons/clock.svg";
import LinearGradient from 'react-native-linear-gradient';

const black = '#242325';
const white = '#fff';
const gray = '#d2d2d4';
const lightgray = '#dcdcdc';

const blue = '#23bdb9';
const red = '#e45027';
const darkblue = '#038a9c';
const darkred = '#bd3712';

const styles = StyleSheet.create({
  homeHeader: {
    height: 90, 
    width: '100%', 
    resizeMode: 'contain',
    marginBottom: 8, 
    marginTop: Platform.OS === 'ios' ? 40 : 4,
  },
  holder: {
    width: '100%',
    backgroundColor: white,
  },
  main: {
    width: '100%',
  },
  linearGradient: {
    height: '100%',
    width: '100%',
  },
  homeBuildingDisplay: {
    height: 300,
    marginTop: 15,
    objectFit: 'cover',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  homeBuildingCard: {
    borderBottomStartRadius: 4,
    borderBottomEndRadius: 4,
    borderTopEndRadius: 4,
    borderTopStartRadius: 4,
    width: '98%',
    backgroundColor: white,
    marginBottom: 10,
    padding: 10,
  },
  boxShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  body: {
    fontFamily: "Poppins-Regular",
    color: black,
    fontSize: 13,
  },
  bold: {
    fontWeight: "bold",
  },
  header: {
    fontFamily: "Poppins-SemiBold",
    color: black,
    fontSize: 16,
  },
  align: {
    flexDirection: 'row',
    marginTop: 2,
  },
  leftContainer: {
    width: '44%',
  },
  middleContainer: {
    width: '41%',
  },
  rightContainer: {
    width: '15%',
    flexDirection: 'row-reverse',
  },
  iconContainer: {
    marginLeft: 15,
  },
  detailsContainer: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  addressMargin: {
    marginTop: 6,
    marginLeft: -5,
  },
  timeMargin: {
    marginTop: 6,
    marginLeft: -3,
  },
  geoContainer: {
    marginRight: 6,
  },
  clockContainer: {
    marginRight: 7,
  },
  addressContainer : {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  address: {
    fontSize: 12,
  },
  time: {
    paddingTop: 2,
  },
  header2: {
    fontSize: 14,
    marginBottom: 8,
  },
  header3: {
    fontSize: 13,
  },
  detailPic: {
    height: 210,
    width: '100%',
    resizeMode: 'cover',
  },
  box: {
    backgroundColor: white,
    padding: 15,
    marginBottom: 15,
  },
  titleBox: {
    marginTop: -25,
    borderColor: '#e45027', 
    borderStyle: "solid",
    borderTopWidth: 4,
  },
  twoColumn: {
    height: 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  accessibility: {
    width: 180,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 0,
  },
  headerBottomBorder: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: gray, 
    borderStyle: "solid",
    borderBottomWidth: 2,
  },
  accessibilityRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  detailsIcons: {
    marginRight: 5,
  },
  threeRows: {
    width: 135,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  shortRows: {
    backgroundColor: white,
    padding: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailBox: {
    borderColor: '#23bdb9', 
    borderStyle: "solid",
    borderTopWidth: 4,
  }
})

function YesOrNo(props) {
  const info = props.input;
  if (info) {
    return <Text style={[styles.body, styles.bold]}>Yes</Text>;
  }
  else if (info === null) {
    return <Text style={[styles.body, styles.bold]}>No info</Text>;
  }
  else {
    return <Text style={[styles.body, styles.bold]}>No</Text>;
  }
}

function Handicap(props) {
  const info = props.input;
  if (info) {
    return <Text style={styles.body}>Accessible</Text>;
  }
  else {
    return <Text style={styles.body}>Not accessible</Text>;
  }
}

function WheelChairDisplay(props) {
  const isHandicap = props.isHandicap;
  if (isHandicap) {
    return <WheelChair style={styles.iconContainer} width={20} height={20} color={darkblue} />;
  }
  return null;
}

function CameraDisplay(props) {
  const allowsPhotoghraphy = props.allowsPhotoghraphy;
  if (allowsPhotoghraphy) {
    return <Camera style={styles.iconContainer} width={20} height={20} color={darkblue} />;
  }
  return null;
}

function PhotographyDisplay(props) {
  const allowsPhotoghraphy = props.allowsPhotoghraphy;
  if (allowsPhotoghraphy) {
    return <Text style={styles.body} >Allowed</Text>;
  }
  return <Text style={styles.body} >Not Allowed</Text>;
}

function BathroomDisplay(props) {
  const hasBathroom = props.hasBathroom;
  if (hasBathroom) {
    return <Toilet style={{marginLeft: 10}} width={20} height={20} color={darkblue} />;
  }
  return <NoToilet style={{marginLeft: 7}} width={22} height={20} color={darkred} />;
}

function ListScreen({ route, navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch('https://doors-open.azurewebsites.net/api/values');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {isLoading ? <ActivityIndicator /> : (
        <LinearGradient colors={['#8ccccb', gray, '#d5b8b1']} style={styles.linearGradient} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }}>
        <FlatList
          style={styles.main}
          data={data}
          renderItem={
            ({ item }) =>
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate('Details', {
                    building: item.building,
                    historicalOverview: item.historicalOverview,
                    visitorExperience: item.visitorExperience,
                    imageURL: item.imageURL,
                    fullAddress: item.fullAddress,
                    capacity: item.capacity,
                    startTime: item.startTime,
                    endTime: item.endTime,
                    photography: item.photographyAllowed,
                    wheelchairAccessible: item.wheelchairAccessible,
                    wheelchairAccessibleRestroom: item.wheelchairAccessibleRestroom,
                    restroomsAvailable: item.restroomsAvailable,
                  });
                }}>
                <ImageBackground source={{ uri: item.imageURL }} style={styles.homeBuildingDisplay}>
                  <View style={[styles.homeBuildingCard, styles.boxShadow]}>
                    <Text style={styles.header}>{item.building}</Text>
                    <View style={styles.align}>
                      <View style={styles.leftContainer}>
                        <Text style={styles.body}>{item.address1}</Text>
                      </View>
                      <View style={styles.middleContainer}>
                        <Text style={styles.body}>{item.startTime}-{item.endTime}</Text>
                      </View>
                      <View style={styles.rightContainer}>
                        <BathroomDisplay hasBathroom={item.restroomsAvailable}/>
                        <WheelChairDisplay isHandicap={item.wheelchairAccessible}/>
                        <CameraDisplay allowsPhotoghraphy={item.photographyAllowed}/>
                      </View>
                    </View>
                  </View>
                </ImageBackground>
              </TouchableWithoutFeedback>
          }
        />
        </LinearGradient>
      )}
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  return (
    <ScrollView>
      <LinearGradient colors={['#8ccccb', gray, '#d5b8b1' ]} style={styles.linearGradient} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }}>
      <Image source={{ uri: route.params.imageURL}} style={styles.detailPic}></Image>
      <View style={styles.detailsContainer}>
      <View style={[styles.box, styles.titleBox, styles.boxShadow]}>
        <Text style={styles.header}>{route.params.building}</Text>
        <View style={[styles.align, styles.addressMargin]}>
          <View style={styles.geoContainer}>
            <GeoLocation width={20} height={20} color={darkblue} />
          </View>
          <View style={styles.addressContainer}>
            <Text style={[styles.body, styles.address]}>{route.params.fullAddress}</Text>
          </View>
        </View>
        <View style={[styles.align, styles.timeMargin]}>
          <View style={styles.clockContainer}>
            <Clock width={17} height={20} color={darkblue} />
          </View>
          <View style={styles.addressContainer}>
            <Text style={[styles.body, styles.address, styles.time]}>{route.params.startTime} - {route.params.endTime}</Text>
          </View>
        </View>
      </View>

      <View style={styles.twoColumn}>
        <View style={[styles.box, styles.boxShadow, styles.accessibility]}>
          <View style={styles.headerBottomBorder}>
            <Text style={[styles.header, styles.header2]}>Restroom Access</Text>
          </View>
          <View style={styles.accessibilityRow}>
            <Toilet style={styles.detailsIcons} width={20} height={20} color={darkblue} />
            <Text style={styles.body}>Bathrooms: <YesOrNo input={route.params.restroomsAvailable}/></Text>
          </View>
          <View style={styles.accessibilityRow}>
            <WheelChair style={styles.detailsIcons} width={20} height={20} color={darkblue} />
            <Text style={styles.body}>Wheelchair: <YesOrNo input={route.params.wheelchairAccessibleRestroom}/></Text>
          </View>
          <View style={styles.accessibilityRow}>
            <GenderInclusive style={styles.detailsIcons} width={20} height={20} color={darkblue} />
            <Text style={styles.body}>All-Gender: <YesOrNo input={null}/></Text>
          </View>
        </View>
        <View>
          <View style={styles.threeRows}>
            <View style={[styles.shortRows, styles.boxShadow]}>
              <Text style={[styles.header, styles.header3]}>Capacity</Text>
              <Text style={styles.body}>{route.params.capacity} people</Text>
            </View>
            <View style={[styles.shortRows, styles.boxShadow]}>
              <Text style={[styles.header, styles.header3]}>Handicap</Text>
              <Handicap input={route.params.wheelchairAccessible}/>
            </View>
            <View style={[styles.shortRows, styles.boxShadow]}>
              <Text style={[styles.header, styles.header3]}>Photography</Text>
              <PhotographyDisplay allowsPhotoghraphy={route.params.photography}/>
            </View>
          </View>
        </View>
      </View>
      
      <View style={[styles.box, styles.detailBox, styles.boxShadow]}>
        <Text style={[styles.header, styles.header2]}>Visitor Experience</Text>
        <Text style={styles.body}>{route.params.historicalOverview}</Text>
      </View>
      <View style={[styles.box, styles.detailBox, styles.boxShadow]}>
        <Text style={[styles.header, styles.header2]}>History</Text>
        <Text style={styles.body}>{route.params.visitorExperience}</Text>
      </View>

      </View>
      </LinearGradient>
    </ScrollView>
  );
}

const Stack = createNativeStackNavigator();

function LogoTitle() {
  return (
  <View style={styles.holder}>
  <Image source={require('./assets/images/dooropen.jpg')} style={styles.homeHeader} />
  </View>)
}

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="List">
        <Stack.Screen name="List" component={ListScreen} options={{header: (props) => <LogoTitle {...props}/>}} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;