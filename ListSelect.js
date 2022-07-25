import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { AntDesign } from '@expo/vector-icons';

import Colors from './Colors';

const screen = Dimensions.get('screen');
export default class ListSelect extends Component {
  renderItem = ({ item, idx }) => {
    const { styleOptions, styleLabelOption } = this.props;

    const ComponentIcon = item?.icon?.component;
    return (
      <TouchableOpacity
        key={idx}
        disabled={!item?.onPress || item?.disabled}
        onPress={() => item?.onPress(item)}
        style={[item?.icon && { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, width: screen.width, backgroundColor: '#fff' }]}>
        {item?.icon && (
          <View style={{ width: 36 }}>
            {(ComponentIcon && (
              <ComponentIcon
                {...item?.icon}
                size={item?.icon?.size || 20}
                color={item?.icon?.color}
                style={[{ paddingRight: 16 }, item?.icon?.style]}
              />
            )) ||
              item?.icon}
          </View>
        )}
        <View
          style={[
            styles.containerOption,
            styleOptions,
            item?.icon && {
              width: screen.width - 36,
              paddingLeft: 0,
              paddingRight: 32,
            },
            item?.styleOption,
          ]}>
          <View style={{ width: screen.width - 110 }}>
            {item?.content || <Text style={[styles.text_options, styleLabelOption]}>{item.text}</Text>}
            {item?.subText && <Text style={[item?.styleSubText, { color: Colors.gray_4 }]}>{item?.subText}</Text>}
          </View>

          {item?.arrowIcon || <AntDesign name="right" size={16} color={Colors.neutral_6} />}
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { title, options, styleLabelTitle, styleTitle, onPressTitle, header, style, useFlatList } = this.props;
    return (
      <View style={[style]}>
        {title && (
          <TouchableOpacity onPress={onPressTitle} disabled={!onPressTitle}>
            <View style={[styles.containerTitle, styleTitle]}>
              <Text style={[styles.title, styleLabelTitle]}>{title}</Text>
            </View>
          </TouchableOpacity>
        )}
        {header && (
          <View style={{ paddingHorizontal: 16, paddingVertical: 8, backgroundColor: Colors.daybreak_blue_1 }}>
            <Text style={[styles.text_options, { color: '#2A2565', fontWeight: '700' }]}>{header}</Text>
          </View>
        )}
        {(useFlatList && (
          <FlatList data={options} renderItem={this.renderItem} showsVerticalScrollIndicator={false} keyExtractor={(_, index) => `key-${index}`} />
        )) ||
          options.map((item, idx) => this.renderItem({ item, idx }))}
      </View>
    );
  }
}

ListSelect.propTypes = {
  title: PropTypes.node,
  header: PropTypes.node,
  //options:array -> object in array with key, text, icon, subText, icon, onPress, disabled, arrowIcon, content
  options: PropTypes.array,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleTitle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleLabelTitle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleOptions: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleLabelOption: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onPressTitles: PropTypes.func,
  useFlatList: PropTypes.bool,
};

ListSelect.defaultProps = {
  title: undefined,
  options: [
    { key: 1, text: 'option1', onPress: () => console.log('option1') },
    { key: 2, text: 'option2', onPress: () => console.log('option2') },
    { key: 3, text: 'option3', onPress: () => console.log('option3') },
  ],
  useFlatList: false,
};

const styles = StyleSheet.create({
  containerTitle: { marginTop: 8 },
  title: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    color: Colors.gray_4,
    fontSize: 12,
    fontWeight: '700',
  },
  containerOption: {
    padding: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: Colors.gray_1,
    borderBottomWidth: 1,
  },
  text_options: {
    fontSize: 14,
    lineHeight: 22,
  },
});
