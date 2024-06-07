import CampaignCard from "@/components/campaigncard/campaignCard";
import StartCampaign from "@/components/startcampaign/startcampaign";
import Image from "next/image";

export default function Home() {
  return (
    <main className="container pt-10">
      <div>
        <StartCampaign />
        <div className="mt-10 text-xl font-medium">Latest Campaigns</div>
        <CampaignCard
          name="Campaign 1"
          details="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
        />
      </div>
    </main>
  );
}
