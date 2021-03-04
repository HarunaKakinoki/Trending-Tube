
const getCountryDataFromFile = async () => {
  const data = await fetch('data/data.json'
    , {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
  ).then((response) => {
    return response.json();
  }).then((myJson) => {
    return myJson;
  });

  return data;
}

const doesDataExistInLocalStorage = key => {
  if (typeof(Storage) !== "undefined") {
    return localStorage.getItem(key) !== null;
  }
}

export { getCountryDataFromFile, doesDataExistInLocalStorage };