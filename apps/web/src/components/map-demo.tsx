"use client";

import {
  Map,
  MapLayerGroup,
  MapLayers,
  MapLayersControl,
  MapLocateControl,
  MapMarker,
  MapMarkerClusterGroup,
  MapRectangle,
  MapTileLayer,
  MapTooltip,
  MapZoomControl,
} from "@/components/ui/map";
import type { LatLngExpression, LatLngBoundsExpression } from "leaflet";
import { toast } from "sonner";

export function MapDemo() {
  const TORONTO_COORDINATES = [23.133332, 77.563837] satisfies LatLngExpression;
  const BOUNDS = [
    [23.1308, 77.5619],
    [23.1355, 77.5657],
  ] satisfies LatLngBoundsExpression;
  const CLUSTER_POINTS = [
    {
      name: "Parking",
      coordinates: [23.134874, 77.564596] satisfies LatLngExpression,
    },
    {
      name: "Hostel",
      coordinates: [23.134587, 77.565333] satisfies LatLngExpression,
    },
    {
      name: "Admin",
      coordinates: [23.134239, 77.564435] satisfies LatLngExpression,
    },
    {
      name: "AIC",
      coordinates: [23.133902, 77.564739] satisfies LatLngExpression,
    },
    {
      name: "Management",
      coordinates: [23.1335208, 77.5643003] satisfies LatLngExpression,
    },
    {
      name: "Admission Cell",
      coordinates: [23.1344577, 77.5628865] satisfies LatLngExpression,
    },
    {
      name: "Football Ground",
      coordinates: [23.1350142, 77.5628392] satisfies LatLngExpression,
    },
    {
      name: "Engineering",
      coordinates: [23.1342299, 77.5636221] satisfies LatLngExpression,
    },
    {
      name: "Paramedical",
      coordinates: [23.1338278, 77.5635587] satisfies LatLngExpression,
    },
    {
      name: "Workshops",
      coordinates: [23.1332911, 77.5623339] satisfies LatLngExpression,
    },
    {
      name: "Canteen",
      coordinates: [23.1331569, 77.5630943] satisfies LatLngExpression,
    },
    {
      name: "Main Ground",
      coordinates: [23.1319693, 77.5632026] satisfies LatLngExpression,
    },
    {
      name: "TNSD",
      coordinates: [23.1311242, 77.5625898] satisfies LatLngExpression,
    },
    {
      name: "Agriculture",
      coordinates: [23.1317862, 77.5646403] satisfies LatLngExpression,
    },
    {
      name: "Science",
      coordinates: [23.1319696, 77.5648904] satisfies LatLngExpression,
    },
    {
      name: "Pharmacy",
      coordinates: [23.1317439, 77.5648713] satisfies LatLngExpression,
    },
    {
      name: "Library",
      coordinates: [23.1324725, 77.5647221] satisfies LatLngExpression,
    },
    {
      name: "Audi & Law",
      coordinates: [23.1332834, 77.5648968] satisfies LatLngExpression,
    },
    {
      name: "DSW",
      coordinates: [23.1330848, 77.5637032] satisfies LatLngExpression,
    },
    {
      name: "Basketball Court",
      coordinates: [23.1322483, 77.5642008] satisfies LatLngExpression,
    },
    {
      name: "Gate 1",
      coordinates: [23.1354015, 77.562107] satisfies LatLngExpression,
    },
    {
      name: "Gate 2",
      coordinates: [23.1351872, 77.5638967] satisfies LatLngExpression,
    },
    {
      name: "Gate 3",
      coordinates: [23.1352146, 77.5652327] satisfies LatLngExpression,
    },
  ];
  return (
    <Map
      center={TORONTO_COORDINATES}
      zoom={17}
      attributionControl
      className="border"
    >
      <MapLayers defaultLayerGroups={["Area", "Clustered"]}>
        <MapLayersControl />
        <MapTileLayer
          name="Satellite"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        />
        <MapLayerGroup name="Area">
          <MapRectangle bounds={BOUNDS} />
        </MapLayerGroup>
        <MapLayerGroup name="Clustered">
          <MapMarkerClusterGroup>
            {CLUSTER_POINTS.map((point, i) => (
              <MapMarker key={i} position={point.coordinates}>
                <MapTooltip permanent interactive side="bottom">
                  {point.name}
                </MapTooltip>
              </MapMarker>
            ))}
          </MapMarkerClusterGroup>
        </MapLayerGroup>
      </MapLayers>
      <MapZoomControl />
      <MapLocateControl
        watch
        onLocationError={(error) => toast.error(error.message)}
        className="bottom-5"
      />
    </Map>
  );
}
