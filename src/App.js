import './App.css';
import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';

function App() {
  const [values, setValues] = useState(['', '', '']);
  const [selectionRanges, setSelectionRanges] = useState([
    { beforeStart: 0, beforeEnd: 0 },
    { beforeStart: 0, beforeEnd: 0 },
    { beforeStart: 0, beforeEnd: 0 },
  ]);

  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, values.length);
    inputRefs.current = values.map(
      (_, i) => inputRefs.current[i] || React.createRef()
    );
  }, [values]);

  useLayoutEffect(() => {
    inputRefs.current.forEach((ref, index) => {
      if (ref.current) {
        ref.current.setSelectionRange(
          selectionRanges[index].beforeStart,
          selectionRanges[index].beforeEnd
        );
      }
    });
  }, [values, selectionRanges]);

  const handleInputChange = (index, e) => {
    const newValues = [...values];
    newValues[index] = e.target.value.toUpperCase();
    setValues(newValues);

    const newSelectionRanges = [...selectionRanges];
    newSelectionRanges[index] = {
      beforeStart: e.target.selectionStart,
      beforeEnd: e.target.selectionEnd,
    };
    setSelectionRanges(newSelectionRanges);
  };

  const addInputField = () => {
    setValues((prev) => [...prev, '']);
  };

  return (
    <div>
      <InputFields
        values={values}
        inputRefs={inputRefs}
        onInputChange={handleInputChange}
      />
      <button onClick={addInputField}>+</button>
    </div>
  );
}

export default App;

function InputFields({ values, inputRefs, onInputChange }) {
  return (
    <div>
      {values.map((value, index) => (
        <input
          key={index}
          ref={inputRefs.current[index]}
          value={value}
          onChange={(e) => onInputChange(index, e)}
        />
      ))}
    </div>
  );
}

export { InputFields };
