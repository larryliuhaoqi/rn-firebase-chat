import React from 'react';
import Platform from 'react-native';
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  messageinput: {
    flex: 1,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '80%',
    marginBottom: 10,
    borderRadius: 5
  },
  btnText: {
    color: '#424242',
    fontSize: 18,
    fontWeight: '500'
  },
  subtitleView: {
    paddingLeft: 10,
  },
  ratingText: {
    paddingLeft: 10,
    color: 'blue',
  },
  signupTextCont: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 18,
    flexDirection: 'column'
  },
  signupText: {
    color: '#444444',
    fontSize: 18
  },
  signupButton: {
    color: '#424242',
    fontSize: 18,
    fontWeight: '500'
  }

});

export default styles;
