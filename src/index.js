import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
// import anime from 'animejs/lib/anime.es.js'
import ArtInstitute from './ArtInstitute';
import metMuseum from './metMuseum';
import Harvard from './harvardMuseum';


function displayArt(object) {
  $("#artInList").append(`
  <div class='card'>
  <li>Title: ${object.data.title}</li>
  <li>Artist: ${object.data.artist_display}</li>
  <li>Style: ${object.data.style_title}<li>
  <li><img class='thumbnail' src='https://www.artic.edu/iiif/2/${object.data.image_id}/full/843,/0/default.jpg'></li>
  </div>`);
}
function displayMet(object) {
  $("#metList").append(`
  <li>Title: ${object.title}</li>
  <li>Artist: ${object.artistDisplayName}</li>
  <li>Style: ${object.classification}<li>
  <li><img class='thumbnail' src='${object.primaryImage}'></li>`);
}




// function displayHarvard(data) {
//   data.forEach(function(painting){
//     $("#harvardList").append(`
//     <li>Title: ${painting.title}<li>
//     <li>Artist: ${painting.creditline}</li>
//     <li><img class='thumbnail' src="${painting.images[0].baseimageurl}"></li>
//     `);
//   });
// }

// function displayHarvard(data) {
//   data.forEach(function(painting){
//     $("#harvardList").append(`
//     <p>Title: ${painting.title}</p>
//     <p>Artist: ${painting.creditline}</p>
//     </li><img class='img-thumbnail' src="${painting.images[0].baseimageurl}">
//     </li>`);
//   });
// }

function displayHarvard(data) {
  data.forEach(function(painting){
    $("#harvardList").append(`
    
  <div class="card w-75">
    <img class='thumbnail-img card-img-top' src="${painting.images[0].baseimageurl}">
    <div class="card-body">
      <h5 class="card-title">${painting.title}</h5>
      <p class="card-text">${painting.creditline}</p>
    </div>
    </div>`);
  });
}

// function displayHarvard(data) {
//   data.forEach(function(painting){
//     $(".row").append(`

//     <div class="col-md-4">
//     <img
//       src="${painting.images[0].baseimageurl}"
//       class="w-100 shadow-1-strong rounded mb-4"
//       alt=""
//     />
//     </div>

//     `);
//   });
// }


$(document).ready(function () {
  $("#searchForm").submit(function (e) {
    e.preventDefault();
    $("#artInList").html("");
    let search = $('#search').val();
    ArtInstitute.searchArt(search)
      .then(function (response) {
        const data = response.data;
        data.forEach(function (piece) {
          // gathering the art data with artist/history/date etc..
          ArtInstitute.searchObject(piece.id)
            .then(function (object) {
              displayArt(object);
            });
        });
      });
  });
  $("#searchForm2").submit(function (e) {
    e.preventDefault();
    const search = $('#search2').val();
    const departmentId = $('#departmentId :selected').val();
    // get ids for paitings with search
    metMuseum.searchArt(search, departmentId)
      .then(function (response) {
        const data = response.objectIDs;
        data.forEach(function (piece) {
          // gathering the art data with artist/history/date etc..
          metMuseum.searchObject(piece)
            .then(function (object) {
              displayMet(object);
            });
        });
      });
  });

  $("#searchForm3").submit(function (e) {
    e.preventDefault();
    let search = $('#search3').val();
    // get ids for paitings with search
    Harvard.searchArt(search)
      .then(function (response) {
        const data = response.records;
        console.log(data);
        displayHarvard(data);
      });
  });


});
