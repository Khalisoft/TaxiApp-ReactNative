import React from 'react';
import {
   StyleSheet,
   Text,
   View,
   Button,
   AsyncStorage,
   TouchableOpacity,
   TextInput,
   KeyboardAvoidingView,
   Image,
   ActivityIndicator,
} from 'react-native';
import PhoneInput from 'react-native-phone-input';
import Toast from 'react-native-simple-toast';
//import   firebase from 'react-native-firebase';
import * as firebase from 'firebase';
import ApiKeys from '../../constants/ApiKeys';

export default class DriverLogin extends React.Component {
   static navigationOptions = {
      headerStyle: {
         backgroundColor: '#42A5F5',
      },
      headerTitleStyle: {
         color: '#fff',
      },
      headerBackTitleStyle: {
         color: '#fff',
      },
      headerTintColor: '#fff',
      title: 'Login For Driving',
   };
   constructor(props) {
      super(props);
      this.state = {
         password: '',
         email: '',
         //animating:false,
         color: '#ffffff',
      };
      if (!firebase.apps.length) {
         firebase.initializeApp(ApiKeys.FirebaseConfig);
      }
   }
   render() {
      const color = this.state.color;
      return (
         <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
            <View style={styles.container}>
               {/*<Text>This is rider login</Text>
           <Button title="Login" onPress={this._signInAsync}/>
        */}

               <View style={styles.socialMedia}>
                  <TouchableOpacity
                     style={styles.googlePlusButton}
                     onPress={() => alert('this is google+')}
                  >
                     <Image
                        source={require('../../assets/Images/googleplus.png')}
                        style={{
                           width: 20,
                           height: 20,
                        }}
                     />
                     {/*<Text style={{color:'#B71C1C',fontWeight:'bold'}}>Google+</Text>*/}
                  </TouchableOpacity>
                  <TouchableOpacity
                     style={styles.facebookButton}
                     onPress={() => alert('this is facebook')}
                  >
                     {/*<Text style={{color:'#ffffff',fontWeight:'bold'}}>Facebook</Text>*/}

                     <Image
                        source={require('../../assets/Images/facebook.png')}
                        style={{
                           width: 20,
                           height: 20,
                        }}
                     />
                  </TouchableOpacity>
               </View>
               <View style={{ flexDirection: 'row' }}>
                  {/*<View style={{marginTop:15,marginLeft:10}}>
        <PhoneInput ref='phone'/>
        </View>*/}
                  <TextInput
                     style={styles.textInputMobile}
                     placeholder="Email"
                     onChangeText={email =>
                        this.setState({
                           email,
                        })
                     }
                     underlineColorAndroid="#c0c0c0"
                  />
               </View>
               <TextInput
                  style={styles.textInputEmail}
                  placeholder="Password"
                  onChangeText={password =>
                     this.setState({
                        password,
                     })
                  }
                  underlineColorAndroid="#c0c0c0"
                  secureTextEntry={true}
               />
               <TouchableOpacity
                  style={styles.LoginButton}
                  onPress={this._signInAsync}
               >
                  <Text
                     style={{
                        color: '#ffffff',
                        fontWeight: 'bold',
                     }}
                  >
                     LOGIN
                  </Text>
               </TouchableOpacity>
               <TouchableOpacity
                  style={styles.passwordForgotten}
                  onPress={this._signInAsync}
               >
                  <Text
                     style={{
                        color: '#42A5F5',
                        fontWeight: 'bold',
                     }}
                  >
                     password forgotten?
                  </Text>
               </TouchableOpacity>
               <ActivityIndicator
                  size="large"
                  //color="#42A5F5"
                  color={color}
               />
            </View>
         </KeyboardAvoidingView>
      );
   }
   _signInAsync = async () => {
      //await AsyncStorage.setItem('userToken', 'rider');

      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (this.state.email.trim() === '') {
         Toast.show('email input must be filled!', Toast.SHORT, Toast.TOP);
         return;
      }
      if (this.state.password.length == '') {
         Toast.show('password must be filled!', Toast.SHORT, Toast.TOP);
         return;
      }
      if (reg.test(this.state.email) === false) {
         Toast.show('INVALID EMAIL!', Toast.SHORT, Toast.TOP, ToastStyle);
         return;
      }
      //this.setState({animating:true})
      this.setState({ color: '#42A5F5' });
      //this.props.navigation.navigate('App1');
      firebase
         .auth()
         .signInWithEmailAndPassword(this.state.email, this.state.password)
         .then(
            () => {
               AsyncStorage.setItem(
                  'driverId',
                  firebase.auth().currentUser.uid,
               );
               //AsyncStorage.setItem('userToken', 'rider');
               //create a rider node with:firstname,lastname,phone,profile
               this.setState({ color: '#ffffff' });

               this.props.navigation.navigate('App2');
            },
            error => {
               Toast.show('error:' + error.message, Toast.SHORT, Toast.TOP);
               this.setState({ color: '#ffffff' });
            },
         );
   };
}

const styles = StyleSheet.create({
   wrapper: {
      flex: 1,
   },
   container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
   },
   socialMedia: {
      flexDirection: 'row',
      width: 300,
      height: 80,
      backgroundColor: '#ffffff',
      marginTop: -200,
      /*borderColor:'#c0c0c0',
    borderWidth:0.5,
    */
      alignItems: 'center',
      justifyContent: 'center',
   },
   facebookButton: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#42A5F5',
      height: 50,
      width: 153,
      marginLeft: 13,
   },
   googlePlusButton: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ffffff',
      height: 50,
      width: 153,
      borderColor: '#dcdcdc',
      borderWidth: 0.4,
      marginLeft: 2,
   },
   RideNames: {
      flexDirection: 'row',
      width: 350,
      height: 80,
      backgroundColor: '#ffffff',
   },
   textInputfn: {
      alignSelf: 'stretch',
      width: 170,
      paddingLeft: 34,
      backgroundColor: '#fff',
   },
   textInputln: {
      alignSelf: 'stretch',
      width: 170,
      paddingLeft: 34,
      marginLeft: 5,
      backgroundColor: '#fff',
   },
   textInputEmail: {
      alignSelf: 'stretch',
      width: 350,
      paddingLeft: 40,
      paddingBottom: 15,
      marginTop: 10,
      marginLeft: 5,
      backgroundColor: '#fff',
   },
   textInputMobile: {
      alignSelf: 'stretch',
      width: 350,
      paddingLeft: 40,
      paddingBottom: 15,
      marginTop: 10,
      marginLeft: 5,
      backgroundColor: '#fff',
   },
   LoginButton: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#42A5F5',
      height: 50,
      width: 350,
      marginTop: 15,
   },
   passwordForgotten: {
      backgroundColor: '#ffffff',
      marginTop: 10,
   },
});
