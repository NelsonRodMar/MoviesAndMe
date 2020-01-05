import React from 'react'

import { StyleSheet, View, Button, TextInput, FlatList, Text,
  Keyboard, ActivityIndicator} from 'react-native'

import films from '../Helpers/filmsData'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../Api/TMDBApi'

class  Search extends React.Component {

  constructor(props) {
    super(props);
    this.searchedText = ""
    this.state = {
      films: [],
      isLoading: false,

    };
  }
  _loadFilms() {
    if(this.searchedText.length > 0 ){
      getFilmsFromApiWithSearchedText(this.searchedText).then(data => {
        Keyboard.dismiss();
        this.setState({isLoading: true});
        this.setState({
          films: data.results,
          isLoading: false,
        });
      })
    }
  }

  _displayLoading() {
      if (this.state.isLoading) {
        return (
          <View style={styles.loading_container}>
            <ActivityIndicator size='large' />
          </View>
        )
      }
  }

  _noResults() {
      if (this.state.films.length <= 0) {
        return (
          <View style={styles.loading_container}>
            <Text>No results</Text>
          </View>
        )
      }
  }

  _searchTextInputChanged(text) {
    this.searchedText = text
  }

  render() {
    console.log(this.state.films.length);
    return(
      <View style={styles.main_container}>
        <TextInput
          placeholder="Titre du film"
          onChangeText={(text) => this._searchTextInputChanged(text)}
          style={styles.textinput}
          onSubmitEditing={() => this._loadFilms()}
         />
        <Button title="Rechercher" onPress={() => {this._loadFilms()}} style={styles.button}/>
        <FlatList
          data={this.state.films}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <FilmItem style={styles.filmItem} film={item}/>}
        />
        {this._displayLoading()}
        {this._noResults()}
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
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
export default Search
