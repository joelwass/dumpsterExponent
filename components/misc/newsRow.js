import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableHighlight,
} from 'react-native';

class NewsRow extends React.Component {
  render() {
    return (
      <View style={styles.rowContainer}>
        <TouchableHighlight
          onPress={ () => this.props.navigateCallback(this.props.rowData) }
          style={styles.textContainer}>
          <Text>{ this.props.rowData.title }</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

export default NewsRow;

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    height: 70,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'column',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
