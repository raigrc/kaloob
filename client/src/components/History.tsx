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
    <div className="flex flex-col justify-between w-full h-full overflow-hidden font-dity text-accent">
      <HistoryHeader dancer={currentDancer} />
      <div className="h-full ">
        <div className="flex flex-row items-center h-full gap-4">
          <div className="w-3/4 overflow-auto h-[600px] lg:max-h-[800px]">
            <HistoryDancer currentDancer={currentDancer} />
          </div>
          <div className="w-1/4 overflow-y-scroll no-scrollbar h-3/5 bg-[#496C26] p-4">
            {dancers.map((dancer) => (
              <Link to={`/history/${dancer._id}`}>
                <Button
                  key={dancer._id}
                  onClick={() => setCurrentDancer(dancer)}
                  className={`${
                    currentDancer?._id === dancer._id
                      ? "bg-accent text-primary"
                      : "bg-black/0"
                  } w-full my-2 uppercase border-2 rounded-full `}
                >
                  {dancer.name}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* <div className="flex flex-row items-center justify-between h-full gap-4 overflow-auto">
        <div className="w-3/4 h-full overflow-auto bg-red-500">{<Outlet />}</div>
        <div className="w-1/4 overflow-auto no-scrollbar bg-[#496C26] h-4/5 p-4 rounded-lg">
          {dancers.map((dancer) => (
            <Button
              key={dancer._id}
              className="w-full my-2 uppercase border-2 rounded-full bg-black/0"
            >
              <Link to={`/history/${dancer._id}`}>{dancer.name}</Link>
            </Button>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default History;
