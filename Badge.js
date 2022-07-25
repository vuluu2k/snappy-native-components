import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Colors from './Colors';

function Badge(props) {
  const { children, text, style, styleLabel } = props;

  return (
    <View style={[styles(props).badge, style]}>{(children || text) && <Text style={[styles(props).text, styleLabel]}>{children || text}</Text>}</View>
  );
}

Badge.propTypes = {
  size: PropTypes.number,
  children: PropTypes.node,
  text: PropTypes.node,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleLabel: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Badge.defaultProps = {
  size: 16,
};

const styles = props =>
  StyleSheet.create({
    badge: {
      width: props.size,
      height: props.size,
      borderRadius: props.size / 2,
      backgroundColor: Colors.volcano_6,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },

    text: {
      color: '#fff',
      fontSize: props.size / 1.8,
    },
  });

export default Badge;
