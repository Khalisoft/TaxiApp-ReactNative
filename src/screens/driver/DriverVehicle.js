import React from 'react';
import {
   StyleSheet,
   Text,
   View,
   Button,
   AsyncStorage,
   Image,
   TouchableHighlight,
} from 'react-native';
import {
   Content,
   Container,
   Header,
   Left,
   Icon,
   Footer,
   Body,
   Card,
   CardItem,
} from 'native-base';
export default class DriverVehicle extends React.Component {
   static navigationOptions = {
      drawerIcon: ({ tintColor }) => (
         <Image
            source={require('../../assets/Images/vehicle.png')}
            style={{ width: 30, height: 30 }}
         />
      ),
   };
   render() {
      return (
         <Container style={{ flex: 1 }}>
            <Header
               style={{
                  backgroundColor: '#42A5F5',
                  height: 75,
               }}
            >
               <Left>
                  <TouchableHighlight
                     style={{
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 20,
                     }}
                     onPress={() => this.props.navigation.navigate('Home')}
                  >
                     <Icon
                        name="arrow-back"
                        style={{
                           color: '#ffffff',
                        }}
                     />
                  </TouchableHighlight>
               </Left>
               <Body>
                  <Text
                     style={{
                        color: '#ffffff',
                        fontSize: 20,
                        fontWeight: 'bold',
                        marginTop: 20,
                     }}
                  >
                     Vehicle Details
                  </Text>
               </Body>
            </Header>

            <Content />
         </Container>
      );
   }
}

const styles = StyleSheet.create({
   containerView: {
      flex: 1,
      backgroundColor: '#ffffff',
   },
   map: {
      height: 600,
      marginTop: 0,
   },
});
