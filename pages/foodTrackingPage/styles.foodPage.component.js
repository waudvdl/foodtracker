import { StyleSheet } from "react-native";

export default StyleSheet.create({
    foodpageContainer:{
        display: "flex",
        flexDirection:"column",
        //alignItems:"center"
    },
    pageWrapper:{
        width:"100%"
    },
    graph:{
        display: "flex",
        justifyContent:"center",
        alignItems: "center",
        width: "100%",
        height: 200,
        backgroundColor: "#A35",
        borderBottomWidth: 2,
    },
    scanBtn:{
        display: "flex",
        alignItems: "center",
        width: "90%",
        marginVertical: 30,
        marginHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: "#1DC763",
        borderRadius: 50,
        elevation: 10
    },
    btnText:{
        fontSize: 16,
        textTransform: "uppercase",
        fontWeight:"bold",
        letterSpacing: 1.5,
        color: "#FEF",
        fontFamily: 'Roboto',
    },
    statsContainer:{
        display: "flex",
        height: "100%",
        marginTop:10,
        marginBottom: 30
    },
    foodList:{
        display: "flex",
        justifyContent: "center",
        //alignItems:"center",
        width: "100%",
        //backgroundColor: "#A55",
        //borderWidth: 2,
        //borderStyle: "solid",
        //marginBottom: 30,
    },
    listItem:{
        display: "flex",
        //width: "100%",
        //backgroundColor: "#5AA",
        marginBottom: 30,
        //paddingBottom: 30,
    },
    listTitle:{
        width: "100%",
        alignItems:"center",
        justifyContent:"center"

    }
})
