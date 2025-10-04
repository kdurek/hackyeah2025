import { ActorType } from "prisma/generated/enums";
import z from "zod";
import prisma from "../db";
import { publicProcedure } from "../lib/orpc";

export const actorRouter = {
  getAll: publicProcedure
    .route({ method: "GET", path: "/actors" })
    .handler(async () => {
      const actors = await prisma.actor.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
      const transformedActors = actors.map((actor) => ({
        id: actor.id,
        mapCoords: { lat: actor.mapCoordsLat, lon: actor.mapCoordsLon },
        localPosition: {
          x: actor.localPositionX,
          y: actor.localPositionY,
          z: actor.localPositionZ,
        },
        type: actor.type,
        createdAt: actor.createdAt,
        updatedAt: actor.updatedAt,
      }));
      return transformedActors;
    }),

  create: publicProcedure
    .route({ method: "POST", path: "/actors" })
    .input(
      z.object({
        mapCoords: z.object({ lat: z.number(), lon: z.number() }),
        localPosition: z.object({
          x: z.number(),
          y: z.number(),
          z: z.number(),
        }),
        type: z.enum(ActorType),
      })
    )
    .handler(
      async ({ input }) =>
        await prisma.actor.create({
          data: {
            mapCoordsLat: input.mapCoords.lat,
            mapCoordsLon: input.mapCoords.lon,
            localPositionX: input.localPosition.x,
            localPositionY: input.localPosition.y,
            localPositionZ: input.localPosition.z,
            type: input.type,
          },
        })
    ),

  update: publicProcedure
    .route({ method: "PUT", path: "/actors/:id" })
    .input(
      z.object({
        id: z.string(),
        mapCoords: z.object({ lat: z.number(), lon: z.number() }),
        localPosition: z.object({
          x: z.number(),
          y: z.number(),
          z: z.number(),
        }),
        type: z.enum(ActorType),
      })
    )
    .handler(
      async ({ input }) =>
        await prisma.actor.update({
          where: { id: input.id },
          data: {
            mapCoordsLat: input.mapCoords.lat,
            mapCoordsLon: input.mapCoords.lon,
            localPositionX: input.localPosition.x,
            localPositionY: input.localPosition.y,
            localPositionZ: input.localPosition.z,
            type: input.type,
          },
        })
    ),

  delete: publicProcedure
    .route({ method: "DELETE", path: "/actors/:id" })
    .input(z.object({ id: z.string() }))
    .handler(
      async ({ input }) =>
        await prisma.actor.delete({
          where: { id: input.id },
        })
    ),
};
