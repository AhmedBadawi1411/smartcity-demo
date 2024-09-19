const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwYTNjZmVlMy05MmVmLTRmMTEtYTExOC03NjQ1ODU4OTYzZWQiLCJpZCI6MjI4ODkyLCJpYXQiOjE3MjM5ODEzNTF9.JsD2DD_4BqFngp6aC01aElfMgoXTsfNuea39Pt7b-3U";
Cesium.Ion.defaultAccessToken = token;

const lon = 13.137822;
const lat = 32.834387;

//! ********************************************************** !//
//! ********************************************************** !//
//! ********************************************************** !//

const homeBtn = document.getElementsByClassName("home-btn")[0];

const dayNightBtn = document.getElementsByClassName("lighting-btn")[0];
const filterBtn = document.getElementsByClassName("filter-btn")[0];
const heatmapBtn = document.getElementsByClassName("heatmap-btn")[0];
const routingBtn = document.getElementsByClassName("routing-btn")[0];
const airqualityBtn = document.getElementsByClassName("airquality-btn")[0];
const lengthBtn = document.getElementsByClassName("length-btn")[0];
const areaBtn = document.getElementsByClassName("area-btn")[0];
const weatherBtn = document.getElementsByClassName("weather-btn")[0];

const transportationContainer = document.getElementsByClassName(
  "transportation-container"
)[0];
const transportationBtn = document.getElementsByClassName(
  "transportation-btn"
)[0];
const busStations = document.getElementsByClassName("bus-station-btn")[0];
const busRoutes = document.getElementsByClassName("bus-routes-btn")[0];
const trainRoutes = document.getElementsByClassName("train-routes-btn")[0];
const trainStations = document.getElementsByClassName("train-station-btn")[0];

const streetViewBtn = document.getElementsByClassName("first-person-btn")[0];
const railwayStationsBtn = document.getElementsByClassName(
  "railway-stations-btn"
)[0];
const railwayBtn = document.getElementsByClassName("railway-btn")[0];
const buswayBtn = document.getElementsByClassName("busway-btn")[0];
const buswayStationsBtn = document.getElementsByClassName(
  "busway-stations-btn"
)[0];

const airInfo = document.getElementsByClassName("airInfo")[0];
const aqiVal = document.getElementsByClassName("a-index-value")[0];
const coVal = document.getElementsByClassName("a-CO-value")[0];
const no2Val = document.getElementsByClassName("a-NO2-value")[0];
const so2Val = document.getElementsByClassName("a-SO2-value")[0];
const o3Val = document.getElementsByClassName("a-O3-value")[0];

const placesBtn = document.getElementsByClassName("places-btn")[0];
const placesItemBtn = document.getElementsByClassName("pois-data-btn");
const placesContainer = document.getElementsByClassName("pois-container")[0];

const slidsShowBtn = document.getElementsByClassName("slide-show-btn")[0];
const storyDescription = document.getElementById("storyDescription");
const storyTitle = document.getElementById("storyTitle");
const allSlidesNumber = document.getElementById("all");
const currentSlidNumber = document.getElementById("current");
const duration = document.getElementById("storySpeed");
const presentaionBtn = document.getElementsByClassName("autoPlay")[0];
const slideContainer = document.getElementsByClassName("story-container")[0];

const heatmapBtnsContainer = document.getElementsByClassName(
  "heatmap-container"
)[0];

const daylightContainer = document.getElementById("time-container");
const timeSlider = document.getElementById("range");
const speedDownMult = document.getElementsByClassName("speed-down-mult")[0];
const speedDownAdd = document.getElementsByClassName("speed-down-add")[0];
const pause = document.getElementsByClassName("pause")[0];
const speedUpMult = document.getElementsByClassName("speed-up-add")[0];
const speedUpAdd = document.getElementsByClassName("speed-up-mult")[0];

const filterContainer = document.getElementsByClassName("filter-container")[0];
const defultFilter = document.getElementsByClassName("filter-default")[0];
const materialFilter = document.getElementsByClassName(
  "filter-Building-Material"
)[0];
const locationFilter = document.getElementsByClassName(
  "filter-Selected-Location"
)[0];
const residentialFilter = document.getElementsByClassName(
  "filter-Residential-Buildings"
)[0];
const officeFilter = document.getElementsByClassName("filter-Office")[0];
const appartmentFilter = document.getElementsByClassName("filter-Apartment")[0];

//! ********************************************************** !//
//! ********************************************************** !//
//! ********************************************************** !//

async function loadData(assetId = 96188) {
  try {
    const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(assetId);
    viewer.scene.primitives.add(tileset);
    filter(tileset);
  } catch (error) {
    console.log(`Error loading tileset: ${error}`);
  }
}

//! ********************************************************** !//
//! ********************************************************** !//
//! ********************************************************** !//

var map = L.map("map");
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors"
}).addTo(map);

//! ********************************************************** !//
//! ********************************************************** !//
//! ********************************************************** !//

// function fetchData(url, headers, name) {
//   fetch(url, {
//     method: "GET",
//     headers: headers
//   })
//     .then(response => response.json())
//     .then(data => {
//       const jsonString = JSON.stringify(data);
//       localStorage.setItem(name, jsonString);
//       localStorage.setItem(name + "lastFetchTime", Date.now());
//     })
//     .catch(error => console.error("Error fetching data:", error));
// }

// function startFetching(url, headers, name) {
//   const lastFetchTime = localStorage.getItem(name + "lastFetchTime");
//   const currentTime = Date.now();

//   if (!lastFetchTime || currentTime - lastFetchTime >= 3600000) {
//     fetchData(url, headers, name);
//   }
// }

// startFetching(
//   `https://air-quality.p.rapidapi.com/current/airquality?lon=${lon}&lat=${lat}`,
//   {
//     "x-rapidapi-key": "c7a6f82089msh1d076723e6d9035p1fa535jsn8650615730e1",
//     "x-rapidapi-host": "air-quality.p.rapidapi.com"
//   },
//   "airData"
// );

//! ********************************************************** !//
//! ********************************************************** !//
//! ********************************************************** !//

function leaflet_initialization() {
  var map = L.map("map");
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
  }).addTo(map);
}

//! ********************************************************** !//
//! ********************************************************** !//
//! ********************************************************** !//

function map_initialization() {
  const viewer = new Cesium.Viewer("cesiumContainer", {
    infoBox: true,
    selectionIndicator: true,
    animation: true,
    baseLayerPicker: true,
    geocoder: true,
    navigationHelpButton: false,
    timeline: false,
    homeButton: false,
    scene3DOnly: true,
    shadows: true,
    terrainShadows: Cesium.ShadowMode.ENABLED,
    terrain: Cesium.Terrain.fromWorldTerrain(),
    terrainProvider: new Cesium.CesiumTerrainProvider({
      url: "https://assets.agi.com/stk-terrain/world",
      requestVertexNormals: true, // Enable accurate lighting
      requestWaterMask: true // Enable water effects
    }),
    skyAtmosphere: new Cesium.SkyAtmosphere()
  });

  viewer.clock.shouldAnimate = true;
  viewer.scene.globe.show = true;
  viewer.scene.globe.enableLighting = true;
  viewer.scene.globe.depthTestAgainstTerrain = true;
  viewer.scene.globe.shadows = Cesium.ShadowMode.ENABLED;
  viewer.scene.globe.showGroundAtmosphere = true;
  viewer.scene.globe.show = true;
  viewer.scene.sun.show = true;
  document.body.style.margin = "0";
  document.getElementById("cesiumContainer").style.width = "100vw";
  document.getElementById("cesiumContainer").style.height = "100vh";
  document.getElementsByClassName("cesium-widget-credits")[0].style.display =
    "none";
  return viewer;
}

