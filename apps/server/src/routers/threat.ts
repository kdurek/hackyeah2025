import { ThreatType } from "prisma/generated/enums";
import z from "zod";
import prisma from "../db";
import { publicProcedure } from "../lib/orpc";

export const threatRouter = {
  getAll: publicProcedure
    .route({ method: "GET", path: "/threats" })
    .handler(async () => {
      const threats = await prisma.threat.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
      const transformedThreats = threats.map((threat) => ({
        id: threat.id,
        mapCoords: { lat: threat.mapCoordsLat, lon: threat.mapCoordsLon },
        localPosition: { x: threat.localPositionX, y: threat.localPositionY },
        type: threat.type,
      }));
      return transformedThreats;
    }),

  create: publicProcedure
    .route({ method: "POST", path: "/threats" })
    .input(
      z.object({
        mapCoords: z.object({ lat: z.number(), lon: z.number() }),
        localPosition: z.object({ x: z.number(), y: z.number() }),
        type: z.enum(ThreatType),
      })
    )
    .handler(
      async ({ input }) =>
        await prisma.threat.create({
          data: {
            mapCoordsLat: input.mapCoords.lat,
            mapCoordsLon: input.mapCoords.lon,
            localPositionX: input.localPosition.x,
            localPositionY: input.localPosition.y,
            type: input.type,
          },
        })
    ),

  update: publicProcedure
    .route({ method: "PUT", path: "/threats/:id" })
    .input(
      z.object({
        id: z.string(),
        mapCoords: z.object({ lat: z.number(), lon: z.number() }),
        localPosition: z.object({ x: z.number(), y: z.number() }),
        type: z.enum(ThreatType),
      })
    )
    .handler(
      async ({ input }) =>
        await prisma.threat.update({
          where: { id: input.id },
          data: {
            mapCoordsLat: input.mapCoords.lat,
            mapCoordsLon: input.mapCoords.lon,
            localPositionX: input.localPosition.x,
            localPositionY: input.localPosition.y,
            type: input.type,
          },
        })
    ),

  delete: publicProcedure
    .route({ method: "DELETE", path: "/threats/:id" })
    .input(z.object({ id: z.string() }))
    .handler(
      async ({ input }) =>
        await prisma.threat.delete({
          where: { id: input.id },
        })
    ),
};
