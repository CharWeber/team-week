export default class MetMuseum {

  static searchArt(search, departmentId) {
    return fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=${departmentId}&q=${search}`)
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
    return fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
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