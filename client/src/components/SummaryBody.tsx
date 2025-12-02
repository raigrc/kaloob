import { fetchDancers } from "@/api/dancers";
import { fetchAllLGBalances } from "@/api/lg-balance";
import { currencyFormat } from "@/lib/currencyFormat";
import { IDancer, ILGBalance } from "@/types";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Check } from "lucide-react";
import { Minus } from "lucide-react";
import { claimLGBalance } from "@/api/distribution";
import { getAdvanceLG } from "@/api/advance";
import AdvanceLGForm from "./AdvanceLGForm";
import { Link } from "react-router-dom";

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
  const [dancers, setDancers] = useState<IDancer[]>([]);
  const [lgBalance, setLgBalance] = useState<ILGBalance[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [dancersResponse, lgBalanceResponse] = await Promise.all([
        fetchDancers(),
        fetchAllLGBalances(),
      ]);

      if (dancersResponse && dancersResponse.data) {
        setDancers(dancersResponse.data);
      } else {
        setDancers([]);
      }
      if (lgBalanceResponse && lgBalanceResponse.data) {
        setLgBalance(lgBalanceResponse.data);
        console.log(lgBalanceResponse.data);
      } else {
        setLgBalance([]);
      }
    };
    fetchData();
  }, []);

  const getDancerLGBalance = (dancerId: string) => {
    const balance = lgBalance.find((lb) => lb.dancerId === dancerId);
    return balance;
  };

  const claimLG = (dancerId: string) => {
    try {
      claimLGBalance(dancerId);
    } catch (error) {}
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
                <AdvanceLGForm dancerId={dancer._id} />
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
