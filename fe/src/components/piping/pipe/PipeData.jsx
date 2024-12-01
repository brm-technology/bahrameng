import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PipeData.css";
import pipeImage from "./Pipe.png";

const PipeData = ({ title, description, apiLink }) => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [npsOptions, setNpsOptions] = useState([]);
  const [schOptions, setSchOptions] = useState([]);
  const [selectedNps, setSelectedNps] = useState("");
  const [selectedSch, setSelectedSch] = useState("");

  const decimalToFraction = (decimal) => {
    const fractionMap = {
      "0.125": "1/8",
      "0.250": "1/4",
      "0.375": "3/8",
      "0.500": "1/2",
      "0.625": "5/8",
      "0.750": "3/4",
      "0.875": "7/8",
    };

    const wholeNumber = Math.floor(decimal);
    const fraction = decimal - wholeNumber;

    if (fraction === 0) return wholeNumber.toString();

    const fractionString = fractionMap[fraction.toFixed(3)];

    return wholeNumber === 0
      ? fractionString || `${fraction.toFixed(3)} (not in map)` // Handle unknown fractions
      : `${wholeNumber} ${fractionString || `${fraction.toFixed(3)} (not in map)`}`; // Handle unknown fractions
  };

  useEffect(() => {
    if (!apiLink) {
      console.warn("API link is missing, skipping data fetch.");
      return;
    }

    axios
      .get(apiLink)
      .then((response) => {
        const data = response.data.map((project) => ({
          ...project,
          NPS: parseFloat(project.NPS).toString(), // Ensure NPS is a string representation of a number
          Sch: project.Sch.toString(),
        }));
        setProjects(data);
        setFilteredProjects(data);

        const nps = [...new Set(data.map((project) => project.NPS))]
          .sort((a, b) => parseFloat(a) - parseFloat(b));
        setNpsOptions(nps);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [apiLink]);

  useEffect(() => {
    let filtered = projects;
    if (selectedNps) {
      filtered = filtered.filter((project) => project.NPS === selectedNps);
      const sch = [...new Set(filtered.map((project) => project.Sch))]
        .sort((a, b) => parseFloat(a) - parseFloat(b));
      setSchOptions(sch);
    } else {
      setSchOptions([]);
    }

    if (selectedSch) {
      filtered = filtered.filter((project) => project.Sch === selectedSch);
    }

    setFilteredProjects(filtered);
  }, [selectedNps, selectedSch, projects]);

  const getSelectedDn = () => {
    const project = projects.find(
      (p) => p.NPS === selectedNps && p.Sch === selectedSch
    );
    return project ? project.DN : "";
  };

  return (
    <div className="container">
      <h1>{title || "No Title Provided"}</h1>
      <h2>{description || "No Description Provided"}</h2>
      <br />
      <br />
      <div className="filters">
        <label className="dropdown-label">
          NPS:&ensp;
          <select
            value={selectedNps}
            onChange={(e) => {
              setSelectedNps(e.target.value);
              setSelectedSch(""); // Reset Sch selection when NPS changes
            }}
          >
            <option value="">Please select...</option>
            {npsOptions.map((nps) => (
              <option key={nps} value={nps}>
                {decimalToFraction(parseFloat(nps))}
              </option>
            ))}
          </select>
        </label>
        <label className="dropdown-label">
          Sch:&ensp;
          <select
            value={selectedSch}
            onChange={(e) => setSelectedSch(e.target.value)}
            disabled={!selectedNps}
          >
            <option value="">Please select...</option>
            {schOptions.map((sch) => (
              <option key={sch} value={sch}>
                {sch}
              </option>
            ))}
          </select>
        </label>
      </div>
      {selectedNps && selectedSch && (
        <div className="project-details">
          <hr />
          <br />
          <h4>
            Size: {decimalToFraction(parseFloat(selectedNps))}" (DN
            {getSelectedDn()}), Sch: {selectedSch}
          </h4>
          {filteredProjects.map((project) => (
            <div
              key={`${project.NPS}-${project.Sch}-${project.OD}`}
              className="project"
            >
              <hr />
              <table className="specs-table">
                <tbody>
                  <tr>
                    <td>
                      <strong>OD:</strong> {project.OD} mm{" "}
                    </td>
                    <td>
                      <strong>ID:</strong>{" "}
                      {(project.OD - project.Thk * 2).toFixed(2)} mm{" "}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Thk:</strong> {project.Thk} mm{" "}
                    </td>
                    <td>
                      <strong>Weight:</strong> {project.Weight} kg/m{" "}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <img
          src={pipeImage}
          alt="Pipe illustration"
          style={{
            width: "50%",
            borderRadius: "15px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        />
      </div>
    </div>
  );
};

export default PipeData;
