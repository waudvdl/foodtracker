import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    appTitle: {
        fontSize: 20,
    },
    homeView:{
        width: '100%',
        flexDirection: "column",
        //alignItems: "center",
        padding: 32,
    },
    hideMenuItem:{
        display: "none"
    }

});

export default styles;
