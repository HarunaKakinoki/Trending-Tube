function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    return { latitude, longitude }
    // mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    // mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
  }

  let result = null;
  if(!navigator.geolocation) {
    console.log('no')
  } else {
    result = navigator.geolocation.getCurrentPosition(success, err => { console.log(err)});
  }

  export default result;
  