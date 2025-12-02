import React from "react";
import { Button } from "./ui/button";

const SummaryFooter = ({
  isAdvance,
  setIsAdvance,
  editingDancer,
  setEditingDancer,
}: {
  isClaiming: boolean;
  setIsClaiming: (value: boolean) => void;
  isAdvance: boolean;
  setIsAdvance: (value: boolean) => void;
  isHold: boolean;
  setIsHold: (value: boolean) => void;
  editingDancer: string | null;
  setEditingDancer: (value: string | null) => void;
}) => {
  return (
    <div className="flex items-center justify-center w-full py-4">
      {/* <Button
            className={`w-40 text-xl rounded-full`}
            onClick={() => {
              setIsClaiming(!isClaiming);
              setIsAdvance(false);
            }}
          >
            {isClaiming ? "DONE" : "CLAIM"}
          </Button> */}
      <Button
        className="text-xl w-36 lg:w-80 text-primary"
        variant="secondary"
        onClick={() => {
          setIsAdvance(!isAdvance);
          setEditingDancer(null);
        }}
      >
        {isAdvance ? "DONE" : "CLAIM"}
      </Button>
    </div>
  );
};

export default SummaryFooter;
