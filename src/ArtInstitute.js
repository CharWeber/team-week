export default class ArtInstitute {

  static searchArt(search) {
    return fetch(`https://api.artic.edu/api/v1/artworks/search?q=${search}&fields=id,title,image_id&limit=20`)
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


  // api call url: https://api.artic.edu/api/v1/artworks/[id]
  static searchObject(id){
    return fetch(`https://api.artic.edu/api/v1/artworks/${id}`)
    .then(function(response){
      if (!response.ok){
        throw Error(response.statusText)
      }
      return response.json();
    })
    .catch(function (error) {
      return error
    })
  }
}