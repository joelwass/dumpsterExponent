import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Image,
  View,
  Text,
  ListView,
  TouchableHighlight,
} from 'react-native';

import * as Exponent from 'expo';
import * as Api from '../../api/api.js';
import { LoadingPage } from '../../components';
import Row from '../misc/newsRow';

import { connect } from 'react-redux';
import * as actions from '../../modules/app/actions';
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class NewsPage extends React.Component {

  static navigationOptions = {
    title: 'Today\'s Top News Stories',
  };

  state = {
    isReady: false,
  };

  componentWillMount() {
    this._getNews();
  };

  _getNews = async () => {
    const newsArticleResults = await Api.getNewsFromSource(this.props.navigation.state.params.source.id);
    this.setState({ dataSource: ds.cloneWithRows(newsArticleResults.results.articles), isReady: true });
  };

  _navigateToNews = (newsData) => {
    this.props.navigation.navigate('Article', { source: newsData });
  };

  render() {
    if (!this.state.isReady) {
      return <LoadingPage />;
    }

    return (
      <View style={ styles.container }>
        <View
          style={ styles.listViewContainer }>
          <ListView
            dataSource={this.state.dataSource}
            style={ styles.listView }
            renderRow={(rowData) => <Row navigateCallback={ (newsData) => this._navigateToNews(newsData) } rowData={ rowData } /> }
          />
        </View>
        <View
          style={ styles.hrLine }></View>
        <View>
          <Text>Powered by NewsApi http://newsapi.org/</Text>
        </View>
      </View>
    )
  }
}

export default NewsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection:'column',
  },
  listView: {
    flex: 1,
  },
  hrLine: {
    height: 1,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  listViewContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  }
});
