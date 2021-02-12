
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

export { getLanguageDataByCountry };