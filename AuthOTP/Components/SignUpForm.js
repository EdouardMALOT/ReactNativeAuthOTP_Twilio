import React, { Component } from 'react';
import { View } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';

const ROOT_URL = 'https://us-central1-reactnativeotp.cloudfunctions.net/';

class SignUpForm extends Component {

    constructor(props) {
        super(props);
        this.state = { phone: '' };
    }

    async handleSubmit() {
        // axios.post(`${ROOT_URL}createUser`, { phone: this.state.phone })
        // .then(() => {
        //     axios.post(`${ROOT_URL}requestOneTimePassword`, { phone: this.state.phone });
        // })
        // .catch((err) => console.log(err));

        try {
            await axios.post(`${ROOT_URL}createUser`, { phone: this.state.phone });
            await axios.post(`${ROOT_URL}requestOneTimePassword`, { phone: this.state.phone });
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
                </View>

                <Button 
                    title="Submit"
                    onPress={this.handleSubmit.bind(this)}
                />
            </View>
        );
    }
}

export default SignUpForm;
