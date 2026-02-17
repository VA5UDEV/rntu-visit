"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Map,
  MapLayerGroup,
  MapLayers,
  MapLocateControl,
  MapMarker,
  MapMarkerClusterGroup,
  MapPopup,
  MapTileLayer,
  MapZoomControl,
  MapPolyline,
} from "@/components/ui/map";
import type { LatLngExpression } from "leaflet";
import { useMap, useMapEvents } from "react-leaflet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Navigation,
  Search,
  X,
  MapPin,
  Route,
  Clock,
  Ruler,
  Menu,
  ArrowDown,
  Locate,
  CheckCircle2,
  Building2,
  Footprints,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// ─── Building Data ────────────────────────────────────────────────────────────
const BUILDINGS = [
  {
    id: 21,
    name: "Gate 1",
    lat: 23.13532841376455,
    lng: 77.56212472915651,
    type: "entrance",
    color: "#10b981",
  },
  {
    id: 22,
    name: "Gate 2",
    lat: 23.135057098030337,
    lng: 77.56386816501619,
    type: "entrance",
    color: "#10b981",
  },
  {
    id: 23,
    name: "Gate 3",
    lat: 23.13519522247272,
    lng: 77.56522536277772,
    type: "entrance",
    color: "#10b981",
  },
  {
    id: 7,
    name: "Football Ground",
    lat: 23.134677255080238,
    lng: 77.56299376487733,
    type: "sports",
    color: "#06b6d4",
  },
  {
    id: 1,
    name: "Parking",
    lat: 23.134771284022804,
    lng: 77.56406772343689,
    type: "parking",
    color: "#64748b",
  },
  {
    id: 2,
    name: "Boys Hostel",
    lat: 23.13472658539429,
    lng: 77.56549358367921,
    type: "hostel",
    color: "#ef4444",
  },
  {
    id: 6,
    name: "Admission Cell",
    lat: 23.13442073715466,
    lng: 77.56287038326265,
    type: "admin",
    color: "#3b82f6",
  },
  {
    id: 3,
    name: "Admin",
    lat: 23.134341808463454,
    lng: 77.56435096263887,
    type: "admin",
    color: "#3b82f6",
  },
  {
    id: 8,
    name: "Engineering",
    lat: 23.134213549241174,
    lng: 77.56364822387695,
    type: "academic",
    color: "#f59e0b",
  },
  {
    id: 4,
    name: "AIC",
    lat: 23.133892900648796,
    lng: 77.56479620933534,
    type: "facility",
    color: "#06b6d4",
  },
  {
    id: 9,
    name: "Paramedical",
    lat: 23.13375970793121,
    lng: 77.5628435611725,
    type: "facility",
    color: "#14b8a6",
  },
  {
    id: 5,
    name: "Management",
    lat: 23.133517987476225,
    lng: 77.56428122520448,
    type: "admin",
    color: "#3b82f6",
  },
  {
    id: 10,
    name: "Workshops",
    lat: 23.13339959362504,
    lng: 77.56248950958253,
    type: "facility",
    color: "#8b5cf6",
  },
  {
    id: 18,
    name: "Audi & Law",
    lat: 23.1332318688236,
    lng: 77.56495714187623,
    type: "facility",
    color: "#8b5cf6",
  },
  {
    id: 19,
    name: "DSW",
    lat: 23.133049344536634,
    lng: 77.5637072324753,
    type: "facility",
    color: "#06b6d4",
  },
  {
    id: 11,
    name: "Canteen",
    lat: 23.133088809268383,
    lng: 77.56309032440187,
    type: "facility",
    color: "#14b8a6",
  },
  {
    id: 17,
    name: "Library",
    lat: 23.132452439052877,
    lng: 77.56477475166322,
    type: "library",
    color: "#8b5cf6",
  },
  {
    id: 20,
    name: "Basketball Court",
    lat: 23.132176184376007,
    lng: 77.56421148777008,
    type: "sports",
    color: "#06b6d4",
  },
  {
    id: 15,
    name: "Science",
    lat: 23.1319837923899,
    lng: 77.56494641304018,
    type: "academic",
    color: "#f59e0b",
  },
  {
    id: 14,
    name: "Agriculture",
    lat: 23.131717403030457,
    lng: 77.56455481052399,
    type: "academic",
    color: "#f59e0b",
  },
  {
    id: 16,
    name: "Pharmacy",
    lat: 23.13167793789516,
    lng: 77.56489276885988,
    type: "academic",
    color: "#f59e0b",
  },
  {
    id: 12,
    name: "Main Ground",
    lat: 23.13171246988917,
    lng: 77.56310105323793,
    type: "sports",
    color: "#06b6d4",
  },
  {
    id: 13,
    name: "TNSD",
    lat: 23.131194489045473,
    lng: 77.56257534027101,
    type: "academic",
    color: "#f59e0b",
  },
  {
    id: 24,
    name: "Girls Hostel",
    lat: 23.134105,
    lng: 77.56546,
    type: "hostel",
    color: "#ec4899",
  },
  {
    id: 25,
    name: "Food Processing Unit",
    lat: 23.131629,
    lng: 77.564082,
    type: "facility",
    color: "#14b8a6",
  },
];

