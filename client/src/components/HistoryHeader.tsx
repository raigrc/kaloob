import { currencyFormat } from "@/lib/currencyFormat";
import { IDancer, IDancerHistory } from "@/types";

const HistoryHeader = ({ dancer }: { dancer: IDancerHistory | null }) => {
  return (
    <>
      <div className="flex flex-row items-center justify-between py-1 text-2xl tracking-wider uppercase border-b-4 border-accent">
        <h2 className="uppercase">
          {dancer?.name != null ? dancer.name : "Select dancer"}
        </h2>
        <h2>{currencyFormat(dancer?.lgbalance ?? 0)}</h2>
      </div>
    </>
  );
};

export default HistoryHeader;
