import { currencyFormat } from "@/lib/currencyFormat";
import { Button } from "./ui/button";
import { Check } from "lucide-react";
import { Minus } from "lucide-react";
import { claimLGBalance } from "@/api/distribution";
import AdvanceLGForm from "./AdvanceLGForm";
import { useData } from "@/context/DataContext";

const SummaryBody = ({
  isClaiming,
  isAdvance,
  editingDancer,
  setEditingDancer,
  isHold,
}: {
  isClaiming: boolean;
  isAdvance: boolean;
  editingDancer: string | null;
  isHold: boolean;
  setEditingDancer: (value: string | null) => void;
}) => {
  // Get data from context instead of fetching locally
  const { dancers, lgBalances, refetchAll } = useData();

  const getDancerLGBalance = (dancerId: string) => {
    const balance = lgBalances.find((lb) => lb.dancerId === dancerId);
    return balance;
  };

  const claimLG = async (dancerId: string) => {
    try {
      await claimLGBalance(dancerId);
      // 🎯 Refetch data after claiming to update the UI
      await refetchAll();
      console.log("✅ Balance claimed and data refreshed!");
    } catch (error) {
      console.error("Error claiming balance:", error);
    }
  };

  const handleEdit = (dancerId: string) => {
    setEditingDancer(dancerId);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full pb-4 border-b-4 border-accent">
      <div className="flex flex-wrap w-full gap-3">
        {dancers.length > 0 &&
          dancers.map((dancer) => (
            <div className="flex flex-row items-center justify-center w-full gap-2 lg:w-5/12">
              <div className="relative size-9" key={dancer.name}>
                {/* <Button
                  size="icon"
                  className={`${
                    isClaiming ? "" : "hidden"
                  } rounded-full absolute group hover:bg-accent bg-accent/35`}
                  onClick={() => {
                    claimLG(dancer._id);
                  }}
                >
                  <Check
                    strokeWidth={3}
                    className="group-hover:stroke-primary"
                  />
                </Button> */}
                <Button
                  size="icon"
                  className={`${
                    isAdvance ? "" : "hidden"
                  } rounded-full absolute group hover:bg-accent bg-accent/35`}
                  onClick={() => {
                    handleEdit(dancer._id);
                  }}
                >
                  <Minus
                    strokeWidth={3}
                    className="group-hover:stroke-primary"
                  />
                </Button>
              </div>
              {editingDancer === dancer._id ? (
                <AdvanceLGForm
                  dancerId={dancer._id}
                  handleCloseForm={() => setEditingDancer(null)}
                />
              ) : (
                <div
                  key={dancer._id}
                  className={` flex flex-row items-center justify-between w-2/3 lg:w-full  px-2 py-1 text-xl tracking-wider uppercase border-2 rounded-lg`}
                >
                  <h1>{dancer.name}</h1>
                  <p
                    className={`${
                      (getDancerLGBalance(dancer._id)?.currentBalance ?? 0) < 0
                        ? "text-[#FFA8AA]"
                        : getDancerLGBalance(dancer._id) &&
                          getDancerLGBalance(dancer._id)!.currentBalance > 0
                        ? ""
                        : "opacity-25"
                    }`}
                  >
                    {currencyFormat(
                      getDancerLGBalance(dancer._id)?.currentBalance || 0
                    )}
                  </p>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SummaryBody;
