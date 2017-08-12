var React = require('react');
var ReactNative = require('react-native');
var {
  Modal,
  StyleSheet,
  WebView,
  Text,
  TouchableHighlight,
  View,
} = ReactNative;

import * as Exponent from 'expo';

export default class LearnMore extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      transparent: false,
    };
  }

  render() {
    if (typeof this.props.correctAnswer === 'undefined') {
      return(
        <View></View>
      )
    }

    return (
      <View>
        <Modal
          animationType={ 'slide' }
          transparent={ this.state.transparent }
          visible={ this.props.modalVisible }
          supportedOrientations={ ['portrait'] }
          style={ styles.container }
        >
          <TouchableHighlight
            onPress={ () => this.props.closeModal() }
            style={ [styles.modalCloseButton] }>
            <Text style={ styles.font }>Back To Dumpster</Text>
          </TouchableHighlight>

          <WebView
            source={{ uri: `https://en.wikipedia.org/wiki/${ this.props.correctAnswer.replace(/\s+/g, '_') }` }}
            style={ [styles.detailsContainer] }
          />
        </Modal>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5fcff',
    alignItems: 'center',
  },
  modalCloseButton: {
    marginTop: 20,
  },
  font: {
    textAlign: 'center',
    fontSize: 18,
  },
});
