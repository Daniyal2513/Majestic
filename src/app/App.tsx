import { useState, useEffect, useRef } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import logoSrc from "@/imports/WhatsApp_Image_2026-07-04_at_4.06.13_PM.jpeg";
import { ShoppingBag, Phone, MapPin, Instagram, Facebook, ChevronLeft, ChevronRight, X, Plus, Minus, Menu } from "lucide-react";

// ─── Brand tokens ────────────────────────────────────────────────────────────
const EMERALD = "#1E3A34";
const GOLD = "#D4AF37";
const PEARL = "#F8F5F0";

// ─── Menu data ───────────────────────────────────────────────────────────────
type MenuItem = { name: string; price: string; desc?: string };
type Category = { label: string; items: MenuItem[] };

const MENU: Category[] = [
  {
    label: "Winter Starters",
    items: [
      { name: "Chicken Corn Soup", price: "Rs. 350" },
      { name: "Hot N Sour Soup", price: "Rs. 400" },
      { name: "Majestic Special Soup", price: "Rs. 500" },
      { name: "Hotpot Bowl", price: "Rs. 850" },
      { name: "Fish N Chips", price: "Rs. 850" },
      { name: "Fish Biscuits", price: "Rs. 900" },
      { name: "Prawns Tempura", price: "Rs. 1200" },
      { name: "Dynamite Prawns", price: "Rs. 1250" },
    ],
  },
  {
    label: "Winter Main",
    items: [
      { name: "Golden Fried Fish", price: "Rs. 800" },
      { name: "Grilled BBQ Fish", price: "Rs. 900" },
      { name: "Fish Shashlik / Manchurian", price: "Rs. 1000" },
      { name: "Grilled Prawns", price: "Rs. 1000" },
      { name: "Prawns Karahi Half", price: "Rs. 1800" },
      { name: "Prawns Karahi Full", price: "Rs. 3600" },
      { name: "Prawns Shashlik", price: "Rs. 1100" },
      { name: "Prawns Chow Mien", price: "Rs. 900" },
      { name: "Fish Mandi", price: "Rs. 1500" },
      { name: "Prawns Biryani", price: "Rs. 1800" },
    ],
  },
  {
    label: "Burgers & Sandwiches",
    items: [
      { name: "French Onion Burger", price: "Rs. 650" },
      { name: "American Fish Burger", price: "Rs. 800" },
      { name: "American Club Sandwich", price: "Rs. 750" },
      { name: "Fish Zinger Burger", price: "Rs. 700" },
      { name: "Crispy Burger", price: "Rs. 750" },
      { name: "Grilled Burger", price: "Rs. 800" },
      { name: "Lava Burger", price: "Rs. 900" },
      { name: "Creamy Mushroom Burger", price: "Rs. 700" },
      { name: "Smoky BBQ Burger", price: "Rs. 700" },
      { name: "Mexican Burger", price: "Rs. 800" },
      { name: "Club Sandwich", price: "Rs. 800" },
      { name: "Grilled Chicken Sandwich", price: "Rs. 900" },
      { name: "Majestic Special Sandwich", price: "Rs. 1100" },
    ],
  },
  {
    label: "Sea Food Platters",
    items: [
      {
        name: "Sea Food Platter",
        price: "Rs. 4,000",
        desc: "Prawns Karahi Half, Grilled Prawns, Grilled Fish, Prawns Chow Mien, 2 Paratha",
      },
      {
        name: "Winter Platter (Without Crabs)",
        price: "Rs. 4,000",
        desc: "Grilled Prawns, Prawns Tempura, Grilled Fish, Fish Biscuits, 2 Boil Eggs, 6 Dumplings & Butter Rice",
      },
      {
        name: "Winter Platter (With Crabs)",
        price: "Rs. 5,000",
        desc: "Crabs, Grilled Prawns, Prawns Tempura, Grilled Fish, Fish Biscuits, 2 Boil Eggs, 6 Dumplings & Butter Rice",
      },
    ],
  },
  {
    label: "Mandi",
    items: [
      { name: "Chicken Mandi Half", price: "Rs. 1600" },
      { name: "Chicken Mandi Full", price: "Rs. 2400" },
      { name: "Chicken Madbee Half", price: "Rs. 1800" },
      { name: "Chicken Madbee Full", price: "Rs. 2600" },
    ],
  },
  {
    label: "Family Platters",
    items: [
      {
        name: "Family Platter",
        price: "Rs. 6,000",
        desc: "Full Tandoori Chicken, Chicken Shashlik Boti, Malai Boti, Turkish Kabab, Reshmi Kabab, Beef Boti, Seekh Kabab, Hunzai Kabab, Afghani Boti — with Mandi Rice & Sauce",
      },
      {
        name: "Platter-1",
        price: "Rs. 1,500",
        desc: "Chicken Shashlik Boti, Malai Boti, Turkish Kabab, Reshmi Kabab — with Mandi Rice & Sauce",
      },
      {
        name: "Platter-2",
        price: "Rs. 2,500",
        desc: "Half Tandoori Chicken, Shashlik Boti, Malai Boti, Turkish Kabab, Reshmi Kabab & Hunzai Kabab — with Mandi Rice & Sauce",
      },
    ],
  },
  {
    label: "Chelo & Biryani",
    items: [
      { name: "Chelo Kabab", price: "Rs. 1600" },
      { name: "Chicken Chelo Kabab", price: "Rs. 1400" },
      { name: "Chelo Boti", price: "Rs. 1800" },
      { name: "Chelo Platter", price: "Rs. 2800" },
      { name: "Matka Dum Biryani Half", price: "Rs. 1100" },
      { name: "Matka Dum Biryani Full", price: "Rs. 2000" },
    ],
  },
  {
    label: "Bar B Que",
    items: [
      { name: "Tikka (Chest)", price: "Rs. 600" },
      { name: "Tikka (Leg)", price: "Rs. 500" },
      { name: "Malai Tikka (Chest)", price: "Rs. 700" },
      { name: "Chicken Shashlik Boti", price: "Rs. 1200" },
      { name: "Chicken Malai Boti", price: "Rs. 1150" },
      { name: "Beef Behari Boti", price: "Rs. 1300" },
      { name: "Turkish Kabab", price: "Rs. 1000" },
      { name: "Hunzai Kabab", price: "Rs. 1100" },
      { name: "Chicken Reshmi Kabab", price: "Rs. 1000" },
      { name: "Beef Seekh Kabab", price: "Rs. 1100" },
      { name: "Afghani Boti", price: "Rs. 1300" },
    ],
  },
  {
    label: "Handi & Karahi",
    items: [
      { name: "Chicken Reshmi Paneer Handi", price: "Rs. 1800" },
      { name: "Chicken Makhni Handi", price: "Rs. 1600" },
      { name: "Chicken Achari Handi", price: "Rs. 1600" },
      { name: "Peshawari Karahi Half", price: "Rs. 1400" },
      { name: "Peshawari Karahi Full", price: "Rs. 2200" },
      { name: "Shinwari Karahi Half", price: "Rs. 1400" },
      { name: "White Karahi Half", price: "Rs. 1600" },
      { name: "White Karahi Full", price: "Rs. 2800" },
      { name: "Tikka Karahi Half", price: "Rs. 1400" },
      { name: "Tikka Karahi Full", price: "Rs. 2400" },
    ],
  },
  {
    label: "Steaks & Pasta",
    items: [
      { name: "Tarragon Steak (Chicken)", price: "Rs. 1600" },
      { name: "Tarragon Steak (Beef)", price: "Rs. 2200" },
      { name: "Moroccan Steak (Chicken)", price: "Rs. 1600" },
      { name: "Pepper Steak (Chicken)", price: "Rs. 1400" },
      { name: "Mushroom Delight Steak", price: "Rs. 1800" },
      { name: "Majestic Special Pasta", price: "Rs. 1100" },
      { name: "Alfredo Pasta", price: "Rs. 1000" },
      { name: "Arrabiata Pasta", price: "Rs. 800" },
    ],
  },
  {
    label: "Chinese & Rolls",
    items: [
      { name: "Chicken Shashlik", price: "Rs. 900" },
      { name: "Chicken Manchurian", price: "Rs. 900" },
      { name: "Chicken Hot Garlic", price: "Rs. 1000" },
      { name: "Kung Pao Chicken", price: "Rs. 1000" },
      { name: "Singaporean Rice", price: "Rs. 1100" },
      { name: "Chicken Fried Rice", price: "Rs. 800" },
      { name: "Chicken Chowmein", price: "Rs. 900" },
      { name: "Majestic Special Noodles", price: "Rs. 1100" },
      { name: "Chicken Boti Roll", price: "Rs. 300" },
      { name: "Majestic Special Roll", price: "Rs. 500" },
    ],
  },
  {
    label: "Mocktails & Drinks",
    items: [
      { name: "Pina Colada", price: "Rs. 600" },
      { name: "Blue Colada", price: "Rs. 600" },
      { name: "Mint Lemonade Glacier", price: "Rs. 600" },
      { name: "Mint Margarita Glacier", price: "Rs. 600" },
      { name: "Mango Peach Joy", price: "Rs. 700" },
      { name: "Majestic Special Mocktail", price: "Rs. 700" },
      { name: "Oreo Shake", price: "Rs. 450" },
      { name: "Chocolate Shake", price: "Rs. 400" },
      { name: "Mango Shake", price: "Rs. 350" },
      { name: "Sada Chai", price: "Rs. 150" },
      { name: "Doodh Patti", price: "Rs. 200" },
      { name: "Coffee", price: "Rs. 350" },
      { name: "Soft Drink", price: "Rs. 160" },
    ],
  },
  {
    label: "Desserts & Salads",
    items: [
      { name: "Ice Cream", price: "Rs. 350" },
      { name: "Kulfa", price: "Rs. 250" },
      { name: "Fresh Green Salad", price: "Rs. 250" },
      { name: "Fatoush Salad", price: "Rs. 850" },
    ],
  },
  {
    label: "Tandoor & Extras",
    items: [
      { name: "Chapati", price: "Rs. 30" },
      { name: "Plain Naan", price: "Rs. 40" },
      { name: "Garlic Naan", price: "Rs. 120" },
      { name: "Roghni Naan", price: "Rs. 80" },
      { name: "Paratha", price: "Rs. 180" },
      { name: "Qeema Naan", price: "Rs. 400" },
      { name: "Raita", price: "Rs. 150" },
      { name: "Garlic Mayo Sauce", price: "Rs. 250" },
      { name: "Dinner Roll", price: "Rs. 50" },
    ],
  },
];

