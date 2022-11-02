/**
 *
 * Welcome
 *
 */

import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
  Linking,
  ScrollView,
  Dimensions,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import makeSelectWelcome from './selectors';

import { styles } from './styles';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import getAllPosts from '../../configs/getAllPosts';
import { useComponentDidMount } from '../../utils/lifecycle';

export function Welcome() {
  const [nextPage, setNextPage] = useState(10);
  const [skipPage, setSkipPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [postsData, setPostsData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchPost = async (next, skip) => {
    setIsLoading(true);

    try {
      const posts = await getAllPosts(next, skip);
      setPostsData(posts.data.imagePostsConnection.edges);
      setIsLoading(false);
      setIsRefreshing(false);
      if (posts.data.imagePostsConnection.pageInfo.hasNextPage) {
        setNextPage(20);
        setSkipPage(10);
      }
    } catch (error) {
      setIsLoading(false);
      setIsRefreshing(false);
      console.log('error', error);
    }
  };

  const loadMore = async () => {
    const loadPage = nextPage + 10;

    if (nextPage <= loadPage) {
      try {
        const posts = await getAllPosts(nextPage, skipPage);
        const newPosts = posts.data.imagePostsConnection.edges;
        setPostsData(oldPosts => [...oldPosts, ...newPosts]);
        if (posts.data.imagePostsConnection.pageInfo.hasNextPage) {
          setNextPage(nextPage + 10);
          setSkipPage(skipPage + 10);
        }
      } catch (error) {
        console.log('error', error);
      }
    }
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    fetchPost(10, 0);
  };

  const onViewableItemsChanged = React.useRef(({ viewableItems, changed }) => {
    // const isObjectPresent = viewableItems.find(obj => obj.index === 0 && obj.isViewable);

    if (changed != undefined && changed[0].index == 0) {
      onRefresh();
    }
  });

  const renderItem = (item, index) => {
    try {
      var isOdd = false;

      if (item.item.node.image.length % 2 != 0) {
        isOdd = true;
      } else {
        isOdd = false;
      }
      const images = item.item.node.image.slice(0, 1).map((image, i) => {
        const source = { uri: image };
        return <Image key={i} source={source} style={styles.columnContainer} />;
      });

      return (
        <View key={index} style={{ padding: wp(2) }}>
          <Text style={styles.sectionTitle}>{item.item.node.name}</Text>
          {isOdd ? images : null}
          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            {isOdd
              ? item.item.node.image.slice(1, item.item.node.image.length).map((image, i) => {
                  const source = { uri: image };
                  return <Image key={i} source={source} style={styles.rowContainer} />;
                })
              : item.item.node.image.map((image, index) => {
                  return (
                    <View key={index}>
                      <Image source={{ uri: image }} style={styles.rowContainer} />
                    </View>
                  );
                })}
          </View>
        </View>
      );
    } catch (error) {
      console.log('error', error, index, item.item);
    }
  };

  useComponentDidMount(() => {
    fetchPost(10, 0);
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        {isLoading ? <ActivityIndicator /> : null}
        {postsData == undefined ? (
          <Text style={{ alignSelf: 'center' }}>No Data</Text>
        ) : (
          <FlatList
            data={postsData}
            renderItem={renderItem}
            onEndReached={loadMore}
            onRefresh={onRefresh}
            refreshing={isRefreshing}
            onViewableItemsChanged={onViewableItemsChanged.current}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

Welcome.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  welcome: makeSelectWelcome(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Welcome);
