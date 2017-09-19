import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableHighlight,
  ListView,
} from 'react-native';

import * as Exponent from 'expo';
import Api from '../../api/api.js';
import { LoadingPage } from '../../components';
import Row from '../misc/newsSourceRow';

import { connect } from 'react-redux';
import * as actions from '../../modules/app/actions';
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class TopNewsPage extends React.Component {

  static navigationOptions = {
    title: 'Choose News Source',
  };

  state = {
    isReady: false,
    dataSource: [],
  };

  componentWillMount() {
    this._getTopNews();
  };

  _getTopNews = async () => {
    try {
      const sources = await Api.getNewsSources();
      this.setState({ dataSource: ds.cloneWithRows(sources), isReady: true });
    } catch (e) {
      console.log(e);
    }
  };

  _navigateToNews = (sourceData) => {
    this.props.navigation.navigate('News', { source: sourceData });
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
            renderRow={(rowData) => <Row navigateCallback={ (sourceData) => this._navigateToNews(sourceData) } rowData={ rowData } /> }
          />
        </View>
        <View style={{ backgroundColor: 'white', width: '100%', alignItems: 'center' }}>
          <Text>Powered by NewsApi http://newsapi.org/</Text>
        </View>
      </View>
    )
  }
}

export default TopNewsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection:'column',
  },
  listView: {
    flex: 1,
  },
  listViewContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  }
});
