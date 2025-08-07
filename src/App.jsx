import { useState } from "react";
import Initial from "./pages/Initial";
import MainMonitoring from "./pages/MainMonitoring";
import AlertHistory from "./pages/AlertHistory";
import EventDB from "./pages/EventDB";

export default function OMNiApp() {
  const [page, setPage] = useState("home");
  const [storeName, setStoreName] = useState("");
  const [eventQuery, setEventQuery] = useState("");
  const [camType, setCamType] = useState("");

  const handleConnect = (store, event, cam) => {
    setStoreName(store);
    setEventQuery(event);
    setCamType(cam);
    setPage("monitoring");
  };

  const handlePageChange = (newPage) => {
    console.log(`App: handlePageChange called with page: ${newPage}`);
    console.log(`App: Current page before change: ${page}`);
    console.log(`App: EventDB component imported:`, !!EventDB);
    setPage(newPage);
    console.log(`App: Page should now be: ${newPage}`);
  };

  console.log(`App: Current page state: ${page}`);
  console.log(`App: EventDB component available:`, !!EventDB);

  const renderCurrentPage = () => {
    console.log(`App: Rendering page: ${page}`);
    
    if (page === "home") {
      return <Initial onConnect={handleConnect} />;
    } else if (page === "monitoring") {
      return (
        <MainMonitoring 
          storeName={storeName} 
          eventQuery={eventQuery} 
          camType={camType}
          onPageChange={handlePageChange}
        />
      );
    } else if (page === "alert-history") {
      return <AlertHistory onPageChange={handlePageChange} />;
    } else if (page === "event-db") {
      console.log("App: Rendering EventDB component");
      return <EventDB onPageChange={handlePageChange} />;
    } else {
      return (
        <MainMonitoring 
          storeName={storeName} 
          eventQuery={eventQuery} 
          camType={camType}
          onPageChange={handlePageChange}
        />
      );
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {renderCurrentPage()}
    </div>
  );
}
