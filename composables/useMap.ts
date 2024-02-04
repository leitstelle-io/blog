import {ref, onMounted, markRaw, shallowRef, Ref, onUnmounted} from 'vue';
import {NavigationControl, Map, Marker, LngLatBounds, LngLatLike, Popup} from "maplibre-gl";

interface MapConfig {
    lat?: number;
    lng?: number;
    zoom?: number;
    errors?: string[];
    showMarker?: boolean;
    markerColor?: string;
    attributionControl?: boolean;
    maxZoom?: number;
    fitToBounds?: boolean;
}

interface LatLng {
    lat: number;
    lng: number;
    title: string;
}

export default function useMap(
    {
        lat: initialLat = 0,
        lng: initialLng = 0,
        zoom = 12.5,
        showMarker= true,
        markerColor = "#FF0000",
        attributionControl = true,
        maxZoom = 14.5,
        fitToBounds = false,
    }: MapConfig
) {
    const config = useRuntimeConfig();
    const lat: Ref<number> = ref(initialLat);
    const lng: Ref<number> = ref(initialLng);

    const mapContainer = shallowRef(null);
    const map = shallowRef(null);
    const marker = shallowRef(null);
    const additionalMarkers: Ref<Marker[]> = ref([]);

    onMounted(() => {
        map.value = markRaw(new Map({
            container: mapContainer.value,
            style: config.public.mapUrl,
            center: [lng.value, lat.value],
            zoom,
            attributionControl,
            maxZoom
        }));

        if (showMarker) {
            marker.value = markRaw(new Marker({color: markerColor})
                .setLngLat([lng.value, lat.value])
                .addTo(map.value)
            );
        }

        if (interactive) {
            map.value.addControl(new NavigationControl({
                showCompass: false,
                showZoom: true,
                visualizePitch: true
            }));
        }
    });

    const addMarkers = (coordinates: LatLng[]) => {
        coordinates.forEach(coord => {
            const newMarker = new Marker({
                color: markerColor,
            })
                .setLngLat([coord.lng, coord.lat])
                .addTo(map.value);

            additionalMarkers.value.push(newMarker);

            newMarker.setPopup(
                new Popup({offset: 30}).setHTML(`<p>${coord.title}</p>`)
            )
        });

        if (fitToBounds && additionalMarkers.value.length > 0 && map.value) {
            const bounds = new LngLatBounds();

            additionalMarkers.value.forEach(marker => {
                bounds.extend(marker.getLngLat() as LngLatLike);
            });

            map.value.fitBounds(bounds, {padding: 50});
        }
    }

    onUnmounted(() => {
        map.value?.remove();
    })

    return {
        mapContainer,
        lat,
        lng,
        addMarkers
    }
}