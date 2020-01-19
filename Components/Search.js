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
    this.page = 0
    this.totalPages = 0
    this.noResult = false
    this.state = {
      films: [],
      isLoading: false,

    };
  }
  _displayDetailForFilm = (idFilm) => {
    this.props.navigation.navigate("FilmDetail", {idFilm : idFilm})
  }
  _loadFilms() {
    if(this.searchedText.length > 0 ){
      this.setState({isLoading: true});
      getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then(data => {
        Keyboard.dismiss();
        this.page = data.page
        this.totalPages = data.total_pages
        if(data.results.length > 0){
          this.noResult = false
          this.setState({
            films: [...this.state.films, ...data.results], //Add new films to old list of film (concatenation)
            isLoading: false,
          });
        } else {
          this.noResult = true
          this.setState({
            films: [...this.state.films, ...data.results], //Add new films to old list of film (concatenation)
            isLoading: false,
          });
        }
      })
    }
  }

  _searchFilms() {
    this.page = 0
    this.totalPages = 0
    this.noResult = false
    this.setState({
      films: []
    }, () => {
      this._loadFilms()
    })
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
      if (this.noResult) {
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
    return(
      <View style={styles.main_container}>
        <TextInput
          placeholder="Titre du film"
          onChangeText={(text) => this._searchTextInputChanged(text)}
          style={styles.textinput}
          onSubmitEditing={() => this._searchFilms()}
         />
        <Button title="Rechercher" onPress={() => {this._searchFilms()}} style={styles.button}/>
        <FlatList
          data={this.state.films}
          keyExtractor={(item) => item.id.toString()}
          onEndReachedThreshold={0.25}
          onEndReached={() => {
            if(this.page < this.totalPages ){
              this._loadFilms()
            }
          }}
          renderItem={({item}) => <FilmItem style={styles.filmItem} film={item} 
          displayDetailForFilm={this._displayDetailForFilm}/>}
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
