import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
// import anime from 'animejs/lib/anime.es.js'
import ArtInstitute from './ArtInstitute';
import metMuseum from './metMuseum';


function displayArt(object) {
  $("#artInList").append(`
  <div class='card'>
  <li>Title: ${object.data.title}</li>
  <li>Artist: ${object.data.artist_display}</li>
  <li>Style: ${object.data.style_title}<li>
  <li><img class='thumbnail' src='https://www.artic.edu/iiif/2/${object.data.image_id}/full/843,/0/default.jpg'></li>
  </div>`)
}
function displayMet(object) {
  $("#metList").append(`
  <li>Title: ${object.title}</li>
  <li>Artist: ${object.artistDisplayName}</li>
  <li>Style: ${object.classification}<li>
  <li><img class='thumbnail' src='${object.primaryImage}'></li>`);
}

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
});
