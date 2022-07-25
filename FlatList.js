import React from 'react';
import { FlatList as FlatListNative, View, Dimensions, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Empty from './Empty';
import LoadMore from '../../Lottie/LoadMore';
const screen = Dimensions.get('screen');

const FlatList = React.forwardRef((props, ref) => {
  const {
    loadingModal,
    loading,
    refreshing,
    onRefresh,
    keyboardShouldPersistTaps,
    data,
    keyExtractor,
    ListFooterComponent,
    renderItem,
    onScroll,
    onLoadMore,
    hasMore,
    ItemSeparatorComponent,
    showsVerticalScrollIndicator,
    ListHeaderComponent,
    getItemLayout,
  } = props;

  return (
    <>
      {((loadingModal || (data?.length === 0 && loading)) && (
        <View style={styles.loading}>
          <LoadMore />
        </View>
      )) || (
        <FlatListNative
          ref={ref}
          {...props}
          ListHeaderComponent={ListHeaderComponent}
          showsVerticalScrollIndicator={showsVerticalScrollIndicator || false}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}
          renderItem={renderItem}
          onRefresh={onRefresh}
          data={data}
          keyExtractor={keyExtractor}
          ListFooterComponent={data?.length !== 0 && loading && hasMore && ListFooterComponent}
          ItemSeparatorComponent={ItemSeparatorComponent}
          refreshing={refreshing}
          onEndReached={!loading && onLoadMore}
          onEndReachedThreshold={0.1}
          scrollEventThrottle={16}
          onScroll={onScroll}
          ListEmptyComponent={!loading && <Empty />}
          removeClippedSubviews={true}
          getItemLayout={getItemLayout}
        />
      )}
    </>
  );
});

FlatList.propTypes = {
  loadingModal: PropTypes.bool,
  loading: PropTypes.bool,
  refreshing: PropTypes.bool,
  onRefresh: PropTypes.func,
  keyboardShouldPersistTaps: PropTypes.string,
  data: PropTypes.array,
  keyExtractor: PropTypes.func,
  renderItem: PropTypes.func,
  onScroll: PropTypes.func,
  onLoadMore: PropTypes.func,
  hasMore: PropTypes.bool,
  getItemLayout: PropTypes.func,
};

FlatList.defaultProps = {
  loadingModal: false,
  loading: false,
  refreshing: false,
  keyboardShouldPersistTaps: 'handled',
  data: [],
  hasMore: true,
  ListFooterComponent: <LoadMore />,
  keyExtractor: (_, idx) => `key-${idx}`,
};

const styles = StyleSheet.create({
  loading: { alignItems: 'center', justifyContent: 'center', height: screen.height / 1.5, width: screen.width },
});

export default FlatList;