const CAMPUS_CENTER: LatLngExpression = [23.1333, 77.5639];

// ─── Path Data ────────────────────────────────────────────────────────────────
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
      ) {
        matchIndex = i;
      } else break;
    }
    const part1 = g2s.slice(matchIndex > -1 ? matchIndex : 0).reverse();
    const part2 = g2e.slice(matchIndex > -1 ? matchIndex + 1 : 0);
    return [...part1, ...part2];
  }
  return null;
}

function haversineMeters(p1: Pt, p2: Pt): number {
  const R = 6371e3;
  const φ1 = (p1.latitude * Math.PI) / 180;
  const φ2 = (p2.latitude * Math.PI) / 180;
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
    const ba = BUILDINGS.find((x) => x.id === a)!;
    const bb = BUILDINGS.find((x) => x.id === b)!;
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
    const ba = BUILDINGS.find((x) => x.id === a)!;
    const bb = BUILDINGS.find((x) => x.id === b)!;
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

function MapInteractionBlocker({ onDrag }: { onDrag: () => void }) {
  useMapEvents({ dragstart: onDrag, zoomstart: onDrag });
  return null;
}

function FlyToBuilding({
  building,
}: {
  building: (typeof BUILDINGS)[0] | null;
}) {
  const map = useMap();
  useEffect(() => {
    if (building)
      map.flyTo([building.lat, building.lng], 18, { duration: 1.2 });
  }, [building, map]);
  return null;
}

// ─── Type config ──────────────────────────────────────────────────────────────
const TYPE_CONFIG: Record<string, { badge: string; label: string }> = {
  entrance: {
    badge:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
    label: "Entrance",
  },
  academic: {
    badge:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 border-amber-200 dark:border-amber-800",
    label: "Academic",
  },
  admin: {
    badge:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400 border-blue-200 dark:border-blue-800",
    label: "Admin",
  },
  hostel: {
    badge:
      "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400 border-rose-200 dark:border-rose-800",
    label: "Hostel",
  },
  sports: {
    badge:
      "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800",
    label: "Sports",
  },
  facility: {
    badge:
      "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-400 border-violet-200 dark:border-violet-800",
    label: "Facility",
  },
  library: {
    badge:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400 border-purple-200 dark:border-purple-800",
    label: "Library",
  },
  parking: {
    badge:
      "bg-slate-100 text-slate-600 dark:bg-slate-800/60 dark:text-slate-400 border-slate-200 dark:border-slate-700",
    label: "Parking",
  },
};

// ─── Section heading ──────────────────────────────────────────────────────────
function SectionLabel({
  icon: Icon,
  children,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="flex items-center justify-center w-5 h-5 rounded bg-muted">
        <Icon className="h-3 w-3 text-muted-foreground" />
      </div>
      <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        {children}
      </span>
    </div>
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
  const [search, setSearch] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [navActive, setNavActive] = useState(false);
  const [flyTarget, setFlyTarget] = useState<(typeof BUILDINGS)[0] | null>(
    null,
  );

  const filtered = BUILDINGS.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    const s = parseInt(startId);
    const e = parseInt(endId);
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
        const ba = BUILDINGS.find((x) => x.id === a)!;
        const bb = BUILDINGS.find((x) => x.id === b)!;
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

  // ─── Navigation Panel ──────────────────────────────────────────────────────
  const NavPanel = (
    <TooltipProvider delayDuration={300}>
      <div className="flex flex-col gap-5 p-4">
        {/* ── Search ── */}
        <div>
          <SectionLabel icon={Search}>Search</SectionLabel>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            <Input
              className="pl-9 pr-9 h-9 text-sm bg-muted/40 border-muted-foreground/20 focus-visible:ring-1 focus-visible:ring-primary/40 placeholder:text-muted-foreground/60"
              placeholder="Search buildings…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {search && (
            <div className="mt-2 rounded-lg border bg-background shadow-sm overflow-hidden">
              <ScrollArea className="max-h-44">
                {filtered.length === 0 ? (
                  <div className="py-6 text-center">
                    <Building2 className="h-6 w-6 mx-auto mb-1.5 text-muted-foreground/40" />
                    <p className="text-xs text-muted-foreground">
                      No results found
                    </p>
                  </div>
                ) : (
                  filtered.map((b, i) => (
                    <button
                      key={b.id}
                      className={cn(
                        "w-full text-left px-3 py-2.5 flex items-center gap-2.5 text-sm hover:bg-accent transition-colors",
                        i !== filtered.length - 1 &&
                          "border-b border-border/50",
                      )}
                      onClick={() => {
                        setFlyTarget(b);
                        setSearch("");
                      }}
                    >
                      <span
                        className="h-2 w-2 rounded-full flex-shrink-0 ring-2 ring-white dark:ring-background"
                        style={{ backgroundColor: b.color }}
                      />
                      <span className="font-medium flex-1 truncate">
                        {b.name}
                      </span>
                      <ChevronRight className="h-3 w-3 text-muted-foreground/50 flex-shrink-0" />
                    </button>
                  ))
                )}
              </ScrollArea>
            </div>
          )}
        </div>

        <Separator className="opacity-50" />

        {/* ── Route Planner ── */}
        <div>
          <SectionLabel icon={Route}>Route Planner</SectionLabel>

          <div className="space-y-1.5">
            {/* Start */}
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-center gap-0.5 flex-shrink-0 w-5">
                <div className="h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-emerald-200 dark:ring-emerald-900" />
                <div className="h-6 w-px bg-border" />
              </div>
              <Select value={startId} onValueChange={setStartId}>
                <SelectTrigger className="h-9 text-sm flex-1 bg-muted/30 border-muted-foreground/20">
                  <SelectValue placeholder="Choose start…" />
                </SelectTrigger>
                <SelectContent
                  className="z-[2000]"
                  position="popper"
                  sideOffset={4}
                >
                  {BUILDINGS.map((b) => (
                    <SelectItem key={b.id} value={String(b.id)}>
                      <div className="flex items-center gap-2">
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: b.color }}
                        />
                        {b.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Destination */}
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-center flex-shrink-0 w-5">
                <div className="h-2 w-2 rounded-full bg-rose-500 ring-2 ring-rose-200 dark:ring-rose-900" />
              </div>
              <Select value={endId} onValueChange={setEndId}>
                <SelectTrigger className="h-9 text-sm flex-1 bg-muted/30 border-muted-foreground/20">
                  <SelectValue placeholder="Choose destination…" />
                </SelectTrigger>
                <SelectContent
                  className="z-[2000]"
                  position="popper"
                  sideOffset={4}
                >
                  {BUILDINGS.map((b) => (
                    <SelectItem
                      key={b.id}
                      value={String(b.id)}
                      disabled={b.id === parseInt(startId)}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: b.color }}
                        />
                        {b.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* ── Route Info Card ── */}
        {routeInfo && startBuilding && endBuilding && (
          <div className="rounded-xl border border-emerald-200/70 dark:border-emerald-800/50 bg-gradient-to-b from-emerald-50/80 to-emerald-50/20 dark:from-emerald-950/30 dark:to-transparent overflow-hidden">
            {/* Header */}
            <div className="px-3.5 pt-3 pb-2 flex items-center gap-2 border-b border-emerald-100 dark:border-emerald-900/50">
              <div className="flex items-center justify-center h-5 w-5 rounded-full bg-emerald-500">
                <CheckCircle2 className="h-3 w-3 text-white" />
              </div>
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                Route Found
              </span>
            </div>

            {/* Journey summary */}
            <div className="px-3.5 py-3 space-y-0.5">
              <div className="flex items-start gap-2">
                <div className="mt-0.5 h-2 w-2 rounded-full bg-emerald-500 flex-shrink-0" />
                <p className="text-xs font-medium leading-snug truncate">
                  {startBuilding.name}
                </p>
              </div>
              <div className="ml-[3px] h-4 w-px border-l-2 border-dashed border-muted-foreground/30 ml-[4px]" />
              <div className="flex items-start gap-2">
                <div className="mt-0.5 h-2 w-2 rounded-full bg-rose-500 flex-shrink-0" />
                <p className="text-xs font-medium leading-snug truncate">
                  {endBuilding.name}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2 px-3.5 pb-3">
              <div className="rounded-lg bg-white/70 dark:bg-background/50 border border-border/60 px-3 py-2 text-center">
                <div className="flex items-center justify-center gap-1 mb-0.5">
                  <Ruler className="h-3 w-3 text-muted-foreground" />
                  <span className="text-base font-bold tabular-nums">
                    {routeInfo.distance}
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">
                  Meters
                </p>
              </div>
              <div className="rounded-lg bg-white/70 dark:bg-background/50 border border-border/60 px-3 py-2 text-center">
                <div className="flex items-center justify-center gap-1 mb-0.5">
                  <Footprints className="h-3 w-3 text-muted-foreground" />
                  <span className="text-base font-bold tabular-nums">
                    {routeInfo.time}
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">
                  Min walk
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 px-3.5 pb-3.5">
              {!navActive ? (
                <Button
                  size="sm"
                  className="flex-1 h-8 text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                  onClick={() => {
                    setNavActive(true);
                    setSheetOpen(false);
                  }}
                >
                  <Navigation className="h-3.5 w-3.5 mr-1.5" />
                  Start Navigation
                </Button>
              ) : (
                <div className="flex-1 rounded-md bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 text-xs font-semibold h-8 flex items-center justify-center gap-1.5">
                  <Navigation className="h-3.5 w-3.5" />
                  Navigation Active
                </div>
              )}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 w-8 p-0 flex-shrink-0"
                    onClick={clearRoute}
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" className="text-xs">
                  Clear route
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        )}

        {startId && endId && !routeInfo && (
          <div className="rounded-lg border border-dashed border-muted-foreground/30 py-4 text-center">
            <MapPin className="h-5 w-5 mx-auto mb-1.5 text-muted-foreground/40" />
            <p className="text-xs text-muted-foreground">
              No route found between these locations
            </p>
          </div>
        )}

        <Separator className="opacity-50" />

        {/* ── All Locations ── */}
        <div>
          <SectionLabel icon={Building2}>All Locations</SectionLabel>
          <ScrollArea className="h-64">
            <div className="space-y-0.5 pr-2">
              {BUILDINGS.map((b) => {
                const cfg = TYPE_CONFIG[b.type];
                return (
                  <button
                    key={b.id}
                    className="w-full text-left rounded-lg px-2.5 py-2 text-sm hover:bg-accent transition-colors flex items-center gap-2.5 group"
                    onClick={() => {
                      setFlyTarget(b);
                      setSheetOpen(false);
                    }}
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full flex-shrink-0 transition-transform group-hover:scale-125"
                      style={{ backgroundColor: b.color }}
                    />
                    <span className="flex-1 truncate font-medium text-[13px]">
                      {b.name}
                    </span>
                    <Badge
                      variant="outline"
                      className={cn(
                        "ml-auto text-[9px] px-1.5 py-0 h-4 font-medium capitalize flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity",
                        cfg?.badge,
                      )}
                    >
                      {cfg?.label ?? b.type}
                    </Badge>
                  </button>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      </div>
    </TooltipProvider>
  );

  return (
    <div className="relative w-full h-full">
      {/* Mobile sheet trigger */}
      <div className="absolute top-13 right-3 z-[1001] md:hidden">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="secondary"
              className="shadow-md border h-9 w-9"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-0 flex flex-col">
            <SheetHeader className="px-4 py-3 border-b flex-shrink-0">
              <SheetTitle className="flex items-center gap-2 text-sm font-semibold">
                <div className="flex items-center justify-center h-6 w-6 rounded-md bg-primary/10">
                  <Navigation className="h-3.5 w-3.5 text-primary" />
                </div>
                Campus Navigator
              </SheetTitle>
            </SheetHeader>
            <div className="flex-1 min-h-0 overflow-y-auto">{NavPanel}</div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop sidebar */}
      <div className="absolute top-0 left-0 h-full w-80 z-[1000] hidden md:flex flex-col bg-background/97 backdrop-blur-sm border-r shadow-sm">
        {/* Sidebar header */}
        <div className="px-4 py-3.5 border-b flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center h-7 w-7 rounded-lg bg-primary/10 flex-shrink-0">
              <Navigation className="h-3.5 w-3.5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-sm leading-none">
                Campus Navigator
              </h2>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                {BUILDINGS.length} locations mapped
              </p>
            </div>
            {navActive && (
              <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 text-[10px] font-semibold px-1.5">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse" />
                Live
              </Badge>
            )}
          </div>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto">{NavPanel}</div>
      </div>

      {/* Map */}
      <div className="w-full h-full md:pl-80">
        <Map center={CAMPUS_CENTER} zoom={17} className="!rounded-none">
          <MapInteractionBlocker onDrag={() => {}} />
          <FlyToBuilding building={flyTarget} />

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
                      className="rounded-full border-2 border-white shadow-md flex items-center justify-center"
                      style={{
                        width: 22,
                        height: 22,
                        backgroundColor: b.color,
                      }}
                    />
                  }
                  iconAnchor={[11, 11]}
                  eventHandlers={{
                    click: () => {
                      setFlyTarget(b);
                      if (!startId) setStartId(String(b.id));
                      else if (!endId && String(b.id) !== startId)
                        setEndId(String(b.id));
                    },
                  }}
                >
                  <MapPopup>
                    <div className="p-2.5 min-w-[160px]">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span
                          className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: b.color }}
                        />
                        <p className="font-semibold text-sm leading-tight">
                          {b.name}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-[10px] capitalize mb-2.5",
                          TYPE_CONFIG[b.type]?.badge,
                        )}
                      >
                        {TYPE_CONFIG[b.type]?.label ?? b.type}
                      </Badge>
                      <div className="flex gap-1.5">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-[11px] px-2 flex-1 border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                          onClick={() => setStartId(String(b.id))}
                        >
                          Set Start
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-[11px] px-2 flex-1 border-rose-200 text-rose-600 hover:bg-rose-50"
                          onClick={() => setEndId(String(b.id))}
                        >
                          Set End
                        </Button>
                      </div>
                    </div>
                  </MapPopup>
                </MapMarker>
              ))}
            </MapLayerGroup>
          </MapLayers>

          {routePath && (
            <MapPolyline
              positions={routePath}
              className="fill-none"
              pathOptions={{
                color: navActive ? "#22c55e" : "#3b82f6",
                weight: navActive ? 7 : 5,
                opacity: 0.9,
                fill: false,
                dashArray: navActive ? undefined : "12 8",
                dashOffset: "0",
                lineCap: "round",
                lineJoin: "round",
              }}
            />
          )}

          {startBuilding && (
            <MapMarker
              position={[startBuilding.lat, startBuilding.lng]}
              icon={
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500 border-2 border-white shadow-lg">
                  <Locate className="h-4 w-4 text-white" />
                </div>
              }
              iconAnchor={[16, 16]}
            />
          )}

          {endBuilding && (
            <MapMarker
              position={[endBuilding.lat, endBuilding.lng]}
              icon={
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-500 border-2 border-white shadow-lg">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
              }
              iconAnchor={[16, 16]}
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
      </div>
    </div>
  );
}
