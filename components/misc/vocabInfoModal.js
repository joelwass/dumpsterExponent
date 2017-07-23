var React = require('react');
var ReactNative = require('react-native');
var {
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = ReactNative;

import * as Exponent from 'expo';

export default class VocabModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      transparent: false,
    };
  }

  _renderWordDetails = () => {
    return this.props.wordDetails.results.map(function(item, i){
      return(
        <View
          key={ i }
          style={ styles.resultsContainer }>
          <Text style={ [styles.detail, styles.font] }>
            <Text style={ [{ fontWeight: 'bold' }, styles.font] }>Definition: </Text>
            { item.definition }
          </Text>
          <Text style={ [styles.detail, styles.font] }>
            <Text style={ [{ fontWeight: 'bold' }, styles.font] }>Part Of Speech: </Text>
            { item.partOfSpeech }
          </Text>
          { item && item.synonyms && item.synonyms.length > 0 &&
            <Text style={ [styles.detail, styles.font] }>
              <Text style={ [{ fontWeight: 'bold' }, styles.font] }>Synonyms: </Text>
              { item.synonyms.join('\n  ') }
            </Text>
          }
        </View>
      );
    });
  }

  render() {
    if (typeof this.props.wordDetails.results === 'undefined') {
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
            <Text style={ styles.font }>Close</Text>
          </TouchableHighlight>

          <View style={ styles.body }>
            <Text style={ styles.font }>
              <Text style={ [{ fontWeight: 'bold' }, styles.font] }>Word: </Text>
              { this.props.wordDetails.word }.
            </Text>
            <View style={ styles.detailsContainer }>
              { this._renderWordDetails() }
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5fcff',
  },
  body: {
    flex: 1,
    padding: 20,
  },
  detailsContainer: {
    flex: 1,
    paddingTop: 10,
  },
  modalCloseButton: {
    marginLeft: 20,
    marginTop: 20,
    alignSelf: 'center',
  },
  resultsContainer: {
    margin: 20,
  },
  detail: {
    marginTop: 8,
  },
  font: {
    fontSize: 18,
  },
});
