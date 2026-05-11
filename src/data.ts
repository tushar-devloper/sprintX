import imgAlphafly from './assets/images/regenerated_image_1778482108880.png';
import imgAdios from './assets/images/regenerated_image_1778482113872.webp';
import imgScElite from './assets/images/regenerated_image_1778482112137.jpg';
import imgNitro from './assets/images/regenerated_image_1778482110649.avif';

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  features: string[];
  reviews: Review[];
}

export const products: Product[] = [
  {
    id: "nike-alphafly-2",
    name: "Air Zoom Alphafly Next% 2 Mint Foam",
    brand: "Nike",
    price: 2800,
    image: imgAlphafly,
    description: "Once you take a few strides in the Nike Air Zoom Alphafly NEXT% 2, you'll never look at your favorite pair of old racing shoes the same way again. These rocket ships are made to help shave precious time off your personal records without surrendering the foundation you need to go the full distance.",
    features: ["ZoomX Foam", "Dual Zoom Air units", "Full-length carbon fiber plate", "AtomKnit 2.0 upper"],
    reviews: [
      { id: "r1", author: "Alex R.", rating: 5, text: "Unbelievable bounce and energy return. Set my PB in these!", date: "2024-03-12" },
      { id: "r2", author: "Sarah M.", rating: 4, text: "Great for marathons, a bit tight on the midfoot initially.", date: "2024-02-28" }
    ]
  },
  {
    id: "adidas-adios-pro-4",
    name: "adizero adios Pro 4",
    brand: "adidas",
    price: 2100,
    image: imgAdios,
    description: "The Adizero Adios Pro 4 is built for runners looking to win. Experience the next level of speed and efficiency designed to break records. Tuned carbon-infused ENERGYRODS provide lightweight stiffness for a snappy, efficient stride.",
    features: ["Lightstrike Pro cushioning", "ENERGYRODS 2.0", "Continentalâ¢ Rubber outsole", "Breathable mesh upper"],
    reviews: [
      { id: "r3", author: "James T.", rating: 5, text: "The carbon rods make a huge difference. Very fast and light.", date: "2024-04-05" },
      { id: "r4", author: "Elena P.", rating: 5, text: "Perfect race day shoe. The Continental grip is fantastic even in the rain.", date: "2024-01-15" }
    ]
  },
  {
    id: "nb-sc-elite",
    name: "SC Elite",
    brand: "New Balance",
    price: 2500,
    originalPrice: 2500,
    image: imgScElite,
    description: "The FuelCell SuperComp Elite is designed with a dual focus on energy return and lighter weight. Featuring the dynamic energy return of the Energy Arc system, this is a race day shoe designed for your fastest times.",
    features: ["FuelCell midsole foam", "Energy Arc technology", "Engineered knit upper", "Carbon fiber plate"],
    reviews: [
      { id: "r5", author: "David L.", rating: 4, text: "Incredibly plush ride but still responsive. Great for half marathons.", date: "2024-03-22" },
      { id: "r6", author: "Kim C.", rating: 4, text: "Love the upper fit. True to size.", date: "2024-02-10" }
    ]
  },
  {
    id: "puma-nitro-elite-3",
    name: "Nitro Elite 3",
    brand: "Puma",
    price: 2600,
    image: imgNitro,
    description: "The Fast-R NITROâ¢ Elite 3 is PUMA's most innovative marathon racing shoe yet. A two-part midsole and exposed PWRPLATE maximize running efficiency and stability.",
    features: ["NITROâ¢ Elite foam", "PWRPLATE carbon plate", "PUMAGRIP outsole", "Ultra-light mono-mesh"],
    reviews: [
      { id: "r7", author: "Mark D.", rating: 5, text: "Super aggressive geometry, really pushes you onto your toes.", date: "2024-04-12" },
      { id: "r8", author: "Sophie W.", rating: 3, text: "Fast but definitely takes some getting used to due to the decoupled heel.", date: "2024-03-01" }
    ]
  }
];
