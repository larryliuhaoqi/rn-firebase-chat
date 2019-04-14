import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import Colors from '../configs/Colors';

export default class VectorIcon extends React.Component {
  render() {
    return (
        <Icon
        name={this.props.name}
        size={26}
        style={{ marginBottom: -3 }}
        color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }
}