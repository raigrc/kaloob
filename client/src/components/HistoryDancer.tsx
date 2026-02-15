import { IDancerHistory } from "@/types";
import { useEffect, useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { format } from "date-fns";
import { currencyFormat } from "@/lib/currencyFormat";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const HistoryDancer = ({
  currentDancer,
}: {
  currentDancer?: IDancerHistory | null;
}) => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [filterType, setFilterType] = useState<"all" | "attendance" | "distribution">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Reset filters when dancer changes
  useEffect(() => {
    setSortOrder("desc");
    setFilterType("all");
    setSearchQuery("");
    setStartDate("");
    setEndDate("");
  }, [currentDancer?._id]);

  // Filter and sort history
  const filteredHistory = useMemo(() => {
    if (!currentDancer?.history) return [];

    let filtered = [...currentDancer.history];

    // Filter by type
    if (filterType !== "all") {
      filtered = filtered.filter((h) => h.type === filterType);
    }

    // Filter by date range
    if (startDate || endDate) {
      filtered = filtered.filter((h) => {
        const historyDate = new Date(h.date);
        const start = startDate ? new Date(startDate) : new Date(0);
        const end = endDate ? new Date(endDate) : new Date();

        return historyDate >= start && historyDate <= end;
      });
    }

    // Search filter (searches in type and formatted amount)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((h) => {
        const type = h.type === "distribution" ? "claim" : "danced";
        const amount = h.amount?.toString() || "";
        const date = format(h.date, "MMM dd, yyyy").toLowerCase();

        return type.includes(query) || amount.includes(query) || date.includes(query);
      });
    }

    // Sort by date
    filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    return filtered;
  }, [currentDancer?.history, sortOrder, filterType, searchQuery, startDate, endDate]);

  // Show empty state if no dancer selected
  if (!currentDancer) {
    return (
      <div className="flex items-center justify-center h-full p-8 text-center">
        <div className="space-y-2">
          <p className="text-xl font-semibold text-accent/80">
            No dancer selected
          </p>
          <p className="text-sm text-accent/60">
            Select a dancer from the list to view their history
          </p>
        </div>
      </div>
    );
  }

  // Show empty state if dancer has no history
  if (!currentDancer.history || currentDancer.history.length === 0) {
    return (
      <div className="flex items-center justify-center h-full p-8 text-center">
        <div className="space-y-2">
          <p className="text-xl font-semibold text-accent/80">
            No history yet
          </p>
          <p className="text-sm text-accent/60">
            {currentDancer.name} has no transaction history
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full gap-4">
      {/* Filter Bar */}
      <div className="p-4 space-y-4 border rounded-lg bg-accent/5 border-accent/20">
        {/* Search Bar */}
        <div className="w-full">
          <Input
            type="text"
            placeholder="Search by type, amount, or date..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-primary border-accent/30 text-accent placeholder:text-accent/50"
          />
        </div>

        {/* Filters Row */}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          {/* Type Filters */}
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => setFilterType("all")}
              variant={filterType === "all" ? "default" : "outline"}
              className={`text-xs sm:text-sm ${
                filterType === "all"
                  ? "bg-accent text-primary"
                  : "bg-transparent border-accent text-accent hover:bg-accent/20"
              }`}
            >
              All
            </Button>
            <Button
              onClick={() => setFilterType("attendance")}
              variant={filterType === "attendance" ? "default" : "outline"}
              className={`text-xs sm:text-sm ${
                filterType === "attendance"
                  ? "bg-[#ffdb28] text-primary border-[#ffdb28]"
                  : "bg-transparent border-[#ffdb28] text-[#ffdb28] hover:bg-[#ffdb28]/20"
              }`}
            >
              Danced
            </Button>
            <Button
              onClick={() => setFilterType("distribution")}
              variant={filterType === "distribution" ? "default" : "outline"}
              className={`text-xs sm:text-sm ${
                filterType === "distribution"
                  ? "bg-[#FFA8AA] text-primary border-[#FFA8AA]"
                  : "bg-transparent border-[#FFA8AA] text-[#FFA8AA] hover:bg-[#FFA8AA]/20"
              }`}
            >
              Claims
            </Button>
          </div>

          {/* Sort Buttons */}
          <div className="flex gap-2">
            <Button
              onClick={() => setSortOrder("desc")}
              variant={sortOrder === "desc" ? "default" : "outline"}
              className={`text-xs sm:text-sm ${
                sortOrder === "desc"
                  ? "bg-accent text-primary"
                  : "bg-transparent border-accent text-accent hover:bg-accent/20"
              }`}
            >
              Newest
            </Button>
            <Button
              onClick={() => setSortOrder("asc")}
              variant={sortOrder === "asc" ? "default" : "outline"}
              className={`text-xs sm:text-sm ${
                sortOrder === "asc"
                  ? "bg-accent text-primary"
                  : "bg-transparent border-accent text-accent hover:bg-accent/20"
              }`}
            >
              Oldest
            </Button>
          </div>
        </div>

        {/* Date Range */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="text-sm font-semibold text-accent whitespace-nowrap">
            Date Range:
          </label>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-primary border-accent/30 text-accent"
            />
            <span className="text-sm text-center text-accent/60 sm:text-base">to</span>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-primary border-accent/30 text-accent"
            />
            {(startDate || endDate) && (
              <Button
                onClick={() => {
                  setStartDate("");
                  setEndDate("");
                }}
                variant="ghost"
                className="text-xs text-accent hover:text-accent hover:bg-accent/20"
              >
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="text-sm text-accent/60">
          Showing {filteredHistory.length} of {currentDancer.history.length} transactions
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto rounded-lg">
        {filteredHistory.length === 0 ? (
          <div className="flex items-center justify-center h-full p-8 text-center">
            <div className="space-y-2">
              <p className="text-lg font-semibold text-accent/80">
                No matching transactions
              </p>
              <p className="text-sm text-accent/60">
                Try adjusting your filters or search query
              </p>
            </div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-b-2 border-accent/30 hover:bg-transparent">
                <TableHead className="text-sm font-bold tracking-wider uppercase text-accent sm:text-base">
                  Status
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
              {filteredHistory.map((history, idx) => (
                <TableRow
                  key={idx}
                  className="transition-colors border-b border-accent/10 hover:bg-accent/5"
                >
                  <TableCell className="py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 text-xs sm:text-sm font-semibold rounded-full ${
                        history.type === "distribution"
                          ? "bg-[#FFA8AA]/20 text-[#FFA8AA] border border-[#FFA8AA]/50"
                          : "bg-[#ffdb28]/20 text-[#ffdb28] border border-[#ffdb28]/50"
                      }`}
                    >
                      {history.type === "distribution" ? "CLAIM" : "DANCED"}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 text-sm font-semibold text-right sm:text-base text-accent">
                    <span
                      className={
                        history.type === "distribution"
                          ? "text-[#FFA8AA]"
                          : "text-[#ffdb28]"
                      }
                    >
                      {history.type === "distribution" ? "-" : "+"}
                      {currencyFormat(history.amount ?? 0)}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 text-xs uppercase sm:text-sm text-accent/80">
                    {format(history.date, "MMM dd, yyyy")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default HistoryDancer;
