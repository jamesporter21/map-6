mapboxgl.accessToken =
  "pk.eyJ1IjoiamFtZXNwb3J0ZXIyMSIsImEiOiJjbGxvN2lmazcwN3d4M2NuM2pnZHZsZTNwIn0.I70dWocAUtgPwOThih14DA";

var filterGroup = document.getElementById("ll");

var maxBounds = [
  [-74.27, 40.49], // Southwest coordinates
  [-73.68, 40.92], // Northeast coordinates
];

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/jamesporter21/clmwbb4ql02rx01qxh0faaju8",
  center: [-96.7853964, 32.7846839],
  zoom: 10,
  // maxBounds: maxBounds,
  preserveDrawingBuffer: true,
  customAttribution:
    'created by <a style="padding: 0 3px 0 3px; color:#FFFFFF; background-color: #bf7f46;" target="_blank" href=http://www.geocadder.bg/en/portfolio.html>GEOCADDER</a>',
});

var nav = new mapboxgl.NavigationControl({ showCompass: false });
map.addControl(nav, "top-left");


var markersAllIds = [];

var onlySelectedaccessibilityPoints = [];
var isinitialSelectedType = false;
var initialSelectedType = "";
var counter = 0;

var mainPointLatitude;
var mainPointLongitude;

var pointsForSearchArray = [];

map.on("load", () => {
  // map.on("click", (event) => {
  //   const features = map.queryRenderedFeatures(event.point, {
  //     layers: ["all-9l351t"],
  //   });
  //   if (!features.length) {
  //     return;
  //   }
  //   const feature = features[0];
  //   console.log(feature);
  // });

  // map.on("click", function () {
  //   console.log(map.getZoom());
  // });

  map.addSource("counties", {
    type: "vector",
    url: "mapbox://jamesporter21.73b25k3s",
    promoteId: { "all-9l351t": "layer" },
  });

  map.addLayer({
    id: "ACTIVE BLOCKS",
    type: "fill",
    // visibility: "visible",
    // visibility: [
    //   "case",
    //   ["==", ["feature-state", "numUsers"], 1],
    //   "visible",
    //   "none"
    // ],

    "source-layer": "all-9l351t",
    source: "counties",
    layout: {},
    visibility: "visible",
    paint: {
      // "fill-color": "red",
      "fill-color": [
        "case",
        ["==", ["feature-state", "numUsers"], 2],
        "rgba(255, 0, 0, 0.0)",
        // ["==", ["feature-state", "numUsers"], 2],
        // "green",
        "blue",
      ],
    },
  });

  map.addLayer({
    id: "boxes-outline-layer",
    type: "line",
    visibility: "visible",
    "source-layer": "all-9l351t",
    source: "counties",
    layout: {},
    paint: {
      "line-color": "#ffffff",
      "line-width": 1,
    },
  });

  var zipCodesArray = [];
  const features = map.queryRenderedFeatures({
    layers: ["ACTIVE BLOCKS"],
  });
  features.forEach(function (feature) {
    console.log(feature.id);
    zipCodesArray.push(feature.id);
  });
  console.log(zipCodesArray);
});

// popup toggling //
function togglePopup() {
  var popup = this._popup;

  if (!popup) return;
  else if (popup.isOpen()) popup.remove();
  else popup.addTo(this._map);
}
// end popup toggling//

//////////////// open/close dropdown menu for first type filter
var checkList = document.getElementById("list1");
checkList.getElementsByClassName("anchor")[0].onclick = function (evt) {
  if (checkList.classList.contains("visible"))
    checkList.classList.remove("visible");
  else checkList.classList.add("visible");
};
//////////////

$("input[type='checkbox'][name='filter-by-first-type-input']").click(
  function () {
    var currentCountry = $(this).val();
    console.log(currentCountry);
    if ($(this).is(":checked")) {
      map.setFeatureState(
        { id: currentCountry, source: "counties", sourceLayer: "all-9l351t" },
        { numUsers: 1 }
      );
    } else {
      map.setFeatureState(
        { id: currentCountry, source: "counties", sourceLayer: "all-9l351t" },
        { numUsers: 2 }
      );
    }
  }
);
