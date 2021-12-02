import React, { Component } from "react";
import { Button, View, Text, FlatList, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const DATA = [
  {
  id: 2,
  building: "Bost Building National Historic Landmark",
  address1: "623 East 8th Avenue",
  address2: null,
  city: "Homestead",
  state: "Pennsylvania",
  zip: null,
  wheelchairAccessible: true,
  restroomsAvailable: true,
  wheelchairAccessibleRestroom: true,
  photographyAllowed: true,
  startTime: "10:00 am",
  endTime: "4:00 pm",
  capacity: 20,
  historicalOverview: "Over the years, the Bost (rhymes with ghost) building has served many functions. Built in 1892 as a hotel for the rapidly growing worker's ward of Homestead, the Bost Building was at the center of one of American labor history's most dramatic episodes: the Homestead Lockout and Strike. During the summer of 1892, the Bost Building served as headquarters for the Amalgamated Association of Iron and Steel Workers. Using the third floor of the building as a watchtower, steel union officials monitored activities in the mill. After serving as a hotel, the building went on to function as a bar, gambling hall, brothel, and even a sandwich shop. It received a National Historic Landmark designation in 1999 and underwent a $4-million renovation. It now functions as the Rivers of Steel's gift shop and museum.",
  visitorExperience: "Visitors can explore the on-site museum and enjoy exhibitions and artifacts that preserve the story of big steel in southwestern Pennsylvania and the cultures of its workforces. The first floor includes the main gift shop and Homestead Room, while the third floor houses the Bost Building Gallery and showcases exhibitions from the Rivers of Steel archives. ",
  image: "90e9ee45-1715-444f-a305-a2671c4dc5a4.jpg",
  fullAddress: "623 East 8th Avenue Homestead, Pennsylvania ",
  imageURL: "https://doorsopen.blob.core.windows.net/images/90e9ee45-1715-444f-a305-a2671c4dc5a4.jpg"
  },
  {
  id: 3,
  building: "Bowtie High - Luxury Apartments",
  address1: "120 East 9th Avenue",
  address2: null,
  city: "Homestead",
  state: "Pennsylvania",
  zip: null,
  wheelchairAccessible: true,
  restroomsAvailable: false,
  wheelchairAccessibleRestroom: false,
  photographyAllowed: true,
  startTime: "1:00 pm",
  endTime: "4:00 pm",
  capacity: 100,
  historicalOverview: "Bowtie High was originally a Catholic high school known as Bishop Boyle, which closed in 1987. The building itself is constructed of brick, concrete, limestone, hardwood floors, and terrazzo flooring. Currently, the building is undergoing renovation to become a stylish residential space, renamed Bowtie High. The two-story auditorium is still jaw-dropping. Even the original gym space offers something special, with the monogram still intact on the wooden floor. ",
  visitorExperience: "Visitors will see the original features of the former school, as well as the ongoing conversion to modern, stylish apartment living. Learn more about the evolution of this project and why the site has been renamed Bowtie High during your visit! This is a safe, but slightly dusty spot on your tour, as construction is still in progress. NOTE: Visiting hours are limited to 1 pm - 4 pm. ",
  image: "738a53c3-5292-480f-a95f-9a4a0184b32a.jpg",
  fullAddress: "120 East 9th Avenue Homestead, Pennsylvania ",
  imageURL: "https://doorsopen.blob.core.windows.net/images/738a53c3-5292-480f-a95f-9a4a0184b32a.jpg"
  },
  {
  id: 4,
  building: "Carnegie of Homestead",
  address1: "510 East 10th Avenue",
  address2: null,
  city: "Munhall",
  state: "Pennsylvania",
  zip: null,
  wheelchairAccessible: true,
  restroomsAvailable: true,
  wheelchairAccessibleRestroom: true,
  photographyAllowed: true,
  startTime: "10:00 am",
  endTime: "4:00 pm",
  capacity: 300,
  historicalOverview: "Fun fact: in 2014, CNN selected the Carnegie Library of Homestead as one of their top 27 fascinating libraries to visit around the world! Built in 1898 by Andrew Carnegie, the historic structure is home to a public library, a 1,000-seat music hall, and a full-service athletic club. Its French Renaissance design is the work of Pittsburgh architects Frank Alden and Alfred Harlow. The beautifully restored library has served families for over 120 years, from immigrants in the early 1900s to present-day families. The 1,000-seat grand music hall maintains much of its original charm, with a few modern upgrades. Both lobbies are lined with marble and the seats are original from the 1800s. Years ago the Athletic Club served the steel-town residents as a training facility for gymnasts, wrestlers, swimmers, soccer, and football. Swimmers from the 1932 and 1936 Olympics trained in this historic indoor swimming pool. ",
  visitorExperience: "Visitors will start their exploration in the grand music hall, preserved in time from 120 years ago. Stand on the very stage on which Andrew Carnegie, Jeff Goldblum, Boz Scaggs, and others have entertained audiences. The hall will lead you to the library's magnificent reading room, which is beautifully restored with a grand fireplace and antique seating - it's the perfect place to curl up and read a good book. Tour the children's/teen space murals and the state-of-the-art STEM lab. On the lower level, see the oldest indoor swimming pool in western Pennsylvania. Explore other amenities like the indoor baseball training facility, indoor basketball court with running track, coffee shop, exercise spaces, and weight rooms.",
  image: "dbd84304-cd9b-47af-89ac-357aaaa9db9d.jpg",
  fullAddress: "510 East 10th Avenue Munhall, Pennsylvania ",
  imageURL: "https://doorsopen.blob.core.windows.net/images/dbd84304-cd9b-47af-89ac-357aaaa9db9d.jpg"
  },
];

function ListScreen({ route, navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>List of Buildings!</Text>
      <FlatList
        data={DATA}
        renderItem={
          ({item}) => <ScrollView>
            <Text>{item.building}</Text>
            <Button
        title="Go to Details"
        onPress={() => {
          navigation.navigate('Details', {
            building: item.building,
            historicalOverview: item.historicalOverview,
            visitorExperience: item.visitorExperience,
          });
        }}
      />
            </ScrollView>
        }
      />
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
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const Stack = createNativeStackNavigator();

class App extends Component {

  render() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="List">
        <Stack.Screen name="List" component={ListScreen}/>
        <Stack.Screen name="Details" component={DetailsScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
          }
}


export default App;