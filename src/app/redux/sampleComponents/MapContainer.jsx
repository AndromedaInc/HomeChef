import React from 'react';
import {
  Map, InfoWindow, Marker, GoogleApiWrapper,
} from 'google-maps-react';
import axios from 'axios';

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      chefMapInfo: [],
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
    this.markerMaker = this.markerMaker.bind(this);
    this.mapMarkers = this.mapMarkers.bind(this);
  }

  componentDidMount() {
    this.markerMaker();
  }


  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  }

  onMapClicked() {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  }

  mapMarkers() {
    return this.state.chefMapInfo.map(place => (
      <Marker
        onClick={this.onMarkerClick}
        name={place.name}
        position={{ lat: place.lat, lng: place.lng }}
      />
    ));
  }

  markerMaker() {
    const info = [];
    this.props.chefs.map((chef) => {
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${chef.streetAddress},${chef.city},${chef.state}&key=AIzaSyCvT4Z0YLE6vtaJkEtY44m14cBQevtXCkg`)
        .then((res) => {
          const lat = res.data.results[0].geometry.location.lat;
          const lng = res.data.results[0].geometry.location.lng;
          info.push({ lat, lng, name: chef.name });
        })
        .then(() => {
          this.setState({
            chefMapInfo: info,
          });
        })
        .catch(err => console.log(err));
    });
  }

  render() {
    const style = {
      width: '70%',
      height: '50%',
    };

    const { latitude, longitude } = this.props;
    return (
      <div>
        <Map
          google={this.props.google}
          onClick={this.onMapClicked}
          zoom={14}
          style={style}
          initialCenter={{
            lat: latitude,
            lng: longitude,
          }}
          className="map"
        >
          <Marker
            onClick={this.onMarkerClick}
            name="Current Location"
            position={{ lat: latitude, lng: longitude }}
            icon={{
              url: 'http://www.robotwoods.com/dev/misc/bluecircle.png',
            }}
          />
          {this.mapMarkers()}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyCvT4Z0YLE6vtaJkEtY44m14cBQevtXCkg'),
})(MapContainer);
