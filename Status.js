import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import IconSnappy from '../../IconSnappy';
import Colors from './Colors';
import Badge from './Badge';

export default class Status extends Component {
  render() {
    const { status, statusArray, status_vi, type, label, children, style, styleText, sendRequest, onPressSendRequest, base, requestCounter } =
      this.props;
    const checkStatus = statusArray.find(item => item.array.includes(status));


    return (
      <View style={styles.container}>
        {onPressSendRequest && sendRequest && (
          <TouchableOpacity style={styles.container_btn} onPress={onPressSendRequest}>
            <IconSnappy name="customer-service" size={20} color={Colors.color_key} style={{ marginRight: 8 }} />
            {requestCounter > 0 && (
              <Badge size={14} style={styles.badge}>
                {requestCounter}
              </Badge>
            )}
          </TouchableOpacity>
        )}
        <View style={(!base && [styles.sny_status, status && styles.w_120, styles[type], checkStatus && styles[checkStatus?.color], style]) || {}}>
          <Text
            style={[
              { fontSize: base ? 14 : 12 },
              checkStatus && styles[(!base && checkStatus?.color) || `base_${checkStatus?.color}`],
              styles[(!base && type) || `base_${type}`],
              styleText,
            ]}>
            {label || children || status_vi}
          </Text>
        </View>
      </View>
    );
  }
}

const color_orange = '#ad4e00';
const bg_orange = '#fff7e6';

const color_red = '#a8071a';
const bg_red = '#fff1f0';

const color_blue = '#1d39c4';
const bg_blue = '#f0f5ff';

const color_cyan = '#006d75';
const bg_cyan = '#e6fffb';

const color_purple = '#722ed1';
const bg_purple = '#f9f0ff';

const color_green = '#135200';
const bg_green = '#f6ffed';

const statusArray = [
  { array: ['request_received', 'waiting_for_return', 'returning', 'part_delivery'], color: 'orange', text_color: color_orange },
  { array: ['processing_picked_up', 'out_for_delivery', 'picked_up'], color: 'blue', text_color: color_blue },
  { array: ['import_picking_warehouse', 'on_the_way', 'import_returning_warehouse', 'returned'], color: 'cyan', text_color: color_cyan },
  { array: ['picked_up_fail', 'undeliverable', 'return_fail', 'canceled'], color: 'red', text_color: color_red },
  { array: ['processing_on_the_way', 'on_the_way_returning'], color: 'purple', text_color: color_purple },
  { array: ['delivered'], color: 'green', text_color: color_green },
];

export { statusArray };

Status.propTypes = {
  statusArray: PropTypes.array,
  status: PropTypes.string,
  status_vi: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.object,
  styleText: PropTypes.object,
  requestCounter: PropTypes.number,
};

Status.defaultProps = {
  statusArray: statusArray,
  status: '',
  status_vi: 'SnappyExpress',
  type: '',
  label: undefined,
  children: undefined,
  style: {},
  styleText: {},
};

const base_common = {
  fontSize: 14,
  fontWeight: '500',
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
  container_btn: { position: 'relative' },
  badge: { position: 'absolute', top: -4, right: 4 },
  sny_status: {
    height: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    minWidth: 80,
    borderWidth: 1,
    paddingHorizontal: 4,
  },
  w_120: {
    minWidth: 120,
  },
  orange: {
    color: color_orange,
    backgroundColor: bg_orange,
    borderColor: color_orange,
  },

  red: {
    color: color_red,
    backgroundColor: bg_red,
    borderColor: color_red,
  },

  blue: {
    color: color_blue,
    backgroundColor: bg_blue,
    borderColor: color_blue,
  },

  cyan: {
    color: color_cyan,
    backgroundColor: bg_cyan,
    borderColor: color_cyan,
  },

  purple: {
    color: color_purple,
    backgroundColor: bg_purple,
    borderColor: color_purple,
  },

  green: {
    color: color_green,
    backgroundColor: bg_green,
    borderColor: color_green,
  },

  base_orange: {
    color: color_orange,
    ...base_common,
  },
  base_red: {
    color: color_red,
    ...base_common,
  },
  base_blue: {
    color: color_blue,
    ...base_common,
  },
  base_cyan: {
    color: color_cyan,
    ...base_common,
  },
  base_purple: {
    color: color_purple,
    ...base_common,
  },
  base_green: {
    color: color_green,
    ...base_common,
  },
});
