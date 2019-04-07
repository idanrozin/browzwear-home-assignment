import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import Geocode from "react-geocode";

export class MapContainer extends Component {
  componentDidMount(){
    Geocode.setApiKey("AIzaSyA4Uc2Ak1sEekIorvPmNStt8YqrGD4Rahw");
    if(this.props.addr){
      this.getLongLat(this.props.addr)
    }  
  }

    componentDidUpdate(prevProps) {
      //each time this component recive new props we call 'getLongLat' in order to change the coordinates
        if (this.props.addr !== prevProps.addr) {
            this.getLongLat(this.props.addr);
        }
    }

  getLongLat = (address) =>{
    Geocode.fromAddress(address).then(
       response => {
         //if response is OK I set the state long, lat accordingly
         const { lat, lng } = response.results[0].geometry.location;
         this.setState({long:lng, lat:lat});
       },
       error => {
         console.error(error);
         this.setState({long:32.0879994, lat: 34.7622266});  // in case of error i have decided to just return some default long & lat (in this case its tel aviv) 
       }
     );
}
  state = {
    long: this.props.long,
    lat: this.props.lat,
    showingInfoWindow: false,  //Hides or the shows the infoWindow
    activeMarker: {},          //Shows the active marker upon click
    selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
  };


  render() {
       
    return (
      <Map
        google={this.props.google}
        zoom={14}
        initialCenter={{
         lat: this.state.lat,
         lng: this.state.long
        }}
        center={{
          lat: this.state.lat,
            lng: this.state.long
        }}
      >
        <Marker
          position={{
          lat: this.state.lat,
            lng: this.state.long
        }}
        />
        
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyA4Uc2Ak1sEekIorvPmNStt8YqrGD4Rahw'
})(MapContainer);