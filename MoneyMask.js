import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Colors from './Colors';

const moneyMask = amount => {
  if (!amount) return '0 ₫';
  else return formatText(amount, ' ₫');
};

const formatText = (amount, suffix) => {
  while (/(\d+)(\d{3})/.test(amount.toString())) {
    amount = amount.toString().replace(/(\d+)(\d{3})/, '$1' + '.' + '$2');
  }
  return amount + suffix;
};

export default class MoneyMask extends Component {
  render() {
    const { number, type } = this.props;

    return (
      <>
        <Text style={[{ fontWeight: '500' }, (number > 0 && styles[`${type}_up_text`]) || styles[`${type}_down_text`]]}>
          {moneyMask(number || 0)}
        </Text>
      </>
    );
  }
}

MoneyMask.propTypes = {
  number: PropTypes.number,
  style:PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  type:PropTypes.string,
};

MoneyMask.defaultProps = {
  number: 0,
  style:{},
  type:'base'
};

const styles = StyleSheet.create({
  base_up_text: {
    color: Colors.cyan_7,
  },
  base_down_text: {
    color: Colors.dust_red_7,
  },
});
