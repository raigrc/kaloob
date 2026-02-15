import { useState, useEffect } from "react";
import { fetchDancerWithHistory } from "@/api/dancers";
import { IDancerHistory } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { currencyFormat } from "@/lib/currencyFormat";
import { Card, CardContent } from "@/components/ui/card";

const DancerViewPage = () => {
  const [dancers, setDancers] = useState<IDancerHistory[]>([]);
  const [selectedDancer, setSelectedDancer] = useState<IDancerHistory | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDancers = async () => {
      try {
        const response = await fetchDancerWithHistory();
        if (response && response.data) {
          setDancers(response.data);
        }
      } catch (error) {
        console.error("Error fetching dancers:", error);
      } finally {
        setLoading(false);
      }
    };

    getDancers();
  }, []);

  const handleDancerClick = (dancer: IDancerHistory) => {
    setSelectedDancer(dancer._id === selectedDancer?._id ? null : dancer);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-semibold text-accent">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen p-4 font-dity text-accent bg-primary sm:p-6 lg:p-8">
      <div className="w-full max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <h1 className="text-2xl font-bold tracking-wider text-center uppercase sm:text-3xl lg:text-4xl">
          Dancer Balance Viewer
        </h1>

        {/* Dancers Grid Overview */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {dancers.map((dancer) => (
            <Card
              key={dancer._id}
              onClick={() => handleDancerClick(dancer)}
              className={`cursor-pointer transition-all hover:scale-105 border-2 ${
                selectedDancer?._id === dancer._id
                  ? "border-accent bg-accent text-primary"
                  : "bg-[#496C26] border-accent/30 hover:border-accent hover:bg-[#5a7f30]"
              }`}
            >
              <CardContent className="p-4 space-y-2">
                <h3 className={`text-sm font-bold tracking-wider text-center uppercase sm:text-base ${
                  selectedDancer?._id === dancer._id ? "text-primary" : "text-accent"
                }`}>
                  {dancer.name}
                </h3>
                <p className={`text-xl font-bold text-center sm:text-2xl ${
                  selectedDancer?._id === dancer._id ? "text-primary" : "text-accent"
                }`}>
                  {currencyFormat(dancer.lgbalance ?? 0)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Selected Dancer History */}
        {selectedDancer && (
          <div className="space-y-4 animate-in slide-in-from-top-4">
            {/* Dancer Info Header */}
            <div className="p-6 text-center border-2 rounded-lg bg-accent/5 border-accent">
              <h2 className="mb-2 text-lg font-semibold uppercase sm:text-xl text-accent/80">
                {selectedDancer.name}
              </h2>
              <div className="text-4xl font-bold sm:text-5xl lg:text-6xl text-accent">
                {currencyFormat(selectedDancer.lgbalance ?? 0)}
              </div>
              <p className="mt-2 text-sm text-accent/60">Current Balance</p>
            </div>

            {/* Transaction History */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold tracking-wider uppercase sm:text-2xl">
                Transaction History
              </h3>

              {!selectedDancer.history || selectedDancer.history.length === 0 ? (
                <div className="flex items-center justify-center p-8 text-center border rounded-lg bg-accent/5 border-accent/20">
                  <div className="space-y-2">
                    <p className="text-lg font-semibold text-accent/80">
                      No transactions yet
                    </p>
                    <p className="text-sm text-accent/60">
                      Your transaction history will appear here
                    </p>
                  </div>
                </div>
              ) : (
                <div className="overflow-auto border rounded-lg border-accent/20">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b-2 border-accent/30 hover:bg-transparent">
                        <TableHead className="text-sm font-bold tracking-wider uppercase text-accent sm:text-base">
                          Type
                        </TableHead>
                        <TableHead className="text-sm font-bold tracking-wider text-right uppercase text-accent sm:text-base">
                          Amount
                        </TableHead>
                        <TableHead className="text-sm font-bold tracking-wider uppercase text-accent sm:text-base">
                          Date
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedDancer.history
                        .sort(
                          (a, b) =>
                            new Date(b.date).getTime() - new Date(a.date).getTime()
                        )
                        .map((transaction, idx) => (
                          <TableRow
                            key={idx}
                            className="transition-colors border-b border-accent/10 hover:bg-accent/5"
                          >
                            <TableCell className="py-4">
                              <span
                                className={`inline-flex items-center px-3 py-1 text-xs sm:text-sm font-semibold rounded-full ${
                                  transaction.type === "distribution"
                                    ? "bg-[#FFA8AA]/20 text-[#FFA8AA] border border-[#FFA8AA]/50"
                                    : "bg-[#ffdb28]/20 text-[#ffdb28] border border-[#ffdb28]/50"
                                }`}
                              >
                                {transaction.type === "distribution"
                                  ? "CLAIM"
                                  : "EARNED"}
                              </span>
                            </TableCell>
                            <TableCell className="py-4 text-sm font-semibold text-right sm:text-base">
                              <span
                                className={
                                  transaction.type === "distribution"
                                    ? "text-[#FFA8AA]"
                                    : "text-[#ffdb28]"
                                }
                              >
                                {transaction.type === "distribution" ? "-" : "+"}
                                {currencyFormat(transaction.amount ?? 0)}
                              </span>
                            </TableCell>
                            <TableCell className="py-4 text-xs uppercase sm:text-sm text-accent/80">
                              {format(transaction.date, "MMM dd, yyyy")}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="p-4 border rounded-lg bg-accent/5 border-accent/20">
                <p className="text-sm font-semibold uppercase text-accent/60">
                  Total Earned
                </p>
                <p className="text-2xl font-bold text-[#ffdb28]">
                  {currencyFormat(
                    selectedDancer.history
                      ?.filter((h) => h.type === "attendance")
                      .reduce((sum, h) => sum + (h.amount ?? 0), 0) ?? 0
                  )}
                </p>
              </div>
              <div className="p-4 border rounded-lg bg-accent/5 border-accent/20">
                <p className="text-sm font-semibold uppercase text-accent/60">
                  Total Claimed
                </p>
                <p className="text-2xl font-bold text-[#FFA8AA]">
                  {currencyFormat(
                    selectedDancer.history
                      ?.filter((h) => h.type === "distribution")
                      .reduce((sum, h) => sum + (h.amount ?? 0), 0) ?? 0
                  )}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DancerViewPage;
