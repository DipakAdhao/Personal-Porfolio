import React, { useState, useEffect } from "react";
import $ from "jquery";
import "./App.scss"; // Import your global styles here if needed
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";

const App = () => {
  const [resumeData, setResumeData] = useState({});
  const [sharedData, setSharedData] = useState({});
  const [currentLanguage, setCurrentLanguage] = useState(window.$primaryLanguage);

  const applyPickedLanguage = (pickedLanguage) => {
    setCurrentLanguage(pickedLanguage);
    const resumePath =
      pickedLanguage === window.$primaryLanguage
        ? `res_primaryLanguage.json`
        : `res_secondaryLanguage.json`; // Assuming this is where you load your data based on language
    loadResumeFromPath(resumePath);
  };

  const loadResumeFromPath = (path) => {
    $.ajax({
      url: path,
      dataType: "json",
      cache: false,
      success: function (data) {
        setResumeData(data);
      },
      error: function (xhr, status, err) {
        alert(err);
      },
    });
  };

  const loadSharedData = () => {
    $.ajax({
      url: `portfolio_shared_data.json`,
      dataType: "json",
      cache: false,
      success: function (data) {
        setSharedData(data);
        document.title = `${data.basic_info.name}`;
      },
      error: function (xhr, status, err) {
        alert(err);
      },
    });
  };

  useEffect(() => {
    loadSharedData();
    applyPickedLanguage(window.$primaryLanguage);
  }, []);

  return (
    <div>
      <Header sharedData={sharedData.basic_info} />
      <div className="col-md-12 mx-auto text-center language">
        <div
          onClick={() => applyPickedLanguage(window.$primaryLanguage)}
          style={{
            display: "inline-block",
            cursor: "pointer",
            fontSize: "18px",
            fontWeight: "bold",
            padding: "8px 16px",
            borderRadius: "5px",
            margin: "0 10px",
            backgroundColor: currentLanguage === window.$primaryLanguage ? "#007bff" : "#f0f0f0", // Blue or default background color
            color: currentLanguage === window.$primaryLanguage ? "#fff" : "#333", // White or default text color
            transition: "background-color 0.3s ease, color 0.3s ease",
          }}
        >
          ENG
        </div>
        <div
          onClick={() => applyPickedLanguage(window.$secondaryLanguage)}
          style={{
            display: "inline-block",
            cursor: "pointer",
            fontSize: "18px",
            fontWeight: "bold",
            padding: "8px 16px",
            borderRadius: "5px",
            margin: "0 10px",
            backgroundColor: currentLanguage === window.$secondaryLanguage ? "#28a745" : "#f0f0f0", // Green or default background color
            color: currentLanguage === window.$secondaryLanguage ? "#fff" : "#333", // White or default text color
            transition: "background-color 0.3s ease, color 0.3s ease",
          }}
        >
          HI
        </div>
      </div>
      <About
        resumeBasicInfo={resumeData.basic_info}
        sharedBasicInfo={sharedData.basic_info}
      />
      <Projects
        resumeProjects={resumeData.projects}
        resumeBasicInfo={resumeData.basic_info}
      />
      <Skills
        sharedSkills={sharedData.skills}
        resumeBasicInfo={resumeData.basic_info}
      />
      <Experience
        resumeExperience={resumeData.experience}
        resumeBasicInfo={resumeData.basic_info}
      />
      <Footer sharedBasicInfo={sharedData.basic_info} />
    </div>
  );
};

export default App;
