const doesDataExistInSessionStorage = key => {
  if (typeof(Storage) !== "undefined") {
    return sessionStorage.getItem(key) !== null;
  }
}

export { doesDataExistInSessionStorage };