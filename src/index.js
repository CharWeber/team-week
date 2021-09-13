import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
// import anime from 'animejs/lib/anime.es.js'
import ArtInstitute from './ArtInstitute';

function displayArt(object) {
  $("#artInList").append(`
  <li>Title: ${object.data.title}</li>
  <li>Artist: ${object.data.artist_display}</li>
  <li>Style: ${object.data.style_title}<li>
  <li><img src='https://www.artic.edu/iiif/2/${object.data.image_id}/full/843,/0/default.jpg'></li>`);
}

$(document).ready(function () {
  $("#searchBtn").click(function () {
    let search = $('#search').val();
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
});
