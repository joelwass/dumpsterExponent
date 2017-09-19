import React from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
} from 'react-native';

class NewsSourceRow extends React.Component {
  render() {
    return (
      <View style={styles.rowContainer}>
        <TouchableHighlight
          onPress={ () => this.props.navigateCallback(this.props.rowData) }
          style={styles.buttonContainer}>
          <Text style={styles.newsTitle}>{this.props.rowData.name}</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

export default NewsSourceRow;

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    height: 90,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  buttonContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  newsTitle: {
    fontSize: 24,
  },
});
