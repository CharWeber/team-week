import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
// import anime from 'animejs/lib/anime.es.js'
import ArtInstitute from './ArtInstitute';
import metMuseum from './metMuseum';

function displayArt(object) {
  $("#artInList").append(`
  <li>Title: ${object.data.title}</li>
  <li>Artist: ${object.data.artist_display}</li>
  <li>Style: ${object.data.style_title}<li>
  <li><img src='https://www.artic.edu/iiif/2/${object.data.image_id}/full/843,/0/default.jpg'></li>`);
}
function displayMet(object) {
  $("#metInList").append(`
  <li>Title: ${object.data.title}</li>
  <li>Artist: ${object.data.artist_display}</li>
  <li>Style: ${object.data.style_title}<li>
  <li><img src='https://collectionapi.metmuseum.org/public/collection/v1/${object.data.image_id}/full/843,/0/default.jpg'></li>`);
}

$(document).ready(function () {
  $("#searchForm").submit(function (e) {
    e.preventDefault();
    let search = $('#search').val();

$("#searchForm2").submit(function (e) {
    e.preventDefault();
    let search = $('#search2').val();
    // get ids for paitings with search
    
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
  metMuseum.searchArt(search)
    .then(function (response) {
      const data = response.data;
      data.forEach(function (piece) {
        // gathering the art data with artist/history/date etc..
        metMuseum.searchObject(piece.id)
          .then(function (object) {
            displayArt(object);
          });
      });
    });
});
