import { ActorAlignment } from "../../../server/prisma/generated/enums";

export const ACTOR_TYPES_COLORS = {
  [ActorAlignment.HOSTILE]: "#FF7E7E", // red
  [ActorAlignment.NEUTRAL]: "#97FF97", // green
  [ActorAlignment.UNKNOWN]: "#FFFF82", // yellow
  [ActorAlignment.FRIENDLY]: "#7FE2FF", // blue
} as const;
