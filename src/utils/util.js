//Check there's data on session storage or not.
export const doesDataExistInSessionStorage = key => {
  if (typeof (Storage) !== "undefined") {
    return sessionStorage.getItem(key) !== null;
  }
}

//Save data to session storage.
export const saveDataToSessionStorage = (key, rawData) => {
  //Save fetched video data onto session storage.
  if (typeof sessionStorage) {
    sessionStorage.setItem(key, JSON.stringify(rawData));
  }
}