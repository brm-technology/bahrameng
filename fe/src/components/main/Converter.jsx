import React, { useState, useEffect } from 'react';
import './Converter.css'; // Import the CSS file

const unitOptions = {
  length: [
    { name: 'Meters (m)', factor: 1 },
    { name: 'Kilometers (km)', factor: 1000 },
    { name: 'Centimeters (cm)', factor: 0.01 },
    { name: 'Millimeters (mm)', factor: 0.001 },
    { name: 'Inches (in)', factor: 0.0254 },
    { name: 'Feet (ft)', factor: 0.3048 },
    { name: 'Miles', factor: 1609.344 },
    { name: 'Yards (yd)', factor: 0.9144 },
  ],
  force: [
    { name: 'Newtons (N)', factor: 1 },
    { name: 'Kilo-Newtons (kN)', factor: 1000 },
    { name: 'Pounds-force (lbf)', factor: 4.448221615 },
    { name: 'kips', factor: 4448.222 },
    { name: 'Kilograms-force (kgf)', factor: 9.806650 },
    { name: 'Dynes (dyn)', factor: 0.00001 },
  ],
  mass: [
    { name: 'Grams (g)', factor: 1 },
    { name: 'Kilograms (kg)', factor: 1000 },
    { name: 'Pounds (lbs)', factor: 453.592370 },
    { name: 'Ounces (oz)', factor: 28.34952313 },
    { name: 'Tons (t)', factor: 1e6 },
  ],
  pressure: [
    { name: 'Pascals (Pa)', factor: 1 },
    { name: 'Mega-Pascals (MPa)', factor: 1e6 },
    { name: 'Bar', factor: 100000 },
    { name: 'Atmospheres (atm)', factor: 101325 },
    { name: 'psi', factor: 4.757293168 },
  ],
  temperature: [
    { name: 'Celsius', factor: 1, offset: 0 },
    { name: 'Fahrenheit', factor: 1, offset: 32, convertToCelsius: (f) => (f - 32) * 5 / 9 },
    { name: 'Kelvin', factor: 1, offset: -273.15 },
  ],
  power: [
    { name: 'Watts (w)', factor: 1 },
    { name: 'Kilowatts (kw)', factor: 1000 },
    { name: 'Horsepower (hp)', factor: 745.699872 },
  ],
  area: [
    { name: 'Square Meters', factor: 1 },
    { name: 'Square Kilometers', factor: 1e6 },
    { name: 'Square Feet', factor: 0.09290304 },
    { name: 'Acres', factor: 4046.856422 },
    { name: 'Hectares', factor: 10000 },
  ],
  volume: [
    { name: 'Cubic Meters', factor: 1 },
    { name: 'Liters', factor: 0.001 },
    { name: 'Cubic Feet', factor: 0.0283168 },
    { name: 'Gallons', factor: 0.00378541 },
  ],
  torque: [
    { name: 'Newton-meters', factor: 1 },
    { name: 'Foot-pounds', factor: 1.35582 },
  ],
  velocity: [
    { name: 'Meters per second (m/s)', factor: 1 },
    { name: 'Kilometers per hour (km/h)', factor: 0.277778 },
    { name: 'Miles per hour (mph)', factor: 0.44704 },
  ],
  density: [
    { name: 'Kilograms/cubic meter', factor: 1 },
    { name: 'Pounds/cubic inch', factor: 27679.904 },
    { name: 'Pounds/cubic feet', factor: 16.018463 },
  ],
  viscosity: [
    { name: 'Pascal-seconds', factor: 1 },
    { name: 'Poise', factor: 0.1 },
    { name: 'Centipoise', factor: 0.01 },
  ],
};

const Converter = () => {
    const [category, setCategory] = useState('length');
    const [inputUnit, setInputUnit] = useState(unitOptions['length'][0]?.name || '');
    const [outputUnit, setOutputUnit] = useState(unitOptions['length'][1]?.name || '');
    const [inputValue, setInputValue] = useState('');
    const [outputValue, setOutputValue] = useState('');
  
    useEffect(() => {
      const units = unitOptions[category] || [];
      setInputUnit(units[0]?.name || '');
      setOutputUnit(units[1]?.name || '');
    }, [category]);
  
    const resetFields = () => {
      setInputValue('');
      setOutputValue('');
    };
  
    const handleCategoryChange = (e) => {
      const newCategory = e.target.value;
      setCategory(newCategory);
      resetFields();
    };
  
    const handleInputUnitChange = (e) => {
      setInputUnit(e.target.value);
      resetFields();
    };
  
    const handleOutputUnitChange = (e) => {
      setOutputUnit(e.target.value);
      resetFields();
    };
  
    const formatNumber = (value) => {
      if (!value) return '';
      let number = parseFloat(value);
      number = number.toFixed(8).replace(/(\.\d*?[1-9])0+$/g, '$1').replace(/\.0+$/, '');
      if (parseFloat(number) % 1 === 0) {
        number = parseInt(number, 10).toString();
      }
      return number;
    };
  
    const handleInputChange = (e) => {
      const value = e.target.value;
      setInputValue(value);
  
      if (value) {
        const inputUnitData = unitOptions[category]?.find(unit => unit.name === inputUnit) || {};
        const outputUnitData = unitOptions[category]?.find(unit => unit.name === outputUnit) || {};
  
        let result;
  
        if (category === 'temperature') {
          const celsiusValue = inputUnitData?.convertToCelsius
            ? inputUnitData.convertToCelsius(parseFloat(value))
            : (parseFloat(value) - inputUnitData?.offset || 0);
          result = celsiusValue + (outputUnitData?.offset || 0);
        } else {
          const inputFactor = inputUnitData?.factor || 1;
          const outputFactor = outputUnitData?.factor || 1;
          result = (parseFloat(value) * inputFactor) / outputFactor;
        }
  
        result = Math.round(result * 1e8) / 1e8;
        result = formatNumber(result);
  
        setOutputValue(result);
      } else {
        setOutputValue('');
      }
    };
  
    return (
      <div className="converter-container">
        <h2>Unit Converter</h2><br/>
        <div className="converter-category">
          <select 
            value={category} 
            onChange={handleCategoryChange}
          >
            {Object.keys(unitOptions).map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="converter-inputs">
          <div className="converter-left">
            <div className="converter-unit-selectors">
              <select 
                value={inputUnit} 
                onChange={handleInputUnitChange}
              >
                {unitOptions[category]?.map(unit => (
                  <option key={unit.name} value={unit.name}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
            <input 
              type="number" 
              value={inputValue} 
              onChange={handleInputChange} 
            />
          </div>
  
          <div className="converter-separator"></div>
  
          <div className="converter-right">
            <div className="converter-unit-selectors">
              <select 
                value={outputUnit} 
                onChange={handleOutputUnitChange}
              >
                {unitOptions[category]?.map(unit => (
                  <option key={unit.name} value={unit.name}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
            <input 
              type="text" 
              value={outputValue} 
              readOnly 
            />
          </div>
        </div>
      </div>
    );
  };
  
  export default Converter;