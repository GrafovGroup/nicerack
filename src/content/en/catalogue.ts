import productData from './products.json';
import {productSchema,type CatalogueProduct} from '@/lib/product-schema';
export type Category = { id: string; slug: string; name: string; short: string; description: string; applications: string[]; questions: string[]; icon: string };
export const categories: Category[] = [
 {id:'industrial',slug:'warehouse-industrial',name:'Warehouse & Industrial',short:'Make room for more.',description:'Plan storage around your operation, from pallet handling and long materials to everyday picking. Explore racking layouts that work with your stock, equipment and available space.',applications:['Pallet racking','Cantilever racks','Industrial shelving','Rack protection'],questions:['What are you storing, and how is it handled?','What floor area, clear height and access aisles are available?','Do you have drawings or existing rack documentation?'],icon:'warehouse'},
 {id:'automotive',slug:'automotive-fleet',name:'Automotive & Fleet',short:'Carry more. Go further.',description:'Put your vehicle to work with roof, ladder, truck and cargo rack options. Start with your vehicle details and the equipment you need to carry so compatibility can be assessed.',applications:['Ladder racks','Roof racks','Truck racks','Bike carriers'],questions:['What is the vehicle make, model and year?','Which roof, bed or mounting system does it have?','What equipment will you carry?'],icon:'truck'},
 {id:'garage',slug:'garage-home',name:'Garage & Home',short:'Take back your space.',description:'Give tools, seasonal equipment and bicycles a place of their own. Explore wall, overhead and freestanding storage that makes your garage easier to use.',applications:['Wall storage','Overhead racks','Tool storage','Bicycle storage'],questions:['What are the room dimensions and ceiling height?','What wall and ceiling construction is present?','Which items need frequent access?'],icon:'home'},
 {id:'retail',slug:'retail-display',name:'Retail & Display',short:'Give your products the spotlight.',description:'Build a display around your merchandise and the way customers shop. Consider garment rails, mobile displays and shelving for permanent stores or changing layouts.',applications:['Garment racks','Merchandising displays','Rolling racks','Display shelving'],questions:['What merchandise will be displayed?','Does the layout need to move or change?','Which finishes suit the space?'],icon:'store'},
 {id:'fitness',slug:'fitness-sports',name:'Fitness & Sports',short:'A stronger setup.',description:'Organize training spaces with power racks, weight storage and sports equipment racks. Match the layout to your equipment, available clearance and intended use.',applications:['Power racks','Squat racks','Weight storage','Sports storage'],questions:['Is this a home, commercial or institutional space?','What equipment needs to fit the rack?','What floor space and overhead clearance are available?'],icon:'fitness'},
 {id:'hospitality',slug:'restaurant-hospitality',name:'Restaurant & Hospitality',short:'Keep service moving.',description:'Bring order to busy back-of-house areas with shelving, dish storage and drying racks. Specify the environment, cleaning requirements and available space when requesting options.',applications:['Kitchen shelving','Dish racks','Drying racks','Luggage racks'],questions:['Will the rack be used in a wet or dry environment?','What items and containers need to fit?','Are specific material or sanitation requirements applicable?'],icon:'hospitality'},
 {id:'technology',slug:'it-technology',name:'IT & Technology',short:'Structure for your systems.',description:'Plan equipment storage with server cabinets, network racks and wall enclosures. Share equipment sizes, ventilation needs and cable access requirements to narrow the configuration.',applications:['Server cabinets','Network racks','Wall enclosures','Cable management'],questions:['What equipment depth and rack units are needed?','What ventilation and cable access are required?','Is wall mounting or floor standing preferred?'],icon:'server'},
 {id:'events',slug:'events-rentals',name:'Events & Rentals',short:'Ready for a change of scene.',description:'Explore portable garment, coat and display racks for events and temporary spaces. Rental options depend on the event dates, quantity, location and local availability.',applications:['Coat racks','Portable garment racks','Event displays','Temporary storage'],questions:['What are the event dates and location?','How many racks or garments are involved?','Is delivery, setup or collection required?'],icon:'events'},
];
export const subcategories = [
 {id:"technology-rack-accessories",categoryId:"technology",name:"Rack accessories"},
{"id": "automotive-bicycle-carriers", "categoryId": "automotive", "name": "Bicycle carriers"},{"id": "garage-workshop-storage", "categoryId": "garage", "name": "Workshop storage"},{"id": "garage-household-storage", "categoryId": "garage", "name": "Household storage"},{"id": "retail-backroom-storage", "categoryId": "retail", "name": "Backroom storage"},{"id": "hospitality-bakery-storage", "categoryId": "hospitality", "name": "Bakery storage and display"},{"id": "hospitality-beverage-storage", "categoryId": "hospitality", "name": "Beverage storage"},{"id": "hospitality-housekeeping-storage", "categoryId": "hospitality", "name": "Housekeeping storage"},{"id": "technology-av-racks", "categoryId": "technology", "name": "Audiovisual racks"},{"id": "technology-specialist-racks", "categoryId": "technology", "name": "Specialist equipment racks"},{"id": "events-event-storage", "categoryId": "events", "name": "Event equipment storage"},
  {
    "id": "industrial-pallet-storage",
    "categoryId": "industrial",
    "name": "Pallet storage"
  },
  {
    "id": "industrial-long-materials",
    "categoryId": "industrial",
    "name": "Long materials"
  },
  {
    "id": "industrial-shelving",
    "categoryId": "industrial",
    "name": "Shelving"
  },
  {
    "id": "automotive-ladder-transport",
    "categoryId": "automotive",
    "name": "Ladder transport"
  },
  {
    "id": "automotive-roof-storage",
    "categoryId": "automotive",
    "name": "Roof storage"
  },
  {
    "id": "automotive-truck-storage",
    "categoryId": "automotive",
    "name": "Truck storage"
  },
  {
    "id": "garage-wall-storage",
    "categoryId": "garage",
    "name": "Wall storage"
  },
  {
    "id": "garage-ceiling-storage",
    "categoryId": "garage",
    "name": "Ceiling storage"
  },
  {
    "id": "garage-bicycle-storage",
    "categoryId": "garage",
    "name": "Bicycle storage"
  },
  {
    "id": "retail-garment-display",
    "categoryId": "retail",
    "name": "Garment display"
  },
  {
    "id": "retail-shelf-displays",
    "categoryId": "retail",
    "name": "Shelf displays"
  },
  {
    "id": "retail-portable-displays",
    "categoryId": "retail",
    "name": "Portable displays"
  },
  {
    "id": "fitness-training-racks",
    "categoryId": "fitness",
    "name": "Training racks"
  },
  {
    "id": "fitness-weight-storage",
    "categoryId": "fitness",
    "name": "Weight storage"
  },
  {
    "id": "fitness-sports-storage",
    "categoryId": "fitness",
    "name": "Sports storage"
  },
  {
    "id": "hospitality-kitchen-storage",
    "categoryId": "hospitality",
    "name": "Kitchen storage"
  },
  {
    "id": "hospitality-dish-storage",
    "categoryId": "hospitality",
    "name": "Dish storage"
  },
  {
    "id": "hospitality-luggage-storage",
    "categoryId": "hospitality",
    "name": "Luggage storage"
  },
  {
    "id": "technology-enclosed-racks",
    "categoryId": "technology",
    "name": "Enclosed racks"
  },
  {
    "id": "technology-open-racks",
    "categoryId": "technology",
    "name": "Open racks"
  },
  {
    "id": "technology-wall-enclosures",
    "categoryId": "technology",
    "name": "Wall enclosures"
  },
  {
    "id": "events-coat-storage",
    "categoryId": "events",
    "name": "Coat storage"
  },
  {
    "id": "events-backstage-storage",
    "categoryId": "events",
    "name": "Backstage storage"
  },
  {
    "id": "events-event-displays",
    "categoryId": "events",
    "name": "Event displays"
  }
];
export type Product = CatalogueProduct & {summary:string};
const parsedProducts = productSchema.array().parse(productData);
export const products: Product[] = parsedProducts.filter(p=>p.published).map(p=>({...p,summary:p.shortDescription}));
export const provinces = ['Alberta','British Columbia','Manitoba','New Brunswick','Newfoundland and Labrador','Northwest Territories','Nova Scotia','Nunavut','Ontario','Prince Edward Island','Quebec','Saskatchewan','Yukon'] as const;