// Placeholder food image pool (Unsplash)
const FOOD_IMAGES = [
  "https://images.unsplash.com/photo-1750943041213-db8328856b48?w=400&q=80",
  "https://images.unsplash.com/photo-1723437515844-fd3cb91ef1df?w=400&q=80",
  "https://images.unsplash.com/photo-1750943036999-81e666b2296c?w=400&q=80",
];

function foodImg(index: number) {
  return FOOD_IMAGES[index % FOOD_IMAGES.length];
}

// ─── Cart types ───────────────────────────────────────────────────────────────
type CartItem = { name: string; price: string; qty: number };

// ─── NavBar ───────────────────────────────────────────────────────────────────
function NavBar({ cartCount, onCartClick }: { cartCount: number; onCartClick: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["Home", "Menu", "Reservations", "Royal Ambiance", "Contact Us"];

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id.toLowerCase().replace(/ /g, "-"))?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      style={{
        background: scrolled ? EMERALD : "transparent",
        transition: "background 0.4s ease",
        fontFamily: "'Montserrat', sans-serif",
      }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => scrollTo("home")} className="flex items-center gap-3">
          <ImageWithFallback
            src={logoSrc}
            alt="The Majestic Cafe logo"
            className="h-14 w-14 object-contain rounded-full"
          />
          {/* <span
            style={{ color: GOLD, fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", letterSpacing: "0.05em" }}
            className="hidden sm:block font-semibold"
          >
            The Majestic Cafe
          </span> */}
        </button>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <li key={l}>
              <button
                onClick={() => scrollTo(l)}
                className="text-xs font-semibold uppercase tracking-widest transition-colors"
                style={{ color: GOLD, letterSpacing: "0.15em" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = GOLD)}
              >
                {l}
              </button>
            </li>
          ))}
        </ul>

        {/* Cart + hamburger */}
        <div className="flex items-center gap-4">
          <button
            onClick={onCartClick}
            className="relative flex items-center gap-2 px-4 py-2 rounded text-xs font-semibold uppercase tracking-widest transition-opacity hover:opacity-80"
            style={{ color: GOLD, letterSpacing: "0.12em" }}
          >
            <ShoppingBag size={18} />
            <span className="hidden sm:inline">View Cart</span>
            {cartCount > 0 && (
              <span
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: GOLD, color: EMERALD }}
              >
                {cartCount}
              </span>
            )}
          </button>
          <button
            className="lg:hidden"
            style={{ color: GOLD }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div style={{ background: EMERALD }} className="lg:hidden border-t border-white/10 px-6 pb-6 pt-2">
          {links.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              className="block w-full text-left py-3 text-xs font-semibold uppercase tracking-widest border-b border-white/10"
              style={{ color: GOLD }}
            >
              {l}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const scrollToMenu = () => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  const scrollToRes = () => document.getElementById("reservations")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: EMERALD }}
    >
      {/* background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1748551204300-f227d5af350f?w=1600&q=80")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* dark emerald overlay — keeps text fully legible while image breathes through */}
      <div className="absolute inset-0" style={{ background: `rgba(18, 40, 35, 0.78)` }} />

      {/* Gold ornamental line */}
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />
      <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Logo emblem */}
        <div className="flex justify-center mt-2">
          <div className="w-28 h-28 rounded-full overflow-hidden border-2 shadow-2xl" style={{ borderColor: GOLD }}>
            <ImageWithFallback
              src={logoSrc}
              alt="The Majestic Cafe"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <p
          className="mt-1 text-sm uppercase tracking-widest"
          style={{ color: GOLD, fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.3em" }}
        >
          Welcome to
        </p>

        <h1
          className="mt-2 leading-none"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(3rem, 10vw, 7rem)",
            color: "#fff",
            fontWeight: 300,
          }}
        >
          The Majestic
        </h1>
        <h2
          className="mb-8"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2rem, 6vw, 4rem)",
            color: GOLD,
            fontStyle: "italic",
            fontWeight: 400,
          }}
        >
          Cafe
        </h2>

        <p
          className="mb-12 text-base max-w-md mx-auto leading-relaxed"
          style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
        >
          Your table. Your moment. Crafted cuisine in a royal setting — North Nazimabad, Karachi.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={scrollToRes}
            className="px-10 py-4 text-sm font-semibold uppercase tracking-widest transition-all hover:scale-105"
            style={{
              background: GOLD,
              color: EMERALD,
              fontFamily: "'Montserrat', sans-serif",
              letterSpacing: "0.15em",
            }}
          >
            Reserve Your Experience
          </button>
          <button
            onClick={scrollToMenu}
            className="px-10 py-4 text-sm font-semibold uppercase tracking-widest border transition-all hover:scale-105"
            style={{
              borderColor: GOLD,
              color: GOLD,
              fontFamily: "'Montserrat', sans-serif",
              letterSpacing: "0.15em",
            }}
          >
            Explore Menu
          </button>
        </div>
      </div>

      {/* Scroll chevron */}
      <button
        onClick={scrollToMenu}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50 hover:opacity-100 transition-opacity"
        style={{ color: GOLD }}
      >
        <ChevronLeft size={28} className="rotate-[270deg]" />
      </button>
    </section>
  );
}

