import React from 'react'

import { StyleSheet, View, Button, TextInput} from 'react-native'
class  Search extends React.Component {
  render() {
    return(
      <View style={styles.container}>
        <TextInput placeholder="Titre du film"/>
        <Button title="Rechercher" onPress={() => {}}/>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Search
