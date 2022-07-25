import React, { useState, useRef, createRef, forwardRef, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, FlatList, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

import Colors from './Colors';

const width = Dimensions.get('window').width;

const Tab = forwardRef(({ item, onItemPress, active, idx }, ref) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const interpolateColor = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.gray_4, Colors.logo_snappy],
  });

  useEffect(() => fadeIn(), [idx]);

  return (
    <View ref={ref} style={styles.container_tab_item}>
      <TouchableOpacity onPress={onItemPress} style={styles.tab_item}>
        <Animated.Text style={[styles.text_tab_item, active && { color: interpolateColor }]}>{item?.text}</Animated.Text>
      </TouchableOpacity>
    </View>
  );
});

const Tabs = ({ data, scrollX, onItemPress, idx }) => {
  const [measures, setMeasures] = useState([]);
  const containerRef = useRef();

  useEffect(() => {
    let m = [];
    data.forEach(item => {
      item.ref?.current?.measureLayout(containerRef?.current, (x, y, width, height) => {
        m.push({ x, y, width, height });
        if (m?.length === data?.length) {
          setMeasures(m);
        }
      });
    });
  }, [containerRef?.current]);

  return (
    <View>
      <View ref={containerRef} style={styles.container}>
        {data.map((item, index) => (
          <Tab key={index} item={item} ref={item.ref} onItemPress={() => onItemPress(index)} active={index === idx} idx={idx} />
        ))}
      </View>
      {measures?.length > 0 && <Indicator data={data} measures={measures} scrollX={scrollX} active={idx} />}
    </View>
  );
};

const Indicator = ({ data, measures, scrollX }) => {
  const inputRange = data?.map((_, idx) => idx * width);

  const indicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measures.map(measure => measure.width),
  });

  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measures.map(measure => measure.x),
  });

  return <Animated.View style={[{ width: indicatorWidth, transform: [{ translateX: translateX }] }, styles.indicator]}></Animated.View>;
};

function SnyTab(props) {
  const { options, Swipe, step, onChange, Smooth } = props;
  const [idx, setIdx] = useState(step || 0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const ref = useRef();
  const onItemPress = useCallback(itemIndex => {
    ref?.current?.scrollToOffset({
      offset: itemIndex * width,
    });
    setIdx(itemIndex);
    onChange && onChange(options[itemIndex]);
  });

  const onScrollEnd = e => {
    let contentOffset = e.nativeEvent.contentOffset;
    let viewSize = e.nativeEvent.layoutMeasurement;
    let itemIndex = Math.floor(contentOffset.x / viewSize.width);
    setIdx(itemIndex);
    onChange && onChange(options[itemIndex]);
  };

  const renderItemFlatList = ({ item }) => {
    return <View style={{ width }}>{item?.component}</View>;
  };

  const keyExtractor = (item, _) => `${item?.key}-key`;

  const data = options.map(item => ({ ...item, ref: createRef() }));

  return (
    <>
      <Tabs data={data} scrollX={scrollX} onItemPress={onItemPress} idx={idx} />
      <Animated.FlatList
        data={data}
        ref={ref}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={Swipe}
        pagingEnabled
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
        onMomentumScrollEnd={onScrollEnd}
        initialScrollIndex={idx}
        bounces={false}
        snapToInterval={Smooth && width}
        keyExtractor={keyExtractor}
        renderItem={renderItemFlatList}
        onEndReachedThreshold={0.1}
        keyboardShouldPersistTaps="handled"
      />
    </>
  );
}

SnyTab.propTypes = {
  options: PropTypes.array,
  Swipe: PropTypes.bool,
  onChange: PropTypes.func,
  step: PropTypes.number,
  Smooth: PropTypes.bool,
};

SnyTab.defaultProps = {
  options: [
    { key: 1, text: 'tab1', component: <Text>component1</Text> },
    { key: 2, text: 'tab2', component: <Text>component2</Text> },
    { key: 3, text: 'tab3', component: <Text>component3</Text> },
    { key: 4, text: 'tab4', component: <Text>component4</Text> },
  ],
  Swipe: false,
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', height: 42, flexDirection: 'row' },
  container_tab_item: { flex: 1 },
  tab_item: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  text_tab_item: { color: Colors.gray_4, fontWeight: '500' },
  indicator: { backgroundColor: Colors.logo_snappy, height: 2 },
});

export default SnyTab;
