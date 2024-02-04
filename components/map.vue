<script setup>
import {Marker, Map, LngLat} from "maplibre-gl";
import {missionBurningHospital} from "~/data/routes";

const mapContainer = shallowRef(null);
const map = shallowRef(null);

onMounted(async () => {
  const apiKey = 'VKeVgvvUIYxb8PxDBZNz';

  map.value = markRaw(
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

  const marker = new Marker({element: vehicle}).setLngLat([11.75209, 48.40145]).addTo(map.value)
  const missionMarker = new Marker({element: missionMarkerElement}).setLngLat([11.733521,48.412905]).addTo(map.value)

  // Add the marker layer
  map.value.on('load', () => {
    map.value.addSource('route', {
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

    map.value.addLayer({
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

    map.value.addSource('animated-route', {
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
    /*map.value.addLayer({
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

    // Start the animation
    animateRoute(marker);
  });
});



const animationIndex = ref(0);
let animationTimer = null;
const animationSpeed = 100; // Adjust animation speed as needed
const markerSourceId = 'animated-marker';

const steps = missionBurningHospital.routes[0].legs[0].steps;

const removeDrivenSegment = () => {
  const remainingSteps = steps.slice(animationIndex.value);
  const remainingCoordinates = remainingSteps.flatMap(step => step.geometry.coordinates);

  map.value.getSource('route').setData({
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: remainingCoordinates,
    },
  });
};

const animateRoute = (marker) => {
  // Get the current step
  const step = steps[animationIndex.value];

  // Check if there are more steps to animate
  if (step) {

    // Update the data of the GeoJSON source to animate the route
    /*map.value.getSource('animated-route').setData({
      type: 'Feature',
      properties: {},
      geometry: step.geometry,
    });*/

    // Animate the marker along the route
    animateMarker(step.duration * animationSpeed, marker);

    // Move to the next step after the animation duration
    animationTimer = setTimeout(() => {
      animationIndex.value++;
      removeDrivenSegment();
      animateRoute(marker);
    }, step.duration * animationSpeed);
  }
};

const animateMarker = (duration,marker) => {
  const start = performance.now();
  const animate = (time) => {
    const progress = (time - start) / duration;
    if (progress === Infinity) {
      console.error('The route either terminated or had a duration of 0')
      return
    }
    const coordinates = interpolateLineCoordinates(progress, steps[animationIndex.value].geometry.coordinates);
    marker.setLngLat(coordinates)
    map.value.flyTo({
      center: coordinates
    })

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };
  requestAnimationFrame(animate);
};

const interpolateLineCoordinates = (progress, coordinates) => {
  const totalDistance = steps[animationIndex.value].distance;
  let accumulatedDistance = 0;

  for (let i = 0; i < coordinates.length - 1; i++) {
    const segmentDistance = LngLat.convert(coordinates[i]).distanceTo(LngLat.convert(coordinates[i + 1]));
    const segmentProgress = segmentDistance / totalDistance;

    if (progress <= accumulatedDistance + segmentProgress) {
      const subProgress = (progress - accumulatedDistance) / segmentProgress;
      const interpolatedLng = coordinates[i][0] + (coordinates[i + 1][0] - coordinates[i][0]) * subProgress;
      const interpolatedLat = coordinates[i][1] + (coordinates[i + 1][1] - coordinates[i][1]) * subProgress;
      return [interpolatedLng, interpolatedLat];
    }

    accumulatedDistance += segmentProgress;
  }

  // Return the last coordinates if progress exceeds 1
  return coordinates[coordinates.length - 1];
};



onUnmounted(() => {
  map.value?.remove();
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