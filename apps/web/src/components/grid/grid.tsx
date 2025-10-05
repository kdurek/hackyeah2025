/** biome-ignore-all lint/performance/noImgElement: <explanation> */
import { useQuery } from "@tanstack/react-query";
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

const getActorIcon = (type: ActorType, alignment: ActorAlignment) => {
  const imageSrc = `${type.toLowerCase()}-${alignment.toLowerCase()}.png`;
  return <img alt="drone" height={24} src={imageSrc} width={24} />;
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
    <div
      className="mx-auto grid w-[700px] grid-cols-2 gap-x-9 gap-y-[18px] overflow-y-scroll border-white border-y-2 py-4"
      style={{ overflowY: "scroll", maxHeight: 380 }}
    >
      {actors.data.map((item) => (
        <div
          className="flex h-[52px] cursor-pointer gap-2"
          key={item.id}
          onClick={() => setSelected(item.id)}
        >
          <div
            className={
              "flex size-[52px] items-center justify-center border border-white"
            }
            style={{
              color: ACTOR_TYPES_COLORS[item.alignment],
              ...(selected === item.id && { borderColor: "#D23A4F" }),
            }}
          >
            {getActorIcon(item.type, item.alignment)}
          </div>
          <div
            className="flex flex-grow flex-col border border-white p-2"
            style={{ ...(selected === item.id && { borderColor: "#D23A4F" }) }}
          >
            <div className="font-medium text-sm">{getActorType(item.type)}</div>
            <div className="text-xs">{item.alignment}</div>
          </div>
          <div
            className="flex size-[52px] cursor-pointer items-center justify-center border border-white p-2"
            style={{ ...(selected === item.id && { borderColor: "#D23A4F" }) }}
          >
            <img alt="compass" height={24} src="/compass.png" width={24} />
          </div>
        </div>
      ))}
    </div>
  );
};

export { Grid };
