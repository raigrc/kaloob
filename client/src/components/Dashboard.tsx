import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import AttendanceForm from "./AttendanceForm";
import Summary from "./Summary";
import KaloobLogo from "../assets/kaloob.svg?react";
import { History } from "lucide-react";
import { Button } from "./ui/button";

const Dashboard = () => {
  return (
    <>
        <Summary />
      {/* REMOVE HIDDEN ON FUTURE */}
      <div className="absolute bottom-0 flex flex-row items-center justify-center hidden gap-6 left-32 opacity-30 text-accent ">
        <h1>DEVELOPER: RAVEN</h1>
        <h1>DESIGNER: TRIXIE</h1>
      </div>
    </>
  );
};

export default Dashboard;
