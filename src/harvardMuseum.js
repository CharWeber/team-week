export default class Harvard {

  static searchArt(search) {
    return fetch(`https://api.harvardartmuseums.org/object?apikey=${process.env.apikey}&title=${search}&classification=Paintings`)
      .then(function (response) {
        console.log(response);
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
  // static searchObject(imageid) {
  //   return fetch(`https://api.artic.edu/api/v1/artworks/${imageid}`)
  //     .then(function (response) {
  //       if (!response.ok) {
  //         throw Error(response.statusText)
  //       }
  //       return response.json();
  //     })
  //     .catch(function (error) {
  //       return error
  //     })
//   }
 }


// Find all of the objects that are paintings and have the word "rabbit" in the title
// var apiEndpointBaseURL = "https://api.harvardartmuseums.org/object";
// var queryString = $.param({
//     apikey: "YOUR APIKEY HERE",
//     title: "rabbit",
//     classification: "Paintings"
// });

// $.getJSON(apiEndpointBaseURL + "?" + queryString, function(data) {
//    console.log(data); 
// });