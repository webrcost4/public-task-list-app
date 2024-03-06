import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    
    view: {
        backgroundColor: '#f9f7f0',
        flex: 1
    },

    my10: {
        marginTop: 10,
        marginBottom: 10
    },
    
    titleHead: {
        fontSize: 25,
        marginTop: 30,
        marginBottom: 50,
        fontFamily: 'WorkSans_VariableFont_Bold',
        color: '#6cd8af'
    },

    titleGreen: {
        fontSize: 20,
        fontFamily: 'WorkSans_VariableFont_Bold',
        color: '#6cd8af'
    },
    
    titleItemCard: { 
        fontSize: 18,
        fontFamily: 'WorkSans_VariableFont_Bold',
        color: 'white'
    },

    titleItemCardGreen: { 
        fontSize: 18,
        fontFamily: 'WorkSans_VariableFont_wght',
        color: '#6cd8af'
    },

    textDefault: {
        fontFamily: 'WorkSans_VariableFont_wght',
        color: 'white'
    },

    textDefaultGreen: {
        fontFamily: 'WorkSans_VariableFont_wght',
        color: '#6cd8af'
    },
    
    textDefaultDark: {
        fontFamily: 'WorkSans_VariableFont_wght'
    },

    textWeightBold: {
        fontFamily: 'WorkSans_VariableFont_Bold'
    },

    textLineThrough: {
        fontFamily: 'WorkSans_VariableFont_wght',
        textDecorationLine: 'line-through',
        color: '#000'
    },

    card: {
        marginBottom: 50,
        fontFamily: 'WorkSans_VariableFont_wght',
    },

    cardTask: {
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#E6E6E6',
        marginBottom: 15
    },

    cardOneTask: {
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderRadius: 20,
        marginBottom: 15
    },

    checkbox: {
        marginRight: 5,
        height: 20,
        width: 20,
        borderWidth: 2
    },

    container: {
        width: '90%',
        backgroundColor: 'transparent',
        alignSelf: 'center'
    },

    colMd8: {
        backgroundColor: '#fff',
        width: '80%',
        padding: 20
    },
    
    menu: {
        flexDirection: 'column',
        marginBottom: 50,
        paddingBottom: 10,
        justifyContent: 'center',
        fontFamily: 'WorkSans_VariableFont_wght',
    },

    menuItem: {
        // flex: 0.9
        marginTop: 10
    },

    buttonAddMenuItem: {
        alignSelf: 'center'
    },

    buttonDft: {
        alignItems: 'center',
        borderWidth: 1,
        backgroundColor: '#000',
        width: '100%',
        borderRadius: 8,
        padding: 20,
        marginTop: 30
    },

    buttonLogout: {
        alignItems: 'center',
        backgroundColor: 'red',
        borderRadius: 8,
        padding: 10,
    },

    formInput: {
        borderColor: '#000',
        borderRadius: 8,
        borderWidth: 1,
        paddingLeft: 20,
        height: 60,
        fontFamily: 'WorkSans_VariableFont_wght',
    },

    formDescInput: {
        borderColor: '#000',
        borderRadius: 8,
        borderWidth: 1,
        paddingLeft: 20,
        paddingBottom: 30,
        height: 100,
        fontFamily: 'WorkSans_VariableFont_wght',
    },

    formDate: {
        borderColor: '#000',
        borderRadius: 8,
        borderWidth: 1,
        paddingLeft: 20,
        height: 60,
        fontFamily: 'WorkSans_VariableFont_wght',
    },

    formHour: {
        borderColor: '#000',
        borderRadius: 8,
        borderWidth: 1,
        paddingLeft: 20,
        height: 60,
        fontFamily: 'WorkSans_VariableFont_wght',
    },

    dFlex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    }
});