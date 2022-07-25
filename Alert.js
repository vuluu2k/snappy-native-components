import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { AntDesign } from '@expo/vector-icons';

import Colors from './Colors';

function Alert(props) {
  const { message, type, children, style, icon } = props;

  return (
    <View style={[styles.common, styles[type], style]}>
      {icon || (
        <AntDesign
          name="infocirlceo"
          size={16}
          color={(type === 'success' && Colors.daybreak_blue_6) || (type === 'error' && Colors.volcano_6)}
          style={styles.icon_alert}
        />
      )}
      {children || <Text style={{flex:1}}>{message}</Text>}
    </View>
  );
}

Alert.propTypes = {
  message: PropTypes.node,
  type: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Alert.defaultProps = {
  type: 'success',
};

const styles = StyleSheet.create({
  common: {
    borderWidth: 1,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
  },
  icon_alert: { marginRight: 8 },
  error: {
    borderColor: Colors.volcano_4,
    backgroundColor: Colors.volcano_1,
  },
  success: {
    borderColor: Colors.daybreak_blue_1,
    backgroundColor: Colors.daybreak_blue_4,
  },
  warning: {},
});

export default Alert;
