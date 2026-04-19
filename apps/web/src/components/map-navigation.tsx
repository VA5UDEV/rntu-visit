"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Map,
  MapLayerGroup,
  MapLayers,
  MapLocateControl,
  MapMarker,
  MapPopup,
  MapTileLayer,
  MapZoomControl,
  MapPolyline,
} from "@/components/ui/map";
import type { LatLngExpression } from "leaflet";
import { useMap, useMapEvents } from "react-leaflet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  NavigatorSidebar,
  TYPE_CONFIG,
  type Building,
} from "./navigator-sidebar";
import { Separator } from "./ui/separator";

// ─── Building Data ─────────────────────────────────────────────────────────────
const BUILDINGS: Building[] = [
  {
    id: 21,
    name: "Gate 1",
    lat: 23.13532841376455,
    lng: 77.56212472915651,
    image: "/preview.jpg",
    type: "entrance",
    color: "#10b981",
  },
  {
    id: 22,
    name: "Gate 2",
    lat: 23.135057098030337,
    lng: 77.56386816501619,
    image: "/preview.jpg",
    type: "entrance",
    color: "#10b981",
  },
  {
    id: 23,
    name: "Gate 3",
    lat: 23.13519522247272,
    lng: 77.56522536277772,
    image: "/preview.jpg",
    type: "entrance",
    color: "#10b981",
  },
  {
    id: 7,
    name: "Football Ground",
    lat: 23.134677255080238,
    lng: 77.56299376487733,
    image: "/preview.jpg",
    type: "sports",
    color: "#06b6d4",
  },
  {
    id: 1,
    name: "Parking",
    lat: 23.134771284022804,
    lng: 77.56406772343689,
    image: "/preview.jpg",
    type: "parking",
    color: "#64748b",
  },
  {
    id: 2,
    name: "Boys Hostel",
    lat: 23.13472658539429,
    lng: 77.56549358367921,
    image: "/preview.jpg",
    type: "hostel",
    color: "#ef4444",
  },
  {
    id: 6,
    name: "Admission Cell",
    lat: 23.13442073715466,
    lng: 77.56287038326265,
    image: "/preview.jpg",
    type: "admin",
    color: "#3b82f6",
  },
  {
    id: 3,
    name: "Admin",
    lat: 23.134341808463454,
    lng: 77.56435096263887,
    image: "/preview.jpg",
    type: "admin",
    color: "#3b82f6",
  },
  {
    id: 8,
    name: "Engineering",
    lat: 23.134213549241174,
    lng: 77.56364822387695,
    image: "/preview.jpg",
    type: "academic",
    color: "#f59e0b",
  },
  {
    id: 4,
    name: "AIC",
    lat: 23.133892900648796,
    lng: 77.56479620933534,
    image: "/preview.jpg",
    type: "facility",
    color: "#06b6d4",
  },
  {
    id: 9,
    name: "Paramedical",
    lat: 23.13375970793121,
    lng: 77.5628435611725,
    image: "/preview.jpg",
    type: "facility",
    color: "#14b8a6",
  },
  {
    id: 5,
    name: "Management",
    lat: 23.133517987476225,
    lng: 77.56428122520448,
    image: "/preview.jpg",
    type: "admin",
    color: "#3b82f6",
  },
  {
    id: 10,
    name: "Workshops",
    lat: 23.13339959362504,
    lng: 77.56248950958253,
    image: "/preview.jpg",
    type: "facility",
    color: "#8b5cf6",
  },
  {
    id: 18,
    name: "Audi & Law",
    lat: 23.1332318688236,
    lng: 77.56495714187623,
    image: "/preview.jpg",
    type: "facility",
    color: "#8b5cf6",
  },
  {
    id: 19,
    name: "DSW",
    lat: 23.133049344536634,
    lng: 77.5637072324753,
    image: "/preview.jpg",
    type: "facility",
    color: "#06b6d4",
  },
  {
    id: 11,
    name: "Canteen",
    lat: 23.133088809268383,
    lng: 77.56309032440187,
    image: "/preview.jpg",
    type: "facility",
    color: "#14b8a6",
  },
  {
    id: 17,
    name: "Library",
    lat: 23.132452439052877,
    lng: 77.56477475166322,
    image: "/preview.jpg",
    type: "library",
    color: "#8b5cf6",
  },
  {
    id: 20,
    name: "Basketball Court",
    lat: 23.132176184376007,
    lng: 77.56421148777008,
    image: "/preview.jpg",
    type: "sports",
    color: "#06b6d4",
  },
  {
    id: 15,
    name: "Science",
    lat: 23.1319837923899,
    lng: 77.56494641304018,
    image: "/preview.jpg",
    type: "academic",
    color: "#f59e0b",
  },
  {
    id: 14,
    name: "Agriculture",
    lat: 23.131717403030457,
    lng: 77.56455481052399,
    image: "/preview.jpg",
    type: "academic",
    color: "#f59e0b",
  },
  {
    id: 16,
    name: "Pharmacy",
    lat: 23.13167793789516,
    lng: 77.56489276885988,
    image: "/preview.jpg",
    type: "academic",
    color: "#f59e0b",
  },
  {
    id: 12,
    name: "Main Ground",
    lat: 23.13171246988917,
    lng: 77.56310105323793,
    image: "/preview.jpg",
    type: "sports",
    color: "#06b6d4",
  },
  {
    id: 13,
    name: "TNSD",
    lat: 23.131194489045473,
    lng: 77.56257534027101,
    image: "/preview.jpg",
    type: "academic",
    color: "#f59e0b",
  },
  {
    id: 24,
    name: "Girls Hostel",
    lat: 23.134105,
    lng: 77.56546,
    image: "/preview.jpg",
    type: "hostel",
    color: "#ec4899",
  },
  {
    id: 25,
    name: "Food Processing Unit",
    lat: 23.131629,
    lng: 77.564082,
    image: "/preview.jpg",
    type: "facility",
    color: "#14b8a6",
  },
];

