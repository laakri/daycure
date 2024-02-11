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
import { IoIosHappy } from "react-icons/io";
import { MdEmojiTransportation } from "react-icons/md";
import { MdHealthAndSafety } from "react-icons/md";
import { LuUtilityPole } from "react-icons/lu";

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
const EntertainmentIcon = IoIosHappy;
const TransportationIcon = MdEmojiTransportation;
const HealthcareIcon = MdHealthAndSafety;
const UtilitiesIcon = LuUtilityPole;

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
  Shopping: ShoppingBagIcon,
  Coffee: CoffeeIcon,
  Entertainment: EntertainmentIcon,
  Transportation: TransportationIcon,
  Healthcare: HealthcareIcon,
  Utilities: UtilitiesIcon,
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
  "Coffee",
  "Transportation",
  "Entertainment",
  "Utilities",
  "Shopping",
  "Healthcare",
];
