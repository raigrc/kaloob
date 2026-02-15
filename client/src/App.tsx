import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import "./App.css";
import DashboardPage from "./pages/DashboardPage";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import AttendanceForm from "./components/AttendanceForm";
import KaloobLogo from "./assets/kaloob.svg?react";
import { History } from "lucide-react";
import HistoryPage from "./pages/HistoryPage";
import HistoryDancer from "./components/HistoryDancer";
import DancerViewPage from "./pages/DancerViewPage";
import { DataProvider } from "./context/DataContext";

const AppContent: React.FC = () => {
  const location = useLocation();
  const currentLoc = location.pathname;
  return (
    <div className="w-full lg:h-screen bg-primary">
      <div className="w-full h-full py-4 mx-auto lg:items-start lg:flex no-scrollbar lg:max-w-7xl">
        <div className="flex flex-col-reverse w-full h-full gap-8 px-4 lg:flex-row">
          <Card className="lg:w-1/3 text-primary">
            <CardHeader className="text-center">
              <CardTitle className="pb-4 text-4xl tracking-wider border-b-4 font-bufferfiveopti border-primary">
                KALOOB TRACKER
              </CardTitle>
            </CardHeader>
            <CardContent className="h-full">
              <AttendanceForm />
            </CardContent>
          </Card>

          <div className="flex flex-col h-full gap-6 lg:w-2/3">
            <div className="flex flex-row items-end justify-between text-accent">
              <div className="flex flex-row items-center gap-6">
                <KaloobLogo width="45" height="50" />
                <h1 className="mt-2 text-4xl font-bold tracking-widest font-bufferfiveopti">
                  {currentLoc.includes("/history")
                    ? "LG HISTORY"
                    : "LG DASHBOARD"}
                </h1>
              </div>
              <Link to={currentLoc === "/" ? "/history" : "/"}>
                <History
                  color={
                    currentLoc.includes("/history") ? "#ffdb28" : "currentColor"
                  }
                />
              </Link>
            </div>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="history" element={<HistoryPage />}>
                <Route path=":_id" element={<HistoryDancer />} />
              </Route>
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <DataProvider>
      <Routes>
        {/* Dancer View Route - No sidebar, public view */}
        <Route path="/dancer-view" element={<DancerViewPage />} />
        <Route path="/dancer-view/:dancerId" element={<DancerViewPage />} />

        {/* Admin Routes - With sidebar */}
        <Route path="/*" element={<AppContent />} />
      </Routes>
    </DataProvider>
  );
};

const AppWrapper: React.FC = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
