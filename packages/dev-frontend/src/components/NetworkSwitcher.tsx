// @ts-nocheck

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Select from 'react-select';


function NetworkSwitcher() {
  const [selectedNetwork, setSelectedNetwork] = useState(); // Default to Base Mainnet
  const [availableNetworks, setAvailableNetworks] = useState([
    { id: '0x2105', name: 'Base' },
    { id: '0x29', name: 'Telos' },
    // Add more networks as needed
  ]);

  useEffect(() => {
    async function changeNetwork() {
      try {
        if (window.ethereum) {
          await (window as any).ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: selectedNetwork }],
          });

          // Get the updated provider with the new network
          const updatedProvider = new ethers.providers.Web3Provider(window.ethereum);

          // Now, you can use updatedProvider for your Ethereum interactions with the new network.
          // For example, get the current network ID:
          const currentNetworkId = await updatedProvider.send('eth_chainId');
          console.log(`Current network ID: ${currentNetworkId}`);
        }
      } catch (error) {
        console.error(error);
      }
    }

    changeNetwork();
  }, [selectedNetwork]);

  const handleNetworkChange = (event) => {
    setSelectedNetwork(event.target.value);
  };

  return (
    <div style={{ position: "relative" }}>
      <select
        id="networkSelect"
        value={selectedNetwork}
        onChange={handleNetworkChange}
        style={{
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          width: "120px",
          backgroundColor: "#a3d4f5ff", // Change this color
          fontSize: "16px",
          color: "#333",
        }}
      >
        {availableNetworks.map((network) => (
          <option key={network.id} value={network.id}>
            {network.name}
          </option>
        ))}
      </select>
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
        }}
      >
        ▼
      </div>
    </div>

  );
}

export default NetworkSwitcher;



