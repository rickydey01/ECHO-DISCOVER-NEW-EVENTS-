"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import type { TicketPass, BookingDetails, UserProfile } from "../types/booking.types";
import { assetUrl } from "../utils/assetHelper";

export * from "../types/booking.types";

const DEFAULT_BOOKING: BookingDetails = {
  title: "Neon Nights",
  category: "Music & Visuals",
  date: "Friday, 22 August 2026",
  time: "08:00 PM",
  venue: "Echo Arena Main Hall",
  city: "Guwahati, Assam",
  image: assetUrl("/images/events/event1.webp"),
  basePrice: 899,
  initialTier: "GA",
};

const INITIAL_USER_PASSES: TicketPass[] = [
  {
    id: "pass-01",
    serialNumber: "ECH-2026-8819-VIP",
    eventTitle: "Neon Nights · Season Opener",
    category: "SYNTHWAVE & VISUALS",
    date: "22 AUG 2026",
    time: "08:00 PM",
    venue: "Echo Arena Main Hall",
    city: "Guwahati, Assam",
    image: assetUrl("/images/events/event1.webp"),
    tierName: "VIP Mezzanine Pass",
    quantity: 2,
    totalPaid: 3956,
    status: "ACTIVE",
    gate: "GATE 02 · FAST TRACK",
    seatZone: "MEZZANINE LOUNGE · ROW A",
  },
  {
    id: "pass-02",
    serialNumber: "ECH-2026-4421-GA",
    eventTitle: "Electric Pulse Concert",
    category: "HYBRID LIVE CONCERT",
    date: "05 SEP 2026",
    time: "07:30 PM",
    venue: "The Dome Amphitheatre",
    city: "Guwahati, Assam",
    image: assetUrl("/images/events/event3.webp"),
    tierName: "General Admission",
    quantity: 1,
    totalPaid: 1199,
    status: "UPCOMING",
    gate: "NORTH GATE A",
    seatZone: "MAIN ARENA FLOOR",
  },
];

const DEFAULT_PROFILE: UserProfile = {
  name: "Alex Bordoloi",
  email: "alex.bordoloi@echo.live",
  phone: "+91 98640 12345",
  membership: "ECHO BLACK // VIP CITIZEN",
  city: "Guwahati, Assam",
  avatar: assetUrl("/images/hero/hero1.webp"),
  points: 2450,
};

interface BookingContextType {
  // Booking modal
  isOpen: boolean;
  booking: BookingDetails;
  openBooking: (details?: Partial<BookingDetails>) => void;
  closeBooking: () => void;

  // Search modal
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;

  // My Passes wallet modal
  isMyPassesOpen: boolean;
  passes: TicketPass[];
  openMyPasses: () => void;
  closeMyPasses: () => void;
  addPass: (newPass: TicketPass) => void;

  // Profile modal
  isProfileOpen: boolean;
  profile: UserProfile;
  openProfile: () => void;
  openUserProfile: () => void;
  closeProfile: () => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [booking, setBooking] = useState<BookingDetails>(DEFAULT_BOOKING);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMyPassesOpen, setIsMyPassesOpen] = useState(false);
  const [passes, setPasses] = useState<TicketPass[]>(INITIAL_USER_PASSES);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);

  const openBooking = useCallback((details?: Partial<BookingDetails>) => {
    if (details) {
      setBooking((prev) => ({
        ...prev,
        ...details,
      }));
    }
    setIsOpen(true);
  }, []);

  const closeBooking = useCallback(() => {
    setIsOpen(false);
  }, []);

  const openSearch = useCallback(() => {
    setIsSearchOpen(true);
  }, []);

  const closeSearch = useCallback(() => {
    setIsSearchOpen(false);
  }, []);

  const openMyPasses = useCallback(() => {
    setIsMyPassesOpen(true);
  }, []);

  const closeMyPasses = useCallback(() => {
    setIsMyPassesOpen(false);
  }, []);

  const addPass = useCallback((newPass: TicketPass) => {
    setPasses((prev) => [newPass, ...prev]);
  }, []);

  const openProfile = useCallback(() => {
    setIsProfileOpen(true);
  }, []);

  const closeProfile = useCallback(() => {
    setIsProfileOpen(false);
  }, []);

  const updateProfile = useCallback((updated: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
  }, []);

  return (
    <BookingContext.Provider
      value={{
        isOpen,
        booking,
        openBooking,
        closeBooking,
        isSearchOpen,
        openSearch,
        closeSearch,
        isMyPassesOpen,
        passes,
        openMyPasses,
        closeMyPasses,
        addPass,
        isProfileOpen,
        profile,
        openProfile,
        openUserProfile: openProfile,
        closeProfile,
        updateProfile,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
