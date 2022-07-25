import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Colors from './Colors';

export default class StatusText extends Component {
  render() {
    const { type, style, labelStyle, text, children } = this.props;
    return (
      <View style={{ flexDirection: 'row' }}>
        <View
          style={[
            { alignItems: 'center', justifyContent: 'center', borderRadius: 8, paddingHorizontal: 4, paddingVertical: 2 },
            styles[type],
            style,
          ]}>
          <Text style={[{ lineHeight: 20, fontWeight: '500', fontSize: 10 }, styles[`text_${type}`], labelStyle]}>
            {children || text}
          </Text>
        </View>
      </View>
    );
  }
}

StatusText.propTypes = {
  text: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  labelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

StatusText.defaultProps = {
  text: 'Snappy Express',
  style: {},
};

const styles = StyleSheet.create({
  cyan: {
    backgroundColor: Colors.cyan_1,
  },
  text_cyan: {
    color: Colors.cyan_8,
  },

  red: {
    backgroundColor: Colors.dust_red_1,
  },
  text_red: {
    color: Colors.dust_red_7,
  },
});
