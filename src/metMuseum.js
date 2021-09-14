export default class MetMuseum {

  static searchArt(search) {
    return fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${search}`)
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function (error) {
        return error;
      });
  }


 
  static searchObject(id){
    return fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}?isHighlight=true`)
      .then(function(response){
        if (!response.ok){
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function (error) {
        return error;
      });
  }
}