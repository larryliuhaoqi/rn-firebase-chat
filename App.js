import React, { Component } from 'react';

import { Provider } from 'react-redux';

// import store from './configs/store';

import AppNavigator from './Navigation/AppNavigator';


class App extends Component<Props> {
    
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    return (
      // jump to appnavigator
      // <Provider store = {store}>

          <AppNavigator />
          // </Provider>

    );
  }
}

export default App;
