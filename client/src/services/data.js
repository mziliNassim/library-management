import { User, BookOpen, Heart, Users, Book, List } from "lucide-react";

export const navigation = [
  { name: "Books", path: "/discover/books", current: false },
  { name: "Bestsellers", path: "/bestsellers", current: false },
  { name: "Contact", path: "/LibriTech/contact", current: false },
];

export const team = [
  {
    name: "Abderrahim El Ouali",
    role: "CEO, Full-Stack Developer & Co-Founder",
    img: "abde.jpeg",
    socials: {
      github: "https://github.com/AbderrahimElOuali/",
      linkedin: "https://www.linkedin.com/in/abderrahim-el/",
      portfolio: "https://elouali.online/",
    },
  },
  {
    name: "Nassim MZILI",
    role: "CTO, Full-Stack Developer & Co-Founder",
    img: "nassim.jpg",
    socials: {
      github: "https://github.com/mzilinassim/",
      linkedin: "https://www.linkedin.com/in/mzilinassim/",
      portfolio: "https://nassim.online/",
    },
  },
];

export const clientNavItems = [
  {
    to: "/user/profile",
    icon: User,
    label: "Profile",
  },
  {
    to: "/user/emprunts",
    icon: BookOpen,
    label: "My Emprunts",
  },
  {
    to: "/user/books-wishlist",
    icon: Heart,
    label: "Books Wishlist",
  },
];

export const adminNavItems = [
  {
    to: "/admin/manage-clients",
    icon: Users,
    label: "Manage Clients",
  },
  {
    to: "/admin/manage-books",
    icon: Book,
    label: "Manage Books",
  },
  {
    to: "/admin/manage-categories",
    icon: List,
    label: "Manage Categories",
  },
];

export const languages = [
  "English",
  "French",
  "Spanish",
  "German",
  "Italian",
  "Portuguese",
  "Russian",
  "Chinese",
  "Japanese",
  "Arabic",
];