const CAMPUS_CENTER: LatLngExpression = [23.1333, 77.5639];

// ─── Path Data ─────────────────────────────────────────────────────────────────
type Pt = { latitude: number; longitude: number };

const GATE1_TO_GATE2: Pt[] = [
  { latitude: 23.135309180532698, longitude: 77.56210471034586 },
  { latitude: 23.13470760563547, longitude: 77.56209397815584 },
  { latitude: 23.134559676968657, longitude: 77.56378966418356 },
  { latitude: 23.134613125644844, longitude: 77.56384576272929 },
  { latitude: 23.13502749991703, longitude: 77.56383503954962 },
];
const GATE2_TO_GATE3: Pt[] = [
  { latitude: 23.135022566897522, longitude: 77.5639101046356 },
  { latitude: 23.134637177707095, longitude: 77.56390643977315 },
  { latitude: 23.134573003221917, longitude: 77.56392253726796 },
  { latitude: 23.134548320719443, longitude: 77.56397619558399 },
  { latitude: 23.134518701710476, longitude: 77.56420156051146 },
  { latitude: 23.134474920933304, longitude: 77.56514906879076 },
  { latitude: 23.135205008829697, longitude: 77.5651544303806 },
];
const GATE3_TO_HOSTEL: Pt[] = [
  { latitude: 23.13519522247272, longitude: 77.56522536277772 },
  { latitude: 23.134746, longitude: 77.565196 },
  { latitude: 23.13472658539429, longitude: 77.56549358367921 },
];
const HOSTEL_TO_AUDI_LAW: Pt[] = [
  { latitude: 23.13473135214785, longitude: 77.5654111968271 },
  { latitude: 23.13474615643417, longitude: 77.56517530074079 },
  { latitude: 23.13445993994268, longitude: 77.56515921691673 },
  { latitude: 23.134222937321006, longitude: 77.56515089562099 },
  { latitude: 23.133911936645994, longitude: 77.56510796896818 },
  { latitude: 23.133798396537326, longitude: 77.56516162728424 },
  { latitude: 23.133729285119742, longitude: 77.56518309061065 },
  { latitude: 23.13365523713283, longitude: 77.56515626145261 },
  { latitude: 23.133586125641468, longitude: 77.56504894482048 },
  { latitude: 23.133350242089588, longitude: 77.5646640684145 },
  { latitude: 23.13326157131083, longitude: 77.56465332826753 },
  { latitude: 23.133177826632615, longitude: 77.56464795819402 },
  { latitude: 23.13311871271064, longitude: 77.56469091878198 },
  { latitude: 23.13310886038777, longitude: 77.564776839958 },
  { latitude: 23.133153195834968, longitude: 77.56484128084 },
  { latitude: 23.13323694052855, longitude: 77.56486276113401 },
  { latitude: 23.133310832861824, longitude: 77.56487887135448 },
];
const AIC_TO_ROAD: Pt[] = [
  { latitude: 23.133867849090976, longitude: 77.5648105297448 },
  { latitude: 23.13381356634435, longitude: 77.56484805866764 },
  { latitude: 23.13379876195511, longitude: 77.56493920033734 },
  { latitude: 23.133793827158318, longitude: 77.5650410645564 },
  { latitude: 23.133803696751695, longitude: 77.56510539985268 },
  { latitude: 23.133828370731962, longitude: 77.56515901259957 },
];
const AIC_TO_AUDI_LAW: Pt[] = [...AIC_TO_ROAD, ...HOSTEL_TO_AUDI_LAW.slice(5)];
const GATE2_TO_ADMIN: Pt[] = [
  { latitude: 23.135027233198144, longitude: 77.56391108036043 },
  { latitude: 23.13463725044881, longitude: 77.56390035152437 },
  { latitude: 23.134553329962078, longitude: 77.56393253803255 },
  { latitude: 23.134528647455976, longitude: 77.56420075893402 },
  { latitude: 23.134395361844554, longitude: 77.56427049636842 },
];
const GATE2_TO_ADMISSION: Pt[] = [
  { latitude: 23.135012700857928, longitude: 77.5638520717621 },
  { latitude: 23.13461673547258, longitude: 77.56383061408998 },
  { latitude: 23.134557497478333, longitude: 77.56379306316377 },
  { latitude: 23.13461179897405, longitude: 77.56299912929536 },
  { latitude: 23.13453775130601, longitude: 77.56295008682643 },
];
const GATE2_TO_FOOTBALL: Pt[] = [
  { latitude: 23.135012700857928, longitude: 77.5638520717621 },
  { latitude: 23.13461673547258, longitude: 77.56383061408998 },
  { latitude: 23.134557497478333, longitude: 77.56379306316377 },
  { latitude: 23.13461179897405, longitude: 77.56299912929536 },
];
const GATE2_TO_AIC: Pt[] = [
  { latitude: 23.135032663633265, longitude: 77.56390673890918 },
  { latitude: 23.134613533002767, longitude: 77.56390137281417 },
  { latitude: 23.13453956863787, longitude: 77.56393893547931 },
  { latitude: 23.134480397116594, longitude: 77.564743849733 },
  { latitude: 23.134031678897127, longitude: 77.5650067883892 },
  { latitude: 23.134007024006397, longitude: 77.56491019867879 },
  { latitude: 23.133869149883225, longitude: 77.56480366062178 },
];
const GATE2_TO_AUDI_LAW: Pt[] = [
  { latitude: 23.13502749991703, longitude: 77.56389498710634 },
  { latitude: 23.13462792474804, longitude: 77.56390035152437 },
  { latitude: 23.134544063141657, longitude: 77.56393790245058 },
  { latitude: 23.13447006756306, longitude: 77.56390035152437 },
  { latitude: 23.13344399133148, longitude: 77.56386816501619 },
  { latitude: 23.13335026282286, longitude: 77.56391644477846 },
  { latitude: 23.133300932002538, longitude: 77.56464064121248 },
  { latitude: 23.133123340899136, longitude: 77.56464600563051 },
  { latitude: 23.133088809268383, longitude: 77.56481230258943 },
  { latitude: 23.133187471046934, longitude: 77.56485521793367 },
  { latitude: 23.133281199669316, longitude: 77.56486594676971 },
];
const GATE2_TO_PARAMEDICAL: Pt[] = [
  { latitude: 23.135032432936377, longitude: 77.56391108036043 },
  { latitude: 23.13462792474804, longitude: 77.56390035152437 },
  { latitude: 23.134544063141657, longitude: 77.56392717361452 },
  { latitude: 23.134465134523044, longitude: 77.56390035152437 },
  { latitude: 23.133434125175757, longitude: 77.56386816501619 },
  { latitude: 23.133340396660245, longitude: 77.56392717361452 },
  { latitude: 23.133266400417508, longitude: 77.56384134292604 },
  { latitude: 23.133345329741648, longitude: 77.5637072324753 },
  { latitude: 23.133414392862154, longitude: 77.56280064582826 },
  { latitude: 23.13375970793121, longitude: 77.56283283233644 },
];
const GATE2_TO_CANTEEN: Pt[] = [
  { latitude: 23.135042298974504, longitude: 77.56390035152437 },
  { latitude: 23.13462792474804, longitude: 77.56390035152437 },
  { latitude: 23.134558862252476, longitude: 77.56393253803255 },
  { latitude: 23.134489799721354, longitude: 77.56390035152437 },
  { latitude: 23.133414392862154, longitude: 77.56386280059816 },
  { latitude: 23.13333546357866, longitude: 77.56392180919649 },
  { latitude: 23.133246668079224, longitude: 77.56381988525392 },
  { latitude: 23.133340396660245, longitude: 77.56371259689332 },
  { latitude: 23.133374928226214, longitude: 77.56304740905763 },
  { latitude: 23.13307802686562, longitude: 77.56309087569655 },
];
const GATE2_TO_WORKSHOP: Pt[] = [
  { latitude: 23.135027832453094, longitude: 77.56392283887126 },
  { latitude: 23.134618563720103, longitude: 77.56390137449117 },
  { latitude: 23.134549530316715, longitude: 77.56393357106128 },
  { latitude: 23.134465703993435, longitude: 77.56390137449117 },
  { latitude: 23.13343512903091, longitude: 77.56386381182598 },
  { latitude: 23.133351302011025, longitude: 77.56391747277621 },
  { latitude: 23.133267474938748, longitude: 77.5638262491608 },
  { latitude: 23.133346371008216, longitude: 77.56370282897525 },
  { latitude: 23.13341464921206, longitude: 77.56256089275867 },
];
const GATE2_TO_DSW: Pt[] = [
  { latitude: 23.135042612805382, longitude: 77.56389600839616 },
  { latitude: 23.134638275072962, longitude: 77.56389600839616 },
  { latitude: 23.134539655928904, longitude: 77.56393357106128 },
  { latitude: 23.134465691523268, longitude: 77.56390137449117 },
  { latitude: 23.133440047560182, longitude: 77.56386381182598 },
  { latitude: 23.13333649653182, longitude: 77.56392283887126 },
  { latitude: 23.133252669450282, longitude: 77.56382088306579 },
  { latitude: 23.1331072876868, longitude: 77.56363782299057 },
];
const GATE2_TO_ENGINEERING: Pt[] = [
  { latitude: 23.135007487263422, longitude: 77.56390035152437 },
  { latitude: 23.13461750445667, longitude: 77.5639057159424 },
  { latitude: 23.134553329962078, longitude: 77.56392180919649 },
  { latitude: 23.134489155436775, longitude: 77.56387352943422 },
  { latitude: 23.134415107869415, longitude: 77.56383061408998 },
  { latitude: 23.134237393540957, longitude: 77.56382524967194 },
  { latitude: 23.134237393540957, longitude: 77.56372332572938 },
];
const GATE2_TO_MANAGEMENT: Pt[] = [
  { latitude: 23.135037555085407, longitude: 77.56390137449117 },
  { latitude: 23.1346184244702, longitude: 77.56390137449117 },
  { latitude: 23.134554322025313, longitude: 77.56394430325135 },
  { latitude: 23.13448035762777, longitude: 77.56389600839616 },
  { latitude: 23.133430058780046, longitude: 77.56386917792102 },
  { latitude: 23.133346231757006, longitude: 77.56394966934639 },
  { latitude: 23.1333511627598, longitude: 77.56409455391206 },
  { latitude: 23.13345964477567, longitude: 77.56414284876726 },
  { latitude: 23.133504023756874, longitude: 77.56423407238269 },
];
const GATE2_TO_PARKING: Pt[] = [
  { latitude: 23.135027693203615, longitude: 77.56389600839616 },
  { latitude: 23.134633217337743, longitude: 77.56390137449117 },
  { latitude: 23.134549391066763, longitude: 77.56392820496627 },
  { latitude: 23.13455925298371, longitude: 77.56406235734188 },
  { latitude: 23.134771284022804, longitude: 77.56406772343689 },
];
const GATE2_TO_HOSTEL: Pt[] = [
  { latitude: 23.135027693203615, longitude: 77.56390137449117 },
  { latitude: 23.134638148293238, longitude: 77.56391210668122 },
  { latitude: 23.13454446010801, longitude: 77.56393357106128 },
  { latitude: 23.134460633781536, longitude: 77.56514094244179 },
  { latitude: 23.13474169831655, longitude: 77.56517313901196 },
  { latitude: 23.13474169831655, longitude: 77.56541997938307 },
];
const GATE2_TO_TNSD: Pt[] = [
  { latitude: 23.135042298974504, longitude: 77.56384134292604 },
  { latitude: 23.13339959362504, longitude: 77.56379306316377 },
  { latitude: 23.13333546357866, longitude: 77.56375014781953 },
  { latitude: 23.133271333501636, longitude: 77.56381988525392 },
  { latitude: 23.133320664332846, longitude: 77.56392180919649 },
  { latitude: 23.133291065836296, longitude: 77.56463527679445 },
  { latitude: 23.1331085416299, longitude: 77.56462991237642 },
  { latitude: 23.132023257435186, longitude: 77.56431877613069 },
  { latitude: 23.131939394200067, longitude: 77.56424367427827 },
  { latitude: 23.13152007723789, longitude: 77.56376624107362 },
  { latitude: 23.131470745744398, longitude: 77.56357848644258 },
  { latitude: 23.131510210940647, longitude: 77.56311178207399 },
  { latitude: 23.13154967612528, longitude: 77.56274163722993 },
  { latitude: 23.131623673315186, longitude: 77.56246268749237 },
  { latitude: 23.131426347384725, longitude: 77.56246268749237 },
  { latitude: 23.13136714954898, longitude: 77.56247341632844 },
];
const GATE2_TO_MAIN_GROUND: Pt[] = [
  { latitude: 23.13501783132112, longitude: 77.56390137449117 },
  { latitude: 23.13460844616961, longitude: 77.56390137449117 },
  { latitude: 23.13455420563729, longitude: 77.56392283887126 },
  { latitude: 23.134485172200787, longitude: 77.5638852762061 },
  { latitude: 23.13345952838668, longitude: 77.56386381182598 },
  { latitude: 23.133341184364927, longitude: 77.56393357106128 },
  { latitude: 23.133306667338925, longitude: 77.56463116341448 },
  { latitude: 23.133089702971933, longitude: 77.56463116341448 },
  { latitude: 23.13200451215267, longitude: 77.56431456380803 },
  { latitude: 23.131536061372955, longitude: 77.5637618560205 },
  { latitude: 23.131688924438798, longitude: 77.563649168025 },
  { latitude: 23.131743166129972, longitude: 77.56317695166284 },
];
const GATE2_TO_LIBRARY: Pt[] = [
  { latitude: 23.1350177939108, longitude: 77.56391210668122 },
  { latitude: 23.134628248971662, longitude: 77.56390674058616 },
  { latitude: 23.134549353656315, longitude: 77.56392820496627 },
  { latitude: 23.13447045829456, longitude: 77.56390137449117 },
  { latitude: 23.13344974536711, longitude: 77.56385844573096 },
  { latitude: 23.13334126334324, longitude: 77.56393893715634 },
  { latitude: 23.133291953303363, longitude: 77.5646526277946 },
  { latitude: 23.13265037244114, longitude: 77.56449701103888 },
  { latitude: 23.132546820803054, longitude: 77.56466872607967 },
  { latitude: 23.13248764840252, longitude: 77.56468482436473 },
];
const GATE2_TO_SCIENCE: Pt[] = [
  { latitude: 23.135017889514927, longitude: 77.56390137449117 },
  { latitude: 23.134618482664187, longitude: 77.56391210668122 },
  { latitude: 23.13455931117772, longitude: 77.56393357106128 },
  { latitude: 23.134475484860534, longitude: 77.5638852762061 },
  { latitude: 23.133444909973175, longitude: 77.56386381182598 },
  { latitude: 23.133351220954346, longitude: 77.56393357106128 },
  { latitude: 23.133291811973724, longitude: 77.5646526277946 },
  { latitude: 23.13225, longitude: 77.564399 },
  { latitude: 23.132038950534735, longitude: 77.56461506512943 },
  { latitude: 23.13199457106874, longitude: 77.5648350750254 },
];
const GATE2_TO_PHARMACY: Pt[] = [
  ...GATE2_TO_SCIENCE,
  { latitude: 23.131762811396616, longitude: 77.56481897674034 },
];
const GATE2_TO_AGRICULTURE: Pt[] = [
  { latitude: 23.135017889514927, longitude: 77.56390137449117 },
  { latitude: 23.134618482664187, longitude: 77.56391210668122 },
  { latitude: 23.13455931117772, longitude: 77.56393357106128 },
  { latitude: 23.134475484860534, longitude: 77.5638852762061 },
  { latitude: 23.133444909973175, longitude: 77.56386381182598 },
  { latitude: 23.133351220954346, longitude: 77.56393357106128 },
  { latitude: 23.133291811973724, longitude: 77.5646526277946 },
  { latitude: 23.13225, longitude: 77.564399 },
  { latitude: 23.132038950534735, longitude: 77.56461506512943 },
  { latitude: 23.13178253563964, longitude: 77.56463116341448 },
];
const GATE2_TO_BASKETBALL: Pt[] = [
  { latitude: 23.135017889514927, longitude: 77.56390137449117 },
  { latitude: 23.134618482664187, longitude: 77.56391210668122 },
  { latitude: 23.13455931117772, longitude: 77.56393357106128 },
  { latitude: 23.134475484860534, longitude: 77.5638852762061 },
  { latitude: 23.133444909973175, longitude: 77.56386381182598 },
  { latitude: 23.133351220954346, longitude: 77.56393357106128 },
  { latitude: 23.133291811973724, longitude: 77.5646526277946 },
  { latitude: 23.13225, longitude: 77.564399 },
];
const GATE2_TO_GIRLS_HOSTEL: Pt[] = [
  { latitude: 23.135027693203615, longitude: 77.56390137449117 },
  { latitude: 23.134638148293238, longitude: 77.56391210668122 },
  { latitude: 23.13454446010801, longitude: 77.56393357106128 },
  { latitude: 23.134460633781536, longitude: 77.56514094244179 },
  { latitude: 23.134460755748584, longitude: 77.56517350284969 },
  { latitude: 23.134352381241786, longitude: 77.5651681327762 },
  { latitude: 23.134209523803555, longitude: 77.5651573926292 },
  { latitude: 23.13420459768231, longitude: 77.5653883057897 },
];
const GATE2_TO_FOOD_PROCESSING: Pt[] = [
  { latitude: 23.13501783132112, longitude: 77.56390137449117 },
  { latitude: 23.13460844616961, longitude: 77.56390137449117 },
  { latitude: 23.13455420563729, longitude: 77.56392283887126 },
  { latitude: 23.134485172200787, longitude: 77.5638852762061 },
  { latitude: 23.13345952838668, longitude: 77.56386381182598 },
  { latitude: 23.133341184364927, longitude: 77.56393357106128 },
  { latitude: 23.133306667338925, longitude: 77.56463116341448 },
  { latitude: 23.133089702971933, longitude: 77.56463116341448 },
  { latitude: 23.13200451215267, longitude: 77.56431456380803 },
  { latitude: 23.13176180129377, longitude: 77.56407631109248 },
  { latitude: 23.131707536747715, longitude: 77.56399588724486 },
  { latitude: 23.131653272179715, longitude: 77.56403341837374 },
];
const PARKING_EXIT_FULL: Pt[] = [
  { latitude: 23.134588460469217, longitude: 77.56404397751854 },
  { latitude: 23.13453913010436, longitude: 77.56400644638966 },
  { latitude: 23.134544063141657, longitude: 77.56394210731155 },
  { latitude: 23.134495293954394, longitude: 77.56389129105192 },
  { latitude: 23.134431254500175, longitude: 77.56390203119892 },
  { latitude: 23.134362288899904, longitude: 77.56389666112541 },
];
const PARKING_EXIT_NORTH: Pt[] = PARKING_EXIT_FULL.slice(0, 4);
const CURVE_TO_ADMIN: Pt[] = [
  { latitude: 23.13448035762777, longitude: 77.56389600839616 },
  { latitude: 23.134553329962078, longitude: 77.56393253803255 },
];
const PARKING_TO_ADMIN: Pt[] = [
  { latitude: 23.134771284022804, longitude: 77.56406772343689 },
  ...PARKING_EXIT_NORTH,
  ...CURVE_TO_ADMIN,
  { latitude: 23.134528647455976, longitude: 77.56420075893402 },
  { latitude: 23.134395361844554, longitude: 77.56427049636842 },
];
const PARKING_TO_HOSTEL: Pt[] = [
  { latitude: 23.134771284022804, longitude: 77.56406772343689 },
  ...PARKING_EXIT_NORTH,
  ...CURVE_TO_ADMIN,
  { latitude: 23.134460633781536, longitude: 77.56514094244179 },
  { latitude: 23.13474169831655, longitude: 77.56517313901196 },
  { latitude: 23.13472658539429, longitude: 77.56549358367921 },
];
const GIRLS_HOSTEL_TO_GATE3: Pt[] = [
  { latitude: 23.13420459768231, longitude: 77.5653883057897 },
  { latitude: 23.134209523803555, longitude: 77.5651573926292 },
  { latitude: 23.134352381241786, longitude: 77.5651681327762 },
  { latitude: 23.134460755748584, longitude: 77.56517350284969 },
  { latitude: 23.13474169831655, longitude: 77.56517313901196 },
  { latitude: 23.134746, longitude: 77.565196 },
  { latitude: 23.13519522247272, longitude: 77.56522536277772 },
];
const FOOD_PROCESSING_TO_TNSD: Pt[] = [
  { latitude: 23.131653272179715, longitude: 77.56403341837374 },
  { latitude: 23.131707536747715, longitude: 77.56399588724486 },
  { latitude: 23.13176180129377, longitude: 77.56407631109248 },
  { latitude: 23.131536061372955, longitude: 77.5637618560205 },
  { latitude: 23.131470745744398, longitude: 77.56357848644258 },
  { latitude: 23.131510210940647, longitude: 77.56311178207399 },
  { latitude: 23.13154967612528, longitude: 77.56274163722993 },
  { latitude: 23.131623673315186, longitude: 77.56246268749237 },
  { latitude: 23.131426347384725, longitude: 77.56246268749237 },
  { latitude: 23.13136714954898, longitude: 77.56247341632844 },
];

