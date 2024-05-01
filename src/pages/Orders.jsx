import React, { useEffect } from 'react';
import { Header } from '../components';

const Orders = () => {
  const decodeFrame = () => {
    var canFrames = document.getElementById('canFrame').value.trim();
    var decodedResult = document.getElementById('decodedResult');
    var frameCount = document.getElementById('frameCount');

    if (canFrames === '') {
      alert('Veuillez entrer une chaîne de trame CAN valide.');
      frameCount.innerHTML = '';
      decodedResult.innerHTML = '';
      return;
    }

    var frames = canFrames.match(/.{10}/g);

    frameCount.innerHTML = 'Nombre de trames : ' + frames.length;

    var decodedFrames = [];
    for (var i = 0; i < frames.length; i++) {
      var frame = frames[i];
      var startBit = frame.charAt(0);
      var firstWord = frame.substring(1, 5);
      var secondWord = frame.substring(5, 9);
      var stopBit = frame.charAt(9);

      var reversedFirstWord = firstWord.split('').reverse().join('');
      var reversedSecondWord = secondWord.split('').reverse().join('');

      var hexFirstWord = parseInt(reversedFirstWord, 2).toString(16).toUpperCase();
      var hexSecondWord = parseInt(reversedSecondWord, 2).toString(16).toUpperCase();

      decodedFrames.push('<span class="decoded-frame"> mot : ' + hexSecondWord + hexFirstWord + '</span>');
    }

    decodedResult.innerHTML = decodedFrames.join('<br>');

    document.getElementById('canFrame').classList.add('rotate');
    updateBitDiagram();
  };

  useEffect(() => {
    document.body.style.display = 'block'; // Afficher le body une fois que React a rendu la page
  }, []);

  const generateBitDiagram = (frame) => {
    var bitsContainer = document.getElementById('bits-container');
    bitsContainer.innerHTML = '';

    for (var i = 0; i < frame.length; i++) {
      var bit = frame.charAt(i);
      var bitElement = document.createElement('div');
      bitElement.classList.add('bit');
      if (bit === '1') {
        bitElement.classList.add('bit-active');
      }
      bitsContainer.appendChild(bitElement);
    }
  };

  const updateBitDiagram = () => {
    var canFrame = document.getElementById('canFrame').value.trim();
    if (canFrame === '') {
      generateBitDiagram('0000000000');
    } else {
      generateBitDiagram(canFrame);
    }
  };

  return (
    <div>
      <Header category="Page" title="Decoder CAN" />
      <div className="container">
        <h2 style={{ textAlign: 'center' }}>Decoder CAN</h2>
        <textarea id="canFrame" placeholder="Entrez la trame CAN ici..."></textarea>
        <button onClick={decodeFrame}>Décoder</button>
        <div id="decodedResult"></div>
        <p id="frameCount"></p>
        <a href="index2.html">CRC and transmitted signal</a>
        <br />
        <a href="index3.html">CRC (calcul detaillé)</a>
      </div>

      <div id="bit-diagram">
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div id="bits-container"></div>
      </div>

      <style>
        {`
          #bit-diagram {
              margin-top: 20px;
          }

          #bits-container {
              display: flex;
              justify-content: center;
          }

          .bit {
              width: 60px;
              height: 60px;
              border: 3px solid #000;
              margin: 0 6px;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 20px;
          }

          .bit-active {
              background-color: #0f0;
          }

          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-image: url('test3.jpg');
              background-size: cover;
              background-position: center;
              background-repeat: no-repeat;
              height: 100vh;
              overflow: auto;
              display: none; /* Cacher la page initialement */
          }

          .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: rgba(255, 255, 255, 0.8);
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
              text-align: center;
          }

          textarea {
              width: 100%;
              height: 100px;
              margin-bottom: 10px;
              padding: 10px;
              border: 2px solid #ccc;
              border-radius: 5px;
              resize: none;
          }

          button {
              padding: 10px 20px;
              background-color: #4CAF50;
              color: white;
              border: none;
              cursor: pointer;
              border-radius: 5px;
          }

          button:hover {
              background-color: #45a049;
          }

          #decodedResult {
              margin-top: 20px;
          }

          #frameCount {
              margin-top: 20px;
              font-weight: bold;
          }

          .decoded-frame {
              font-family: 'Courier New', Courier, monospace;
              font-size: 16px;
              line-height: 1.5;
          }

          @keyframes rotate {
              from {
                  transform: rotate(0deg);
              }

              to {
                  transform: rotate(360deg);
              }
          }

          .rotate {
              animation: rotate 2s linear;
          }
        `}
      </style>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
      <script src="script.js"></script>
    </div>
  );
};

export default Orders;
