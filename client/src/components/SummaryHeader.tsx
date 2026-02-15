import { currencyFormat } from "@/lib/currencyFormat";
import { format } from "date-fns";
import { useData } from "@/context/DataContext";
import { useMemo } from "react";

const SummaryHeader = () => {
  // Get balances from context
  const { lgBalances } = useData();

  // Calculate total from context data (recalculates when lgBalances changes)
  const totalLGBalance = useMemo(() => {
    return lgBalances.reduce(
      (sum, balance) =>
        sum + (balance.totalEarnings - balance.totalDistributions || 0),
      0
    );
  }, [lgBalances]);
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
