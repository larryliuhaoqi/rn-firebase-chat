import React from 'react';
import Platform from 'react-native';
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
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
    color: 'blue',
    fontSize: 20
  },
  subtitleView: {
    paddingLeft: 10,
  },
  ratingText: {
    paddingLeft: 10,
    color: 'blue',
  },
});

export default styles;
