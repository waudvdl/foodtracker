import { StyleSheet } from "react-native";

export default StyleSheet.create({
    submenuCard: {
        padding: 24,
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 50,
        marginBottom: 16,
    },
    contentContainer: {
        display: "flex",
        flexDirection: "row"
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "700",
        textTransform: "uppercase"
    },
    cardSubtitle: {
        fontSize: 14,
        display: "flex",

    },
    cardInfo: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    progressBar: {
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        //right: 50,
        top: 13
    },
    moreInfoButtonContainer:{
        display: "flex",
        justifyContent: "center",
    },
    moreInfoButton: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        marginLeft: 35,
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 50,
    }
})
