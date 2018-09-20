import React from 'react';
import { StyleSheet, View } from 'react-native';
import firebase from 'firebase';

import SignUpForm from './Components/SignUpForm';
import SignInForm from './Components/SignInForm';
import config from './private/key.json';

export default class App extends React.Component {

  componentDidMount() {
    firebase.initializeApp(config);
  }

  render() {
    return (
      <View style={styles.container}>
        <SignUpForm />
        <SignInForm />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
