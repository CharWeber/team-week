import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
// import anime from 'animejs/lib/anime.es.js'
import ArtInstitute from './ArtInstitute';
import metMuseum from './metMuseum';
import Harvard from './harvardMuseum';


function clrFields(){
  $('#search').val("");
  $('#search2').val("");
  $('#search3').val("");
}

function displayArt(object) {
  $("#artInFeed").prepend(`
  <div class="card w-75 mx-auto">
  <img class='thumbnail-img card-img-top' src='https://www.artic.edu/iiif/2/${object.data.image_id}/full/843,/0/default.jpg'>
  <div class="card-body">
    <h5 class="card-title">${object.data.title}</h5>
    <p class="card-text">${object.data.artist_display}, ${object.data.style_title}</p>
    <p class="card-text"><a href="https://www.artic.edu/artworks/${object.data.id}/">Museum Page</a></p>
  </div>
  </div>`);
}
function displayMet(object) {
  $("#metFeed").prepend(`   
  <div class="card w-75 mx-auto">
    <img class='thumbnail-img card-img-top' src="${object.primaryImage}">
    <div class="card-body">
      <h5 class="card-title">${object.title}</h5>
      <p class="card-text">${object.artistDisplayName}, ${object.classification}</p>
      <p class="card-text"><a href="${object.objectURL}">Museum Page</a></p>
    </div>
    </div>`);
}


function displayHarvard(data) {
  data.forEach(function (painting) {
    $("#harvardFeed").prepend(`
  <div class="card w-75 mx-auto">
    <img class='thumbnail-img card-img-top' src="${painting.images[0].baseimageurl}">
    <div class="card-body">
      <h5 class="card-title">${painting.title}</h5>
      <p class="card-text">${painting.creditline}</p>
      <p class="card-text"><a href="${painting.url}">Museum Page</a></p>
    </div>
    </div>`);
  });
}

function showHarvard(){
  $("#harvardDisplay").removeClass('hidden')
  $("#artInDisplay").addClass('hidden')
  $("#metDisplay").addClass('hidden')
}
function showMet(){
  $("#harvardDisplay").addClass('hidden')
  $("#artInDisplay").addClass('hidden')
  $("#metDisplay").removeClass('hidden')
}
function showArtIn(){
  $("#harvardDisplay").addClass('hidden')
  $("#artInDisplay").removeClass('hidden')
  $("#metDisplay").addClass('hidden')
}


$(document).ready(function () {
  $("#searchForm").submit(function (e) {
    e.preventDefault();
    let search = $('#search').val();
    clrFields();
    ArtInstitute.searchArt(search)
      .then(function (response) {
        const data = response.data;
        data.reverse();
        data.forEach(function (piece) {
          // gathering the art data with artist/history/date etc..
          ArtInstitute.searchObject(piece.id)
            .then(function (object) {
              displayArt(object);
            });
        });
      });
      showArtIn();
  });
  $("#searchForm2").submit(function (e) {
    e.preventDefault();
    const search = $('#search2').val();
    const departmentId = $('#departmentId :selected').val();
    clrFields();
    // get ids for paitings with search
    metMuseum.searchArt(search, departmentId)
      .then(function (response) {
        const data = response.objectIDs;
        data.reverse();
        data.forEach(function (piece) {
          // gathering the art data with artist/history/date etc..
          metMuseum.searchObject(piece)
            .then(function (object) {
              displayMet(object);
            });
        });
      });
      showMet();
  });

  $("#searchForm3").submit(function (e) {
    e.preventDefault();
    let search = $('#search3').val();
    clrFields();
    // get ids for paitings with search
    Harvard.searchArt(search)
      .then(function (response) {
        const data = response.records;
        data.reverse();
        displayHarvard(data);
      });
    showHarvard();
  });

  $("#metMuseum").click(function(){
    showMet();
  });

  $("#harvardMuseum").click(function(){
    showHarvard();
  });

  $("#metMuseum").click(function(){
    showArtIn();
  });

});
