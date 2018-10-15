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
        description={place.description}
        position={{ lat: place.lat, lng: place.lng }}
      />
    ));
  }

  markerMaker() {
    const info = [];
    this.props.chefs.map((chef) => {
      axios.get('/api/user/map', {
        params: {
          chefId: chef.id,
          streetAddress: chef.streetAddress,
          city: chef.city,
          stateName: chef.stateName,
          zip: chef.zip,
          username: chef.username,
          name: chef.name,
          description: chef.description,
        },
      }).then((res) => {
        info.push(res.data);
      }).then(() => {
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
    let icon;
    let curName;
    let zoom;
    let latitude;
    let longitude;
    if (this.props.latitude && this.props.longitude) {
      icon = {
        url: 'http://www.robotwoods.com/dev/misc/bluecircle.png',

      };
      curName = 'Current Location';
      zoom = 14;
      latitude = this.props.latitude;
      longitude = this.props.longitude;
    } else {
      icon = null;
      curName = 'US';
      zoom = 3;
      latitude = 39.8283;
      longitude = -98.5795;
    }
    return (
      <div>
        <Map
          google={this.props.google}
          onClick={this.onMapClicked}
          zoom={zoom}
          style={style}
          initialCenter={{
            lat: latitude,
            lng: longitude,
          }}
          className="map"
        >
          <Marker
            onClick={this.onMarkerClick}
            name={curName}
            position={{ lat: latitude, lng: longitude }}
            icon={icon}
          />
          {this.mapMarkers()}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
              <p>{this.state.selectedPlace.description}</p>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (`${process.env.MAP_KEY}`),
})(MapContainer);
