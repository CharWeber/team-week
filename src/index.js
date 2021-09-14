import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
// import anime from 'animejs/lib/anime.es.js'
import ArtInstitute from './ArtInstitute';


function displayArt(object) {
  $("#searchArtInList").append(`
  <li><div class='card'>
  <img class='thumbnail' id='${object.data.id}' src='https://www.artic.edu/iiif/2/${object.data.image_id}/full/843,/0/default.jpg'>
  <h1>${object.data.title}</h1>
  <p>${object.data.artist_display}, ${object.data.medium_display}</p>
  </div>
  `)}

  
  $(document).ready(function () {
    $("#searchForm").submit(function (e) {
      e.preventDefault();
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
