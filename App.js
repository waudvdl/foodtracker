import { StatusBar } from 'expo-status-bar';
import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';
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
    const [weight, setWeight] = useState(0);
    const [length, setLength] = useState(null);
    const [age, setAge] = useState(null);
    const [gender, setGender] = useState(null);
    const [kcalGoal, setKcalGoal] = useState(null);
    const [feedingType, setFeedingType] = useState(null);
    const [timestamp, setTimestamp] = useState(null);
    const [steps, setSteps] = useState(0);
    //food contains energy and 5 big elements: proteins, fat,carbohydrates, sugar and salt
    const [consumedKcal, setConsumedKcal] = useState(0);
    const [proteins, setProteins] = useState(0);
    const [fat, setFat] = useState(0);
    const [carbohydrates, setCarbohydrates] = useState(0);
    const [sugar, setSugar] = useState(0);
    const [salt, setSalt] = useState(0);
    const [consumedFoodList, setConsumedFoodList] = useState([]);

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

        let now = new Date();
        let startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        setTimestamp(startOfDay / 1000);
        //getDayStats()
    },[])

    useEffect(()=>{
        async function getDayStats(){
            try{
                if(timestamp !== null) {
                    const jsonValue = await AsyncStorage.getItem(timestamp + "");
                    if (jsonValue === null) {
                        let data = {
                            timestamp: timestamp,
                            data: {
                                steps: 0,
                                consumedKcal: 0,
                                proteins: 0,
                                fat: 0,
                                sugar: 0,
                                salt: 0,
                                carbohydrates: 0,
                                consumedFoodList: []
                            }
                        };
                        const jsonValue = JSON.stringify(data);
                        await AsyncStorage.setItem(timestamp + '', jsonValue);
                        return data;
                    } else {
                        return JSON.parse(jsonValue);
                    }
                }

            }catch (e) {
                console.log(e)
                //alert("something went wrong when retrieving data.")
            }
        }

        getDayStats().then(d => {
            try {
                //console.log(d);
                setSteps(d.data.steps);
                setConsumedKcal(d.data.consumedKcal);
                setConsumedFoodList(d.data.consumedFoodList);
            }catch (e) {
                return null;
            }
        }).catch()
    },[timestamp])

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

    useEffect(()=>{
        //console.log(steps)
    }, [steps])

    function HomeScreen({navigation}) {
        return (
            <ScrollView style={styles.homeView}>
                {/*<SubmenuCard navigation={navigation} item={{title : "Stappenteller", value : 2380,goal: 6000, type :"LOADING_BAR"}}/>*/}
                <SubmenuCard navigation={() => {navigation.navigate("Home")}} item={{title : "Pedometer", value : steps, goal: 6000, type :"LOADING_BAR"}}/>
               {/* <SubmenuCard navigation={navigation} item={{title : "Food tracker", value : 1500, goal: kcalGoal, type: "BUTTON", metric:"Kcal"}}/>*/}
                <SubmenuCard navigation={() => {navigation.navigate("Food tracking", {timestamp: timestamp, kcalGoal: kcalGoal, weight: weight, length:length})}} item={{timestamp: timestamp, title : "Food tracker", value : consumedKcal, goal: kcalGoal, type: "BUTTON", metric:"Kcal"}}/>
            </ScrollView>
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