//! ********************************************************** !//
//! ********************************************************** !//
//! ********************************************************** !//

const viewer = map_initialization();
const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

//! ********************************************************** !//
//! ********************************************************** !//
//! ********************************************************** !//

loadData();

viewer.scene.preRender.addEventListener(() => {
  const heading = viewer.camera.heading;
  const compass = document.getElementById("compass");
  compass.style.transform = `rotate(${Cesium.Math.toDegrees(heading)}deg)`;
});

//! ********************************************************** !//
//! ********************************************************** !//
//! ********************************************************** !//

function homeButton(
  x = 13.137822,
  y = 32.834387,
  z = 4000,
  p = -25,
  h = 45,
  r = 0.0
) {
  const homePosition = Cesium.Cartesian3.fromDegrees(x, y, z); // Longitude, Latitude, Height
  const homeOrientation = {
    heading: Cesium.Math.toRadians(h),
    pitch: Cesium.Math.toRadians(p),
    roll: r
  };
  // setTimeout(()=>{
  //   viewer.scene.camera.flyTo({
  //     destination: homePosition,
  //     orientation: homeOrientation
  //  });
  // },10);
  homeBtn.addEventListener("click", function(commandInfo) {
    viewer.scene.camera.flyTo({
      destination: homePosition,
      orientation: homeOrientation
    });
    commandInfo.cancel = true; // Prevent default home button behavior
  });
}

homeButton();

//! ********************************************************** !//
//! ********************************************************** !//
//! ********************************************************** !//

function drawPolyline(entity, entityPositions, speedf = 1000) {
  const updateInterval = 30;
  const speed = speedf;

  function interpolate(start, end, factor) {
    return Cesium.Cartesian3.lerp(start, end, factor, new Cesium.Cartesian3());
  }

  let currentPositionIndex = 0;
  let distanceTraveled = 0;

  const interval = setInterval(() => {
    if (currentPositionIndex >= entityPositions.length - 1) {
      clearInterval(interval);
      return;
    }

    const currentStart = entityPositions[currentPositionIndex];
    const nextEnd = entityPositions[currentPositionIndex + 1];
    const segmentDistance = Cesium.Cartesian3.distance(currentStart, nextEnd);

    // Calculate the fraction of the segment covered by the current distance traveled
    const distanceFraction = Math.min(distanceTraveled / segmentDistance, 1);

    // Interpolate the current position along the segment
    const interpolatedPosition = interpolate(
      currentStart,
      nextEnd,
      distanceFraction
    );

    // Add the interpolated position to the polyline
    const newPositions = entity.polylineVolume.positions
      .getValue()
      .concat([interpolatedPosition]);

    entity.polylineVolume.positions = new Cesium.CallbackProperty(
      () => newPositions,
      false
    );

    // Increment distance traveled based on speed
    distanceTraveled += speed * updateInterval;

    // Move to the next segment if the current one is fully drawn
    if (distanceTraveled >= segmentDistance) {
      currentPositionIndex++;
      distanceTraveled = 0; // Reset for the next segment
    }
  }, updateInterval);
}

//! ********************************************************** !//
//! ********************************************************** !//
//! ********************************************************** !//

fetch("../data/json/apiJsons/airQuality.json")
  .then(response => response.json())
  .then(data => {
    var airData = data.data[0];
    
    aqiVal.textContent = `${airData["aqi"]}`;
    coVal.textContent = `${airData["co"]} µg/m³`;
    no2Val.textContent = `${airData["no2"]} µg/m³`;
    so2Val.textContent = `${airData["so2"]} µg/m³`;
    o3Val.textContent = `${airData["o3"]} µg/m³`;

    function airQualityFun() {
      const AQI = viewer.entities.add({
        id: "AQI",
        position: Cesium.Cartesian3.fromDegrees(lon + 0.05, lat - 0.01),
        box: {
          dimensions: new Cesium.Cartesian3(200, 200, airData["aqi"] * 40),
          material: Cesium.Color.fromCssColorString("#0077BE"),
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
        }
      });

      const CO = viewer.entities.add({
        id: "CO",
        position: Cesium.Cartesian3.fromDegrees(lon + 0.04, lat + 0.02),
        box: {
          dimensions: new Cesium.Cartesian3(200, 200, airData["co"] * 40),
          material: Cesium.Color.fromCssColorString("#E7494A"),
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
        }
      });

      const NO2 = viewer.entities.add({
        id: "NO2",
        position: Cesium.Cartesian3.fromDegrees(lon - 0.02, lat - 0.01),
        box: {
          dimensions: new Cesium.Cartesian3(200, 200, airData["no2"] * 40),
          material: Cesium.Color.fromCssColorString("#5C8984"),
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
        }
      });

      const O3 = viewer.entities.add({
        id: "O3",
        position: Cesium.Cartesian3.fromDegrees(lon - 0.02, lat + 0.01),
        box: {
          dimensions: new Cesium.Cartesian3(200, 200, airData["o3"] * 40),
          material: Cesium.Color.fromCssColorString("#962DA8"),
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
        }
      });

      const SO2 = viewer.entities.add({
        id: "SO2",
        position: Cesium.Cartesian3.fromDegrees(lon + 0.02, lat - 0.04),
        box: {
          dimensions: new Cesium.Cartesian3(200, 200, airData["so2"] * 50),
          material: Cesium.Color.fromCssColorString("#ffa722"),
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
        }
      });
    }

    var airEntitiesVisible = true;
    airqualityBtn.addEventListener("click", () => {
      airEntitiesVisible = !airEntitiesVisible;
      if (airEntitiesVisible) {
        viewer.entities.removeById("AQI");
        viewer.entities.removeById("CO");
        viewer.entities.removeById("NO2");
        viewer.entities.removeById("O3");
        viewer.entities.removeById("SO2");
        airInfo.classList.remove("visible");
        airqualityBtn.classList.remove("activeBtn");
      } else {
        airInfo.classList.add("visible");
        airqualityBtn.classList.add("activeBtn");
        airQualityFun();
      }
    });
  })
  .catch(error => {
    console.error("Error fetching JSON file:", error);
  });

//! ********************************************************** !//
//! ********************************************************** !//
//! ********************************************************** !//

let isMeasuring = false;
let startPoint = null;
let lastPoint = null;
let positions = [];
let distanceEntity = null;
let backgroundBillboard = null;
let labelEntity = null;

