import { currencyFormat } from "@/lib/currencyFormat";
import { IDancer, IDancerHistory } from "@/types";

const HistoryHeader = ({ dancer }: { dancer: IDancerHistory | null }) => {
  return (
    <div className="flex flex-col items-start justify-between gap-2 p-4 border-b-4 sm:flex-row sm:items-center border-accent">
      <h2 className="text-xl font-bold tracking-wider uppercase sm:text-2xl lg:text-3xl">
        {dancer?.name != null ? dancer.name : "Select dancer"}
      </h2>
      <div className="text-2xl font-bold sm:text-3xl lg:text-4xl text-accent">
        {currencyFormat(dancer?.lgbalance ?? 0)}
      </div>
    </div>
  );
};

export default HistoryHeader;
