import { iso1A2Code } from '@ideditor/country-coder';
import { DEFAULT_USER_LOCATION } from '../data/constants';

//Get Coordinates of user location
const getUserCoordinates = () => {
  return new Promise((resolve) => {

    if (navigator.geolocation) {
        const timeout = { timeout: 3000 };
        navigator.geolocation.getCurrentPosition(position => {
          resolve(position.coords);
      }, err => resolve(err), timeout);

    } else {
      resolve("Not Supported by browser");
    }

  });
}

//Get user's location from Geolocation API.
export const getUserLocation = async () => {
  let countryCode = DEFAULT_USER_LOCATION; //Deafult location => Canada.

  const coordinates = await getUserCoordinates();

  //When sucessfully get user coordinates.
  if (coordinates.longitude && coordinates.latitude) {
    const { longitude, latitude } = coordinates;
    countryCode = iso1A2Code([longitude, latitude]);
  }

  return countryCode;
}
