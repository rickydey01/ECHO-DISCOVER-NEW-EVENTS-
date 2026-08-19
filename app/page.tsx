import { BookingProvider } from "../context/BookingContext";
import EchoAtmosphere from "../core/background/EchoAtmosphere";
import SmoothExperience from "../core/motion/SmoothExperience";
import Navbar from "../features/navigation/Navbar";
import MobileAppDock from "../features/navigation/MobileAppDock";
import Hero from "../features/hero/Hero";
import FeaturedEvents from "../features/featuredEvents/FeaturedEvents";
import Categories from "../features/categories/Categories";
import UpcomingEvents from "../features/upcomingEvents/UpcomingEvents";
import GalleryExperience from "../features/gallery/GalleryExperience";
import AboutManifesto from "../features/manifesto/AboutManifesto";
import Footer from "../features/footer/Footer";
import TicketBookingModal from "../features/booking/TicketBookingModal";
import MyPassesModal from "../features/booking/MyPassesModal";
import UserProfileModal from "../features/user/UserProfileModal";

export default function Home() {
  return (
    <BookingProvider>
      <main className="echo-app-root">
        {/* 1. Global Kinetic Background Atmosphere Continuum */}
        <EchoAtmosphere />

        {/* 2. Lenis Butterfly Spring Momentum Scroll Engine */}
        <SmoothExperience />

        {/* 3. Floating Luxury Header Navigation (with My Passes & Profile) */}
        <Navbar />

        {/* 4. Section 01: Hero Stage Gateway (Free-floating clean info row & bold CTA) */}
        <Hero />

        {/* 5. Section 02: Featured Events Fluid Tap/Hover Stage */}
        <FeaturedEvents />

        {/* 6. Section 03: Discover Worlds / Category Universe Explorer */}
        <Categories />

        {/* 7. Section 04: Upcoming Events 3D Ticket Pass Deck */}
        <UpcomingEvents />

        {/* 8. Section 05: Three-Track Velocity Horizontal Gallery */}
        <GalleryExperience />

        {/* 9. Section 06: Manifesto Story & Telemetry Hubs */}
        <AboutManifesto />

        {/* 10. Section 07: Grand Finale Footer & World Clocks */}
        <Footer />

        {/* 11. Mobile App Bottom Floating Dock */}
        <MobileAppDock />

        {/* 12. Global Interactive Ticket Pass Checkout Sheet & QR Generator */}
        <TicketBookingModal />

        {/* 13. My Passes Digital Wallet Modal */}
        <MyPassesModal />

        {/* 14. User Profile & VIP Membership Modal */}
        <UserProfileModal />
      </main>
    </BookingProvider>
  );
}
