var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  WebView,
  View,
  Text,
  ActivityIndicator,
} = ReactNative;

import * as Exponent from 'expo';
import { LoadingPage } from '../../components';

class ArticleModal extends React.Component {

  static navigationOptions = {
    title: 'Read up!',
  };

  constructor(props) {
    super(props);
    this.state = {
      error: false
    };
  }

  _setLoaded = (huh) => {
    console.log('loaded?', huh);
  };

  _setErrorState = () => {
    this.setState({error: true});
  };

  render() {
    if (this.state.error === true) {
      return(
        <View style={{  }}>
          <Text>There was an error, please try loading article again</Text>
        </View>
      )
    }

    if (typeof this.props.navigation.state.params.source.url === 'undefined') {
      return(
        <View style={{  }}>
          <Text>Loading...</Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <View style={styles.webViewContainer}>
          <WebView
            source={{ uri: this.props.navigation.state.params.source.url }}
            style={ styles.detailsContainer }
            onError={() => this._setErrorState()}
            onLoad={() => this._setLoaded()}
            startInLoadingState={true}
          />
        </View>
        <View style={{ backgroundColor: 'white', width: '100%', alignItems: 'center' }}>
          <Text>Powered by NewsApi http://newsapi.org/</Text>
        </View>
      </View>
    );
  }
}

export default ArticleModal;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection:'column',
  },
  webViewContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  detailsContainer: {
    flex: 1,
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
});
