"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Globe,
  Building,
  Truck,
  Plane,
  Ship,
  Package,
} from "lucide-react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

gsap.registerPlugin(ScrollTrigger);

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const locations = [
  {
    id: 1,
    city: "New York",
    country: "United States",
    type: "Regional Hub",
    coordinates: [-74.006, 40.7128] as [number, number],
    address: "123 Logistics Ave, New York, NY 10001",
    phone: "+1 (212) 555-0123",
    email: "newyork@routeshipper.com",
    hours: "24/7 Operations",
    services: ["Air Freight", "Ground Delivery", "Warehousing"],
    color: "#FF7A00",
  },
  {
    id: 2,
    city: "Los Angeles",
    country: "United States",
    type: "Main Hub",
    coordinates: [-118.2437, 34.0522] as [number, number],
    address: "456 Shipping Blvd, Los Angeles, CA 90001",
    phone: "+1 (310) 555-0456",
    email: "losangeles@routeshipper.com",
    hours: "24/7 Operations",
    services: ["Air Freight", "Ocean Freight", "Ground Delivery", "Warehousing"],
    color: "#FF7A00",
  },
  {
    id: 3,
    city: "Chicago",
    country: "United States",
    type: "Distribution Center",
    coordinates: [-87.6298, 41.8781] as [number, number],
    address: "789 Transport Way, Chicago, IL 60601",
    phone: "+1 (312) 555-0789",
    email: "chicago@routeshipper.com",
    hours: "Mon-Sat: 6AM - 10PM",
    services: ["Ground Delivery", "Warehousing"],
    color: "#1F77FF",
  },
  {
    id: 4,
    city: "London",
    country: "United Kingdom",
    type: "European Hub",
    coordinates: [-0.1276, 51.5074] as [number, number],
    address: "10 Cargo Street, London, UK E14 9TP",
    phone: "+44 20 7123 4567",
    email: "london@routeshipper.com",
    hours: "24/7 Operations",
    services: ["Air Freight", "Ocean Freight", "Ground Delivery"],
    color: "#FF7A00",
  },
  {
    id: 5,
    city: "Dubai",
    country: "United Arab Emirates",
    type: "Middle East Hub",
    coordinates: [55.2708, 25.2048] as [number, number],
    address: "Jebel Ali Free Zone, Dubai, UAE",
    phone: "+971 4 123 4567",
    email: "dubai@routeshipper.com",
    hours: "24/7 Operations",
    services: ["Air Freight", "Ocean Freight", "Warehousing", "International"],
    color: "#FF7A00",
  },
];

const serviceIcons: { [key: string]: React.ElementType } = {
  "Air Freight": Plane,
  "Ocean Freight": Ship,
  "Ground Delivery": Truck,
  Warehousing: Package,
  International: Globe,
};

