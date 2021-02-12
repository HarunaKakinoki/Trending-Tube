import { iso1A2Code } from '@ideditor/country-coder';
import { DEFAULT_USER_LOCATION } from '../constants';

const getUserCoordinates = () => {
  return new Promise(function(resolve, reject) {
    if (navigator.geolocation) {
    　  navigator.geolocation.getCurrentPosition(position => {
        resolve(position.coords);
      }, err => {
        resolve(err);
      });
  } else {
    resolve("Not Supported by browser");
  }
  });
}

//Get user's location from Geolocation API.
const getUserLocation = async () => {
  let countryCode = DEFAULT_USER_LOCATION; //Deafult location => United States.
  
  const coordinates = await getUserCoordinates();
  
  //When sucessfully get user coordinates.
  if(coordinates.longitude && coordinates.latitude) {
    const { longitude, latitude } = coordinates;
    countryCode = iso1A2Code([longitude, latitude]);
  } 

  return countryCode;
}

export { getUserLocation };
