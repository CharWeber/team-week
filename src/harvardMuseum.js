
export default class Harvard {

  static searchArt(search) {
    return fetch(`https://api.harvardartmuseums.org/object?size=100&apikey=${process.env.apikey}&title=${search}&classification=Paintings`)
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
}