export default function LocationsPage() {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const headerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
          ".header-content",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );

      gsap.fromTo(
          ".map-container",
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: mapRef.current,
              start: "top 80%",
            },
          }
      );

      gsap.fromTo(
          ".location-card",
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".locations-list",
              start: "top 80%",
            },
          }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
      <div>
        {/* Header Section */}
        <section
            ref={headerRef}
            className="bg-gradient-to-br from-[#0B1E4A] to-[#1E3A5F] py-20 lg:py-28"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12">
            <div className="header-content text-center">
              <h1 className="text-4xl font-bold text-white sm:text-5xl">
                Our Global Locations
              </h1>
              <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
                With strategic hubs across the globe, we ensure your shipments reach
                their destination quickly and efficiently.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 text-white bg-white/10 px-4 py-2 rounded-full">
                  <Globe className="h-5 w-5 text-[#FF7A00]" />
                  <span>150+ Countries</span>
                </div>
                <div className="flex items-center gap-2 text-white bg-white/10 px-4 py-2 rounded-full">
                  <Building className="h-5 w-5 text-[#FF7A00]" />
                  <span>500+ Facilities</span>
                </div>
                <div className="flex items-center gap-2 text-white bg-white/10 px-4 py-2 rounded-full">
                  <Truck className="h-5 w-5 text-[#FF7A00]" />
                  <span>10,000+ Vehicles</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section ref={mapRef} className="py-12 lg:py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Map */}
              <div className="lg:col-span-2">
                <Card className="map-container border-0 shadow-lg overflow-hidden">
                  <div className="aspect-[16/10] bg-[#F8FAFC]">
                    <ComposableMap
                        projection="geoMercator"
                        projectionConfig={{
                          scale: 120,
                          center: [0, 30],
                        }}
                    >
                      <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map((geo) => (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill="#E2E8F0"
                                    stroke="#CBD5E1"
                                    strokeWidth={0.5}
                                    style={{
                                      default: { outline: "none" },
                                      hover: { fill: "#CBD5E1", outline: "none" },
                                      pressed: { outline: "none" },
                                    }}
                                />
                            ))
                        }
                      </Geographies>
                      {locations.map((location) => (
                          <Marker
                              key={location.id}
                              coordinates={location.coordinates}
                              onClick={() => setSelectedLocation(location)}
                          >
                            <g
                                transform="translate(-12, -24)"
                                style={{ cursor: "pointer" }}
                            >
                              <path
                                  d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24c0-6.6-5.4-12-12-12z"
                                  fill={
                                    selectedLocation.id === location.id
                                        ? "#FF7A00"
                                        : "#0B1E4A"
                                  }
                              />
                              <circle cx="12" cy="12" r="5" fill="white" />
                            </g>
                          </Marker>
                      ))}
                    </ComposableMap>
                  </div>
                </Card>
              </div>

              {/* Selected Location Details */}
              <div>
                <Card className="border-0 shadow-lg sticky top-24">
                  <div
                      className="p-6 text-white"
                      style={{ backgroundColor: "#0B1E4A" }}
                  >
                    <Badge
                        className="mb-2 text-white"
                        style={{ backgroundColor: selectedLocation.color }}
                    >
                      {selectedLocation.type}
                    </Badge>
                    <h2 className="text-2xl font-bold">{selectedLocation.city}</h2>
                    <p className="text-gray-300">{selectedLocation.country}</p>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 shrink-0 text-[#FF7A00] mt-0.5" />
                      <p className="text-gray-600">{selectedLocation.address}</p>
                    </div>
                    <div className="flex items-center gap-3 hidden">
                      <Phone className="h-5 w-5 shrink-0 text-[#FF7A00]" />
                      <a
                          href={`tel:${selectedLocation.phone}`}
                          className="text-[#1F77FF] hover:underline"
                      >
                        {selectedLocation.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3 hidden">
                      <Mail className="h-5 w-5 shrink-0 text-[#FF7A00]" />
                      <a
                          href={`mailto:${selectedLocation.email}`}
                          className="text-[#1F77FF] hover:underline"
                      >
                        {selectedLocation.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 shrink-0 text-[#FF7A00]" />
                      <p className="text-gray-600">{selectedLocation.hours}</p>
                    </div>
                    <div className="border-t pt-4">
                      <p className="font-semibold text-[#0B1E4A] mb-3">
                        Available Services
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selectedLocation.services.map((service) => {
                          const Icon = serviceIcons[service] || Package;
                          return (
                              <div
                                  key={service}
                                  className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                              >
                                <Icon className="h-4 w-4" />
                                <span>{service}</span>
                              </div>
                          );
                        })}
                      </div>
                    </div>
                    <Button
                        className="w-full mt-4 text-white"
                        style={{ backgroundColor: "#FF7A00" }}
                    >
                      Contact This Location
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* All Locations List */}
        <section className="py-12 lg:py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#0B1E4A] text-center mb-12">
              All Locations
            </h2>
            <div className="locations-list grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {locations.map((location) => (
                  <Card
                      key={location.id}
                      className={`location-card border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                          selectedLocation.id === location.id
                              ? "border-[#FF7A00]"
                              : "border-transparent"
                      }`}
                      onClick={() => setSelectedLocation(location)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <Badge
                              className="mb-2 text-white"
                              style={{
                                backgroundColor:
                                    location.type === "Main Hub" ||
                                    location.type === "Regional Hub" ||
                                    location.type === "European Hub" ||
                                    location.type === "Middle East Hub"
                                        ? "#FF7A00"
                                        : "#1F77FF",
                              }}
                          >
                            {location.type}
                          </Badge>
                          <h3 className="text-xl font-bold text-[#0B1E4A]">
                            {location.city}
                          </h3>
                          <p className="text-gray-500">{location.country}</p>
                        </div>
                        <div
                            className="flex h-10 w-10 items-center justify-center rounded-full"
                            style={{ backgroundColor: "#0B1E4A" }}
                        >
                          <MapPin className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-1">
                        {location.services.slice(0, 3).map((service) => (
                            <span
                                key={service}
                                className="text-xs px-2 py-1 bg-gray-100 rounded text-gray-600"
                            >
                        {service}
                      </span>
                        ))}
                        {location.services.length > 3 && (
                            <span className="text-xs px-2 py-1 bg-gray-100 rounded text-gray-600">
                        +{location.services.length - 3} more
                      </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
  );
}
