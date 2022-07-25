import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { VictoryPie, Slice } from 'victory-native';
import PropTypes from 'prop-types';
import Colors from './Colors';
import { AntDesign } from '@expo/vector-icons';

const CustomSlice = props => {
  const sliceOverride = {
    ...props.slice,
    endAngle: (props.slice?.endAngle || 0) + 0.5,
  };

  return <Slice {...props} slice={sliceOverride} cornerRadius={50} sliceStartAngle={props.sliceStartAngle} sliceEndAngle={props.sliceStartAngle} />;
};


export default class CustomPieChart extends Component {

  renderCompare = (data) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ color: data > 0 ? 'green' : 'red' }}>
          {`${data || 0}%`}
        </Text>
        {data > 0 ? <AntDesign name="arrowup" size={16} color="green" /> : <AntDesign name="arrowdown" size={16} color="red" />}
      </View>
    )
  }

  render() {

    const { width, height, innerRadius, radius, duration, data, colors, showLabel, showCompare } = this.props

    return (
      <View style={{ flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 12, justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ width: width, height: height }} >
          <VictoryPie
            height={width}
            width={height}
            innerRadius={innerRadius}
            radius={radius}
            labels={() => ''}
            animate={{
              duration: duration,
            }}
            data={data}
            dataComponent={<CustomSlice />}
            colorScale={colors}
          />
        </View>
        {
          showLabel && (
            <View style={{ paddingHorizontal: 16 }}>
              {
                data.map((item, index) => {
                  return (
                    <View style={{ marginBottom: 4 }} key={index}>
                      <Text style={{ color: Colors.gray_5, fontSize: 12, marginBottom: 2 }}>{item.x}</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ marginRight: 4 }}>{item.y}</Text>
                        {showCompare && this.renderCompare(item?.compare)}
                      </View>
                    </View>
                  )
                })
              }
            </View>
          )
        }
      </View>
    );
  }
}

CustomPieChart.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  innerRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  radius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  duration: PropTypes.number,
  colors: PropTypes.array,
  data: PropTypes.array,
};

CustomPieChart.defaultProps = {
  width: 160,
  height: 160,
  innerRadius: 52,
  radius: 80,
  duration: 2000,
  data: [{x: 'label 1', y: 0}, {x: 'label 2', y: 0}]
}
