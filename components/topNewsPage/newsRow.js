import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Row = (props) => (
  <View style={styles.rowContainer}>
    <View style={styles.textContainer}>
      <Image
        style={styles.newsLogoView}
        source={imageMap[props.id]}
        resizeMode='contain'></Image>
    </View>
  </View>
);

export default Row;

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
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  newsLogoView: {
    height: 80,
    width: '100%',
  },
});

const imageMap = {
  'associated-press': require('../../assets/images/newsLogos/associated-press-full.png'),
  'bloomberg': require('../../assets/images/newsLogos/bloomberg.jpg'),
  'business-insider': require('../../assets/images/newsLogos/business-insider.jpg'),
  'buzzfeed': require('../../assets/images/newsLogos/buzzfeed.svg'),
  'fortune': require('../../assets/images/newsLogos/fortune.jpg'),
  'google-news': require('../../assets/images/newsLogos/google-news.png'),
  'techcrunch': require('../../assets/images/newsLogos/techcrunch.png'),
  'the-new-york-times': require('../../assets/images/newsLogos/the-new-york-times.png'),
  'the-wall-street-journal': require('../../assets/images/newsLogos/the-wall-street-journal.png'),
  'the-washington-post': require('../../assets/images/newsLogos/the-washington-post.png')
};
