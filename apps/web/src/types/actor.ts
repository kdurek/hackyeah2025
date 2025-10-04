import type {
  ActorAlignment,
  ActorType,
} from "../../../server/prisma/generated/enums";

export type Actor = {
  id: string;
  mapCoords: {
    lat: number;
    lon: number;
  };
  localPosition: {
    x: number;
    y: number;
    z: number;
  };
  rotation: {
    x: number;
    y: number;
    z: number;
  };
  type: ActorType;
  alignment: ActorAlignment;
  createdAt: Date;
  updatedAt: Date;
};
