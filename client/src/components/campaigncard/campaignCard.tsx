import Link from "next/link";

type Tcampaign = {
  name: string;
  details: string;
};

const CampaignCard = (props: Tcampaign) => {
  return (
    <div className="mt-4 bg-zinc-50 p-4 rounded-md border-[0.5px] bg-opacity-55">
      <div className="text-xl">{props.name}</div>
      <div className="text-xs text-gray-500">{props.details}</div>
      <div className="flex gap-2 mt-1">
        <Link href="" className="text-sm hover:underline ml-auto">
          Register
        </Link>
        <div className="text-sm hover:underline cursor-pointer text-red-400">
          Close
        </div>
      </div>
    </div>
  );
};
export default CampaignCard;
