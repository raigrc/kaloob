import { IDancer, IDancerHistory } from "@/types";
import React, { useEffect, useState } from "react";
import {
  fetchDancerById,
  fetchDancers,
  fetchDancerWithHistory,
} from "@/api/dancers";
import { Button } from "./ui/button";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import HistoryHeader from "./HistoryHeader";
import HistoryDancer from "./HistoryDancer";

const History = () => {
  const [dancers, setDancers] = useState<IDancerHistory[]>([]);
  const [currentDancer, setCurrentDancer] = useState<IDancerHistory | null>(
    null
  );
  const params = useParams();
  const dancerId = params._id;

  useEffect(() => {
    const getDancersWithHistory = async () => {
      try {
        const response = await fetchDancerWithHistory();
        if (response && response.data) {
          setDancers(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getDancersWithHistory();
  }, []);

  useEffect(() => {
    if (dancerId) {
      const current = dancers.find((dancer) => dancer._id === dancerId);
      setCurrentDancer(current || null);
    } else {
      setCurrentDancer(null);
    }
  }, [dancerId, dancers]);

  return (
    <div className="flex flex-col w-full h-full overflow-hidden font-dity text-accent">
      <HistoryHeader dancer={currentDancer} />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 gap-4 p-4 overflow-hidden lg:flex-row">
        {/* History Table - Full width on mobile, 3/4 on desktop */}
        <div className="flex-1 overflow-auto rounded-lg lg:w-3/4">
          <HistoryDancer currentDancer={currentDancer} />
        </div>

        {/* Dancer List - Horizontal scroll on mobile, vertical on desktop */}
        <div className="lg:w-1/4 shrink-0">
          {/* Mobile: Horizontal Scroll */}
          <div className="flex gap-2 pb-2 overflow-x-auto lg:hidden no-scrollbar">
            {dancers.map((dancer) => (
              <Link key={dancer._id} to={`/history/${dancer._id}`}>
                <Button
                  onClick={() => setCurrentDancer(dancer)}
                  className={`${
                    currentDancer?._id === dancer._id
                      ? "bg-accent text-primary"
                      : "bg-[#496C26] text-accent hover:bg-accent/20"
                  } uppercase border-2 border-accent rounded-full px-6 py-2 whitespace-nowrap transition-colors`}
                >
                  {dancer.name}
                </Button>
              </Link>
            ))}
          </div>

          {/* Desktop: Vertical List */}
          <div className="hidden overflow-y-auto bg-[#496C26] rounded-lg p-4 h-full lg:block no-scrollbar">
            {dancers.map((dancer) => (
              <Link key={dancer._id} to={`/history/${dancer._id}`}>
                <Button
                  onClick={() => setCurrentDancer(dancer)}
                  className={`${
                    currentDancer?._id === dancer._id
                      ? "bg-accent text-primary"
                      : "bg-black/0 hover:bg-accent/20"
                  } w-full my-2 uppercase border-2 border-accent rounded-full transition-colors`}
                >
                  {dancer.name}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
