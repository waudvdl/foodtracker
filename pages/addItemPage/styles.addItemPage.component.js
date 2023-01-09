import { StyleSheet } from "react-native";

export default StyleSheet.create({

    infoText:{
        fontSize: 15,
        //fontWeight: "bold",
        //textTransform: "uppercase"
    },
    contWrapper:{
        alignItems: "center",
        justifyContent: "center",
    },
    infoContainer:{
        display: "flex",
        justifyContent: "center",
        width: "90%",
        alignItems: "center",
        marginTop: 40,
        alignSelf: "center",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#D3D3D3",
        borderRadius: 30,
        paddingVertical: 20
    },
    qntyCont:{
        display: "flex",
        flexDirection: "row"
    },
    row:{
        display: "flex",
        width: "80%",
        justifyContent: "space-between",
        flexDirection: "row",
        marginVertical: 20,
    },
    col:{
        marginTop: 10,
        display: "flex",
        width: "80%",
        justifyContent: "center",
    },
    inputField: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        //borderColor: "#111",
        borderBottomWidth: 1,
        borderColor: "#747474",
    },
    btn:{
        display: "flex",
        width: "100%",
        paddingVertical: 20,
        //borderWidth: 2,
        textAlign: "center",
        marginVertical: 10,
        elevation: 10,
        borderRadius: 50,
    },
    addBtn:{
        backgroundColor: "#1DC763",
    },
    goBackBtn:{
        backgroundColor: "#A35",
    },
    btnText:{
        textAlign: "center",
        color: "#FEF",
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: 0.5
    }
})

