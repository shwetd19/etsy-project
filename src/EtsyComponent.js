// EtsyComponent.js
import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import OAuth from 'oauth-1.0a';
import CryptoJS from 'crypto-js';
import axiosJsonp from 'axios-jsonp';

const EtsyComponent = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const oauth = OAuth({
          consumer: {
            key: '0aa6qx7gfy3cds87hvijwe40', // Replace with your KEYSTRING
            secret: 'yx0dtmyhja', // Replace with your SHARED SECRET
          },
          signature_method: 'HMAC-SHA1',
          hash_function(base_string, key) {
            return CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(base_string, key));
          },
        });

        const requestData = {
          url: 'https://openapi.etsy.com/v3/application/listings/batch',
          method: 'GET',
          data: {
            listing_ids: '1', // Replace with your listing IDs
          },
        };

        const headers = oauth.toHeader(oauth.authorize(requestData));

        const response = await axiosJsonp({
            url: 'https://openapi.etsy.com/v3/application/listings/batch',
            params: {
              listing_ids: '1', // Replace with your listing IDs
              api_key: '0aa6qx7gfy3cds87hvijwe40', // Replace with your Etsy API key
            },
          });

        setListings(response.data.results);
      } catch (error) {
        console.error('Error fetching data from Etsy API:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Etsy Listings</h1>
      <ul>
        {listings.map((listing) => (
          <li key={listing.listing_id}>{listing.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default EtsyComponent;
