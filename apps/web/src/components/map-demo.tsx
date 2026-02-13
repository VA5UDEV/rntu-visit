"use client";

import {
  Map,
  MapLayerGroup,
  MapLayers,
  MapLayersControl,
  MapLocateControl,
  MapMarker,
  MapMarkerClusterGroup,
  MapPopup,
  MapRectangle,
  MapSearchControl,
  MapTileLayer,
  MapTooltip,
  MapZoomControl,
} from "@/components/ui/map";
import type { LatLngExpression, LatLngBoundsExpression } from "leaflet";
import {
  Clock,
  ExternalLink,
  MapPinIcon,
  Navigation,
  Star,
} from "lucide-react";
import { toast } from "sonner";
import { useMap } from "react-leaflet";
import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";

export function MapDemo() {
  const UNIVERSITY_COORDINATES = [
    23.133332, 77.563837,
  ] satisfies LatLngExpression;
  const BOUNDS = [
    [23.1308, 77.5619],
    [23.1355, 77.5657],
  ] satisfies LatLngBoundsExpression;
  const PLACE_POINTS = [
    {
      name: "Parking",
      coordinates: [23.134874, 77.563996] satisfies LatLngExpression,
      image:
        "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=300&h=200&fit=crop",
      category: "PARKING",
      rating: "",
      reviews: "",
      hours: "",
    },
    {
      name: "Boys Hostel",
      coordinates: [23.134560, 77.565383] satisfies LatLngExpression,
      image:
        "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=300&h=200&fit=crop",
      category: "HOSTEL",
      rating: "",
      reviews: "",
      hours: "",
    },
    {
      name: "Girls Hostel",
      coordinates: [23.134160, 77.565370] satisfies LatLngExpression,
      image:
        "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=300&h=200&fit=crop",
      category: "HOSTEL",
      rating: "",
      reviews: "",
      hours: "",
    },
    {
      name: "Admin",
      coordinates: [23.134339, 77.564335] satisfies LatLngExpression,
      image:
        "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=300&h=200&fit=crop",
      category: "BUILDING",
      rating: "",
      reviews: "",
      hours: "",
    },
    {
      name: "AIC",
      coordinates: [23.134002, 77.564739] satisfies LatLngExpression,
      image:
        "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=300&h=200&fit=crop",
      category: "BUILDING",
      rating: "",
      reviews: "",
      hours: "",
    },
    {
      name: "Management",
      coordinates: [23.1334808, 77.5642603] satisfies LatLngExpression,
      image:
        "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=300&h=200&fit=crop",
      category: "BUILDING",
      rating: "",
      reviews: "",
      hours: "",
    },
    {
      name: "Admission Cell",
      coordinates: [23.1344577, 77.5628865] satisfies LatLngExpression,
      image:
        "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=300&h=200&fit=crop",
      category: "BUILDING",
      rating: "",
      reviews: "",
      hours: "",
    },
    {
      name: "Football Ground",
      coordinates: [23.1350142, 77.5628392] satisfies LatLngExpression,
      image:
        "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=300&h=200&fit=crop",
      category: "GROUND",
      rating: "",
      reviews: "",
      hours: "",
    },
    {
      name: "Engineering",
      coordinates: [23.1342299, 77.5636221] satisfies LatLngExpression,
      image:
        "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=300&h=200&fit=crop",
      category: "DEPARTMENT",
      rating: "",
      reviews: "",
      hours: "",
    },
    {
      name: "Paramedical",
      coordinates: [23.133756, 77.562821] satisfies LatLngExpression,
      image:
        "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=300&h=200&fit=crop",
      category: "DEPARTMENT",
      rating: "",
      reviews: "",
      hours: "",
    },
    {
      name: "Workshops",
      coordinates: [23.1333911, 77.5623339] satisfies LatLngExpression,
      image:
        "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=300&h=200&fit=crop",
      category: "BUILDING",
      rating: "",
      reviews: "",
      hours: "",
    },
    {
      name: "Canteen",
      coordinates: [23.1331869, 77.5630443] satisfies LatLngExpression,
      image:
        "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=300&h=200&fit=crop",
      category: "BUILDING",
      rating: "",
      reviews: "",
      hours: "",
    },
    {
      name: "Main Ground",
      coordinates: [23.1319993, 77.5630826] satisfies LatLngExpression,
      image:
        "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=300&h=200&fit=crop",
      category: "GROUND",
      rating: "",
      reviews: "",
      hours: "",
    },
    {
      name: "TNSD",
      coordinates: [23.1311642, 77.5625498] satisfies LatLngExpression,
      image:
        "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=300&h=200&fit=crop",
      category: "BUILDING",
      rating: "",
      reviews: "",
      hours: "",
    },
    {
      name: "Agriculture",
      coordinates: [23.1317462, 77.5645803] satisfies LatLngExpression,
      image:
        "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=300&h=200&fit=crop",
      category: "DEPARTMENT",
      rating: "",
      reviews: "",
      hours: "",
    },
    {
      name: "Science",
      coordinates: [23.1319396, 77.5648504] satisfies LatLngExpression,
      image:
        "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=300&h=200&fit=crop",
      category: "DEPARTMENT",
      rating: "",
      reviews: "",
      hours: "",
    },
    {
      name: "Pharmacy",
      coordinates: [23.1317439, 77.5648713] satisfies LatLngExpression,
      image:
        "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=300&h=200&fit=crop",
      category: "DEPARTMENT",
      rating: "",
      reviews: "",
      hours: "",
    },
    {
      name: "Library",
      coordinates: [23.1324725, 77.5647221] satisfies LatLngExpression,
      image:
        "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=300&h=200&fit=crop",
      category: "BUILDING",
      rating: "",
      reviews: "",
      hours: "",
    },
    {
      name: "Audi & Law",
      coordinates: [23.1332834, 77.5648968] satisfies LatLngExpression,
      image:
        "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=300&h=200&fit=crop",
      category: "BUILDING",
      rating: "",
      reviews: "",
      hours: "",
    },
    {
      name: "DSW",
      coordinates: [23.1330848, 77.5637032] satisfies LatLngExpression,
      image:
        "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=300&h=200&fit=crop",
      category: "BUILDING",
      rating: "",
      reviews: "",
      hours: "",
    },
    {
      name: "Food Processing Unit",
      coordinates: [23.131666, 77.563998] satisfies LatLngExpression,
      image:
        "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=300&h=200&fit=crop",
      category: "BUILDING",
      rating: "",
      reviews: "",
      hours: "",
    },
    {
      name: "Basketball Court",
      coordinates: [23.1322483, 77.5642008] satisfies LatLngExpression,
      image:
        "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=300&h=200&fit=crop",
      category: "COURT",
      rating: "",
      reviews: "",
      hours: "",
    },
    {
      name: "Gate 1",
      coordinates: [23.1354015, 77.562107] satisfies LatLngExpression,
      image:
        "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=300&h=200&fit=crop",
      category: "GATE",
      rating: "",
      reviews: "",
      hours: "",
    },
    {
      name: "Gate 2",
      coordinates: [23.1351872, 77.5638967] satisfies LatLngExpression,
      image:
        "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=300&h=200&fit=crop",
      category: "GATE",
      rating: "",
      reviews: "",
      hours: "",
    },
    {
      name: "Gate 3",
      coordinates: [23.1352146, 77.5652327] satisfies LatLngExpression,
      image:
        "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=300&h=200&fit=crop",
      category: "GATE",
      rating: "",
      reviews: "",
      hours: "",
    },
  ];
  return (
    <Map
      center={UNIVERSITY_COORDINATES}
      zoom={17}
      attributionControl
      className="border"
    >
      <MapLayers defaultLayerGroups={["Clustered"]}>
        <MapTileLayer
          name="Satellite"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        />
        {/* <MapLayerGroup name="Area">
          <MapRectangle bounds={BOUNDS} />
        </MapLayerGroup> */}
        <MapLayerGroup name="Clustered">
          {PLACE_POINTS.map((point, i) => (
            <MapMarker key={i} position={point.coordinates}>
              <MapPopup className="w-56">
                <div className="relative h-32 overflow-hidden rounded-t-md">
                  <Image
                    fill
                    src={point.image}
                    alt={point.name}
                    className="object-cover"
                  />
                </div>
                <div className="space-y-2 p-3">
                  <div className="flex flex-col items-start">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      {point.category}
                    </span>
                    <h3 className="font-semibold text-foreground leading-tight">
                      {point.name}
                    </h3>
                  </div>
                  {/* <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="size-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-medium">{point.rating}</span>
                    <span className="text-muted-foreground">
                      ({point.reviews.toLocaleString()})
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="size-3.5" />
                  <span>{point.hours}</span>
                </div> */}
                  <div className="flex gap-2 pt-1">
                    <Button size="sm" className="flex-1 h-8">
                      <Navigation className="size-3.5 mr-1.5" />
                      Directions
                    </Button>
                    <Button size="sm" variant="outline" className="h-8">
                      <ExternalLink className="size-3.5" />
                    </Button>
                  </div>
                </div>
              </MapPopup>
            </MapMarker>
          ))}
        </MapLayerGroup>
      </MapLayers>
      <MapSearchControlWrapper />
      <div className="absolute right-1 bottom-5 z-1000 grid gap-1">
        <MapLocateControl
          className="static"
          watch
          onLocationError={(error) => toast.error(error.message)}
        />
        <MapZoomControl className="static" />
      </div>
    </Map>
  );
}

function MapSearchControlWrapper() {
  const map = useMap();
  const [selectedPosition, setSelectedPosition] =
    React.useState<LatLngExpression | null>(null);

  React.useEffect(() => {
    if (!selectedPosition) return;
    map.panTo(selectedPosition);
  }, [selectedPosition]);

  return (
    <>
      <MapSearchControl
        onPlaceSelect={(feature) =>
          setSelectedPosition(
            feature.geometry.coordinates.toReversed() as LatLngExpression,
          )
        }
      />
      {selectedPosition && (
        <MapMarker position={selectedPosition} icon={<MapPinIcon />} />
      )}
    </>
  );
}
