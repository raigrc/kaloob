import { fetchAllLGBalances, sumAllLGBalances } from "@/api/lg-balance";
import { currencyFormat } from "@/lib/currencyFormat";
import { ILGBalance } from "@/types";
import { format } from "date-fns";
import { useEffect, useState } from "react";

const SummaryHeader = () => {
  const [totalLGBalance, setTotalLGBalances] = useState<number>(0);
  useEffect(() => {
    const fetchData = async () => {
      const response = await sumAllLGBalances();
      setTotalLGBalances(response);
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="flex flex-row items-center justify-between py-1 text-2xl tracking-wider uppercase border-b-4 border-accent">
        <h2>{format(new Date(), "MMMM yyyy")}</h2>
        <h2>{currencyFormat(totalLGBalance)}</h2>
      </div>
      <div className="flex items-center justify-end py-2 text-xl tracking-wider font-geosanslight">
        TOTAL LG ACCUMULATED
      </div>
    </>
  );
};

export default SummaryHeader;
