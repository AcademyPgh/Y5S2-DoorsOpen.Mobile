import React, { Component, useEffect, useState } from "react";
import { Button, View, Text, FlatList, ScrollView, ActivityIndicator, ImageBackground, StyleSheet, TouchableWithoutFeedback, Appearance, Image, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toilet from "./assets/icons/toilet-solid.svg";

// const colorScheme = Appearance.getColorScheme(); // this should get light/dark mode from the os i think? would put these palettes in an if statement somewhere for that
const black = '#242325';
const white = '#fff';
const gray = '#d2d2d4';
const lightgray = '#dcdcdc';

const blue = '#23bdb9';
const red = 'e45027';
const darkblue = '#038a9c';
const darkred = '#bd3712';

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
  align: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
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
      {/* <Text>List of Buildings!</Text> */}
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
                  });
                }}>
                <ImageBackground source={{ uri: item.imageURL }} style={styles.homeBuildingDisplay}>
                  <View style={styles.homeBuildingCardTop} />
                  <View style={styles.homeBuildingCard}>
                    <HeaderText>{item.building}</HeaderText>
                    <View style={styles.align}>
                      <BodyText>{item.address1}</BodyText>
                      <Toilet width={20} height={20} color={darkblue} />
                    </View>
                    {/* {item.startTime}-{item.endTime} */}

                    {/* <BodyText>{item.wheelchairAccessible}{item.restroomsAvailable}{item.photographyAllowed}</BodyText> */}
                  </View>
                  {/* Image
            name
            address
            time
            accessibility bools
              toilet
              wheelchair
              photography */}
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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details about Building!</Text>
      <Text>{route.params.building}</Text>
      <Text>{route.params.historicalOverview}</Text>
      <Text>{route.params.visitorExperience}</Text>
      {/* <Button title="Go back" onPress={() => navigation.goBack()} /> */}
    </View>
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