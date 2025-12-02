import { fetchDancerById, fetchDancerWithHistory } from "@/api/dancers";
import { fetchLGBalanceByID } from "@/api/lg-balance";
import { IDancer, IDancerHistory, ILGBalance } from "@/types";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { format } from "date-fns";

const HistoryDancer = ({
  currentDancer,
}: {
  currentDancer?: IDancerHistory | null;
}) => {
  return (
    <>
      <Table align="center">
        <TableHeader>
          <TableRow>
            <TableHead>STATUS</TableHead>
            <TableHead>AMOUNT</TableHead>
            <TableHead>DATE</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentDancer?.history?.map((history, idx) => (
            <TableRow key={idx}>
              <TableCell
                className={`${
                  history.type === "distribution"
                    ? "text-[#FFA8AA]"
                    : "text-[#ffdb28]"
                }`}
              >
                {history.type === "distribution" ? "CLAIM" : "DANCED"}
              </TableCell>
              <TableCell>{history.amount}</TableCell>
              <TableCell className="uppercase">{format(history.date, "MMM dd, yyyy")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default HistoryDancer;
