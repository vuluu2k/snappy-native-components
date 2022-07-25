import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import Colors from './Colors';

export default class Radio extends Component {
  render() {
    const { key, children, label, checked, onChange, style, labelStyle } = this.props;
    return (
      <TouchableOpacity onPress={() => onChange(checked)} disabled={!onChange} key={key} style={[styles.container, style]}>
        <MaterialIcons name={`radio-button-${checked ? 'on' : 'off'}`} size={20} color={checked ? Colors.daybreak_blue_7 : Colors.neutral_6} />
        {((children || label) && children) || <Text style={[styles.label, labelStyle]}>{label}</Text>}
      </TouchableOpacity>
    );
  }
}

Radio.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  labelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Radio.defaultProps = {};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    lineHeight: 22,
    marginLeft: 8,
  },
});
