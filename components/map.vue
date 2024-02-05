<script setup>
import {Marker, Map} from "maplibre-gl";
import {missionBurningHospital} from "~/data/routes";
import fireMarker from '../public/images/icons/fire.png';
import {animateRoute} from "~/util/map/animateRoute";

const mapContainer = shallowRef(null);
let map = null;

onMounted(async () => {
  const apiKey = 'VKeVgvvUIYxb8PxDBZNz';

  map = markRaw(
      new Map({
        container: mapContainer.value,
        style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${apiKey}`,
        center: [11.748476839424363, 48.40332105046021],
        zoom: 14,
        attributionControl: false,
        interactive: false
      })
  );

  const vehicle = document.createElement('img')
  const missionMarkerElement = document.createElement('img')
  vehicle.src = '/images/vehicles/891-animated.png'
  missionMarkerElement.src = '/images/icons/fire.png'

  const marker = new Marker({element: vehicle}).setLngLat([11.75209, 48.40145]).addTo(map)
  //const missionMarker = new Marker({element: missionMarkerElement}).setLngLat([11.733521,48.412905]).addTo(map)



  // Add the marker layer
  map.on('load', async () => {

    map.addSource('route', {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: missionBurningHospital.routes[0].geometry.coordinates
        },
      },
    })

    map.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': '#F00', // Adjust line color as needed
        'line-width': 4, // Adjust line width as needed
        'line-opacity' : 0.6
      },
    });

    map.addSource('animated-route', {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: [],
        },
      },
    });

    // Add the layer for the animated route
    /*map.addLayer({
      id: 'animated-route',
      type: 'line',
      source: 'animated-route',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': '#0F0', // Adjust line color as needed
        'line-width': 2, // Adjust line width as needed
      },
    });*/

    map.loadImage(fireMarker, (error, image) => {
      if (error) throw error;
      map.addImage('fireMarker', image);
    });

    map.addSource('fireMarkerLayer', {
      'type': 'geojson',
      'data': {
        'type': 'FeatureCollection',
        'features': [
          {
            'type': 'Feature',
            'geometry': {
              'type': 'Point',
              'coordinates': [11.733521,48.412905]
            }
          }
        ]
      }
    });
    map.addLayer({
      'id': 'points',
      'type': 'symbol',
      'source': 'fireMarkerLayer',
      'layout': {
        'icon-image': 'fireMarker',
        'icon-size': 1
      }
    });

    // Start the animation
    animateRoute(map, marker);
  });
});

onUnmounted(() => {
  map?.remove();
});
</script>

<template>
  <div class="map-wrap relative w-full h-[400px] rounded-xl">
    <div class="absolute w-full h-full rounded-2xl" ref="mapContainer"></div>
  </div>
</template>

<style>
.map-wrap {
  position: relative;
  width: 100%;
  height: 500px;
}
</style>