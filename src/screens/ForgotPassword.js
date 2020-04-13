import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import colors from '../styles/colors';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import InputField from '../components/form/InputField';
import NextArrowButton from '../components/buttons/NextArrowButton';
import Notification from '../components/Notification';
import Loader from '../components/Loader';

export default class LogIn extends Component{
  constructor(props){
    super(props);
    this.state = {  
      formValid: true,
      loadingVisible: false,
      validEmail: false,
      emailAddress: '',
    }
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.goToNextStep = this.goToNextStep.bind(this);
    this.handleCloseNotification = this.handleCloseNotification.bind(this);
  }

  handleEmailChange(email){
    const emailCheckRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    this.setState({ emailAddress: email });

    if(!this.state.validEmail){
      if(emailCheckRegex.test(email)){
        this.setState({ validEmail: true });
      }
    } else {
      if(!emailCheckRegex.test(email)){
        this.setState({ validEmail: false });
      }
    }
  }

  goToNextStep(){
    this.setState({ loadingVisible: true });
    setTimeout(() => {
      if(this.state.emailAddress === 'wrong@email.com'){
        this.setState({
          loadingVisible: false,
          formValid: false,
        });
      } else {
        this.setState({
          loadingVisible: false,
          formValid: true,
        });
      }
    }, 2000);
  }

  handleCloseNotification(){
    this.setState({
      formValid: true
    });
  }

  render(){
    const { loadingVisible, formValid, validEmail } = this.state;
    const background = formValid ? colors.green01 : colors.darkOrange;
    const showNotification = formValid ? false : true;
    return(
      <KeyboardAvoidingView
        style={ [{ backgroundColor: background }, styles.wrapper] }
        behavior='padding'
      >
        <View style={ styles.scrollViewWrapper }>
         <ScrollView style={ styles.scrollView }>
          <Text style={ styles.forgotPasswordHeading }>Forgot your password?</Text>
          <Text style={ styles.forgotPasswordSubheading }>Enter your email to find your account</Text>
          <InputField 
            customStyle={{ marginBottom: 30 }}
            textColor={colors.white}
            labelText='EMAIL ADDRESS'
            labelTextSize={14}
            labelColor={colors.white}
            borderBottomColor={colors.white}
            inputType='email'
            onChangeText={ this.handleEmailChange }
            showCheckmark={ validEmail }
          />
        </ScrollView>
        <View style={ styles.nextButton }>
          <NextArrowButton
            handleNextButton={ this.goToNextStep }
            disabled={!validEmail}
          />
        </View>
        <View style={ styles.notificationWrapper }>
          <Notification 
            showNotification={ showNotification }
            handleCloseNotification={ this.handleCloseNotification }
            type='Error'
            firstLine='No account exists for the requested'
            secondLine='email address.'
          />
        </View>
      </View>
        <Loader 
          modalVisible={loadingVisible}
          animationType='fade'
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flex: 1,
  },
  forgotPasswordHeading: {
    fontSize: 29,
    color: colors.white,
    fontWeight: '300',
  },
  scrollViewWrapper: {
    marginTop: 60,
    flex: 1,
  },
  scrollView: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
    flex: 1
  },
  forgotPasswordSubheading: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 15,
    marginTop: 10,
    marginBottom: 60,
  },
  notificationWrapper: {
    position: 'absolute',
    bottom: 0,
  },
  nextButton: {
    alignItems: 'flex-end',
    right: 20,
    bottom: 20,
  },
});
