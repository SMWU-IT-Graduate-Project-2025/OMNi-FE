import { useState } from "react";
import Initial from "./pages/Initial";
import MainMonitoring from "./pages/MainMonitoring";

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

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {page === "home" ? (
        <Initial onConnect={handleConnect} />
      ) : (
        <MainMonitoring storeName={storeName} eventQuery={eventQuery} camType={camType} />
      )}
    </div>
  );
}
