import React, { useState, Suspense } from "react";
import "./Piping.css";
import Converter from "../main/Converter";
import StdCalcData from "./StdCalcData";

const Piping = () => {
  const [selectedPipe, setSelectedPipe] = useState(null);
  const [selectedCalculator, setSelectedCalculator] = useState(null);
  const [PipeComponent, setPipeComponent] = useState(null);
  const [CalculatorComponent, setCalculatorComponent] = useState(null);

  // Load selected pipe component dynamically
  const loadPipeComponent = async (item) => {
    setSelectedPipe(item);
    try {
      const importedComponent = await import(`${item.Componlink}`);
      setPipeComponent(() => importedComponent.default);
    } catch (error) {
      console.error("Error loading pipe component:", error);
    }
  };

  // Load selected calculator component dynamically
  const loadCalculatorComponent = async (item) => {
    setSelectedCalculator(item);
    try {
      const importedComponent = await import(`${item.Componclink}`);
      setCalculatorComponent(() => importedComponent.default);
    } catch (error) {
      console.error("Error loading calculator component:", error);
    }
  };

  return (
    <div className="grid-container">
      {/* Top-left box: Standards and Calculators List */}
      <div className="grid-box">
        <StdCalcData
          onPipeSelect={loadPipeComponent}
          onCalculatorSelect={loadCalculatorComponent}
        />
      </div>

      {/* Top-right box: Display selected standard component or default message */}
      <div className="grid-box">
        {PipeComponent && selectedPipe ? (
          <Suspense fallback={<div>Loading standard component...</div>}>
            <PipeComponent
              title={selectedPipe.Title}
              description={selectedPipe.Description}
              apiLink={`${selectedPipe.Apilink}`} // Constructed apiLink
            />
          </Suspense>
        ) : (
          <div className="default-message">Please select a standard...</div>
        )}
      </div>

      {/* Bottom-left box: Static Converter component */}
      <div className="grid-box">
        <Converter />
      </div>

      {/* Bottom-right box: Display selected calculator component or default message */}
      <div className="grid-box">
        {CalculatorComponent && selectedCalculator ? (
          <Suspense fallback={<div>Loading calculator component...</div>}>
            <CalculatorComponent
              title={selectedCalculator.Titlec}
              description={selectedCalculator.Descriptionc}
            />
          </Suspense>
        ) : (
          <div className="default-message">Please select a calculator...</div>
        )}
      </div>
    </div>
  );
};

export default Piping;
