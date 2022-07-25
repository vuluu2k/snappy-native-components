import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
export default class Container extends Component {
  render() {
    const { children, style, footer } = this.props;
    return (
      <>
        <View style={[styles.container, footer && { padding: 0 }, style]}>
          {(!footer && children) || <View style={[styles.container_children]}>{children}</View>}
          {footer && footer}
        </View>
      </>
    );
  }
}

Container.propTypes = {
  children: PropTypes.node,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Container.defaultProps = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  container_children: {
    flex: 1,
    padding: 16,
    paddingBottom: 12,
  },
});
