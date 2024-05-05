import React, { useState } from 'react';
import { Header } from '../components';

const employees = () => {
    const [direction, setDirection] = useState(5);
    const [req, setReq] = useState(false);
    const [res, setRes] = useState(false);
    const [id, setId] = useState("0x");
    const [data1, setData1] = useState("0x");
    const [data2, setData2] = useState("0x");
    const [data3, setData3] = useState("0x");
    const [data4, setData4] = useState("0x");
    const [crc, setCrc] = useState("");
    const [stuff, setStuff] = useState("");
    
    const [frameFields, setFrameFields] = useState([
      { key: 'sof', name: 'SOF', description: 'Start of Frame', value: "0" },
      { key: 'identifier', name: 'Identifier', description: 'Message Identifier', value: "0" },
      { key: 'rtr', name: 'RTR', description: 'Remote Transmission Request', value: "0" },
      { key: 'controlField', name: 'R1', description: 'User-defined functions', value: "0" },
      { key: 'ide', name: 'R2', description: 'Identifier Extension', value: "0" },
      { key: 'dlc', name: 'DLC', description: 'Data Length Code', value: "0" },
      { key: 'dataField', name: 'Data Field', description: 'Data content', value: "0" },
      { key: 'crcField', name: 'CRC Field', description: 'Cyclic Redundancy Check', value: "" },
      { key: 'ackField', name: 'ACK Field', description: 'Receiver\'s acknowledgment', value: "01" },
      { key: 'eof', name: 'EOF', description: 'End of Frame', value: "1111111" }
    ]);
  
    const calculateCRC = (poly, data) => {
      const polyBits = poly.split('').map(Number);
      const dataBits = data.split('').map(Number);
  
      const paddedData = dataBits.concat(Array(polyBits.length - 1).fill(0));
  
      let remainder = paddedData.slice(); // Initialize remainder with data
      for (let i = 0; i < dataBits.length; i++) {
        if (remainder[i] === 1) {
          for (let j = 0; j < polyBits.length; j++) {
            remainder[i + j] ^= polyBits[j];
          }
        }
      }
  
      return remainder.slice(-polyBits.length + 1).join('');
    };
    const stuffBits = (input) => {
      setStuff("");
      let stuffed = '';
      let consecutiveOnes = 0;
      let consecutiveZeros = 0;
      for (let bit of input) {
        if (bit === '1') {
          consecutiveOnes++;
          consecutiveZeros = 0;
          if (consecutiveOnes === 5) {
            stuffed += '0';
            setStuff(stuff => stuff + "*");
            consecutiveOnes = 0;
          }
        } else {
          consecutiveZeros++;
          consecutiveOnes = 0;
          if (consecutiveZeros === 5) {
            stuffed += '1';
            setStuff(stuff => stuff + "*");
            consecutiveZeros = 0;
          }
        }
        // Ne pas ajouter de * si le bit est déjà un zéro dans les données
        if (bit === '0' && !(consecutiveZeros === 5 || consecutiveZeros === 0)) {
          stuffed += '*';
        }
        // Ne pas ajouter de - si le bit est déjà un un dans les données
        if (bit === '1' && !(consecutiveOnes === 5 || consecutiveOnes === 0)) {
          stuffed += '-';
        }
        stuffed += bit;
      }
      return stuffed;
    };
  
    const hexToBCD = (hex) => {
      let bcd = '';
      for (let i = 2; i < hex.length; i++) {
        const decimal = parseInt(hex[i], 16);
        const binary = decimal.toString(2).padStart(4, '0');
        bcd += binary;
      }
      return bcd;
    };
  
    const createZeroString = (n) => {
      let zeros = "";
      for (let i = 0; i < n; i++) {
        zeros += "0";
      }
      return zeros;
    };
  
    const frame = () => {
      let frameStr = "";
      frameFields.forEach(elt => {
        if (elt.key === 'dataField') {
          // Si le champ est "Data Field", concaténer les données sans les zéros supplémentaires
          frameStr += data1.substring(2); // Ignorer les deux premiers caractères "0x"
          frameStr += data2.substring(2);
          frameStr += data3.substring(2);
          frameStr += data4.substring(2);
        } else {
          frameStr += elt.value;
        }
      });
      return frameStr;
    };
  
    const bitComplete = (limit, binaryString) => {
      while (binaryString.length < limit) {
        binaryString = "0" + binaryString;
      }
      return binaryString;
    };
  
    const dataCount = () => {
      let count = 0;
      data1.length > 2 ? count++ : "";
      data2.length > 2 ? count++ : "";
      data3.length > 2 ? count++ : "";
      data4.length > 2 ? count++ : "";
      let binaryString = count.toString(2).toString();
      return bitComplete(4, binaryString);
    };
  
    const parse = () => {
      let data = "";
      if (hexToBCD(data1).length > 2) {
        data +=  hexToBCD(data1);
      }
      if (hexToBCD(data2).length > 2) {
        data += hexToBCD(data2);
      }
      if (hexToBCD(data3).length > 2) {
        data += hexToBCD(data3);
      }
      if (hexToBCD(data4).length > 2) {
        data += hexToBCD(data4);
      }
      let crcVal = calculateCRC(crc, data);
  
      setFrameFields(prevFields => {
        let newFields = [...prevFields];
        newFields[0].value = hexToBCD(id)[0];
        newFields[1].value = bitComplete(11, hexToBCD(id).substring(1));
        newFields[5].value = dataCount();
        newFields[7].value = bitComplete(15, crcVal);
        if (direction === 0) {
          newFields[2].value = "0";
          newFields[6].value = data;
          setReq(true);
          setRes(false);
        } else if (direction === 1) {
          newFields[2].value = "1";
          newFields[6].value = createZeroString(data.length);
          setReq(false);
          setRes(true);
        }
        return newFields;
      });
  
      stuffBits(frame());
    };
        
    
    return (
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="CAN FRAME" titleStyle="font-extrabold" />
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    <div className="">
      <style>{`
        /* Place your CSS styles here */
        .elements {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }

        .testes {
          margin-left: 20%;
          margin-bottom: 2%;
          border: none;
          padding-top: 20px;
          width: 30%;
          background: repeating-linear-gradient(90deg,
            dimgrey 0, dimgrey 5px,
            transparent 0, transparent 5px)
            0 100%/ calc(30% - 5px) 2px no-repeat;
          font: 4ch droid sans mono, consolas, monospace;
          letter-spacing: 5px;

          &:focus {
            outline: none;
            color:  rgb(3,201,215);
          }
        }

        .id {
          margin-left: 20%;
          margin-bottom: 2%;
          border: none;
          padding-top: 20px;
          width: 30%;
          background: repeating-linear-gradient(90deg,
            dimgrey 0, dimgrey 5px,
            transparent 0, transparent 5px)
            0 100%/ calc(30% - 5px) 2px no-repeat;
          font: 4ch droid sans mono, consolas, monospace;
          letter-spacing: 5px;

          &:focus {
            outline: none;
            color:  rgb(3,201,215);
          }
        }

        .hey {
          width: 100%;
          background-color:  rgb(3,201,215);
          border: none;
          color: white;
          padding: 15px 32px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          margin: 4px 2px;
          transition-duration: 0.4s;
          cursor: pointer;
          border-radius: 8px;
        }

        .hey:hover {
          background-color:  rgb(3,201,255));
        }

        .star {
          display: flex;
          justify-content: center;
        }

        .star label {
          margin: 0 10px;
        }

        .star label {
          cursor: pointer;
          padding: 5px 10px;
          border: 2px solid #333;
          border-radius: 5px;
          transition: all 0.3s ease;
        }

        .star label:hover {
          background-color:  #add8e6;
        }

        .star input[type="radio"]:checked + label {
          background-color: #add8e6;
          color: #fff;
        }
        
        h2 {
          
          text-align: center;
          font-size: 24px;
          color: #333;
          margin-top: 20px;
          text-transform: uppercase;
          font-family: Arial, sans-serif; 
          letter-spacing: 2px;
        }

        .can-frame-table {
          margin-left: 5%;
          width: 100%;
          border-collapse: collapse;
        }

        .can-frame-table th, .can-frame-table td {
          padding: 8px;
          border-bottom: 1px solid #ddd;
          text-align: left;
        }

        .can-frame-table th {
          background-color: #add8e6;;
        }

        .test {
          display: flex;
          flex-direction: column;
        }
      `}</style>
      
      <div className="elements">
        <div>
          <h2 >Enter your id & your Polynom</h2>
          <input className="id" maxLength='5' value={id} onChange={(e) => setId(e.target.value)} />
          <input className="testes" maxLength='16' value={crc} onChange={(e) => setCrc(e.target.value)} />

          <h2>Enter your data</h2>
          <input className="testes" maxLength='6' value={data1} onChange={(e) => setData1(e.target.value)} />
          <input className="testes" maxLength='6' value={data2} onChange={(e) => setData2(e.target.value)} />
          <input className="testes" maxLength='6' value={data3} onChange={(e) => setData3(e.target.value)} />
          <input className="testes" maxLength='6' value={data4} onChange={(e) => setData4(e.target.value)} />
          <div className="star">
            <label>
              <input type="radio" checked={direction === 0} onChange={() => setDirection(0)} /> Request
            </label>
            <label>
              <input type="radio" checked={direction === 1} onChange={() => setDirection(1)} /> Response
            </label>
          </div>
          <button className="hey" onClick={parse}>Decoder</button>
          {res && (
            <div>
              <h2>Parsed CAN Frame : Response</h2>
              <table className="can-frame-table">
                <thead>
                  <tr>
                    <th>Field</th>
                    <th>Description</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                {frameFields.map((field, index) => (
  <tr key={index}>
    <td>{field.name}</td>
    <td>{field.description}</td>
    <td>{field.key === 'dataField' ? frame().replace(/00000/g, '') : field.value}</td>
  </tr>
))}
                </tbody>
              </table>
            </div>
          )}
          {req && (
            <div>
              <h2>Parsed CAN Frame : Request</h2>
              <table className="can-frame-table">
                <thead>
                  <tr>
                    <th>Field</th>
                    <th>Description</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {frameFields.map((field, index) => (
                    <tr key={index}>
                      <td>{field.name}</td>
                      <td>{field.description}</td>
                      <td>{field.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
      </div>
    </div>
    </div>
        
        </div>
    );
};

export default employees;
