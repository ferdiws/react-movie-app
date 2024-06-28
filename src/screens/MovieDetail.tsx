import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

export default function MovieDetail({ navigation }: { navigation: any }): JSX.Element {
  return (
    <View style={styles.container}>
      <Text>MovieDetail</Text>
      <Button title='Go Back' onPress={() => navigation.goBack()} />
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