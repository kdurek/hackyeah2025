/** biome-ignore-all lint/performance/noImgElement: false positive */
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNowStrict } from "date-fns";
import { ACTOR_TYPES_COLORS } from "@/const/const";
import type { useSimulatedActorsReturnType } from "@/hooks/useSimulatedActors";
import { useIsMock } from "@/pages/index";
import { orpc } from "@/utils/orpc";
import type {
  ActorAlignment,
  ActorType,
} from "../../../../server/prisma/generated/enums";

const getActorType = (type: ActorType) => {
  switch (type) {
    case "DRONE":
      return "Drone";
    case "ARMOR":
      return "Armor";
    case "INFANTRY":
      return "Infantry";
    default:
      return "Unknown";
  }
};

const getActorAlignment = (alignment: ActorAlignment) => {
  switch (alignment) {
    case "HOSTILE":
      return "Hostile";
    case "NEUTRAL":
      return "Neutral";
    case "UNKNOWN":
      return "Unknown";
    case "FRIENDLY":
      return "Friendly";
    default:
      return "Unknown";
  }
};

const getActorIcon = (type: ActorType, alignment: ActorAlignment) => {
  const imageSrc = `${type.toLowerCase()}-${alignment.toLowerCase()}.png`;
  return <img alt="drone" height={32} src={imageSrc} width={32} />;
};

const Grid = ({
  actors,
  selected,
  setSelected,
}: {
  actors: useSimulatedActorsReturnType;
  selected: string;
  setSelected: (id: string) => void;
}) => {
  const isMock = useIsMock();

  const actorsQ = useQuery(
    orpc.actor.getAll.queryOptions({
      enabled: !isMock,
    })
  );

  if (!isMock) {
    actors = actorsQ;
  }

  // const actors = {
  //   data: Array.from({ length: 6 })
  //     .fill(null)
  //     .map(() => ({
  //       id: "01K6QPS3TMRBYGXS22ZVY0MH87",
  //       externalId: "ASDSADSA",
  //       mapCoords: { lat: 12_335_213, lon: 355 },
  //       localPosition: { x: -5, y: 12 },
  //       type: "DRONE",
  //     })),
  // };

  if (!actors.data) {
    return null;
  }

  return (
    <div className="mx-auto grid w-[700px] cursor-pointer grid-cols-2 gap-x-9 gap-y-[18px] overflow-y-scroll border-white border-y-2 py-4">
      {actors.data.map((item) => (
        <div
          className="flex h-16 gap-2"
          key={item.id}
          onClick={() => setSelected(item.id)}
        >
          <div
            className="flex size-16 items-center justify-center border border-white"
            style={{
              color: ACTOR_TYPES_COLORS[item.alignment],
              ...(selected === item.id && { borderColor: "#D23A4F" }),
            }}
          >
            {getActorIcon(item.type, item.alignment)}
          </div>
          <div
            className="flex flex-grow items-center border border-white px-2"
            style={{ ...(selected === item.id && { borderColor: "#D23A4F" }) }}
          >
            <div className="flex flex-col">
              <div className="font-black">{getActorType(item.type)}</div>
              <div className="text-xs">{getActorAlignment(item.alignment)}</div>
              <div className="text-xs">
                {formatDistanceToNowStrict(item.updatedAt, {
                  addSuffix: true,
                })}
              </div>
            </div>
          </div>
          <div
            className="flex size-16 items-center justify-center border border-white p-2"
            style={{ ...(selected === item.id && { borderColor: "#D23A4F" }) }}
          >
            <img alt="compass" height={32} src="/compass.png" width={32} />
          </div>
        </div>
      ))}
    </div>
  );
};

export { Grid };
