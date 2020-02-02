import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator, Image, Button, TouchableOpacity } from 'react-native'
import { getFilmDetailFromApi, getImageFromApi } from '../Api/TMDBApi'
import { ScrollView } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import moment from "moment";
import numeral from 'numeral'

class FilmDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            film: undefined,
            isLoading: false,
        };
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

    _toggleFavorite() {
      const action = { type: "TOGGLE_FAVORITE", value: this.state.film }
      this.props.dispatch(action)
    }

    _displayFavoriteImage() {
      var sourceImage = require('../Images/ic_favorite_border.png')
      if (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
        sourceImage = require('../Images/ic_favorite.png')
      }
      return(
        <Image
          style={styles.favorite_image}
          source={sourceImage}
        />
      )
    }


    _displayFilm() {
        const {film} = this.state
        if (this.state.film != undefined) {
          return (
            <ScrollView style={styles.scrollview_container}>
                <Image
                  style={styles.imageFilm_image}
                  source={{uri: getImageFromApi(film.backdrop_path)}}
                />
                <Text style={styles.film_title}>{film.title}</Text>
                <TouchableOpacity 
                  style={styles.favorite_container}
                  onPress={() => this._toggleFavorite()}>
                  {this._displayFavoriteImage()}
                </TouchableOpacity>
                <Text style={styles.film_overview}>{film.overview}</Text>
                <Text style={styles.default_text}>Sorti le {moment(film.release_date).format('DD-MM-YYYY')}</Text>
                <Text style={styles.default_text}>Note {film.vote_average}/10</Text>
                <Text style={styles.default_text}>Nombres de votes : {film.vote_count}</Text>
                <Text style={styles.default_text}>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
                <Text style={styles.default_text}>Genre(s) : {film.genres.map(function(genre){
                    return genre.name
                }).join(' / ')}</Text>
                <Text style={styles.default_text}>Companie(s) : {film.production_companies.map(function(companie){
                    return companie.name
                }).join(' / ')}</Text>
            </ScrollView>
          )
        }
    }

    componentDidMount() {
        const favoriteFilmIndex = this.props.favoritesFilm.findIndex(item => item.id ===
          this.props.navigation.state.params.idFilm)
        if (favoriteFilmIndex !== -1){
          //Film déjà en favoris pas besoins d'appeler l'API pour les données
          this.setState({
            film: this.props.favoritesFilm[favoriteFilmIndex]
          })
          return
        } else {
          this.setState({ isLoading: true })
          getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
            this.setState({
                film: data,
                isLoading: false
            })
        })
        }
    }

    render () {
        return (
            <View style={styles.main_container}>
                {this._displayFilm()}
                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollview_container: {
      flex: 1
    },
    imageFilm_image: {
      flex: 1,
      margin: 5,
      height: 169,
      backgroundColor: '#666666'
    },
    film_title: {
      fontWeight: 'bold',
      fontSize: 35,
      flex: 1,
      flexWrap: 'wrap',
      marginLeft: 5,
      marginRight: 5,
      marginTop: 10,
      marginBottom: 10,
      color: '#000000',
      textAlign: 'center'
    },
    film_overview: {
      fontStyle: 'italic',
      color: '#666666',
      margin: 5,
      marginBottom: 15
    },
    default_text: {
      marginLeft: 5,
      marginRight: 5,
      marginTop: 5,
    },
    favorite_container: {
      alignItems: "center"
    },
    favorite_image: {
      height: 40,
      width: 40
    }
})
const mapStateToProps = (state) => {
  return {
    favoritesFilm : state.favoritesFilm
  }
} 

export default connect(mapStateToProps)(FilmDetail) 