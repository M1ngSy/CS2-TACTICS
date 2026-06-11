import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { HomePage } from "@/pages/HomePage";
import { MapsPage } from "@/pages/MapsPage";
import { MapDetailPage } from "@/pages/MapDetailPage";
import { TacticDetailPage } from "@/pages/TacticDetailPage";
import { FavoritesPage } from "@/pages/FavoritesPage";

export default function App() {
  return (
    <Router>
      <Navbar />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/maps" element={<MapsPage />} />
          <Route path="/maps/:mapId" element={<MapDetailPage />} />
          <Route path="/tactic/:tacticId" element={<TacticDetailPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </main>
    </Router>
  );
}
