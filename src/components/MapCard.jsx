import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const MapCard = () => {
    return (
    <View style={styles.card}>
    </View>
  )
}


const styles = StyleSheet.create({
    card: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '10%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    }
})

export default MapCard