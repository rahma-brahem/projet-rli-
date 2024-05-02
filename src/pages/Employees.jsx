import React, { useState } from 'react';
import { Header } from '../components';

const employees = () => {
    const [inputData, setInputData] = useState('');
    const [polynomial, setPolynomial] = useState('');
    const [crcResult, setCrcResult] = useState('');
    const [fullResult, setFullResult] = useState('');

    const calculateCRC = () => {
        let crc = 0;
        const inputDataInt = parseInt(inputData, 2);
        const polynomialInt = parseInt(polynomial, 2);

        for (let i = 0; i < inputData.length; i++) {
            const bit = (inputDataInt >> i) & 1;
            const crcMsb = (crc >> (polynomial.length - 1)) & 1;
            const xorResult = bit ^ crcMsb;
            crc = (crc << 1) | xorResult;
            if (xorResult === 1) {
                crc ^= polynomialInt;
            }
        }

        const finalCrcResult = crc & ((1 << (polynomial.length - 1)) - 1);
        const fullResult = inputData + finalCrcResult.toString(2).padStart(polynomial.length - 1, '0');

        setCrcResult(finalCrcResult.toString(2).padStart(polynomial.length - 1, '0'));
        setFullResult(fullResult);
    };

    const containerStyle = {
        width: '400px',
        padding: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
        margin: '0 auto',
        marginTop: '100px',
    };

    const inputStyle = {
        width: '100%',
        height: '30px',
        marginBottom: '10px',
        padding: '10px',
        border: '2px solid #ccc',
        borderRadius: '5px',
    };
    
    const buttonStyle = {
        width: '100%',
        padding: '10px 0',
        backgroundColor: 'rgb(3, 201, 215)' ,
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '5px',
        
    };
    
    const headerStyle = {
      fontWeight: 'bold', // Ajoutez cette ligne pour mettre en gras
    };
    
    return (
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="CRC Calculator" titleStyle="font-extrabold" />
      
        <div style={containerStyle}>
           
            <form id="crcForm">
                <label htmlFor="inputData">Input Data:</label>
                <input type="text" id="inputData" name="inputData" value={inputData} onChange={(e) => setInputData(e.target.value)} style={inputStyle} /><br /><br />
                <label htmlFor="polynomial">Polynomial:</label>
                <input type="text" id="polynomial" name="polynomial" value={polynomial} onChange={(e) => setPolynomial(e.target.value)} style={inputStyle} /><br /><br />
                <button type="button" onClick={calculateCRC} style={buttonStyle} >Calculate CRC</button>
            </form>
            <br />
            
            <br />
            <p id="crcResult">CRC value: {crcResult}</p>
            <p id="fullResult">transmitted value: {fullResult}</p>
        </div>
        </div>
    );
};

export default employees;
