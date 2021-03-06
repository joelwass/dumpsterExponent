var React = require('react');
var ReactNative = require('react-native');
var {
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ScrollView,
} = ReactNative;

import * as Exponent from 'expo';

class VocabModal extends React.Component {

  constructor(props) {
    super(props);
    console.log('constructed?');
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
    if (!this.props.wordDetails.results) {
      return (
        <Modal
          animationType={ 'slide' }
          transparent={ this.state.transparent }
          visible={ this.props.modalVisible }
          supportedOrientations={ ['portrait'] }
          style={ styles.container }
        >
          <View style={{ alignItems: 'center', padding: 20, backgroundColor: 'white' }}>
            <Text>We're sorry.... The Vocab page is temporarily unavailable. Please try back soon!</Text>
          </View>
        </Modal>
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

          <ScrollView>
            <View style={ styles.body }>
              <Text style={ styles.font }>
                <Text style={ [{ fontWeight: 'bold' }, styles.font] }>Word: </Text>
                { this.props.wordDetails.word }.
              </Text>
              <View style={ styles.detailsContainer }>
                { this._renderWordDetails() }
              </View>
            </View>
          </ScrollView>

        </Modal>
      </View>
    );
  }
}

export default VocabModal;

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
