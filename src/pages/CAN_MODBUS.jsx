import React, { useEffect } from 'react';
import { Header } from '../components';
import product9 from '../data/cancars.jpg';
import product10 from '../data/rliIm.jpg';
import modbus from '../data/modbus.jpg';
import modbus1 from '../data/modbus1.jpg';
import table from '../data/tableMODBUS.jpg';
import product from '../data/can2.jpg';
const Orders = () => {
  

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title=" CAN/MODBUS"  titleStyle="font-bold"/>
    <div>
      <h1 className="text-3xl font-bold text-gray-900" text-align="center">What is the Controller Area Network (CAN) ?</h1>
            <p className="mt-4 text-lg text-gray-600">
              The Controller Area Network (CAN) bus is a widely used communication protocol in embedded systems, enabling various components within a system to communicate with each other reliably and robustly.
            </p>
            <img src={product9} alt="Controller Area Network" className="w-64 h-auto mx-auto my-8" />
            <p className="mt-4 text-lg text-gray-600">
              The Controller Area Network (CAN) is a serial communication technology primarily utilized for ensuring dependable data exchange between electronic control units (ECUs) within automotive systems.
            </p>
            <hr className="my-8" />
            <p className="mt-4 text-lg text-gray-600">
              The CAN protocol is a half-duplex protocol.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              Communication on the CAN bus is asynchronous: devices can send messages independently of each other, without needing a shared global clock.
            </p>
            <img src={product} alt="Controller Area Network" className="w-64 h-auto mx-auto my-8" />

            <hr className="my-8" />
            
            <hr className="my-8" />
            <p className="mt-4 text-lg text-gray-600">
              The CAN protocol uses a cyclic redundancy check (CRC) mechanism to detect transmission errors and ensure data integrity.
            </p>
            <hr className="my-8" />
            <h1 className="text-3xl font-bold text-gray-900" text-align="center">What is MODBUS Protocol?</h1>
            <p className="mt-4 text-lg text-gray-600">
            The Modbus protocol was developed by Gould-Modicon in the 1970s to facilitate communication between industrial control equipment. Modicon, now part of Schneider Electric, created Modbus with the aim of standardizing communication between Programmable Logic Controllers (PLCs), sensors, and actuators used in industrial environments.
            </p>
            <hr className="my-8" />
            <p className="mt-4 text-lg text-gray-600">
            The Modbus protocol is simple, open, and widely used in industrial automation due to its reliability and ease of implementation. There are different variants of Modbus, including Modbus RTU (based on binary serial communication) and Modbus TCP (based on TCP/IP for Ethernet networks). These variants provide flexibility in deploying the protocol in various configurations and industrial environments.
            </p>
            <hr className="my-8" />
            <h1 className="text-3xl font-bold text-gray-900" text-align="center">Modbus Protocol and its applications in IoT</h1>
            <img src={modbus} alt="Controller Area Network" className="w-70 h-auto mx-auto my-8" />
            <hr className="my-8" />
            <p className="mt-4 text-lg text-gray-600">
            Modbus is the fundamental network protocol used in most industrial applications today. It is universal, open and an easy to use protocol. Modbus has been around industries for over 30 years, but it’s still the dominant voluntary standard used in almost all major industrial process control, instrumentation and automation products in the market today.
            </p>
            <hr className="my-8" />
            <h1 className="text-3xl font-bold text-gray-900" text-align="center">Modbus Serial Architecture</h1>
            <img src={modbus1} alt="Controller Area Network" className="w-70 h-auto mx-auto my-8" />
            <hr className="my-8" />
            <h1 className="text-3xl font-bold text-gray-900" text-align="center">The difference between Modbus RTU and Modbus ASCII</h1>
            <img src={table} alt="Controller Area Network" className="w-70 h-auto mx-auto my-8" />

          </div>
          </div>
      
  );
};

export default Orders;