const CUSTOM_PATHS: Record<string, Pt[]> = {
  "21-22": GATE1_TO_GATE2,
  "22-21": [...GATE1_TO_GATE2].reverse(),
  "22-23": GATE2_TO_GATE3,
  "23-22": [...GATE2_TO_GATE3].reverse(),
  "23-2": GATE3_TO_HOSTEL,
  "2-23": [...GATE3_TO_HOSTEL].reverse(),
  "2-18": HOSTEL_TO_AUDI_LAW,
  "18-2": [...HOSTEL_TO_AUDI_LAW].reverse(),
  "4-18": AIC_TO_AUDI_LAW,
  "18-4": [...AIC_TO_AUDI_LAW].reverse(),
  "22-3": GATE2_TO_ADMIN,
  "3-22": [...GATE2_TO_ADMIN].reverse(),
  "22-6": GATE2_TO_ADMISSION,
  "6-22": [...GATE2_TO_ADMISSION].reverse(),
  "22-7": GATE2_TO_FOOTBALL,
  "7-22": [...GATE2_TO_FOOTBALL].reverse(),
  "22-4": GATE2_TO_AIC,
  "4-22": [...GATE2_TO_AIC].reverse(),
  "22-18": GATE2_TO_AUDI_LAW,
  "18-22": [...GATE2_TO_AUDI_LAW].reverse(),
  "22-9": GATE2_TO_PARAMEDICAL,
  "9-22": [...GATE2_TO_PARAMEDICAL].reverse(),
  "22-11": GATE2_TO_CANTEEN,
  "11-22": [...GATE2_TO_CANTEEN].reverse(),
  "22-10": GATE2_TO_WORKSHOP,
  "10-22": [...GATE2_TO_WORKSHOP].reverse(),
  "22-19": GATE2_TO_DSW,
  "19-22": [...GATE2_TO_DSW].reverse(),
  "22-8": GATE2_TO_ENGINEERING,
  "8-22": [...GATE2_TO_ENGINEERING].reverse(),
  "22-5": GATE2_TO_MANAGEMENT,
  "5-22": [...GATE2_TO_MANAGEMENT].reverse(),
  "22-1": GATE2_TO_PARKING,
  "1-22": [...GATE2_TO_PARKING].reverse(),
  "22-2": GATE2_TO_HOSTEL,
  "2-22": [...GATE2_TO_HOSTEL].reverse(),
  "22-17": GATE2_TO_LIBRARY,
  "17-22": [...GATE2_TO_LIBRARY].reverse(),
  "22-13": GATE2_TO_TNSD,
  "13-22": [...GATE2_TO_TNSD].reverse(),
  "22-20": GATE2_TO_BASKETBALL,
  "20-22": [...GATE2_TO_BASKETBALL].reverse(),
  "22-14": GATE2_TO_AGRICULTURE,
  "14-22": [...GATE2_TO_AGRICULTURE].reverse(),
  "22-16": GATE2_TO_PHARMACY,
  "16-22": [...GATE2_TO_PHARMACY].reverse(),
  "22-15": GATE2_TO_SCIENCE,
  "15-22": [...GATE2_TO_SCIENCE].reverse(),
  "22-12": GATE2_TO_MAIN_GROUND,
  "12-22": [...GATE2_TO_MAIN_GROUND].reverse(),
  "22-24": GATE2_TO_GIRLS_HOSTEL,
  "24-22": [...GATE2_TO_GIRLS_HOSTEL].reverse(),
  "22-25": GATE2_TO_FOOD_PROCESSING,
  "25-22": [...GATE2_TO_FOOD_PROCESSING].reverse(),
  "1-3": PARKING_TO_ADMIN,
  "3-1": [...PARKING_TO_ADMIN].reverse(),
  "1-2": PARKING_TO_HOSTEL,
  "2-1": [...PARKING_TO_HOSTEL].reverse(),
  "24-23": GIRLS_HOSTEL_TO_GATE3,
  "23-24": [...GIRLS_HOSTEL_TO_GATE3].reverse(),
  "25-13": FOOD_PROCESSING_TO_TNSD,
  "13-25": [...FOOD_PROCESSING_TO_TNSD].reverse(),
};

