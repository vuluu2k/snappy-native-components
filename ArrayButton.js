import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Colors from './Colors';

export default class ArrayButton extends Component {
  render() {
    const { options } = this.props;

    return (
      <View style={styles.container}>
        {options.map((item, idx) => {
          const ComponentIcon = item?.icon?.component;
          return (
            <TouchableOpacity onPress={item?.onPress} key={idx} style={{ width: `${100 / options?.length}%`, paddingVertical: 12 }}>
              <View style={(idx !== 0 && { height: 20, borderLeftWidth: 1, borderColor: Colors.gray_1 }) || {}}>
                <Text style={styles.text_btn}>
                  {item?.icon && <ComponentIcon {...item?.icon} size={item?.icon?.size || 12} />} {item?.text}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

ArrayButton.propTypes = {
  options: PropTypes.array,
};

ArrayButton.defaultProps = {
  //icon : { component, name, size, style }
  options: [
    {
      text: 'action1',
      icon: false,
      onPress: () => console.log('action1'),
    },
    {
      text: 'action2',
      icon: false,
      onPress: () => console.log('action2'),
    },
    {
      text: 'action3',
      icon: false,
      onPress: () => console.log('action3'),
    },
  ],
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: Colors.geek_blue_1,
    width: '100%',
  },

  text_btn: {
    flexDirection: 'column',
    textAlign: 'center',
    fontWeight: '500',
    alignItems: 'center',
    color: Colors.logo_snappy,
    fontSize: 12,
    lineHeight: 20,
  },
});
