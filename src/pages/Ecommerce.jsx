import React from 'react';
import { BsCurrencyDollar } from 'react-icons/bs';
import { GoPrimitiveDot } from 'react-icons/go';
import { IoIosMore } from 'react-icons/io';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

import { Stacked, Pie, Button, LineChart, SparkLine } from '../components';
import { earningData, medicalproBranding, recentTransactions, weeklyStats, dropdownData, SparklineAreaData, ecomPieChartData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import product9 from '../data/product9.jpg';
import product10 from '../data/product10.jpg';

const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent id="time" fields={{ text: 'Time', value: 'Id' }} style={{ border: 'none', color: (currentMode === 'Dark') && 'white' }} value="1" dataSource={dropdownData} popupHeight="220px" popupWidth="120px" />
  </div>
);

const Ecommerce = () => {
  const { currentColor, currentMode } = useStateContext();

  return (
    <div>
      {/* Image représentative du CAN au-dessus de la barre de navigation */}
      <img src={product10} alt="Controller Area Network"  className="w-full max-h-80 mx-auto" />

      {/* Contenu de la page */}
      <div className="mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Qu'est-ce que le Controller Area Network (CAN) ?</h1>
            <p className="mt-4 text-lg text-gray-600">
              Le Controller Area Network (CAN) est un protocole de communication série largement utilisé dans les systèmes embarqués pour la communication entre les microcontrôleurs et les autres périphériques, notamment dans l'automobile, l'industrie et l'automation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ecommerce;
