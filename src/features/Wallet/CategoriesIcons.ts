import { IoFastFood } from "react-icons/io5";
import {
  BiBook,
  BiCar,
  BiHome,
  BiBriefcaseAlt,
  BiDrink,
  BiGift,
  BiHeart,
  BiHealth,
  BiMusic,
  BiShoppingBag,
} from "react-icons/bi";
import { FiCoffee } from "react-icons/fi";

const FoodIcon = IoFastFood;
const EducationIcon = BiBook;
const CarIcon = BiCar;
const HomeIcon = BiHome;
const BriefcaseIcon = BiBriefcaseAlt;
const DrinkIcon = BiDrink;
const GiftIcon = BiGift;
const HeartIcon = BiHeart;
const HealthIcon = BiHealth;
const MusicIcon = BiMusic;
const ShoppingBagIcon = BiShoppingBag;
const CoffeeIcon = FiCoffee;

export const initialCategoryIcons: Record<string, any> = {
  Food: FoodIcon,
  Education: EducationIcon,
  Car: CarIcon,
  Home: HomeIcon,
  Work: BriefcaseIcon,
  Drink: DrinkIcon,
  Gift: GiftIcon,
  Love: HeartIcon,
  Health: HealthIcon,
  Music: MusicIcon,
  ShoppingBag: ShoppingBagIcon,
  Coffee: CoffeeIcon,
};
export const listcategories = [
  "Food",
  "Education",
  "Car",
  "Home",
  "Work",
  "Drink",
  "Gift",
  "Love",
  "Health",
  "Music",
  "ShoppingBag",
  "Coffee",
];
