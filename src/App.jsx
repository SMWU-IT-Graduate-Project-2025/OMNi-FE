import { useState } from "react";
import Initial from "./pages/Initial";

export default function OMNiApp() {
  const [page, setPage] = useState("home");

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {page === "home" ? <Initial onConnect={() => setPage("monitoring")} /> : <MonitoringPage />}
    </div>
  );
}

function MonitoringPage() {
  return (
    <div className="p-8 grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="font-bold text-lg mb-2">Live Monitoring</h2>
          <div className="bg-black text-white h-64 flex items-center justify-center rounded-xl relative">
            <span className="text-sm">📷 실시간 영상 스트림</span>
            <span className="absolute top-2 right-2 text-red-400 text-sm">Stopped</span>
          </div>
        </div>
        <div className="bg-white shadow rounded-xl p-4 mt-4">
          <h2 className="font-bold text-lg mb-2">Event Clip Archive</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-[#f4f4f4] p-4 rounded text-center">📁 Clip 1</div>
            <div className="bg-[#f4f4f4] p-4 rounded text-center">📁 Clip 2</div>
            <div className="bg-[#f4f4f4] p-4 rounded text-center">📁 Clip 3</div>
          </div>
        </div>
      </div>
      <div>
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="font-bold text-lg mb-2">🔔 Alerts</h2>
          <ul className="text-sm space-y-2">
            <li>[12:03:15] 이상행동 감지 - 도난 의심</li>
            <li>[11:47:00] 이상행동 감지 - 쓰러짐</li>
            <li>[10:55:42] 이상행동 감지 - 다툼</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
