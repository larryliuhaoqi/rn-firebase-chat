import React, { Component } from 'react';


import AppNavigator from './Navigation/AppNavigator';


class App extends Component<Props> {
    
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    return (
      // jump to appnavigator
          <AppNavigator />
    );
  }
}

export default App;
