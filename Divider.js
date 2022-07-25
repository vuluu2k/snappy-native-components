import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import Colors from './Colors';

export default class Divider extends Component {
  render() {
    const { type, style } = this.props;
    return <View style={[styles[`divider_${type}`], style]} />;
  }
}

Divider.propTypes = {
  type: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
Divider.defaultProps = {
  type: 'horizontal',
  style: {},
};

const styles = StyleSheet.create({
  divider_horizontal: { height: 1, backgroundColor: Colors.color_border, marginVertical: 12 },
  divider_vertical: { width: 1, backgroundColor: Colors.color_border },
});
