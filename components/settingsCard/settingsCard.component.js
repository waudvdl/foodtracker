import {Text, TextInput, View} from "react-native";
import styles from "./styles.settingsCard.component";
import {useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SelectList } from 'react-native-dropdown-select-list'

export default function SettingsPage(props) {
    const [value, setValue] = useState(null);

    useEffect(()=>{
        async function getVal(){
            try {
                return await AsyncStorage.getItem(props.type)
            }catch (e) {
                alert("could not get stored value")
            }
        }

        getVal().then(setValue)
        if (value == null){
            setValue(0);
        }

    },[])

    useEffect( () => {
        async function storeVal() {
            try {
                return await AsyncStorage.setItem(props.type, value+"")
            }catch (e) {
                alert("could not get "+props.type+" value")
            }
        }
        storeVal()
    },[value])

    const genderData = [{key: 'M', value:'M'},{key: 'F', value:'F'}]
    const feedingData = [{key: 'diet', value: 'diet'}, {key:'normal', value:'normal'},{key: 'bulk',value:'bulk'}]

    return (
        <View style={styles.card}>
            <Text style={styles.title}>{props.title}:</Text>
            {props.type !== "gender" && props.type !== "feeding" ?
            <TextInput
                style={styles.inputField}
                value={value + ''}
                onChangeText={setValue}
                keyboardType={"numeric"}
            ></TextInput> : null}
            {props.type === "gender" ?
            <SelectList
                setSelected={(val) => setValue(val)}
                data={genderData}
                save="value"
                search={false}
                defaultOption={{key: value, value: value}}
            />:null}
            {props.type === "feeding" ?
                <SelectList
                    setSelected={(val) => setValue(val)}
                    data={feedingData}
                    save="value"
                    search={false}
                    defaultOption={{key: value, value: value}}
                />:null}
        </View>
    );
}
