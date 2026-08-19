import type { EventEntity } from "../db/schema";
import { heroEventsData } from "../../features/hero/hero.data";
import { upcomingEventsData } from "../../features/upcomingEvents/upcomingEvents.data";
import { featuredEventsData } from "../../features/featuredEvents/featuredEvents.data";

/**
 * Event Domain Service Layer
 * Abstracts data retrieval and database queries
 */
export class EventService {
  /**
   * Get all active hero events
   */
  static async getHeroEvents(): Promise<EventEntity[]> {
    return heroEventsData as unknown as EventEntity[];
  }

  /**
   * Get all curated featured accordion events
   */
  static async getFeaturedEvents() {
    return featuredEventsData;
  }

  /**
   * Get all upcoming 3D pass events with tier capacities
   */
  static async getUpcomingPassEvents(): Promise<EventEntity[]> {
    return upcomingEventsData as unknown as EventEntity[];
  }

  /**
   * Get event by ID
   */
  static async getEventById(id: string | number): Promise<EventEntity | null> {
    const all = [...(upcomingEventsData as unknown as EventEntity[])];
    return all.find((e) => String(e.id) === String(id)) || null;
  }
}