function getCustomPath(startId: number, endId: number): Pt[] | null {
  const direct = CUSTOM_PATHS[`${startId}-${endId}`];
  if (direct) return direct;
  const g2s = CUSTOM_PATHS[`22-${startId}`];
  const g2e = CUSTOM_PATHS[`22-${endId}`];
  if (g2s && g2e) {
    let matchIndex = -1;
    const len = Math.min(g2s.length, g2e.length);
    for (let i = 0; i < len; i++) {
      if (
        Math.abs(g2s[i]!.latitude - g2e[i]!.latitude) < 0.0002 &&
        Math.abs(g2s[i]!.longitude - g2e[i]!.longitude) < 0.0002
      )
        matchIndex = i;
      else break;
    }
    return [
      ...g2s.slice(matchIndex > -1 ? matchIndex : 0).reverse(),
      ...g2e.slice(matchIndex > -1 ? matchIndex + 1 : 0),
    ];
  }
  return null;
}

function haversineMeters(p1: Pt, p2: Pt): number {
  const R = 6371e3;
  const φ1 = (p1.latitude * Math.PI) / 180,
    φ2 = (p2.latitude * Math.PI) / 180;
  const Δφ = ((p2.latitude - p1.latitude) * Math.PI) / 180;
  const Δλ = ((p2.longitude - p1.longitude) * Math.PI) / 180;
  const a =
    Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function pathDistance(path: Pt[]): number {
  return path
    .slice(1)
    .reduce((sum, p, i) => sum + haversineMeters(path[i]!, p), 0);
}

const CONNECTIONS = [
  [21, 22],
  [22, 23],
  [23, 2],
  [2, 18],
  [4, 18],
  [22, 3],
  [22, 6],
  [22, 7],
  [22, 4],
  [22, 9],
  [22, 11],
  [22, 10],
  [22, 19],
  [22, 8],
  [22, 5],
  [22, 1],
  [22, 2],
  [22, 17],
  [22, 13],
  [22, 20],
  [22, 14],
  [22, 16],
  [22, 15],
  [22, 12],
  [22, 24],
  [22, 25],
  [1, 3],
  [1, 2],
  [3, 5],
  [3, 19],
  [3, 8],
];

function buildGraph() {
  const graph: Record<number, { node: number; cost: number }[]> = {};
  BUILDINGS.forEach((b) => {
    graph[b.id] = [];
  });
  CONNECTIONS.forEach(([a, b]) => {
    if (a === undefined || b === undefined) return;
    const ba = BUILDINGS.find((x) => x.id === a)!,
      bb = BUILDINGS.find((x) => x.id === b)!;
    const cost = Math.sqrt((bb.lat - ba.lat) ** 2 + (bb.lng - ba.lng) ** 2);
    graph[a]!.push({ node: b, cost });
    graph[b]!.push({ node: a, cost });
  });
  return graph;
}
const GRAPH = buildGraph();

function findPath(startId: number, endId: number): number[] | null {
  const open = [{ id: startId, f: 0, g: 0 }];
  const closed = new Set<number>();
  const cameFrom: Record<number, number> = {};
  const gScore: Record<number, number> = { [startId]: 0 };
  const h = (a: number, b: number) => {
    const ba = BUILDINGS.find((x) => x.id === a)!,
      bb = BUILDINGS.find((x) => x.id === b)!;
    return Math.sqrt((bb.lat - ba.lat) ** 2 + (bb.lng - ba.lng) ** 2);
  };
  while (open.length > 0) {
    open.sort((a, b) => a.f - b.f);
    const cur = open.shift()!;
    if (cur.id === endId) {
      const path = [cur.id];
      let c = cur.id;
      while (cameFrom[c] !== undefined) {
        c = cameFrom[c]!;
        path.unshift(c);
      }
      return path;
    }
    closed.add(cur.id);
    for (const nb of GRAPH[cur.id] ?? []) {
      if (closed.has(nb.node)) continue;
      const tg = (gScore[cur.id] ?? Infinity) + nb.cost;
      if (tg < (gScore[nb.node] ?? Infinity)) {
        cameFrom[nb.node] = cur.id;
        gScore[nb.node] = tg;
        open.push({ id: nb.node, f: tg + h(nb.node, endId), g: tg });
      }
    }
  }
  return null;
}

// ─── Map helpers ───────────────────────────────────────────────────────────────
function MapInteractionBlocker({ onDrag }: { onDrag: () => void }) {
  useMapEvents({ dragstart: onDrag, zoomstart: onDrag });
  return null;
}

function FlyToBuilding({ building }: { building: Building | null }) {
  const map = useMap();
  useEffect(() => {
    if (building)
      map.flyTo([building.lat, building.lng], 18, { duration: 1.2 });
  }, [building, map]);
  return null;
}

// ─── Animated dot that loops along the active route ────────────────────────────
function AnimatedPathMarker({ path }: { path: LatLngExpression[] }) {
  const [markerPos, setMarkerPos] = useState<LatLngExpression>(path[0]!);
  // Float progress: 0 → path.length-1, then wraps
  const progressRef = useRef(0);

  useEffect(() => {
    if (path.length < 2) return;
    const totalSegments = path.length - 1;
    // Complete the full loop in ~8 seconds at 30fps
    const speed = totalSegments / (8 * 30);

    const id = setInterval(() => {
      progressRef.current += speed;
      if (progressRef.current >= totalSegments) progressRef.current = 0;

      const seg = Math.floor(progressRef.current);
      const t = progressRef.current - seg;
      const p1 = path[seg] as [number, number];
      const p2 = path[Math.min(seg + 1, totalSegments)] as [number, number];

      setMarkerPos([p1[0] + (p2[0] - p1[0]) * t, p1[1] + (p2[1] - p1[1]) * t]);
    }, 1000 / 30);

    return () => clearInterval(id);
  }, [path]);

  return (
    <MapMarker
      position={markerPos}
      icon={
        <div className="relative flex items-center justify-center">
          {/* Outer pulse ring */}
          <span
            className="absolute inline-flex rounded-full bg-emerald-400 opacity-60 animate-ping"
            style={{ width: 22, height: 22 }}
          />
          {/* Inner solid dot */}
          <span
            className="relative inline-flex rounded-full bg-white border-[3px] border-emerald-500 shadow-lg"
            style={{
              width: 14,
              height: 14,
              boxShadow: "0 0 8px 2px rgba(34,197,94,0.6)",
            }}
          />
        </div>
      }
      iconAnchor={[11, 11]}
    />
  );
}

// ─── Invalidate Leaflet tile cache after sidebar transition ────────────────────
function MapResizer() {
  const map = useMap();
  const { open, openMobile, isMobile } = useSidebar();

  useEffect(() => {
    const t = setTimeout(() => map.invalidateSize(), 220);
    return () => clearTimeout(t);
  }, [open, openMobile, isMobile, map]);

  return null;
}

// ─── Floating sidebar trigger (shown only when sidebar is closed) ──────────────
function FloatingTrigger() {
  const { open, openMobile, isMobile } = useSidebar();
  const isVisible = isMobile ? !openMobile : !open;
  if (!isVisible) return null;
  return (
    <div className="absolute top-3 left-3 z-[1001]">
      <SidebarTrigger className="h-9 w-9 shadow-md border bg-background/95 hover:bg-background backdrop-blur-sm" />
    </div>
  );
}

// ─── Building Popup ────────────────────────────────────────────────────────────
function BuildingPopup({
  b,
  onSetStart,
  onSetEnd,
}: {
  b: Building;
  onSetStart: () => void;
  onSetEnd: () => void;
}) {
  return (
    <>
      <div className="dark">
        <div className="relative h-32 overflow-hidden rounded-t-md">
          <Image
            fill
            src={b.image}
            alt={b.name}
            className="h-64 w-full object-cover mask-b-from-60% to-100%"
          />
        </div>
        <div className="p-2.5 min-w-[160px]">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-md rounded-full border border-white/30 mb-1.5">
            <Badge
              variant="outline"
              className="text-[10px] capitalize border-none"
            >
              {TYPE_CONFIG[b.type]?.label ?? b.type}
            </Badge>
          </div>
          <div className="flex items-center justify-center gap-1 mb-1.5">
            <span
              className="h-2.5 w-2.5 rounded-full shrink-0"
              style={{ backgroundColor: b.color }}
            />
            <p className="font-semibold text-sm leading-tight">{b.name}</p>
          </div>
          <Separator className="my-1.5 dark:bg-transparent backdrop-blur" />
          <div className="flex gap-1.5">
            <Button
              onClick={onSetStart}
              className="flex-1 h-7 text-white text-[11px] bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/40 hover:border-white/50"
            >
              Set Start
            </Button>
            <Button
              onClick={onSetEnd}
              className="flex-1 h-7 text-white text-[11px] bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/40 hover:border-white/50"
            >
              Set End
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export function MapNavigation() {
  const [startId, setStartId] = useState<string>("");
  const [endId, setEndId] = useState<string>("");
  const [routePath, setRoutePath] = useState<LatLngExpression[] | null>(null);
  const [routeInfo, setRouteInfo] = useState<{
    distance: number;
    time: number;
  } | null>(null);
  const [navActive, setNavActive] = useState(false);
  const [flyTarget, setFlyTarget] = useState<Building | null>(null);

  useEffect(() => {
    const s = parseInt(startId),
      e = parseInt(endId);
    if (!s || !e || s === e) {
      setRoutePath(null);
      setRouteInfo(null);
      return;
    }

    const custom = getCustomPath(s, e);
    if (custom) {
      setRoutePath(custom.map((p) => [p.latitude, p.longitude]));
      const dist = pathDistance(custom);
      setRouteInfo({ distance: Math.round(dist), time: Math.ceil(dist / 80) });
      return;
    }

    const ids = findPath(s, e);
    if (!ids) {
      setRoutePath(null);
      setRouteInfo(null);
      return;
    }

    const coords: LatLngExpression[] = [];
    let totalDist = 0;
    for (let i = 0; i < ids.length - 1; i++) {
      const a = ids[i]!,
        b = ids[i + 1]!;
      const cp = getCustomPath(a, b);
      if (cp) {
        cp.forEach((p) => coords.push([p.latitude, p.longitude]));
        totalDist += pathDistance(cp);
      } else {
        const ba = BUILDINGS.find((x) => x.id === a)!,
          bb = BUILDINGS.find((x) => x.id === b)!;
        coords.push([ba.lat, ba.lng]);
        totalDist += haversineMeters(
          { latitude: ba.lat, longitude: ba.lng },
          { latitude: bb.lat, longitude: bb.lng },
        );
      }
    }
    const last = BUILDINGS.find((x) => x.id === ids[ids.length - 1]!)!;
    coords.push([last.lat, last.lng]);
    setRoutePath(coords);
    setRouteInfo({
      distance: Math.round(totalDist),
      time: Math.ceil(totalDist / 80),
    });
  }, [startId, endId]);

  const clearRoute = useCallback(() => {
    setStartId("");
    setEndId("");
    setRoutePath(null);
    setRouteInfo(null);
    setNavActive(false);
  }, []);

  const startBuilding = BUILDINGS.find((b) => b.id === parseInt(startId));
  const endBuilding = BUILDINGS.find((b) => b.id === parseInt(endId));

  return (
    <SidebarProvider
      defaultOpen={true}
      style={{ "--sidebar-width": "20rem" } as React.CSSProperties}
      className="h-full w-full overflow-hidden"
    >
      {/* ── Sidebar ──────────────────────────────────────────────────────────── */}
      <NavigatorSidebar
        buildings={BUILDINGS}
        startId={startId}
        endId={endId}
        onStartChange={setStartId}
        onEndChange={setEndId}
        routeInfo={routeInfo}
        startBuilding={startBuilding}
        endBuilding={endBuilding}
        navActive={navActive}
        onNavStart={() => setNavActive(true)}
        onClearRoute={clearRoute}
        onFlyTo={setFlyTarget}
      />

      {/* ── Map area ─────────────────────────────────────────────────────────── */}
      <SidebarInset className="relative h-full overflow-hidden p-0 min-h-0">
        <FloatingTrigger />

        <Map
          center={CAMPUS_CENTER}
          zoom={17}
          className="!rounded-none h-full w-full"
        >
          <MapInteractionBlocker onDrag={() => {}} />
          <FlyToBuilding building={flyTarget} />
          <MapResizer />
          <MapLayers
            defaultLayerGroups={["Buildings"]}
            defaultTileLayer="Satellite"
          >
            <MapTileLayer
              name="Satellite"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution="Tiles &copy; Esri"
            />
            <MapLayerGroup name="Buildings">
              {BUILDINGS.map((b) => (
                <MapMarker
                  key={b.id}
                  position={[b.lat, b.lng] as LatLngExpression}
                  icon={
                    <div
                      className="rounded-full border-2 border-white shadow-md"
                      style={{
                        width: 14,
                        height: 14,
                        backgroundColor: b.color,
                      }}
                    />
                  }
                  iconAnchor={[7, 7]}
                >
                  <MapPopup className="border-none bg-black bg-opacity-0 backdrop-blur text-white rounded-b-lg">
                    <BuildingPopup
                      b={b}
                      onSetStart={() => setStartId(String(b.id))}
                      onSetEnd={() => setEndId(String(b.id))}
                    />
                  </MapPopup>
                </MapMarker>
              ))}
            </MapLayerGroup>
          </MapLayers>

          {/* Route polylines */}
          {routePath && navActive && (
            <>
              {/* Outer glow layer */}
              <MapPolyline
                positions={routePath}
                pathOptions={{
                  color: "#4ade80",
                  weight: 18,
                  opacity: 0.18,
                  fill: false,
                  lineCap: "round",
                  lineJoin: "round",
                }}
              />
              {/* Mid glow layer */}
              <MapPolyline
                positions={routePath}
                pathOptions={{
                  color: "#22c55e",
                  weight: 12,
                  opacity: 0.35,
                  fill: false,
                  lineCap: "round",
                  lineJoin: "round",
                }}
              />
              {/* Core solid line — bolder when active */}
              <MapPolyline
                positions={routePath}
                className="fill-none"
                pathOptions={{
                  color: "#22c55e",
                  weight: 8,
                  opacity: 0.95,
                  fill: false,
                  lineCap: "round",
                  lineJoin: "round",
                }}
              />
            </>
          )}

          {routePath && !navActive && (
            <MapPolyline
              positions={routePath}
              className="fill-none"
              pathOptions={{
                color: "#3b82f6",
                weight: 5,
                opacity: 0.9,
                fill: false,
                dashArray: "12 8",
                lineCap: "round",
                lineJoin: "round",
              }}
            />
          )}

          {/* Animated dot — only shown while navigation is active */}
          {routePath && navActive && <AnimatedPathMarker path={routePath} />}

          {startBuilding && (
            <MapMarker
              position={[startBuilding.lat, startBuilding.lng]}
              icon={
                <div className="w-5 h-5 rounded-full bg-emerald-500 border-2 border-white shadow-lg" />
              }
              iconAnchor={[10, 10]}
            />
          )}

          {endBuilding && (
            <MapMarker
              position={[endBuilding.lat, endBuilding.lng]}
              icon={
                <div className="w-5 h-5 rounded-full bg-rose-500 border-2 border-white shadow-lg" />
              }
              iconAnchor={[10, 10]}
            />
          )}

          <div className="absolute right-3 bottom-16 z-[1000] flex flex-col gap-2">
            <MapLocateControl
              className="static"
              watch
              onLocationError={(e) => toast.error(e.message)}
            />
            <MapZoomControl className="static" />
          </div>
        </Map>
      </SidebarInset>
    </SidebarProvider>
  );
}
