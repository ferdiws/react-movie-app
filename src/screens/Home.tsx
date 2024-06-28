import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

export default function Home({ navigation }: { navigation: any }): JSX.Element {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button title='To MovieDetail' onPress={() => navigation.navigate('MovieDetail')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})