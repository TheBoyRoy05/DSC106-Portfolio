import { Route, Routes } from "react-router-dom";
import HomePage from "./Components/Home/HomePage";
import ProjectsPage from "./Components/Projects/ProjectsPage";
import BlogPage from "./Components/Blog/BlogPage.tsx";
import AboutMePage from "./Components/About/AboutMePage";
import ContactMePage from "./Components/Contact/ContactMePage";
import YipYapPage from "./Components/Projects/YipYapPage";
import SortingVizPage from "./Components/Projects/SortingVizPage";
import ResumePage from "./Components/Other/ResumePage.tsx";
import { useEffect } from "react";
import MetaPage from "./Components/Meta/MetaPage.tsx";

function App() {
  useEffect(() => {
    console.log("IT'S ALIVE!");

    if (localStorage.getItem("theme") === "dark") document.documentElement.classList.add("dark");
    else if (localStorage.getItem("theme") === "light")
      document.documentElement.classList.remove("dark");
    else if (localStorage.getItem("theme") === "system")
      document.documentElement.classList.toggle(
        "dark",
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about-me" element={<AboutMePage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/contact-me" element={<ContactMePage />} />
      <Route path="/resume" element={<ResumePage />} />
      <Route path="/meta" element={<MetaPage />} />
      <Route path="/yipyap" element={<YipYapPage />} />
      <Route path="/sorting-visualizer" element={<SortingVizPage />} />
    </Routes>
  );
}

export default App;
