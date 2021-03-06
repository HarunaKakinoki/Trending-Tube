const doesDataExistInLocalStorage = key => {
  if (typeof(Storage) !== "undefined") {
    return localStorage.getItem(key) !== null;
  }
}

export { doesDataExistInLocalStorage };