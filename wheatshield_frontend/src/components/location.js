import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder';
import './main.css';
import blueIconUrl from './marker-icon-blue.png';
import redIconUrl from './marker-icon-red.png';

const Location = () => {
    const mapContainerRef = useRef(null); // Reference to the map container element
    const [map, setMap] = useState(null); // State to store the map instance
    const [initialPosition, setInitialPosition] = useState(null); // State to store the initial position
    const [distances, setDistances] = useState({ shop1: 0, shop2: 0, shop3: 0 }); // State to store distances
    const [nearestShop, setNearestShop] = useState(null); // State to store nearest shop
    const routeControl = useRef(null); // Reference to the route control

    useEffect(() => {
        if (!mapContainerRef.current) {
            console.error("Map container ref not found");
            return;
        }

        // Create Leaflet map
        const mapInstance = L.map(mapContainerRef.current); // Create map without initial view
        setMap(mapInstance); // Save the map instance in state

        // Add OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapInstance);

        // Geocode the initial position
        const geocoder = L.Control.Geocoder.nominatim();
        geocoder.geocode('COMSATS University Islamabad Attock (Computer Science Department)', function(results) {
            if (results.length > 0) {
                const initialPosition = results[0].center;
                setInitialPosition(initialPosition); // Save the initial position in state
                mapInstance.setView(initialPosition, 16); // Set map view to geocoded position with zoom level 16

                // Add blue marker for COMSATS Attock Campus
                const comsatsMarker = L.marker(initialPosition, {
                    icon: L.icon({
                        iconUrl: blueIconUrl,
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34]
                    })
                }).addTo(mapInstance);
                comsatsMarker.bindPopup("<b>COMSATS Attock Campus</b>").openPopup();
            } else {
                console.error("Geocoding failed: no results found");
            }
        });

        return () => {
            mapInstance.remove(); // Remove map instance on component unmount
        };
    }, []);

    // Function to calculate distance using Haversine formula
    function calculateDistance(lat1, lon1, lat2, lon2) {
        const toRad = x => x * Math.PI / 180;
        const R = 6371; // Radius of Earth in kilometers
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return d;
    }

    const handleSearchClick = () => {
        if (!initialPosition) {
            console.error("Initial position not set");
            return;
        }

        const destinations = [
            { name: "SHOP 1", coordinates: [33.7650, 72.3560] },
            { name: "SHOP 2", coordinates: [33.7700, 72.3700] },
            { name: "SHOP 3", coordinates: [33.7750, 72.3650] }
        ];

        // Calculate and store distances
        const calculatedDistances = {
            shop1: calculateDistance(initialPosition.lat, initialPosition.lng, 33.7650, 72.3560),
            shop2: calculateDistance(initialPosition.lat, initialPosition.lng, 33.7700, 72.3700),
            shop3: calculateDistance(initialPosition.lat, initialPosition.lng, 33.7750, 72.3650)
        };
        setDistances(calculatedDistances);

        // Find the nearest shop
        const nearestShopKey = Object.keys(calculatedDistances).reduce((nearest, shop) => {
            return calculatedDistances[shop] < calculatedDistances[nearest] ? shop : nearest;
        }, 'shop1');
        const nearestShop = destinations.find(destination => destination.name === nearestShopKey.replace('shop', 'SHOP '));
        setNearestShop(nearestShop);

        // Add destination markers
        destinations.forEach(destination => {
            const marker = L.marker(destination.coordinates, {
                icon: L.icon({
                    iconUrl: redIconUrl,
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34]
                })
            }).addTo(map);
            marker.bindPopup(`<b>${destination.name}</b>`);
        });

        // Add routing control to the map for the nearest shop
        if (nearestShop) {
            if (routeControl.current) {
                map.removeControl(routeControl.current); // Remove existing route if exists
            }

            routeControl.current = L.Routing.control({
                waypoints: [
                    L.latLng(initialPosition), // Start point
                    L.latLng(nearestShop.coordinates) // End point
                ],
                routeWhileDragging: true,
                geocoder: L.Control.Geocoder.nominatim(),
                router: new L.Routing.OSRMv1({
                    serviceUrl: 'https://router.project-osrm.org/route/v1'
                })
            }).addTo(map);
        }
    };

    return (
        <div className='main'>
            <div className='content'>
                <button className="cn" onClick={handleSearchClick}><a href="#">SEARCH</a></button>
            </div>  
            <div className="container-fluid" style={{ paddingTop: 22 }}>
                <div ref={mapContainerRef} style={{ margin: 'auto', width: '1200px', height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}></div>
            </div> 
            <div className="distances">
                <p>Distance to SHOP 1: {distances.shop1.toFixed(2)} km</p>
                <p>Distance to SHOP 2: {distances.shop2.toFixed(2)} km</p>
                <p>Distance to SHOP 3: {distances.shop3.toFixed(2)} km</p>
                <p>Nearest Shop: {nearestShop ? nearestShop.name : 'Calculating...'}</p>
            </div>
        </div>
    );
}

export default Location;
