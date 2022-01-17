import React, { Component, useEffect, useState } from "react";
import { Button, View, Text, FlatList, ScrollView, ActivityIndicator, ImageBackground, StyleSheet, TouchableWithoutFeedback, Appearance, Image, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toilet from "./assets/icons/toilet-solid.svg";
import NoToilet from "./assets/icons/no-toilet-solid.svg";
import WheelChair from "./assets/icons/wheelchair-solid.svg";
import Camera from "./assets/icons/camera-solid.svg";


// const colorScheme = Appearance.getColorScheme(); // this should get light/dark mode from the os i think? would put these palettes in an if statement somewhere for that
const black = '#242325';
const white = '#fff';
const gray = '#d2d2d4';
const lightgray = '#dcdcdc';

const blue = '#23bdb9';
const red = 'e45027';
const darkblue = '#038a9c';
const darkred = '#bd3712';

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

function BathroomDisplay(props) {
  const hasBathroom = props.hasBathroom;
  if (hasBathroom) {
    return <Toilet style={styles.iconContainer} width={20} height={20} color={darkblue} />;
  }
  return <NoToilet width={20} height={20} color={darkblue} />;
}

function BodyText(props) {
  return (
    <Text style={styles.body}>
      {props.children}
    </Text>
  );
}

function HeaderText(props) {
  var output;
  if(props.children.length > 40) {
    output = props.children.substring(0, 40) + "...";
  }
  else {
    output = props.children;
  }

  return (
    <Text style={styles.header}>
      {output}
    </Text>
  );
}

const styles = StyleSheet.create({
  homeHeader: {
    height: 50, 
    width: '100%', 
    resizeMode: 'contain',
    marginBottom: 4, 
    marginTop: Platform.OS === 'ios' ? 40 : 4,
  },
  homeFlatList: {
    width: '100%',
    backgroundColor: gray,
  },
  homeBuildingDisplay: {
    width: '100%',
    height: 300,
    marginTop: 10,
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
  header: {
    fontFamily: "Poppins-SemiBold",
    color: black,
    fontSize: 16,
  },
  header2: {
    fontFamily: "Poppins-SemiBold",
    color: black,
    fontSize: 16,
    marginTop: 15,
    marginLeft: 20,
    marginRight: 15,
    marginBottom: 5,
  },
  header3: {
    fontFamily: "Poppins-SemiBold",
    color: black,
    fontSize: 14,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 15,
    marginBottom: 5,
  },
  header4: {
    fontFamily: "Poppins-SemiBold",
    color: black,
    fontSize: 14,
    marginTop: 10,
    textAlign: "center",

  },
  align: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftContainer: {
    width: '50%',

  },
  rightContainer: {
    width: '50%',
    flexDirection: 'row-reverse',
  },
  iconContainer: {
    marginLeft: 15,
  },
  details: {
    flex: 1, 
  },
  detailPic: {
    height: 210,
    minWidth: '100%',
    resizeMode: 'cover',
  },
  genBody: {
    marginLeft: 20,
    marginRight: 15,
    lineHeight: 20,
    paddingBottom: 10,
  },
  address: {
    marginLeft: 20,
    marginRight: 20,
    lineHeight: 18,
    paddingBottom: 5,
    fontSize: 14,
  },
  detailTitleBox: {
    backgroundColor: white,
    paddingBottom: 10,
    margin: 15,
    marginTop: -25,
    marginBottom: 5,
    borderColor: '#e45027', 
    borderStyle: "solid",
    borderTopWidth: 4,
  },
  detailBox: {
    backgroundColor: white,
    paddingTop: 5,
    paddingBottom: 10,
    margin: 15,
    marginTop: 5,
    marginBottom: 5,
    borderColor: '#23bdb9', 
    borderStyle: "solid",
    borderTopWidth: 4,
  },
  twoColumn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },
  threeRows: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  shortRows: {
    backgroundColor: white,
    marginRight: 15,
    marginTop: 3,
    textAlign: "center",
  }
})

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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {isLoading ? <ActivityIndicator /> : (
        <FlatList
          style={styles.homeFlatList}
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
                    address1: item.address1,
                    address2: item.address2,
                    city: item.city,
                    state: item.state,
                    zip: item.zip,
                    capacity: item.capacity,
                    startTime: item.startTime,
                    endTime: item.endTime,
                    photography: item.photographyAllowed,
                  });
                }}>
                <ImageBackground source={{ uri: item.imageURL }} style={styles.homeBuildingDisplay}>
                  <View style={styles.homeBuildingCard}>
                    <HeaderText>{item.building}</HeaderText>
                    <View style={styles.align}>
                      <View style={styles.leftContainer}>
                        <BodyText>{item.address1}</BodyText>
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
      )}
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  return (
    <ScrollView style={styles.details}>
      <Image source={{ uri: route.params.imageURL}} style={styles.detailPic}></Image>
      
      <View style={styles.detailTitleBox}>
        <Text style={styles.header2}>{route.params.building}</Text> 
        <View style={styles.twoColumn}> 
          <View style={{paddingTop: 4}}>
            <Text style={styles.address}>{route.params.address1}</Text>
            <Text style={styles.address}>{route.params.address2}</Text>
          </View>
          <View style={{paddingTop: 4}}>
            <Text style={styles.address}>{route.params.city}</Text>
            <Text style={styles.address}>{route.params.state}</Text>
          </View>
        </View>
      </View>

      <View style={styles.twoColumn}>
        <View style={{backgroundColor: white, marginLeft: 15, marginTop: 3, textAlign: "center", width: "50%",}}>
          <Text style={styles.header4}>Accessibility</Text>
        </View>
        <View>
          <View style={styles.threeRows}>
            <View style={styles.shortRows} >
              <Text style={styles.header4}>Capacity</Text>
              <Text style={{textAlign: "center", paddingBottom: 12}}>{route.params.capacity}</Text>
            </View>
            <View style={styles.shortRows}>
              <Text style={styles.header4}>Hours</Text>
              <Text style={{textAlign: "center", paddingBottom: 12}}>{route.params.startTime} - {route.params.endTime}</Text>
            </View>
            <View style={styles.shortRows}>
              <Text style={styles.header3}>Photography</Text>
              <Text style={{textAlign: "center", paddingBottom: 12}}>{route.params.photography}</Text>
            </View>
          </View>
        </View>
        {/* Need to add accessibility, capacity, hours, and photography */}
      </View>
      
      <View style={styles.detailBox}>
        <Text style={styles.header3}>Visitor Experience</Text>
        <Text style={styles.genBody}>{route.params.historicalOverview}</Text>
      </View>
      <View style={styles.detailBox}>
        <Text style={styles.header3}>History</Text>
        <Text style={styles.genBody}>{route.params.visitorExperience}</Text>
      </View>

      <View style={{height: 10}}></View> 
      {/* just adds some height to the bottom */}

      {/* <Button title="Go back" onPress={() => navigation.goBack()} /> */}
    </ScrollView>
  );
}

const Stack = createNativeStackNavigator();

function LogoTitle() {
  return (<Image source={require('./assets/images/dooropen.jpg')} style={styles.homeHeader} />)
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