import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { calculateSchedule } from "./spacedRepetition.js";

describe("calculateSchedule", () => {
    beforeEach(() => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2026-08-01T00:00:00.000Z"));
    })

    afterEach(() => {
        vi.useRealTimers();
    })

    it("set first successfully review to day 1", async () => {
        const card = {
            repetitions: 0,
            interval: 0,
            easeFactor: 2.5
        }

        const schedule = calculateSchedule(card, 4)

        expect(schedule).toEqual({
            repetitions: 1,
            interval: 1,
            easeFactor: 2.6,
            nextReview: new Date("2026-08-02T00:00:00.000Z")
        })
    })

    it(" set second successfull review to day 2", async () => {
        const card = {
            repetitions: 1,
            interval: 1,
            easeFactor: 2.6
        }

        const schedule = calculateSchedule(card, 4)
        
        expect(schedule.repetitions).toBe(2);
        expect(schedule.interval).toBe(6);
        expect(schedule.easeFactor).toBeCloseTo(2.7);
        expect(schedule.nextReview).toEqual(new Date("2026-08-07T00:00:00.000Z"));
    })

    it("multiplier later intervals iby ease factor", async () => {
        const card = {
            repetitions: 2,
            interval: 6,
            easeFactor: 2.5
        }

        const schedule = calculateSchedule(card, 4)
        
        expect(schedule.repetitions).toBe(3);
        expect(schedule.interval).toBe(15);
        expect(schedule.easeFactor).toBeCloseTo(2.6);
        expect(schedule.nextReview).toEqual(new Date("2026-08-16T00:00:00.000Z"));
    })

    it("resets repetitions and interval on rating 1", async () => {
        const card = {
            repetitions: 5,
            interval: 30,
            easeFactor: 2.5
        }

        const schedule = calculateSchedule(card, 1)
        
        expect(schedule.repetitions).toBe(0)
        expect(schedule.interval).toBe(1)
        expect(schedule.easeFactor).toBeCloseTo(2.18)
        expect(schedule.nextReview).toEqual(new Date("2026-08-02T00:00:00.000Z"))
    })

    it("does not allow ease factor below 1.3", async () => {
        const card = {
            repetitions: 3,
            interval: 10,
            easeFactor: 1.31
        }

        const schedule = calculateSchedule(card, 1)

        expect(schedule.easeFactor).toBe(1.3)
    })
})
