import React, { Component, useEffect, useState } from "react";
import { Button, View, Text, FlatList, ScrollView, ActivityIndicator, ImageBackground, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const styles = StyleSheet.create({
  homeFlatList: {
    width: '100%'
  },
  homeBuildingDisplay: {
    width: '100%',
    height: 300,
    marginBottom: 10,
    objectFit: 'cover',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  homeBuildingCard: {
    width: '90%',
    backgroundColor: 'white',
    margin: 10,
  }
})

function ListScreen({ route, navigation }) {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getData= async () => {
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
      <Text>List of Buildings!</Text>
      {isLoading ? <ActivityIndicator/> : (
      <FlatList
        style={styles.homeFlatList}
        data={data}
        renderItem={
          ({item}) => 
          <TouchableWithoutFeedback 
          onPress={() => {
            navigation.navigate('Details', {
              building: item.building,
              historicalOverview: item.historicalOverview,
              visitorExperience: item.visitorExperience,
            });
          }}>
          <ImageBackground source={{uri: item.imageURL}} style={styles.homeBuildingDisplay}>
            <View style={styles.homeBuildingCard}>
              <Text>{item.building}</Text>
              <Text>{item.address1} | {item.startTime}-{item.endTime}</Text>
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
            {/* <Button
        title="Go to Details"
        onPress={() => {
          navigation.navigate('Details', {
            building: item.building,
            historicalOverview: item.historicalOverview,
            visitorExperience: item.visitorExperience,
          });
        }}
      /> */}
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

function App () {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="List">
        <Stack.Screen name="List" component={ListScreen}/>
        <Stack.Screen name="Details" component={DetailsScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;