function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    status.textContent = '';
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
  }

  function error() {
    status.textContent = 'Unable to retrieve your location';
  }

  let result = null;
  if(!navigator.geolocation) {
    console.log('no')
  } else {
    result = navigator.geolocation.getCurrentPosition(success, error);
  }

  export default result;
  