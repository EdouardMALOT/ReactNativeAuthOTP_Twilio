import React, { Component } from 'react';
import { View } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';
import firebase from 'firebase';

const ROOT_URL = 'https://us-central1-reactnativeotp.cloudfunctions.net/';

class SignInForm extends Component {

    constructor(props) {
        super(props);
        this.state = { phone: '', code: '' };
    }

    async handleSubmit() {
        try {
            const response = await axios.post(`${ROOT_URL}verifyOneTimePassword`, { phone: this.state.phone, code: this.state.code });
            firebase.auth().signInWithCustomToken(response.data.token);
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <View>
                
                <View style={{ marginBottom: 10 }}>
                    <FormLabel>Enter Phone Numer</FormLabel>
                    <FormInput 
                        value={this.state.phone}
                        onChangeText={phone => this.setState({ phone })}
                    />
                    <FormLabel>Enter code</FormLabel>
                    <FormInput 
                        value={this.state.code}
                        onChangeText={code => this.setState({ code })}
                    />
                </View>

                <Button 
                    title="Submit"
                    onPress={this.handleSubmit.bind(this)}
                />
            </View>
        );
    }
}

export default SignInForm;
