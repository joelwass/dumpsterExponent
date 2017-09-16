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
        <View style={styles.textContainer}>
          <TouchableHighlight
            onPress={ () => this.props.navigateCallback(this.props.rowData) }>
            <Text style={styles.newsTitle}>{this.props.rowData.name}</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

export default NewsSourceRow;

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    padding: 12,
    height: 90,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  newsTitle: {
    fontSize: 24,
  },
});
