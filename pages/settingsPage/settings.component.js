import {View} from "react-native";
import styles from "./styles.settings.component";
import SettingCard from "../../components/settingsCard/settingsCard.component"
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from "react";

export default function SettingsPage({navigation, props}) {
    return (
        <View style={styles.settingsPage}>
            <SettingCard title={"Length in CM"} type={"length"}/>
            <SettingCard title={"Weight in KG"} type={"weight"}/>
            <SettingCard title={"Age"} type={"age"}/>
            <SettingCard title={"Gender"} type={"gender"}/>
            <SettingCard title={"Feeding type"} type={"feeding"}/>
        </View>
    );
}
