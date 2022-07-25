import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import propTypes from 'prop-types';
import Colors from './Colors';
import { moneyMask } from '../../../utils/number';
import { AntDesign } from '@expo/vector-icons';

export default class StatusCard extends Component {
  render() {
    const { color, width, content, title } = this.props;

    return (
      <>
        <View style={[styles.statistic_by_status, { width: width }]}>
          <View style={[styles.d_flex, { marginBottom: 8 }]}>
            <View style={{ width: 40, height: 4, backgroundColor: color, borderRadius: 2 }} />
            <Text style={{ marginLeft: 8 }}>{title}</Text>
          </View>
          {content?.map((it, id) => {
            let resultCompare = 0;

            if (
              !isFinite((it.data - it.dataCompare) / it.data) ||
              isNaN((it.data - it.dataCompare) / it.data) ||
              (it.data - it.dataCompare) / it.data === -Infinity
            ) {
              resultCompare = 0;
            } else {
              resultCompare = ((it.data - it.dataCompare) / it.data).toFixed(2);
            }

            return (
              <View style={[styles.d_flex, { marginBottom: 4, justifyContent: 'space-between' }]} key={id}>
                <Text style={{ color: Colors.gray_4, fontSize: 12, width: 80 }}>{it.label}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ marginLeft: 8, fontSize: 12, marginRight: 8 }}>{it.moneyMask ? moneyMask(it.data) : it.data + ' vđ'}</Text>
                  {resultCompare !== 0 && (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={{ color: resultCompare < 0 ? 'red' : 'green' }}>
                        {resultCompare < 0 ? resultCompare.slice(1, resultCompare.length) + ' %' : resultCompare + ' %'}
                      </Text>
                      {it.data - it.dataCompare > 0 ? (
                        <AntDesign name="arrowup" size={12} color="green" />
                      ) : (
                        <AntDesign name="arrowdown" size={12} color="red" />
                      )}
                    </View>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  d_flex: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  statistic_by_status: {
    backgroundColor: 'rgba(217, 219, 234, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 4,
    minWidth: '48%',
    marginBottom: 12,
  },
});

StatusCard.propTypes = {
  color: propTypes.string,
  title: propTypes.string,
  width: propTypes.string,
  content: propTypes.array,
};

StatusCard.defaultProps = {
  content: [
    {
      label: 'Thu hộ',
      money: 100000,
    },
    {
      label: 'Phí VC',
      money: 200000,
    },
  ],
};
