import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
} from 'react-native';

class NewsSourceRow extends React.Component {
  render() {
    return (
      <View style={styles.rowContainer}>
        <View style={styles.textContainer}>
          <TouchableHighlight
            onPress={ () => this.props.navigateCallback(this.props.rowData) }>
            <Image
              style={styles.newsLogoView}
              source={imageMap[this.props.rowData.id]}
              resizeMode='contain'></Image>
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
  },
  newsLogoView: {
    height: 80,
    width: '100%',
  },
});

const imageMap = {
  'associated-press': require('../../assets/images/newsLogos/associated-press-full.png'),
  'bbc-news': require('../../assets/images/newsLogos/bbc-news.png'),
  'bloomberg': require('../../assets/images/newsLogos/bloomberg.png'),
  'business-insider': require('../../assets/images/newsLogos/business-insider.png'),
  'buzzfeed': require('../../assets/images/newsLogos/buzzfeed.png'),
  'fortune': require('../../assets/images/newsLogos/fortune.png'),
  'google-news': require('../../assets/images/newsLogos/google-news.png'),
  'techcrunch': require('../../assets/images/newsLogos/techcrunch.png'),
  'the-new-york-times': require('../../assets/images/newsLogos/the-new-york-times.png'),
  'the-wall-street-journal': require('../../assets/images/newsLogos/the-wall-street-journal.png'),
  'the-washington-post': require('../../assets/images/newsLogos/the-washington-post.png')
};
