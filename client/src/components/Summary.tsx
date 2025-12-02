import React, { useState } from "react";
import SummaryHeader from "./SummaryHeader";
import SummaryBody from "./SummaryBody";
import SummaryFooter from "./SummaryFooter";

const Summary = () => {
  const [isClaiming, setIsClaiming] = useState(false);
  const [isAdvance, setIsAdvance] = useState(false);
  const [editingDancer, setEditingDancer] = useState<string | null>(null);
  const [isHold, setIsHold] = useState(false);

  return (
    <div className="flex flex-col justify-between w-full h-full font-dity text-accent">
      <SummaryHeader />
      <div className="flex flex-col-reverse lg:flex-col">
        <SummaryBody
          isClaiming={isClaiming}
          isAdvance={isAdvance}
          isHold={isHold}
          editingDancer={editingDancer}
          setEditingDancer={setEditingDancer}
        />
        <SummaryFooter
          isClaiming={isClaiming}
          setIsClaiming={setIsClaiming}
          isAdvance={isAdvance}
          setIsAdvance={setIsAdvance}
          isHold={isHold}
          setIsHold={setIsHold}
          setEditingDancer={setEditingDancer}
          editingDancer={editingDancer}
        />
      </div>
    </div>
  );
};

export default Summary;
