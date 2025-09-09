import {
    ChevronLeft,
    ChevronRight,
    Star,
    Heart,
    ShoppingCart,
    Play,
    Sparkles,
    Gift,
    Users,
    Zap
} from 'lucide-react';

export const slides = [
    {
        id: 1,
        title: "Magical Learning Adventures",
        subtitle: "Educational Toys That Spark Creativity",
        description: "Discover toys that make learning fun and engaging for every curious mind",
        cta: "Explore Learning Toys",
        bgGradient: "from-purple-400 via-pink-400 to-orange-400",
        accentColor: "text-purple-600",
        buttonColor: "from-purple-500 to-pink-500",
        icon: Star,
        features: ["Ages 3-12", "STEM Focused", "Award Winning"],
        discount: "25% OFF",
        image: "/image.png" // Using emoji as placeholder for toy image
    },
    {
        id: 2,
        title: "Action-Packed Adventures",
        subtitle: "Heroes & Villains Collection",
        description: "Unleash imagination with our premium action figures and playsets",
        cta: "Shop Action Figures",
        bgGradient: "from-blue-400 via-cyan-400 to-teal-400",
        accentColor: "text-blue-600",
        buttonColor: "from-blue-500 to-cyan-500",
        icon: Zap,
        features: ["Collectible", "High Quality", "Licensed"],
        discount: "Buy 2 Get 1",
        image: "/image.png"
    },
    {
        id: 3,
        title: "Creative Arts & Crafts",
        subtitle: "Express Your Inner Artist",
        description: "Premium art supplies and craft kits for endless creative possibilities",
        cta: "Get Creative Now",
        bgGradient: "from-green-400 via-emerald-400 to-cyan-400",
        accentColor: "text-green-600",
        buttonColor: "from-green-500 to-emerald-500",
        icon: Heart,
        features: ["Safe Materials", "Mess-Free", "Skill Building"],
        discount: "Free Shipping",
        image: "/image.png"
    },
    {
        id: 4,
        title: "Holiday Gift Collection",
        subtitle: "Make This Season Magical",
        description: "Curated gift sets perfect for birthdays, holidays, and special moments",
        cta: "Shop Gift Sets",
        bgGradient: "from-red-400 via-pink-400 to-purple-400",
        accentColor: "text-red-600",
        buttonColor: "from-red-500 to-pink-500",
        icon: Gift,
        features: ["Gift Wrapped", "Fast Delivery", "Return Policy"],
        discount: "Limited Time",
        image: "/image.png"
    }
];

