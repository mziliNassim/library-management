import {
  User,
  BookOpen,
  Heart,
  Users,
  Book,
  List,
  Search,
  Clock,
  BookMarked,
} from "lucide-react";

export const navigation = [
  { name: "Books", path: "/discover/books", current: false },
  { name: "About us", path: "/libritech/about-us", current: false },
  { name: "Blog", path: "/libritech/blog", current: false },
  { name: "Contact", path: "/libritech/contact-us", current: false },
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
  "Swedish",
  "Greek",
];

export const features = [
  {
    icon: Search,
    title: "Advanced Search",
    description:
      "Find any book in seconds with our powerful search engine that indexes titles, authors, genres, and more.",
  },
  {
    icon: BookMarked,
    title: "Digital Collection",
    description:
      "Access thousands of e-books and audiobooks directly through our platform, available on any device.",
  },
  {
    icon: Users,
    title: "Reading Groups",
    description:
      "Join virtual or in-person reading groups to discuss and explore books with fellow enthusiasts.",
  },
  {
    icon: Clock,
    title: "Reading Tracking",
    description:
      "Monitor your reading progress, set goals, and receive personalized recommendations based on your history.",
  },
];

export const testimonials = [
  {
    id: 1,
    text: "LibriTech transformed how I manage my reading. The interface is intuitive and the recommendations are spot on!",
    name: "Amina naji",
    role: "Avid Reader",
    avatar: "/randusers/pers1.jpg",
  },
  {
    id: 2,
    text: "As a literature professor, I appreciate the extensive collection and the ease of tracking books for my courses.",
    name: "Dr. Ahmed Ibrahimi",
    role: "University Professor",
    avatar: "/randusers/pers2.jpg",
  },
  {
    id: 3,
    text: "The digital library features are exceptional. I can access my books from anywhere, anytime!",
    name: "Karima ahmadi",
    role: "Book Club Organizer",
    avatar: "/randusers/pers3.jpg",
  },
];

export const stats = [
  {
    icon: BookMarked,
    value: "25,000+",
    label: "Books in Collection",
  },
  { icon: Users, value: "12,000+", label: "Active Members" },
  { icon: Clock, value: "24/7", label: "Digital Access" },
  { icon: Search, value: "Instant", label: "Search Results" },
];

// Sample blog data
export const blogPosts = [
  {
    id: 1,
    title: "The Evolution of Digital Libraries",
    excerpt:
      "Explore how digital libraries have transformed over the decades and what the future holds for digital knowledge repositories.",
    author: "Emily Chen",
    date: "April 10, 2025",
    category: "Digital Libraries",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    featured: true,
  },
  {
    id: 2,
    title: "Best Practices for Organizing Your Digital Book Collection",
    excerpt:
      "Learn effective strategies to organize and categorize your growing collection of e-books and digital publications.",
    author: "Michael Rodriguez",
    date: "April 5, 2025",
    category: "Organization",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 3,
    title: "The Impact of AI on Modern Reading Habits",
    excerpt:
      "Discover how artificial intelligence is changing the way we discover, consume, and interact with written content.",
    author: "Sarah Johnson",
    date: "March 28, 2025",
    category: "Technology",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 4,
    title: "From Paper to Pixels: The History of E-Books",
    excerpt:
      "A comprehensive look at the journey of books from traditional paper formats to modern digital experiences.",
    author: "David Wilson",
    date: "March 20, 2025",
    category: "History",
    readTime: "10 min read",
    image:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 5,
    title: "Creating Effective Reading Habits in the Digital Age",
    excerpt:
      "Tips and strategies to establish consistent reading routines when surrounded by digital distractions.",
    author: "Olivia Martinez",
    date: "March 15, 2025",
    category: "Reading Habits",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 6,
    title: "The Rise of Audiobooks and Their Place in Modern Libraries",
    excerpt:
      "An analysis of how audiobooks have evolved and their growing importance in digital library collections.",
    author: "James Thompson",
    date: "March 8, 2025",
    category: "Audiobooks",
    readTime: "9 min read",
    image:
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
];
