import React, { Component } from 'react';
// import { Map, GoogleApiWrapper } from 'google-maps-react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import Geocode from "react-geocode";


const mapStyles = {
};

export class MapContainer extends Component {
  componentDidMount(){
    if(this.props.addr){
      this.getLongLat(this.props.addr)
    }else{
      
      // this.getLongLat('Obere Str. 57, Berlin, Germany')
    }
    
  }

  // getSnapshotBeforeUpdate(prevProps, prevState){
  //   if(prevProps.addr !== this.props.addr){
  //      this.getLongLat(this.props.addr);
  //   }
    
  // }

  componentWillReceiveProps(nextProps) {
    if(nextProps.addr !== this.props.addr){
      this.getLongLat(nextProps.addr);
   }
}

  getLongLat = (address) =>{
    Geocode.fromAddress(address).then(
       response => {
         const { lat, lng } = response.results[0].geometry.location;
         console.log(lat, lng);
         this.setState({long:lng, lat:lat});
       //   return {long:lng, lat:lat} 

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

  onMarkerClick = (props, marker, e) =>
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true
  });

onClose = props => {
  if (this.state.showingInfoWindow) {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    });
  }
};
  render() {
    console.log('map cont render');
    console.log('this.state.long',this.state.lat);
    console.log('this.state.long',this.state.long);
    
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
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
          onClick={this.onMarkerClick}
          name={'Kenyatta International Convention Centre'}
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