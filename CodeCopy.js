import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import PropTypes from 'prop-types';

import { Notification } from '../../../utils/NotificationHelper';
import CommonStyle from './CommonStyle';
import Colors from './Colors';

function CodeCopy(props) {
  const copyToClipboard = async text => {
    await Clipboard.setStringAsync(text);
    Notification.success(`Đã sao chép ${text}`);
  };

  const { text, index, children, style } = props;
  return (
    <View style={style}>
      <View style={[CommonStyle.d_flex_start]}>
        <TouchableOpacity onPress={() => copyToClipboard(text)}>
          {((text || children) && (
            <Text style={{ color: Colors.daybreak_blue_7, fontWeight: '500' }}>
              {index && `${index}.`} {children || text}
            </Text>
          )) ||
            null}
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CodeCopy;

CodeCopy.propTypes = {
  text: PropTypes.node,
  number: PropTypes.node,
  children: PropTypes.node,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

CodeCopy.defaultProps = {
  text: 'code number',
  number: 1,
  style: {},
};
