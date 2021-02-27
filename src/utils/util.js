
const getLanguageDataByCountry = async () => {
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

const saveDataToLocalStorage = (key, data) => {
  localStorage.setItem(key, data);
}

const doesDataExistInLocalStorage = key => {
  if (typeof(Storage) !== "undefined") {
    return localStorage.getItem(key) !== null;
  }
}

export { getLanguageDataByCountry, saveDataToLocalStorage, doesDataExistInLocalStorage };