import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider, Appbar, BottomNavigation } from 'react-native-paper';
import HomeScreen from './Components/HomeScreen';
import Profile from './Components/Profile';
import { ProfileProvider } from './Components/ProfileContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Font from 'expo-font';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  React.useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        ...MaterialCommunityIcons.font,
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { 
      key: 'home', 
      title: 'Home', 
      icon: (props) => <MaterialCommunityIcons name="home-outline" size={24} color={props.color} />
    },
    { 
      key: 'profile', 
      title: 'Profile', 
      icon: (props) => <MaterialCommunityIcons name="account-outline" size={24} color={props.color} />
    },
  ]);  

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    profile: Profile,
  });

  if (!fontsLoaded) {
    return null; // or a loading spinner
  }

  return (
    <PaperProvider>
      <ProfileProvider>
        <NavigationContainer>
          <Appbar.Header>
            <Appbar.Content title="Twitter Clone" />
          </Appbar.Header>
          <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
            shifting={false}
            renderIcon={({ route, focused, color }) => {
                switch (route.key) {
                    case 'home':
                        return <MaterialCommunityIcons name="home-outline" size={24} color={color} />;
                    case 'profile':
                        return <MaterialCommunityIcons name="account-outline" size={24} color={color} />;
                    default:
                        return null;
                }
            }}
          />
        </NavigationContainer>
      </ProfileProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
});