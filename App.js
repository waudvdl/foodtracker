import { StatusBar } from 'expo-status-bar';
import {Button, StyleSheet, Text, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
//import {Pedometer} from 'pages/pedometerPage.component'
import Foodpage from "./pages/foodTrackingPage/foodPage.component"
import BarcodePage from "./pages/barcodeScanPage/barcodePage.component"
import styles from './styles';
import SubmenuCard from "./components/submenuCard/submenuCard.component";
import SettingsPage from "./pages/settingsPage/settings.component";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useState} from "react";
import AddItemPage from "./pages/addItemPage/addItemPage.component";
import {round} from "react-native-reanimated";

const Drawer = createDrawerNavigator();

export default function App() {
    const [weight, setWeight] = useState(null);
    const [length, setLength] = useState(null);
    const [age, setAge] = useState(null);
    const [gender, setGender] = useState(null);
    const [kcalGoal, setKcalGoal] = useState(null);
    const [feedingType, setFeedingType] = useState(null);
    const [timestamp, setTimestamp] = useState(null);

    useEffect(()=>{
        async function getValueOfKey(key){
            try{
                return await AsyncStorage.getItem(key);
            }catch (e){
                alert("could not get "+key+" value out of memory")
            }
        }
        getValueOfKey("length").then(setLength)
        getValueOfKey("weight").then(setWeight)
        getValueOfKey("age").then(setAge)
        getValueOfKey("gender").then(setGender)
        getValueOfKey("feeding").then(setFeedingType)

    },[])

    useEffect(()=>{
        if(weight !== null && length !== null && age !== null && gender !== null){
            let kcalGoal;
            if(gender === "M"){
                kcalGoal = 66.5+13.8*weight+5*length/6.8*age;
            }else{
                kcalGoal = 665.1+9.6*weight+1.9*length/4.7*age;
            }

            if(feedingType === "diet"){
                kcalGoal*= 0.9;
            }else if(feedingType ==="bulk"){
                kcalGoal*=1.1;
            }
            setKcalGoal(kcalGoal.toFixed(0))
            //alert(kcalGoal.toFixed(0))
        }
    },[weight,length,age,gender])

    let now = new Date();
    let startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    //setTimestamp(startOfDay / 1000);
    //let newDay = new Date(timestamp*1000)

    async function getDayStats(){
        try{
            const jsonValue = await AsyncStorage.getItem('timestamp')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        }catch (e) {
            let data = {timestamp : timestamp}
            const jsonValue = JSON.stringify(data)
            await AsyncStorage.setItem(timestamp+'', jsonValue)
        }
    }


    function HomeScreen({ navigation }) {
        return (
            <View style={styles.homeView}>
                <SubmenuCard navigation={navigation} item={{title : "Stappenteller", value : 2380,goal: 6000, type :"LOADING_BAR"}}/>
                <SubmenuCard navigation={navigation} item={{title : "Food tracker", value : 1500, goal: kcalGoal, type: "BUTTON", metric:"Kcal"}}/>
            </View>
        );
    }

    async function getFoodStats(){
        try{
            return await AsyncStorage.getItem("kcalValue")
        }
        catch (e) {
            alert("could not get food values")
        }
    }

  return (
      <NavigationContainer>
          <Drawer.Navigator useLegacyImplementation={true} initialRouteName="Home">
              <Drawer.Screen name="Home" component={HomeScreen}/>
              <Drawer.Screen
                  name="Food tracking"
                  component={Foodpage}
                  initialParams={{ users: false }}
              />
              <Drawer.Screen
                  name="Food scanner"
                  component={BarcodePage}
                  initialParams={{ users: false }}
              />
              <Drawer.Screen
                  name="Settings"
                  component={SettingsPage}
                  initialParams={{ users: false }}
              />
              <Drawer.Screen
                  name="Add food item"
                  component={AddItemPage}
                  //initialParams={{ navigation: true, props: true}}
                  options={{
                      drawerItemStyle: {display: "none" }
                  }}
              />
          </Drawer.Navigator>
      </NavigationContainer>
  );
}
