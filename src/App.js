import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../src/components/Header/Header";
import Footer from "../src/components/Footer/Footer";
import Home from "../src/components/Home/Home";
import Artisan from "../src/components/Artisan/Artisan";
import Alimentation from "../src/components/Services/Alimentation";
import Batiment from "../src/components/Services/Batiment";
import Fabrication from "../src/components/Services/Fabrication";
import Services from "../src/components/Services/Services";
import artisans from "../src/datas/datas.json";
import LegalMentions from "../src/components/Legal/Mentions";
import LegalPersonal from "../src/components/Legal/Personal";
import LegalAccessibility from "../src/components/Legal/Accessibility";
import LegalCookies from "../src/components/Legal/Cookies";
import Error404 from "./components/404/404";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredArtisans, setFilteredArtisans] = useState(artisans);

  const handleSearch = (searchTerm) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();

    if (!lowerCaseSearchTerm) {
      setFilteredArtisans(artisans);
      return;
    }

    const filteredResults = artisans.filter((artisan) => {
      const lowerCaseName = artisan.name.toLowerCase();
      const lowerCaseSpecialty = artisan.specialty.toLowerCase();
      const lowerCaseLocation = artisan.location.toLowerCase();

      return (
        lowerCaseName.includes(lowerCaseSearchTerm) ||
        lowerCaseSpecialty.includes(lowerCaseSearchTerm) ||
        lowerCaseLocation.includes(lowerCaseSearchTerm)
      );
    });

    setFilteredArtisans(filteredResults);
    setSearchTerm(lowerCaseSearchTerm);
  };

  return (
    <Router>
      <Header
        onSearch={handleSearch}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <Routes>
        <Route path="/" element={<Home artisans={filteredArtisans} />} />
        <Route path="/artisan/:id" element={<Artisan />} />
        <Route
          path="/alimentation"
          element={
            <Alimentation
              artisans={filteredArtisans}
              searchResults={filteredArtisans}
            />
          }
        />
        <Route
          path="/batiment"
          element={
            <Batiment
              artisans={filteredArtisans}
              searchResults={filteredArtisans}
            />
          }
        />
        <Route
          path="/fabrication"
          element={
            <Fabrication
              artisans={filteredArtisans}
              searchResults={filteredArtisans}
            />
          }
        />
        <Route
          path="/services"
          element={
            <Services
              artisans={filteredArtisans}
              searchResults={filteredArtisans}
            />
          }
        />
        <Route path="/legal/mentions" element={<LegalMentions />} />
        <Route path="/legal/personal" element={<LegalPersonal />} />
        <Route path="/legal/accessibility" element={<LegalAccessibility />} />
        <Route path="/legal/cookies" element={<LegalCookies />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