// ─── Menu Card ────────────────────────────────────────────────────────────────
function MenuCard({ item, index, onAdd }: { item: MenuItem; index: number; onAdd: (item: MenuItem) => void }) {
  return (
    <div
      className="group flex flex-col rounded-none overflow-hidden transition-transform hover:-translate-y-1"
      style={{ background: "#fff", boxShadow: "0 2px 20px rgba(30,58,52,0.08)" }}
    >
      <div className="relative overflow-hidden h-44">
        <img
          src={foodImg(index)}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(30,58,52,0.5) 0%, transparent 60%)" }}
        />
      </div>
      <div className="flex flex-col flex-1 p-4">
        <h4
          className="text-sm font-semibold mb-1 leading-tight"
          style={{ fontFamily: "'Montserrat', sans-serif", color: EMERALD }}
        >
          {item.name}
        </h4>
        {item.desc && (
          <p
            className="text-xs mb-2 leading-relaxed flex-1"
            style={{ color: "#6b8e85", fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
          >
            {item.desc}
          </p>
        )}
        <div className="flex items-center justify-between mt-auto pt-3 border-t" style={{ borderColor: "rgba(30,58,52,0.1)" }}>
          <span
            className="text-sm font-semibold"
            style={{ color: EMERALD, fontFamily: "'Montserrat', sans-serif" }}
          >
            {item.price}
          </span>
          <button
            onClick={() => onAdd(item)}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
            style={{ background: GOLD, color: EMERALD }}
            aria-label={`Add ${item.name} to cart`}
          >
            <Plus size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Menu Section ─────────────────────────────────────────────────────────────
function MenuSection({ onAdd }: { onAdd: (item: MenuItem) => void }) {
  const [active, setActive] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "l" | "r") => {
    if (!tabsRef.current) return;
    tabsRef.current.scrollBy({ left: dir === "l" ? -200 : 200, behavior: "smooth" });
  };

  return (
    <section id="menu" className="py-24 px-4" style={{ background: PEARL }}>
      <div className="max-w-7xl mx-auto">
        {/* heading */}
        <div className="text-center mb-14">
          <p
            className="mb-2 text-xs uppercase tracking-widest"
            style={{ color: GOLD, fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.3em" }}
          >
            Crafted with Passion
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              color: EMERALD,
              fontWeight: 400,
            }}
          >
            Culinary Masterpieces
          </h2>
          <div className="mt-4 mx-auto w-24 h-px" style={{ background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />
        </div>

        {/* Category slider */}
        <div className="relative flex items-center mb-10">
          <button
            onClick={() => scroll("l")}
            className="flex-none w-9 h-9 rounded-full flex items-center justify-center border transition-colors mr-2"
            style={{ borderColor: EMERALD, color: EMERALD }}
            onMouseEnter={(e) => { e.currentTarget.style.background = EMERALD; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = EMERALD; }}
          >
            <ChevronLeft size={16} />
          </button>

          <div
            ref={tabsRef}
            className="flex-1 flex gap-3 overflow-x-auto scrollbar-none pb-1"
            style={{ scrollbarWidth: "none" }}
          >
            {MENU.map((cat, i) => (
              <button
                key={cat.label}
                onClick={() => setActive(i)}
                className="flex-none px-5 py-2 text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  letterSpacing: "0.12em",
                  color: active === i ? EMERALD : "#8ba89f",
                  borderBottom: active === i ? `2px solid ${GOLD}` : "2px solid transparent",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => scroll("r")}
            className="flex-none w-9 h-9 rounded-full flex items-center justify-center border transition-colors ml-2"
            style={{ borderColor: EMERALD, color: EMERALD }}
            onMouseEnter={(e) => { e.currentTarget.style.background = EMERALD; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = EMERALD; }}
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {MENU[active].items.map((item, i) => (
            <MenuCard key={item.name} item={item} index={i} onAdd={onAdd} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Royal Ambiance ───────────────────────────────────────────────────────────
function AmbianceSection() {
  const photos = [
    { url: "https://images.unsplash.com/photo-1764358868789-400fb3d39fb7?w=800&q=80", caption: "A moment of elegance" },
    { url: "https://images.unsplash.com/photo-1750943041213-db8328856b48?w=800&q=80", caption: "Culinary artistry" },
    { url: "https://images.unsplash.com/photo-1763645246808-79c2c51d86ad?w=800&q=80", caption: "Royal atmosphere" },
    { url: "https://images.unsplash.com/photo-1750943036999-81e666b2296c?w=800&q=80", caption: "Plated to perfection" },
    { url: "https://images.unsplash.com/photo-1723437515844-fd3cb91ef1df?w=800&q=80", caption: "Signature dishes" },
    { url: "https://images.unsplash.com/photo-1758354465013-847ebb9e5390?w=800&q=80", caption: "Vibrant & vivid" },
  ];

  return (
    <section id="royal-ambiance" style={{ background: EMERALD }} className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p
            className="mb-2 text-xs uppercase tracking-widest"
            style={{ color: GOLD, fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.3em" }}
          >
            Experience
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              color: "#fff",
              fontWeight: 400,
            }}
          >
            Royal Ambiance
          </h2>
          <div className="mt-4 mx-auto w-24 h-px" style={{ background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />
        </div>

        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {photos.map((p) => (
            <div key={p.url} className="group relative overflow-hidden break-inside-avoid">
              <img
                src={p.url}
                alt={p.caption}
                className="w-full object-cover block transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "rgba(30,58,52,0.72)" }}
              >
                <p
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: GOLD, fontSize: "1.1rem", fontStyle: "italic" }}
                >
                  {p.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Reservations ─────────────────────────────────────────────────────────────
function ReservationsSection() {
  const [form, setForm] = useState({
    name: "", phone: "", date: "", time: "", persons: "2", table: "",
  });
  const [sent, setSent] = useState(false);

  const handle = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", phone: "", date: "", time: "", persons: "2", table: "" });
  };

  const inputStyle: React.CSSProperties = {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.875rem",
    color: EMERALD,
    background: "transparent",
    borderBottom: `1px solid ${EMERALD}40`,
    outline: "none",
    paddingBottom: "8px",
    width: "100%",
    display: "block",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.65rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: GOLD,
    display: "block",
    marginBottom: "6px",
  };

  return (
    <section id="reservations" className="py-24 px-4" style={{ background: PEARL }}>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Left image */}
        <div className="hidden lg:block relative">
          <img
            src="https://images.unsplash.com/photo-1764358868789-400fb3d39fb7?w=800&q=80"
            alt="Elegantly set table"
            className="w-full object-cover"
            style={{ height: "580px" }}
          />
          <div
            className="absolute -bottom-6 -right-6 w-48 h-48 border-2"
            style={{ borderColor: GOLD, zIndex: -1 }}
          />
        </div>

        {/* Form */}
        <div>
          <p
            className="mb-2 text-xs uppercase tracking-widest"
            style={{ color: GOLD, fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.3em" }}
          >
            Book A Table
          </p>
          <h2
            className="mb-8"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: EMERALD,
              fontWeight: 400,
            }}
          >
            Reserve Your Experience
          </h2>

          {sent && (
            <div
              className="mb-6 px-5 py-4 text-sm font-medium"
              style={{ background: EMERALD, color: GOLD, fontFamily: "'Montserrat', sans-serif" }}
            >
              Reservation received! We will confirm via phone shortly.
            </div>
          )}

          <form onSubmit={submit} className="space-y-7">
            <div className="grid sm:grid-cols-2 gap-7">
              <div>
                <label style={labelStyle}>Full Name</label>
                <input required value={form.name} onChange={handle("name")} style={inputStyle} placeholder="Your name" />
              </div>
              <div>
                <label style={labelStyle}>Phone Number</label>
                <input required value={form.phone} onChange={handle("phone")} style={inputStyle} placeholder="0300 0000000" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-7">
              <div>
                <label style={labelStyle}>Date</label>
                <input required type="date" value={form.date} onChange={handle("date")} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Time</label>
                <input required type="time" value={form.time} onChange={handle("time")} style={inputStyle} />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-7">
              <div>
                <label style={labelStyle}>Number of Persons</label>
                <select value={form.persons} onChange={handle("persons")} style={{ ...inputStyle, cursor: "pointer" }}>
                  {["1","2","3","4","5","6","7","8","9","10+"].map((n) => (
                    <option key={n} value={n}>{n} {n === "1" ? "Person" : "Persons"}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Table Preference (optional)</label>
                <input value={form.table} onChange={handle("table")} style={inputStyle} placeholder="Window seat, outdoor, etc." />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-5 text-sm font-semibold uppercase tracking-widest transition-all hover:opacity-90 active:scale-[0.99]"
              style={{
                background: EMERALD,
                color: GOLD,
                fontFamily: "'Montserrat', sans-serif",
                letterSpacing: "0.2em",
              }}
            >
              Confirm Reservation
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer id="contact-us" style={{ background: EMERALD }} className="pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 mb-12">
        {/* Brand */}
        <div>
          <ImageWithFallback
            src={logoSrc}
            alt="The Majestic Cafe logo"
            className="w-24 h-24 object-contain rounded-full mb-4"
          />
          <h3
            style={{ fontFamily: "'Cormorant Garamond', serif", color: GOLD, fontSize: "1.4rem", fontWeight: 400 }}
          >
            The Majestic Cafe
          </h3>
          <p
            className="mt-2 text-sm leading-relaxed"
            style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
          >
            Where every meal becomes a memory. Royal dining in the heart of Karachi.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h4
            className="mb-6 text-xs uppercase tracking-widest"
            style={{ color: GOLD, fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.25em" }}
          >
            Contact Us
          </h4>
          <div className="space-y-4">
            <a
              href="tel:03046789111"
              className="flex items-start gap-3 group"
            >
              <Phone size={16} style={{ color: GOLD, marginTop: 2 }} />
              <span
                className="text-sm group-hover:opacity-100 opacity-70 transition-opacity"
                style={{ color: "#fff", fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
              >
                0304 6789111
              </span>
            </a>
            <a
              href="https://instagram.com/themajesticcafe"
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-3 group"
            >
              <Instagram size={16} style={{ color: GOLD, marginTop: 2 }} />
              <span
                className="text-sm group-hover:opacity-100 opacity-70 transition-opacity"
                style={{ color: "#fff", fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
              >
                @themajesticcafe
              </span>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-3 group"
            >
              <Facebook size={16} style={{ color: GOLD, marginTop: 2 }} />
              <span
                className="text-sm group-hover:opacity-100 opacity-70 transition-opacity"
                style={{ color: "#fff", fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
              >
                The Majestic Cafe
              </span>
            </a>
            <div className="flex items-start gap-3">
              <MapPin size={16} style={{ color: GOLD, marginTop: 2, flexShrink: 0 }} />
              <span
                className="text-sm opacity-70"
                style={{ color: "#fff", fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
              >
                D-58/1 North Nazimabad Block-H,<br />Karachi, Pakistan
              </span>
            </div>
          </div>
        </div>

        {/* Map embed placeholder */}
        <div>
          <h4
            className="mb-6 text-xs uppercase tracking-widest"
            style={{ color: GOLD, fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.25em" }}
          >
            Find Us
          </h4>
          <div
            className="w-full overflow-hidden"
            style={{ height: 200, filter: "grayscale(100%) invert(0.8) contrast(1.1)" }}
          >
            <iframe
              title="The Majestic Cafe Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.3!2d67.034!3d24.932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDU1JzU1LjIiTiA2N8KwMDInMDIuNCJF!5e0!3m2!1sen!2s!4v1"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t px-6 pt-8 text-center" style={{ borderColor: "rgba(212,175,55,0.2)" }}>
        <div className="mx-auto w-16 h-px mb-6" style={{ background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />
        <p
          className="text-xs opacity-40"
          style={{ color: "#fff", fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.1em" }}
        >
          © {new Date().getFullYear()} The Majestic Cafe. All rights reserved. · North Nazimabad, Karachi
        </p>
      </div>
    </footer>
  );
}

// ─── Cart Drawer ──────────────────────────────────────────────────────────────
function CartDrawer({
  cart,
  onClose,
  onRemove,
  onQty,
}: {
  cart: CartItem[];
  onClose: () => void;
  onRemove: (name: string) => void;
  onQty: (name: string, delta: number) => void;
}) {
  const total = cart.reduce((s, i) => {
    const n = parseFloat(i.price.replace(/[^0-9.]/g, "").replace(",", ""));
    return s + (isNaN(n) ? 0 : n * i.qty);
  }, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div
        className="relative flex flex-col w-full max-w-sm h-full shadow-2xl"
        style={{ background: "#fff" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: "rgba(30,58,52,0.1)" }}>
          <h3
            style={{ fontFamily: "'Cormorant Garamond', serif", color: EMERALD, fontSize: "1.5rem", fontWeight: 500 }}
          >
            Your Order
          </h3>
          <button onClick={onClose} style={{ color: EMERALD }}>
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-20">
              <ShoppingBag size={40} style={{ color: GOLD, marginBottom: 12 }} />
              <p style={{ color: "#8ba89f", fontFamily: "'Montserrat', sans-serif", fontSize: "0.85rem" }}>
                Your cart is empty.<br />Add some culinary masterpieces.
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.name} className="flex items-center gap-4 py-3 border-b" style={{ borderColor: "rgba(30,58,52,0.08)" }}>
                <div className="flex-1">
                  <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.8rem", color: EMERALD, fontWeight: 600 }}>
                    {item.name}
                  </p>
                  <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.75rem", color: "#8ba89f" }}>
                    {item.price}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onQty(item.name, -1)}
                    className="w-6 h-6 rounded-full flex items-center justify-center border text-xs"
                    style={{ borderColor: EMERALD, color: EMERALD }}
                  >
                    <Minus size={10} />
                  </button>
                  <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.85rem", color: EMERALD, minWidth: 16, textAlign: "center" }}>
                    {item.qty}
                  </span>
                  <button
                    onClick={() => onQty(item.name, 1)}
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ background: GOLD, color: EMERALD }}
                  >
                    <Plus size={10} />
                  </button>
                </div>
                <button onClick={() => onRemove(item.name)} style={{ color: "#c0a0a0" }}>
                  <X size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="px-6 py-5 border-t" style={{ borderColor: "rgba(30,58,52,0.1)" }}>
            <div className="flex items-center justify-between mb-4">
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.75rem", color: "#8ba89f", textTransform: "uppercase", letterSpacing: "0.15em" }}>
                Total
              </span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", color: EMERALD, fontWeight: 600 }}>
                Rs. {total.toLocaleString()}
              </span>
            </div>
            <button
              className="w-full py-4 text-xs font-semibold uppercase tracking-widest transition-opacity hover:opacity-90"
              style={{ background: EMERALD, color: GOLD, fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.2em" }}
            >
              Place Order via WhatsApp
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Floating Cart Button ─────────────────────────────────────────────────────
function FloatingCart({ count, onClick }: { count: number; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl z-40 transition-transform hover:scale-105 active:scale-95"
      style={{ background: EMERALD }}
    >
      <ShoppingBag size={22} style={{ color: GOLD }} />
      {count > 0 && (
        <span
          className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
          style={{ background: GOLD, color: EMERALD, fontFamily: "'Montserrat', sans-serif" }}
        >
          {count}
        </span>
      )}
    </button>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.name === item.name);
      if (existing) return prev.map((c) => c.name === item.name ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { name: item.name, price: item.price, qty: 1 }];
    });
  };

  const removeFromCart = (name: string) => setCart((prev) => prev.filter((c) => c.name !== name));

  const adjustQty = (name: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => c.name === name ? { ...c, qty: c.qty + delta } : c)
        .filter((c) => c.qty > 0)
    );
  };

  const totalCount = cart.reduce((s, c) => s + c.qty, 0);

  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif", background: PEARL }}>
      <NavBar cartCount={totalCount} onCartClick={() => setCartOpen(true)} />
      <Hero />
      <MenuSection onAdd={addToCart} />
      <AmbianceSection />
      <ReservationsSection />
      <Footer />
      <FloatingCart count={totalCount} onClick={() => setCartOpen(true)} />
      {cartOpen && (
        <CartDrawer
          cart={cart}
          onClose={() => setCartOpen(false)}
          onRemove={removeFromCart}
          onQty={adjustQty}
        />
      )}
    </div>
  );
}
