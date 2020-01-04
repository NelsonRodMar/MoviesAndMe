import React from 'react'

import { StyleSheet, View, Button, TextInput, FlatList, Text} from 'react-native'

import films from '../Helpers/filmsData'
import FilmItem from './FilmItem'

class  Search extends React.Component {
  render() {
    return(
      <View style={styles.main_container}>
        <TextInput placeholder="Titre du film" style={styles.textinput}/>
        <Button title="Rechercher" onPress={() => {}} style={styles.button}/>
        <FlatList
          data={films}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <FilmItem style={styles.filmItem} film={item}/>}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5,
  },
    button: {
      height: 50,
    },
  filmItem: {
    flex: 1
  }
});
export default Search
