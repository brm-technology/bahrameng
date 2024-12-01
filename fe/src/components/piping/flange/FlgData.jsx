import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FlgData.css";
import FlgImage from "./Flg.png";

const FlgData = ({ title, description, apiLink }) => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [pclOptions, setPclOptions] = useState([]);
  const [npsOptions, setNpsOptions] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedPcl, setSelectedPcl] = useState("");
  const [selectedNps, setSelectedNps] = useState("");

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
      ? fractionString || `${fraction.toFixed(3)} (not in map)`
      : `${wholeNumber} ${fractionString || `${fraction.toFixed(3)} (not in map)`}`;
  };

  useEffect(() => {
    if (!apiLink) {
      console.warn("API link is missing, skipping data fetch.");
      return;
    }

    axios
      .get(apiLink)
      .then((response) => {
        const data = response.data;
        setProjects(data);
        setFilteredProjects(data);

        const types = [...new Set(data.map((item) => item.Type))];
        setTypeOptions(types);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [apiLink]);

  useEffect(() => {
    let filtered = projects;

    if (selectedType) {
      filtered = filtered.filter((project) => project.Type === selectedType);
      const pcl = [...new Set(filtered.map((project) => project.PCL))];
      setPclOptions(pcl);
    } else {
      setPclOptions([]);
    }

    if (selectedPcl) {
      filtered = filtered.filter((project) => project.PCL === selectedPcl);
      const nps = [...new Set(filtered.map((project) => project.NPS))];
      setNpsOptions(nps);
    } else {
      setNpsOptions([]);
    }

    if (selectedNps) {
      filtered = filtered.filter((project) => project.NPS === selectedNps);
    }

    setFilteredProjects(filtered);
  }, [selectedType, selectedPcl, selectedNps, projects]);

  return (
    <div className="container">
      <h1>{title || "No Title Provided"}</h1>
      <h2>{description || "No Description Provided"}</h2>
      <br />
      <div className="filters">
        <label className="dropdown-label">
          Type:&ensp;
          <select
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              setSelectedPcl("");
              setSelectedNps("");
            }}
          >
            <option value="">Please select...</option>
            {typeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <label className="dropdown-label">
          PCL:&ensp;
          <select
            value={selectedPcl}
            onChange={(e) => {
              setSelectedPcl(e.target.value);
              setSelectedNps("");
            }}
            disabled={!selectedType}
          >
            <option value="">Please select...</option>
            {pclOptions.map((pcl) => (
              <option key={pcl} value={pcl}>
                {pcl}
              </option>
            ))}
          </select>
        </label>
        <label className="dropdown-label">
          NPS:&ensp;
          <select
            value={selectedNps}
            onChange={(e) => setSelectedNps(e.target.value)}
            disabled={!selectedPcl}
          >
            <option value="">Please select...</option>
            {npsOptions.map((nps) => (
              <option key={nps} value={nps}>
                {decimalToFraction(parseFloat(nps))}
              </option>
            ))}
          </select>
        </label>
      </div>

      {selectedType && selectedPcl && selectedNps && filteredProjects.length > 0 && (
        <div className="project-details">
          <hr />
          <br />
          {filteredProjects.map((project) => (
            <div key={project.id} className="project">
              <hr />
              <table className="specs-table">
                <tbody>
                  {Object.entries(project)
                    .filter(([key, value]) => value !== "" && !["id", "Type", "PCL", "NPS"].includes(key))
                    .map(([key, value]) => (
                      <tr key={key}>
                        <td>
                          <strong>{key}:</strong> {value}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <img
          src={FlgImage}
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

export default FlgData;
