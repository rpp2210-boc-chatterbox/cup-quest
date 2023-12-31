import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { testData } from './testData';
import LocalCafeTwoToneIcon from '@mui/icons-material/LocalCafeTwoTone';
import { Link, Routes, Route } from 'react-router-dom';
import { ShopOverview } from "../ShopOverview";
import InputIcon from '@mui/icons-material/Input';
import axios from 'axios';

const API = {
  geocode: import.meta.env.VITE_MAP_API_KEY,
  yelp: import.meta.env.VITE_YELP_API_KEY
};

const Map = () => {
  // const [lat, setLat] = useState(null);
  // const [lng, setLng] = useState(null);
  const [lat, setLat] = useState(() => {
    const storedLat = localStorage.getItem('lat');
    return storedLat ? parseFloat(storedLat) : null;
  });
  const [lng, setLng] = useState(() => {
    const storedLng = localStorage.getItem('lng');
    return storedLng ? parseFloat(storedLng) : null;
  });
  const [shops, setShops] = useState([]);
  // const [shops, setShops] = useState(() => {
  // const storedShops = localStorage.getItem('shops');
  //   return storedShops ? parseFloat(storedShops) : null;
  // });
  const [selectedShopId, setSelectedShopId] = useState(null);
  const [markerClicked, setMarkerClicked] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {

    // console.log('shopId===> ', shopId);
    // if (!shopId) {

    console.log('lat/lng===> ', lat, lng)


    if (lat && lng) {
      // setShops(testData.businesses);
      // setSelectedShopId(null);
      // setMarkerClicked(false);
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // setLat(position.coords.latitude);
          // setLng(position.coords.longitude);
          const newLat = position.coords.latitude;
          const newLng = position.coords.longitude;
          setLat(newLat);
          setLng(newLng);
          // setSelectedShopId(null);
          // setMarkerClicked(false);
          localStorage.setItem('lat', newLat.toString());
          localStorage.setItem('lng', newLng.toString());
        },
        (error) => {
          console.log("Error getting location: ", error.message)
        }
      )
    }

    fetchShops(lat, lng, API.yelp);

  }, []);

  const handleAddressChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    // Use the searchQuery state to fetch the location data from the Geocoding API
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(searchQuery)}&key=${API.geocode}`)
      // .then(response => response.json())
      .then(data => {
        console.log(data);
        // Check if the API returned any results
        if (data.data.status === 'OK' && data.data.results.length > 0) {
          const { lat, lng } = data.data.results[0].geometry.location;
          setLat(lat);
          setLng(lng);
          // setShops([]);
          setSelectedShopId(null);
          setMarkerClicked(false);
          fetchShops(lat, lng, API.yelp);
          localStorage.setItem('lat', lat.toString());
          localStorage.setItem('lng', lng.toString());
        } else {
          console.log('No results found');
        }
      })
      .catch(error => {
        console.log('Error fetching location data:', error);
      });
  };

  const fetchShops = (lat, lng, api) => {
  axios.get(`/map/${lat}/${lng}/${api}`)
    // .then(response => response.json())
    .then(data => {
      console.log('inside then block', data);
      setShops(data.data);
      setSelectedShopId(null);
      setMarkerClicked(false);
    })
    .catch(error => {
      console.log('Error fetching coffee shops:', error);
    });
  };

  const clickedOutside = (x, y, lat, lng, event) => {
    if (markerClicked) {
      setSelectedShopId(null);
      setMarkerClicked(false);
    // } else {
    //   // console.log("map clicked");
    }
  };

  const header = () => {
    return (
      <div style={{ marginBottom: 10 }}>
        <TextField
          label="Show me coffee shops in..."
          variant="outlined"
          style={{ width: "100%" }}
          value={searchQuery}
          onChange={handleAddressChange}
          onKeyPress={handleKeyPress}
        />
        <Button
          variant="contained"
          style={{
            width: "100%",
            marginTop: 10,
            color: "#542a1b",
            backgroundColor: "#e6b17e"
          }}
          onClick={handleSearch}
        >
        <SearchIcon />
          Search
        </Button>
    </div>
  )
};

  const map = () => {
    // console.log(testData)
    const defaultProps = {
      center: {
        lat: lat,
        lng: lng
      },
      zoom: 13
    };

    const handleShopButtonClick = (shopId) => {
      setSelectedShopId(shopId);
      setMarkerClicked(true);
    };


    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
            style={{
              height: '40vh',
              width: '100%',
              margin: '0',
              marginBottom: '10px'
            }}
        >
        <GoogleMapReact
          bootstrapURLKeys={{ key: API.geocode }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          center={{
            lat: lat,
            lng: lng
          }}
          onClick={clickedOutside}
        >
            {shops.map((shop) => (
                <LocalCafeTwoToneIcon
                  key={shop.id}
                  color={selectedShopId === shop.id ? "brown" : "inherit"}
                  lat={shop.coordinates.latitude}
                  lng={shop.coordinates.longitude}
                  onClick={() => {
                    setSelectedShopId(shop.id);
                    setMarkerClicked(true);
                  }}
                />
              ))
            }

          </GoogleMapReact>
          <div
          style={{
            height: '40vh',
            width: '100%',
            overflowY: 'auto'
          }}
          >
          <ul>
            {shops.map((shop) => (
              <li
                key={shop.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px',
                  marginBottom: '5px',
                  backgroundColor: selectedShopId === shop.id ? '#f1e6d0' : 'inherit'
                }}
              >
                <Link
                  to='/overview'
                  state={{
                    shopId: shop.id,
                    userId: userId
                  }}
                  style={{
                    color: "#542a1b",
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}
                >
                  <LocalCafeTwoToneIcon>
                  key={shop.id}
                  color={"#542a1b"}
                  lat={shop.coordinates.latitude}
                  lng={shop.coordinates.longitude}
                  onClick={() => {
                    setSelectedShopId(shop.id);
                    setMarkerClicked(true);
                  }}
                </LocalCafeTwoToneIcon>

                    <Typography
                    underline="hover"
                    style={{
                      color: "#542a1b"
                      }}>
                      {shop.name}
                    </Typography>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        </div>
      </div>
    )
  };

  return (
    <div>
      {header()}
      {map()}
    </div>
  );
};

export default Map;
