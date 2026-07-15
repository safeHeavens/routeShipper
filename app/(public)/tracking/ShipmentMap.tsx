"use client";

import { useEffect, useState } from "react";
import {
    MapContainer,
    Marker,
    Polyline,
    Popup,
    TileLayer,
} from "react-leaflet";
import L from "leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";

const provider = new OpenStreetMapProvider();

const planeIcon = new L.Icon({
    iconUrl: "/icons/plane-marker.png",
    iconSize: [40, 40],
});

const originIcon = new L.Icon({
    iconUrl: "/icons/origin-marker.png",
    iconSize: [32, 32],
});

const destinationIcon = new L.Icon({
    iconUrl: "/icons/destination-marker.png",
    iconSize: [32, 32],
});

export default function ShipmentMap({
                                        origin,
                                        current,
                                        destination,
                                    }: {
    origin: string;
    current: string;
    destination: string;
}) {
    const [points, setPoints] = useState<any>(null);

    useEffect(() => {
        async function load() {
            const [o, c, d] = await Promise.all([
                provider.search({ query: origin }),
                provider.search({ query: current }),
                provider.search({ query: destination }),
            ]);

            if (!o[0] || !c[0] || !d[0]) return;

            setPoints({
                origin: [o[0].y, o[0].x],
                current: [c[0].y, c[0].x],
                destination: [d[0].y, d[0].x],
            });
        }

        load();
    }, [origin, current, destination]);

    if (!points) {
        return (
            <div className="h-[350px] flex items-center justify-center">
                Loading map...
            </div>
        );
    }

    return (
        <MapContainer
            center={points.current}
            zoom={4}
            className="h-[350px] w-full rounded-xl"
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={points.origin} icon={originIcon}>
                <Popup>Origin</Popup>
            </Marker>

            <Marker position={points.current} icon={planeIcon}>
                <Popup>Current Shipment Location</Popup>
            </Marker>

            <Marker position={points.destination} icon={destinationIcon}>
                <Popup>Destination</Popup>
            </Marker>

            {/* Completed */}
            <Polyline
                positions={[
                    points.origin,
                    points.current,
                ]}
                pathOptions={{
                    color: "#FF7A00",
                    weight: 6,
                }}
            />

            {/* Remaining */}
            <Polyline
                positions={[
                    points.current,
                    points.destination,
                ]}
                pathOptions={{
                    color: "#d1d5db",
                    weight: 6,
                    dashArray: "10 10",
                }}
            />
        </MapContainer>
    );
}