import React, { Component, useEffect, useState } from "react";
import { Button, View, Text, FlatList, ScrollView, ActivityIndicator, ImageBackground, StyleSheet, TouchableWithoutFeedback, Appearance } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toilet from "./assets/toilet-solid.svg";

// const colorScheme = Appearance.getColorScheme(); // this should get light/dark mode from the os i think? would put these palettes in an if statement somewhere for that
const black = '#242325';
const white = '#eeeeee';
const gray = '#d2d2d4';
const lightgray = '#dcdcdc';

const blue = '#23bdb9';
const red = 'e45027';
const darkblue = '#038a9c';
const darkred = '#bd3712';

const styles = StyleSheet.create({
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
    width: '90%',
    backgroundColor: white,
    color: black,
    margin: 10,
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
                  <View style={styles.homeBuildingCard}>
                    <Text>{item.building}</Text>
                    <Text>{item.address1} | {item.startTime}-{item.endTime}</Text>
                    <Toilet width={20} height={20} color={darkblue} />
                    <Text>Accessibility Icons{item.wheelchairAccessible}{item.restroomsAvailable}{item.photographyAllowed}</Text>
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

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="List">
        <Stack.Screen name="List" component={ListScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;