lengthBtn.addEventListener("click", () => {
  isMeasuring = !isMeasuring;
  if (isMeasuring) {
    lengthBtn.classList.add("activeBtn");
    startPoint = null;
    positions = [];

    // Add polyline entity for measurement
    distanceEntity = viewer.entities.add({
      id: "lengthMeasure",
      polyline: {
        positions: new Cesium.CallbackProperty(() => {
          if (startPoint && Cesium.defined(lastPoint)) {
            return positions;
          }
          return [];
        }, false),
        width: 5,
        material: Cesium.Color.RED,
        clampToGround: true
      }
    });

    // Add a billboard for the background
    if (backgroundBillboard) {
      viewer.entities.remove(backgroundBillboard);
    }

    // Add label entity for distance
    if (labelEntity) {
      viewer.entities.remove(labelEntity);
    }

    // Add the label entity
    labelEntity = viewer.entities.add({
      position: Cesium.Cartesian3.ZERO,
      zIndex: 999,
      label: {
        text: "",
        font: "18px sans-serif",
        fillColor: Cesium.Color.WHITE,
        outlineColor: Cesium.Color.BLACK,
        outlineWidth: 2,
        verticalOrigin: Cesium.VerticalOrigin.CENTER,
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        pixelOffset: new Cesium.Cartesian2(0, -30),
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
      }
    });

    backgroundBillboard = viewer.entities.add({
      position: Cesium.Cartesian3.ZERO,
      billboard: {
        image: createBackgroundImage(),
        width: 250, // Adjust width as needed
        height: 45, // Adjust height as needed
        verticalOrigin: Cesium.VerticalOrigin.CENTER,
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        pixelOffset: new Cesium.Cartesian2(0, -30),
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
      }
    });
    handler.setInputAction(click => {
      const position = viewer.scene.pickPosition(click.position);
      if (Cesium.defined(position)) {
        if (!startPoint) {
          startPoint = position;
          positions.push(startPoint);
        } else if (!lastPoint) {
          lastPoint = position;
          positions.push(lastPoint);
          updateDistanceLabel();
        } else {
          lastPoint = position;
          positions.push(lastPoint);
          updateDistanceLabel();
        }
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  } else {
    lengthBtn.classList.remove("activeBtn");
    viewer.entities.remove(distanceEntity);
    viewer.entities.remove(labelEntity);
    viewer.entities.remove(backgroundBillboard);
    handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
    startPoint = null;
    lastPoint = null;
  }
});

function updateDistanceLabel() {
  let distance = 0.0;
  let previousPoint, currentPoint;
  if (lastPoint) {
    for (let index = 0; index < positions.length; index++) {
      if (index >= 1) {
        previousPoint = positions[index - 1];

        currentPoint = positions[index];

        distance += Cesium.Cartesian3.distance(previousPoint, currentPoint);
      }
    }
    const formattedDistance = distance.toFixed(2);

    // Update the backgroundBillboard and label entity with the distance
    labelEntity.position = lastPoint;
    labelEntity.label.text = `Distance: ${formattedDistance} meters`;
    backgroundBillboard.position = lastPoint;
  }
}

function createBackgroundImage() {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = 300; // Adjust width
  canvas.height = 100; // Adjust height

  context.fillStyle = "rgba(0, 0, 0, 0.5)"; // Background color with alpha
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.font = "18px sans-serif";
  context.fillStyle = "white";
  context.textAlign = "center";
  context.textBaseline = "middle";

  return canvas.toDataURL();
}

//! ********************************************************** !//
//! ********************************************************** !//
//! ********************************************************** !//

let isMeasuringArea = false;
let polygonPoints = [];
let polygonEntity = null;
let areaLabelEntity = null;
let unit = { 0: "cm", 1: "m", 2: "km" };
let formattedArea;

areaBtn.addEventListener("click", () => {
  isMeasuringArea = !isMeasuringArea;
  if (isMeasuringArea) {
    areaBtn.classList.add("activeBtn");
    polygonPoints = [];
    if (polygonEntity) {
      viewer.entities.remove(polygonEntity);
    }
    if (areaLabelEntity) {
      viewer.entities.remove(areaLabelEntity);
    }

    // Add event handler for clicks
    handler.setInputAction(click => {
      const position = viewer.scene.pickPosition(click.position);
      if (Cesium.defined(position)) {
        polygonPoints.push(position);
        updatePolygon();
        if (polygonPoints.length > 2) {
          updateAreaLabel();
        }
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  } else {
    areaBtn.classList.remove("activeBtn");
    viewer.entities.remove(polygonEntity);
    viewer.entities.remove(areaLabelEntity);
    handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }
});

function computeArea(positions) {
  let area = 0.0;
  const numPoints = positions.length;
  if (numPoints < 3) {
    return area; // Not enough points to form a polygon
  }

  for (let i = 0; i < numPoints; i++) {
    const j = (i + 1) % numPoints;
    area += positions[i].x * positions[j].y - positions[j].x * positions[i].y;
  }
  area = Math.abs(area);
  return area; // Area in square meters
}

function updatePolygon() {
  if (polygonPoints.length > 2) {
    if (polygonEntity) {
      viewer.entities.remove(polygonEntity);
    }
    polygonEntity = viewer.entities.add({
      polygon: {
        hierarchy: new Cesium.PolygonHierarchy(polygonPoints),
        material: Cesium.Color.RED.withAlpha(0.5),
        outline: true,
        outlineColor: Cesium.Color.RED,
        outlineWidth: 2
      }
    });
  }
}

function updateAreaLabel() {
  const area = computeArea(polygonPoints);
  if ("kk" == unit["0"]) {
  } else if ("m" == unit["1"]) {
    formattedArea = area.toFixed(2); // Convert to square kilometers
  } else if ("km" == unit["2"]) {
    formattedArea = (area * 1e-6).toFixed(2); // Convert to square kilometers
  }
  if (areaLabelEntity) {
    viewer.entities.remove(areaLabelEntity);
  }

  areaLabelEntity = viewer.entities.add({
    position: polygonPoints[0],
    label: {
      text: `Area: ${formattedArea} m²`,
      font: "18px sans-serif",
      fillColor: Cesium.Color.WHITE,
      outlineColor: Cesium.Color.BLACK,
      outlineWidth: 2,
      verticalOrigin: Cesium.VerticalOrigin.CENTER,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      pixelOffset: new Cesium.Cartesian2(0, -30),
      clampToGround: true
    }
  });
}

function createBackgroundImage() {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = 300; // Adjust width
  canvas.height = 100; // Adjust height

  context.fillStyle = "rgba(0, 0, 0, 0.5)"; // Background color with alpha
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.font = "18px sans-serif";
  context.fillStyle = "white";
  context.textAlign = "center";
  context.textBaseline = "middle";

  return canvas.toDataURL();
}

//! ******************************************************************************* !//
//! ******************************************************************************* !//
//! ******************************************************************************* !//

const topToolBar2 = document.getElementsByClassName("right")[0];

var routePointes = [];
var routePointesInDegrees = [];
var routePath;
var routePathTwo;

function routing() {
  handler.setInputAction(click => {
    const position = viewer.scene.pickPosition(click.position);
    if (Cesium.defined(position)) {
      var cartographic = Cesium.Cartographic.fromCartesian(position);
      routePointes.push(cartographic);

      if (routePointes.length > 1) {
        routePointesInDegrees = [];
        for (let i = 0; i < routePointes.length; i++) {
          var lat = Cesium.Math.toDegrees(routePointes[i].latitude);
          var lng = Cesium.Math.toDegrees(routePointes[i].longitude);
          var point = { lat, lng };
          routePointesInDegrees.push(point);
        }
        routePointesInDegrees.forEach(element => {});
        var routingControl = L.Routing
          .control({
            waypoints: routePointesInDegrees.map(point =>
              L.latLng(point.lat, point.lng)
            ),
            createMarker: function() {
              return null;
            }, // Suppress markers if not needed
            routeWhileDragging: true
          })
          .addTo(map);
        // Listen for the 'routes' event to handle the routing result
        routingControl.on("routesfound", function(e) {
          var routeOne = [],
            routeTwo = [];
          if (e.routes.length == 2) {
            routeOne = e.routes[0];
            routeTwo = e.routes[1];
          } else {
            routeOne = e.routes[0];
          }

          var routeCoords = [];
          var routeTwoCoords = [];
          for (var coord of routeOne["coordinates"]) {
            routeCoords.push(coord.lng);
            routeCoords.push(coord.lat);
          }

          if (routeTwo.length != 0) {
            for (var coord of routeTwo["coordinates"]) {
              routeTwoCoords.push(coord.lng);
              routeTwoCoords.push(coord.lat);
            }
          }
          if (routePath) {
            viewer.entities.remove(routePath);
            routePath = viewer.entities.add({
              id: "route",
              polyline: {
                positions: Cesium.Cartesian3.fromDegreesArray(routeCoords),
                width: 5,
                material: Cesium.Color.RED,
                clampToGround: true
              }
            });
          } else {
            routePath = viewer.entities.add({
              id: "route",
              polyline: {
                positions: Cesium.Cartesian3.fromDegreesArray(routeCoords),
                width: 5,
                material: Cesium.Color.RED,
                clampToGround: true
              }
            });
          }

          if (routePathTwo) {
            viewer.entities.remove(routePathTwo);

            routePathTwo = viewer.entities.add({
              id: "route2",
              polyline: {
                positions: Cesium.Cartesian3.fromDegreesArray(routeTwoCoords),
                width: 5,
                material: Cesium.Color.BLUE,
                clampToGround: true
              }
            });
          } else {
            routePathTwo = viewer.entities.add({
              id: "route2",
              polyline: {
                positions: Cesium.Cartesian3.fromDegreesArray(routeTwoCoords),
                width: 5,
                material: Cesium.Color.BLUE,
                clampToGround: true
              }
            });
          }
        });
      }
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}

let isRouting = false;
routingBtn.addEventListener("click", () => {
  isRouting = !isRouting;
  if (isRouting) {
    routingBtn.classList.add("activeBtn");
    routing();
  } else {
    routingBtn.classList.remove("activeBtn");
    routePointes = [];
    routePointesInDegrees = [];
    viewer.entities.remove(routePath);
    viewer.entities.remove(routePathTwo);
    handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }
});

//! ******************************************************************************* !//
//! ******************************************************************************* !//
//! ******************************************************************************* !//

let isFirstPersonActive = false;
let moveSpeed = 1.0;
let rotateSpeed = Cesium.Math.toRadians(1.0);
let activeKeys = {};
let clickHandler = null;
let targetPosition = null;
let isFlying = false;

function moveCamera() {
  const camera = viewer.camera;
  let moveVector = new Cesium.Cartesian3(0.0, 0.0, 0.0);

  if (activeKeys["w"]) {
    moveVector = Cesium.Cartesian3.add(
      moveVector,
      camera.direction,
      moveVector
    );
  }
  if (activeKeys["s"]) {
    moveVector = Cesium.Cartesian3.subtract(
      moveVector,
      camera.direction,
      moveVector
    );
  }
  if (activeKeys["a"]) {
    moveVector = Cesium.Cartesian3.subtract(
      moveVector,
      camera.right,
      moveVector
    );
  }
  if (activeKeys["d"]) {
    moveVector = Cesium.Cartesian3.add(moveVector, camera.right, moveVector);
  }

  // Normalize to prevent faster diagonal movement
  if (!Cesium.Cartesian3.equals(moveVector, Cesium.Cartesian3.ZERO)) {
    Cesium.Cartesian3.normalize(moveVector, moveVector);
    moveVector = Cesium.Cartesian3.multiplyByScalar(
      moveVector,
      moveSpeed,
      moveVector
    );
    camera.position = Cesium.Cartesian3.add(
      camera.position,
      moveVector,
      new Cesium.Cartesian3()
    );
  }
}

function rotateCamera() {
  const camera = viewer.camera;

  if (activeKeys["q"]) {
    camera.lookLeft(rotateSpeed);
  }
  if (activeKeys["e"]) {
    camera.lookRight(rotateSpeed);
  }
}

function handleKeyDown(event) {
  if (!isFirstPersonActive || isFlying) return;
  activeKeys[event.key] = true;
}

function handleKeyUp(event) {
  delete activeKeys[event.key];
}

function updateCamera() {
  if (isFirstPersonActive && !isFlying) {
    moveCamera();
    rotateCamera();
  }
  requestAnimationFrame(updateCamera);
}

function handleMapClick(event) {
  const cartesian = viewer.scene.pickPosition(event.position);
  if (Cesium.defined(cartesian)) {
    targetPosition = cartesian;
    startFlyToTarget();
    if (clickHandler) {
      clickHandler.destroy();
      clickHandler = null;
    }
  }
}

function startFlyToTarget() {
  isFlying = true;
  viewer.camera.flyTo({
    destination: targetPosition,
    orientation: {
      heading: Cesium.Math.toRadians(0.0), // Set heading to 0 radians (facing north)
      pitch: Cesium.Math.toRadians(0.0), // Set pitch to a desired angle, e.g., -30 degrees
      roll: 0.0 // No roll
    },
    duration: 2.0, // Duration of the fly-to animation
    complete: () => {
      isFlying = false;
      isFirstPersonActive = true;
      requestAnimationFrame(updateCamera);
    }
  });
}

function startFirstPersonMode() {
  isFirstPersonActive = false;
  targetPosition = null;

  if (!clickHandler) {
    clickHandler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
    clickHandler.setInputAction(
      handleMapClick,
      Cesium.ScreenSpaceEventType.LEFT_CLICK
    );
    alert("Click on a point on the map to start first-person view.");
  }
}

document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);

streetViewBtn.addEventListener("click", () => {
  if (!isFirstPersonActive) {
    streetViewBtn.classList.add("activeBtn");
    startFirstPersonMode();
  } else {
    isFirstPersonActive = false;
    streetViewBtn.classList.remove("activeBtn");
    if (clickHandler) {
      clickHandler.destroy();
      clickHandler = null;
    }
  }
});

//! ******************************************************************************* !//
//! ******************************************************************************* !//
//! ******************************************************************************* !//

let isPlacesVisible = false;

placesBtn.addEventListener("click", () => {
  if (isPlacesVisible) {
    placesContainer.classList.remove("visible");
    isPlacesVisible = false;
    placesBtn.classList.remove("activeBtn");
  } else {
    placesContainer.classList.add("visible");
    placesBtn.classList.add("activeBtn");
    isPlacesVisible = true;
  }
});

let isDataShown = false;
let allPOIs;

const filteredDataSource = [
  new Cesium.CustomDataSource("LEISURE"),
  new Cesium.CustomDataSource("AMENITY"),
  new Cesium.CustomDataSource("OFFICE"),
  new Cesium.CustomDataSource("SHOP"),
  new Cesium.CustomDataSource("TOURISM"),
  new Cesium.CustomDataSource("SPORT")
];

Cesium.GeoJsonDataSource
  .load("../data/json/geoJsons/POIs.geojson", {
    clampToGround: true
  })
  .then(function(ds) {
    allPOIs = ds;
    allPOIs.entities.values.forEach(entity => {
      if (entity.properties.LEISURE.getValue() != " ") {
        entity.billboard = {
          image: "../assets/icons/museum.png",
          verticalOrigin: Cesium.VerticalOrigin.CENTER,
          scale: 0.1,
          pixelOffset: new Cesium.Cartesian2(0, -20),
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
        };
        filteredDataSource[0].entities.add(entity);
      } else if (entity.properties.AMENITY.getValue() != " ") {
        entity.billboard = {
          image: "../assets/icons/school.png",
          verticalOrigin: Cesium.VerticalOrigin.CENTER,
          pixelOffset: new Cesium.Cartesian2(0, -20),
          scale: 0.1,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
        };
        filteredDataSource[1].entities.add(entity);
      } else if (entity.properties.OFFICE.getValue() != " ") {
        entity.billboard = {
          image: "../assets/icons/office.png",
          verticalOrigin: Cesium.VerticalOrigin.CENTER,
          pixelOffset: new Cesium.Cartesian2(0, -20),
          scale: 0.1,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
        };
        filteredDataSource[2].entities.add(entity);
      } else if (entity.properties.SHOP.getValue() != " ") {
        entity.billboard = {
          image: "../assets/icons/shop.png",
          verticalOrigin: Cesium.VerticalOrigin.CENTER,
          pixelOffset: new Cesium.Cartesian2(0, -20),
          scale: 0.1,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
        };
        filteredDataSource[3].entities.add(entity);
      } else if (entity.properties.TOURISM.getValue() != " ") {
        entity.billboard = {
          image: "../assets/icons/camera.png",
          verticalOrigin: Cesium.VerticalOrigin.CENTER,
          pixelOffset: new Cesium.Cartesian2(0, -20),
          scale: 0.1,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
        };
        filteredDataSource[4].entities.add(entity);
      } else if (entity.properties.SPORT.getValue() != " ") {
        entity.billboard = {
          image: "../assets/icons/football.png",
          verticalOrigin: Cesium.VerticalOrigin.CENTER,
          pixelOffset: new Cesium.Cartesian2(0, -20),
          scale: 0.1,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
        };
        filteredDataSource[5].entities.add(entity);
      }
    });
  })
  .catch(function(error) {
    console.error("Error loading GeoJSON:", error);
  });

placesItemBtn[0].addEventListener("click", () => {
  if (viewer.dataSources.contains(filteredDataSource[0])) {
    viewer.dataSources.remove(filteredDataSource[0]);
    placesItemBtn[0].classList.remove("activeBtn");
  } else {
    viewer.dataSources.add(filteredDataSource[0]).then(() => {
      viewer.flyTo(filteredDataSource[0]);
    });
    placesItemBtn[0].classList.add("activeBtn");
  }
});
placesItemBtn[1].addEventListener("click", () => {
  if (viewer.dataSources.contains(filteredDataSource[1])) {
    viewer.dataSources.remove(filteredDataSource[1]);
    placesItemBtn[1].classList.remove("activeBtn");
  } else {
    viewer.dataSources.add(filteredDataSource[1]).then(() => {
      viewer.flyTo(filteredDataSource[1]);
      placesItemBtn[1].classList.add("activeBtn");
    });
  }
});
placesItemBtn[2].addEventListener("click", () => {
  if (viewer.dataSources.contains(filteredDataSource[2])) {
    viewer.dataSources.remove(filteredDataSource[2]);
    placesItemBtn[2].classList.remove("activeBtn");
  } else {
    viewer.dataSources.add(filteredDataSource[2]).then(() => {
      viewer.flyTo(filteredDataSource[2]);
      placesItemBtn[2].classList.add("activeBtn");
    });
  }
});
placesItemBtn[3].addEventListener("click", () => {
  if (viewer.dataSources.contains(filteredDataSource[3])) {
    viewer.dataSources.remove(filteredDataSource[3]);
    placesItemBtn[3].classList.remove("activeBtn");
  } else {
    viewer.dataSources.add(filteredDataSource[3]).then(() => {
      viewer.flyTo(filteredDataSource[3]);
      placesItemBtn[3].classList.add("activeBtn");
    });
  }
});
placesItemBtn[4].addEventListener("click", () => {
  if (viewer.dataSources.contains(filteredDataSource[4])) {
    viewer.dataSources.remove(filteredDataSource[4]);
    placesItemBtn[4].classList.remove("activeBtn");
  } else {
    viewer.dataSources.add(filteredDataSource[4]).then(() => {
      viewer.flyTo(filteredDataSource[4]);
      placesItemBtn[4].classList.add("activeBtn");
    });
  }
});
placesItemBtn[5].addEventListener("click", () => {
  if (viewer.dataSources.contains(filteredDataSource[5])) {
    viewer.dataSources.remove(filteredDataSource[5]);
    placesItemBtn[5].classList.remove("activeBtn");
  } else {
    viewer.dataSources.add(filteredDataSource[5]).then(() => {
      viewer.flyTo(filteredDataSource[5]);
      placesItemBtn[5].classList.add("activeBtn");
    });
  }
});

//! ******************************************************************************* !//
//! ******************************************************************************* !//
//! ******************************************************************************* !//

var storySteps = [
  {
    title: "View City",
    cameraPosition: {
      destination: Cesium.Cartesian3.fromDegrees(13.137822, 32.834387, 2000.0),
      orientation: {
        heading: 0.0,
        pitch: Cesium.Math.toRadians(-45.0),
        roll: 0.0
      }
    },
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
  },
  {
    title: "Step 2: View Park",
    cameraPosition: {
      destination: Cesium.Cartesian3.fromDegrees(13.157822, 32.847387, 1000.0),
      orientation: {
        heading: 1,
        pitch: Cesium.Math.toRadians(-30.0),
        roll: 0.0
      }
    },
    description:
      "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum'"
  },
  {
    title: "Step 2: View Park",
    cameraPosition: {
      destination: Cesium.Cartesian3.fromDegrees(13.137822, 32.857387, 500.0),
      orientation: {
        heading: 2,
        pitch: Cesium.Math.toRadians(-25.0),
        roll: 0.0
      }
    },
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s sometimes on purpose (injected humour and the like)."
  },
  {
    title: "Step 2: View Park",
    cameraPosition: {
      destination: Cesium.Cartesian3.fromDegrees(13.167822, 32.837387, 1500.0),
      orientation: {
        heading: -1,
        pitch: Cesium.Math.toRadians(-35.0),
        roll: 0.0
      }
    },
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
  }
];

function goToStep(stepIndex) {
  var step = storySteps[stepIndex];
  viewer.camera.flyTo({
    destination: step.cameraPosition.destination,
    orientation: step.cameraPosition.orientation
  });
  storyDescription.textContent = step.description;
  storyTitle.textContent = step.title;
  allSlidesNumber.textContent = storySteps.length;
  currentSlidNumber.textContent = stepIndex + 1;
}

var currentIndex = -1;
document.getElementById("nextButton").addEventListener("click", function() {
  goToStep(currentIndex + 1);
  currentIndex++;

  if (currentIndex == storySteps.length - 1) {
    document.getElementById("nextButton").setAttribute("disabled", true);
  }

  if (currentIndex > -1) {
    document.getElementById("previousButton").removeAttribute("disabled");
  }
});

document.getElementById("previousButton").addEventListener("click", function() {
  goToStep(currentIndex - 1);
  currentIndex--;
  if (currentIndex == 0) {
    document.getElementById("previousButton").setAttribute("disabled", true);
  }
  if (currentIndex < storySteps.length - 1) {
    document.getElementById("nextButton").removeAttribute("disabled");
  }
});

let isShow = false;
let slideInterval;
let interval = 5000;
duration.addEventListener("change", () => {
  if (duration.value == 0) {
    presentaionBtn.setAttribute("disabled", true);
    isShow = false;
    slideInterval = setInterval(() => {});
  } else {
    presentaionBtn.removeAttribute("disabled");
    interval = duration.value / 4 * 1000;
  }
});

presentaionBtn.addEventListener("click", () => {
  isShow = !isShow;
  if (isShow) {
    document.getElementById("previousButton").setAttribute("disabled", true);
    document.getElementById("nextButton").setAttribute("disabled", true);
    presentaionBtn.classList.add("slideActive");
    currentIndex = currentIndex === storySteps.length - 1 ? -1 : currentIndex;
    goToStep(currentIndex + 1);
    currentIndex++;

    slideInterval = setInterval(() => {
      if (currentIndex >= storySteps.length - 1) {
        currentIndex = -1;
      }
      goToStep(currentIndex + 1);
      currentIndex++;
    }, interval);
  } else {
    document.getElementById("nextButton").removeAttribute("disabled");
    presentaionBtn.classList.remove("slideActive");

    clearInterval(slideInterval);
  }
});

let isSlidWork = false;

slidsShowBtn.addEventListener("click", () => {
  isSlidWork = !isSlidWork;
  if (isSlidWork) {
    slidsShowBtn.classList.add("slideActive");
    slideContainer.classList.add("active");
    currentIndex = 0;
    goToStep(currentIndex);
  } else {
    slidsShowBtn.classList.remove("slideActive");
    slideContainer.classList.remove("active");
  }
});

//! ******************************************************************************* !//
//! ******************************************************************************* !//
//! ******************************************************************************* !//

let heatMap;
let heatMapIds = [];
function heatMapVisuallizer(
  type = "LEISURE",
  opacity = 0.5,
  radius = 15,
  pointValue = 0.4,
  geojsonUrl = "../data/json/geoJsons/POIs.geojson"
) {
  fetch(geojsonUrl)
    .then(response => response.json())
    .then(geojson => {
      const points = geojson.features
        .map(feature => {
          // Check if the feature has the required properties and coordinates
          if (
            feature.geometry &&
            feature.geometry.coordinates &&
            feature.properties &&
            feature.properties[type] !== " "
          ) {
            return {
              x: feature.geometry.coordinates[0],
              y: feature.geometry.coordinates[1],
              value: pointValue
            };
          }
          // Return null for invalid features to filter them out later
          return null;
        })
        .filter(point => point !== null); // Filter out null values

      let bounds = {
        west: Math.min(...points.map(p => p.x)),
        east: Math.max(...points.map(p => p.x)),
        south: Math.min(...points.map(p => p.y)),
        north: Math.max(...points.map(p => p.y))
      };

      heatMap = CesiumHeatmap.create(viewer, bounds, {
        maxOpacity: opacity,
        radius: radius, // Adjust radius based on your requirements
        gradient: { 0.4: "blue", 0.65: "cyan", 0.85: "lime", 1: "red" }
      });

      let valueMin = 0;
      let valueMax = 1;

      heatMap.setWGS84Data(valueMin, valueMax, points);
      heatMapIds.push(
        viewer.entities.values[viewer.entities.values.length - 1].id
      );
    })
    .catch(error => console.error("Error loading GeoJSON:", error));
}

let isHeatmapDisplayed = false;

const opacityUnit = document.getElementById("opacityUnit");
const pointradiusUnit = document.getElementById("pointradiusUnit");
const poinvalueUnit = document.getElementById("poinvalueUnit");

const heatmapSelector = document.getElementById("heatmapSelector");
heatmapSelector.addEventListener("change", () => {
  viewer.entities.removeById(heatMapIds[0]);
  heatMapIds.pop();
  heatMapVisuallizer(
    heatmapSelector.value,
    heatmapOpacity.value,
    heatmapPointRadius.value,
    heatmapPointValue.value
  );
});

const heatmapOpacity = document.getElementById("heatmapOpacity");
heatmapOpacity.addEventListener("change", () => {
  viewer.entities.removeById(heatMapIds[0]);
  heatMapIds.pop();
  opacityUnit.textContent =
    (parseFloat(heatmapOpacity.value) * 100).toFixed(0) + " %";
  heatMapVisuallizer(
    heatmapSelector.value,
    heatmapOpacity.value,
    heatmapPointRadius.value,
    heatmapPointValue.value
  );
});

const heatmapPointRadius = document.getElementById("heatmapPointRadius");
heatmapPointRadius.addEventListener("change", () => {
  viewer.entities.removeById(heatMapIds[0]);
  heatMapIds.pop();
  pointradiusUnit.textContent = heatmapPointRadius.value + " m";
  heatMapVisuallizer(
    heatmapSelector.value,
    heatmapOpacity.value,
    heatmapPointRadius.value,
    heatmapPointValue.value
  );
});

const heatmapPointValue = document.getElementById("heatmapPointValue");
heatmapPointValue.addEventListener("change", () => {
  viewer.entities.removeById(heatMapIds[0]);
  heatMapIds.pop();
  poinvalueUnit.textContent =
    (parseFloat(heatmapPointValue.value) * 100).toFixed(0) + "%";
  heatMapVisuallizer(
    heatmapSelector.value,
    heatmapOpacity.value,
    heatmapPointRadius.value,
    heatmapPointValue.value
  );
});

opacityUnit.textContent =
  (parseFloat(heatmapOpacity.value) * 100).toFixed(0) + " %";
pointradiusUnit.textContent = heatmapPointRadius.value + " m";
poinvalueUnit.textContent =
  (parseFloat(heatmapPointValue.value) * 100).toFixed(0) + " %";

heatmapBtn.addEventListener("click", () => {
  isHeatmapDisplayed = !isHeatmapDisplayed;
  if (isHeatmapDisplayed) {
    heatMapVisuallizer();
    heatmapBtnsContainer.classList.add("visible");
    heatmapBtn.classList.add("activeBtn");
  } else {
    heatmapBtnsContainer.classList.remove("visible");
    heatmapBtn.classList.remove("activeBtn");
    viewer.entities.removeById(heatMapIds[0]);
    heatMapIds.pop();
    document.getElementById(heatMap._id).remove();
  }
});

//! ********************************************************** !//
//! ********************************************************** !//
//! ********************************************************** !//

var isDaylightContainerVisible = false;
dayNightBtn.addEventListener("click", () => {
  isDaylightContainerVisible = !isDaylightContainerVisible;
  if (isDaylightContainerVisible) {
    daylightContainer.classList.add("active");
    dayNightBtn.classList.add("activeBtn");
  } else {
    daylightContainer.classList.remove("active");
    dayNightBtn.classList.remove("activeBtn");
  }
});

function updateTimeFromSlider(value) {
  const clock = viewer.clock;
  const startTime = Cesium.JulianDate.fromDate(
    new Date("2024-01-01T06:15:00Z")
  );
  const stopTime = Cesium.JulianDate.fromDate(new Date("2024-01-01T16:10:00Z"));

  clock.startTime = startTime;
  clock.stopTime = stopTime;
  clock.currentTime = startTime;
  const totalTime = Cesium.JulianDate.secondsDifference(stopTime, startTime);
  const newTime = Cesium.JulianDate.addSeconds(
    startTime,
    totalTime * value / 100,
    new Cesium.JulianDate()
  );
  clock.currentTime = newTime;
}

timeSlider.addEventListener("input", event => {
  updateTimeFromSlider(event.target.value);
});

function getStartOfDay() {
  const now = new Date();
  viewer.clock.multiplier = 1;
  viewer.clock.currentTime = Cesium.JulianDate.fromDate(now);
}

function updateTime(dir, sm, lg) {
  viewer.clock.multiplier == 0
    ? (viewer.clock.multiplier += 1)
    : (viewer.clock.multiplier = viewer.clock.multiplier);
  if (dir == "up") {
    if (sm) {
      viewer.clock.multiplier += 1;
    } else if (lg) {
      if (viewer.clock.multiplier < 0) {
        if (viewer.clock.multiplier > -1) {
          viewer.clock.multiplier = 1;
        } else {
          viewer.clock.multiplier /= 2;
        }
      } else {
        viewer.clock.multiplier *= 2;
      }
    }
  } else if (dir == "down") {
    if (lg) {
      if (viewer.clock.multiplier > 0) {
        if (viewer.clock.multiplier < 1) {
          viewer.clock.multiplier = 1;
          viewer.clock.multiplier *= -2;
        } else {
          viewer.clock.multiplier /= 2;
        }
      } else {
        viewer.clock.multiplier *= 2;
      }
    } else if (sm) {
      viewer.clock.multiplier -= 2;
    }
  } else {
  }
}

speedDownMult.addEventListener("click", () => {
  updateTime("down", false, true);
});

speedDownAdd.addEventListener("click", () => {
  updateTime("down", true, false);
});

pause.addEventListener("click", () => {
  viewer.scene.camera.shouldAnimate = false;
});

speedUpMult.addEventListener("click", () => {
  updateTime("up", true, false);
});

speedUpAdd.addEventListener("click", () => {
  updateTime("up", false, true);
});

document.getElementById("shadow").addEventListener("change", () => {
  viewer.shadows = !viewer.shadows;
});

//! **************************************************************************************** !//
//! **************************************************************************************** !//
//! **************************************************************************************** !//
//! Transportation:

transportationBtn.addEventListener("click", () => {
  if (transportationContainer.classList.contains("visible")) {
    transportationContainer.classList.remove("visible");
    transportationBtn.classList.remove("activeBtn");
  } else {
    transportationContainer.classList.add("visible");
    transportationBtn.classList.add("activeBtn");
  }
});

const geoJsonUrl = "../data/json/geoJsons/transportation.geojson";
let dataSource;
let isBusStationShown = false;
Cesium.GeoJsonDataSource
  .load(geoJsonUrl, {
    clampToGround: true
  })
  .then(function(ds) {
    dataSource = ds;
    dataSource.entities.values.forEach(element => {
      element.billboard.image = "./assets/icons/BusStop.png";
      element.billboard.scale = 1.5;
      element.billboard.verticalOrigin = Cesium.VerticalOrigin.CENTER;
      element.billboard.pixelOffset = new Cesium.Cartesian2(0, -20);
    });
    viewer.zoomTo(dataSource);
  })
  .catch(function(error) {
    console.error("Error loading GeoJSON:", error);
  });

busStations.addEventListener("click", () => {
  if (isBusStationShown) {
    viewer.dataSources.remove(dataSource);
    isBusStationShown = false;
    busStations.classList.remove("activeBtn");
  } else {
    viewer.dataSources.add(dataSource);
    viewer.flyTo(dataSource);
    isBusStationShown = true;
    busStations.classList.add("activeBtn");
  }
});

let transportationIDs = {};
function transportation(
  url = "../data/json/geoJsons/transportationLines.geojson",
  isTrain = false
) {
  var lines = [];
  const colors = [
    "#E76F51",
    "#264653",
    "#c1121f",
    "#ffc300",
    "#669bbc",
    "#780000",
    "#588157",
    "#dad7cd",
    "#0077b6",
    "#78290f",
    "#9d4edd",
    "#9d4edd",
    "#60b5ff",
    "#60b5ff"
  ];
  fetch(url).then(response => response.json()).then(data => {
    for (let index = 0; index < data.features.length; index++) {
      lines[index] = data.features[index].geometry.coordinates.map(coord =>
        Cesium.Cartesian3.fromDegrees(coord[0], coord[1])
      );
      isTrain
        ? (transportationIDs[`train${index}`] = `t-route${index}`)
        : (transportationIDs[`bus${index}`] = `b-route${index}`);
    }

    // const offsetPositions = lineOne.map(position => {
    //   const cartographic = Cesium.Cartographic.fromCartesian(position);
    //   return Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, cartographic.height + offset);
    // });

    for (let index = 0; index < lines.length; index++) {
      drawPolyline(
        viewer.entities.add({
          id: isTrain ? `t-route${index}` : `b-route${index}`,
          clampToGround: true,
          name: data.features[index].properties.NETWORK,
          polylineVolume: {
            positions: [],
            shape: [
              new Cesium.Cartesian2(-5, 0), // Bottom-left of the wall
              new Cesium.Cartesian2(5, 0), // Bottom-right of the wall
              new Cesium.Cartesian2(5, 150), // Top-right of the wall (height = 200 meters)
              new Cesium.Cartesian2(-5, 150) // Top-left of the wall (height = 200 meters)
            ],
            material: isTrain
              ? Cesium.Color.fromCssColorString("#E06C6D").withAlpha(0.8)
              : Cesium.Color.fromCssColorString(colors[index]),
            outline: isTrain ? true : false,
            outlineColor: Cesium.Color.BLACK,
            clampToGround: true
          }
        }),
        lines[index]
      );
    }
  });
}

//! **************************************************************************************** !//
//! **************************************************************************************** !//
//! **************************************************************************************** !//
//! Buses:

let isBusRoutesShowen = false;
busRoutes.addEventListener("click", () => {
  if (isBusRoutesShowen) {
    Object.keys(transportationIDs).forEach(element => {
      if (element.startsWith("bus")) {
        viewer.entities.removeById(transportationIDs[element]);
        delete transportationIDs[element];
      }
    });
    busRoutes.classList.remove("activeBtn");
    isBusRoutesShowen = false;
  } else {
    transportation();
    busRoutes.classList.add("activeBtn");
    isBusRoutesShowen = true;
  }
});

//! **************************************************************************************** !//
//! **************************************************************************************** !//
//! **************************************************************************************** !//
//! trains:

let isTrainShowen = false;
trainRoutes.addEventListener("click", () => {
  if (isTrainShowen) {
    trainRoutes.classList.remove("activeBtn");
    Object.keys(transportationIDs).forEach(element => {
      if (element.startsWith("train")) {
        viewer.entities.removeById(transportationIDs[element]);
        delete transportationIDs[element];
      }
    });
    isTrainShowen = !isTrainShowen;
  } else {
    transportation("../data/json/geoJsons/railwayLine.geojson", true);
    isTrainShowen = !isTrainShowen;
    trainRoutes.classList.add("activeBtn");
  }
});

//! **************************************************************************************** !//
//! **************************************************************************************** !//
//! **************************************************************************************** !//
//! filter:

// const options = [
//   { value: "0", text: "Default" },
//   { value: "1", text: "Color By Building Material" },
//   { value: "2", text: "Color By Distance To Selected Location" },
//   { value: "3", text: "Highlight Residential Buildings" },
//   { value: "4", text: "Show Office Buildings Only" },
//   { value: "5", text: "Show Apartment Buildings Only" }
// ];

isfilterShown = false;
filterBtn.addEventListener("click", () => {
  isfilterShown
    ? filterContainer.classList.remove("visible")
    : filterContainer.classList.add("visible");
  isfilterShown = !isfilterShown;
});

function filter(osmBuildingsTileset) {
  function colorByMaterial() {
    osmBuildingsTileset.style = new Cesium.Cesium3DTileStyle({
      defines: {
        material: "${feature['building:material']}"
      },
      color: {
        conditions: [
          ["${material} === null", "color('white')"],
          ["${material} === 'way_1062135793'", "color('skyblue', 0.5)"],
          ["${material} === 'concrete'", "color('grey')"],
          ["${material} === 'brick'", "color('indianred')"],
          ["${material} === 'stone'", "color('lightslategrey')"],
          ["${material} === 'metal'", "color('lightgrey')"],
          ["${material} === 'steel'", "color('lightsteelblue')"],
          ["true", "color('white')"] // This is the else case
        ]
      }
    });
  }

  function defaultTheme() {
    osmBuildingsTileset.style = new Cesium.Cesium3DTileStyle({
      color: {
        conditions: [
          ["true", "color('white')"] // This is the else case
        ]
      }
    });
  }

  function highlightAllResidentialBuildings() {
    osmBuildingsTileset.style = new Cesium.Cesium3DTileStyle({
      color: {
        conditions: [
          [
            "${feature['building']} === 'way_1062135793' || ${feature['building']} === 'residential'",
            "color('cyan', 0.9)"
          ],
          [true, "color('white')"]
        ]
      }
    });
  }

  function colorByDistanceToCoordinate(pickedLatitude, pickedLongitude) {
    osmBuildingsTileset.style = new Cesium.Cesium3DTileStyle({
      defines: {
        // Calculate distance using degrees directly in the expression
        distance: `
                                distance(
                                vec2(
                                        ${pickedLongitude}, 
                                        ${pickedLatitude}
                                ), 
                                vec2(
                                        \${feature['cesium#longitude']} * (180.0 / 3.141592653589793), 
                                        \${feature['cesium#latitude']} * (180.0 / 3.141592653589793)
                                )
                                )
                        `
      },
      color: {
        conditions: [
          ["${distance} > 0.28", "color('red')"],
          ["${distance} > 0.20", "color('blue')"],
          ["${distance} > 0.12", "color('yellow')"],
          ["${distance} > 0.02", "color('green')"],
          ["true", "color('white')"]
        ]
      }
    });
  }

  function removeCoordinatePickingOnLeftClick() {
    handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }

  function showByBuildingType(buildingType) {
    switch (buildingType) {
      case "office":
        osmBuildingsTileset.style = new Cesium.Cesium3DTileStyle({
          show: "${feature['building']} === 'hotel'"
        });
        break;
      case "apartments":
        osmBuildingsTileset.style = new Cesium.Cesium3DTileStyle({
          show: "${feature['building']} === 'residential'"
        });
        break;
      default:
        break;
    }
  }

  const filterButtons = [
    defultFilter,
    materialFilter,
    locationFilter,
    residentialFilter,
    officeFilter,
    appartmentFilter
  ];

  function swapButtons(currentIndex) {
    filterButtons.forEach(btn => btn.classList.remove("activeBtn"));
    filterButtons[currentIndex].classList.add("activeBtn");
  }

  defultFilter.addEventListener("click", () => {
    removeCoordinatePickingOnLeftClick();
    defaultTheme();
    swapButtons(0);
  });

  materialFilter.addEventListener("click", () => {
    removeCoordinatePickingOnLeftClick();
    colorByMaterial();
    swapButtons(1);
  });

  locationFilter.addEventListener("click", () => {
    removeCoordinatePickingOnLeftClick();
    handler.setInputAction(function(movement) {
      viewer.selectedEntity = undefined;
      const pickedBuilding = viewer.scene.pick(movement.position);
      if (pickedBuilding) {
        const pickedLatitude = pickedBuilding.getProperty("cesium#latitude");
        const pickedLongitude = pickedBuilding.getProperty("cesium#longitude");
        colorByDistanceToCoordinate(
          Cesium.Math.toDegrees(pickedLatitude),
          Cesium.Math.toDegrees(pickedLongitude)
        );
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    swapButtons(2);
  });

  residentialFilter.addEventListener("click", () => {
    removeCoordinatePickingOnLeftClick();
    highlightAllResidentialBuildings();
    swapButtons(3);
  });

  officeFilter.addEventListener("click", () => {
    removeCoordinatePickingOnLeftClick();
    showByBuildingType("office");
    swapButtons(4);
  });

  appartmentFilter.addEventListener("click", () => {
    removeCoordinatePickingOnLeftClick();
    showByBuildingType("apartments");
    swapButtons(5);
  });
}
