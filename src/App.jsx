import { useState } from "react";
import Initial from "./pages/Initial";
import MainMonitoring from "./pages/MainMonitoring";
import AlertHistory from "./pages/AlertHistory";

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
    setPage(newPage);
    console.log(`App: Page should now be: ${newPage}`);
  };

  console.log(`App: Current page state: ${page}`);

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {page === "home" ? (
        <Initial onConnect={handleConnect} />
      ) : page === "monitoring" ? (
        <MainMonitoring 
          storeName={storeName} 
          eventQuery={eventQuery} 
          camType={camType}
          onPageChange={handlePageChange}
        />
      ) : page === "alert-history" ? (
        <AlertHistory onPageChange={handlePageChange} />
      ) : (
        <MainMonitoring 
          storeName={storeName} 
          eventQuery={eventQuery} 
          camType={camType}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
