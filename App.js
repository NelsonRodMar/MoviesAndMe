import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
//Component Custom
import Search from './Components/Search'


export default class App extends React.Component {
  render() {
    return(
    <SafeAreaView style={styles.container}>
        <Search style={styles.search}/>
    </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search: {
    flex: 1,
  },
});
