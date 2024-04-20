// @ts-nocheck

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Select from 'react-select';
import { useLiquity } from "../hooks/LiquityContext";

export async function SwitchNetwork(newNetwork){
  try {
    if (window.ethereum) {
      await (window as any).ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: newNetwork }],
      });
      const updatedProvider = new ethers.providers.Web3Provider(window.ethereum);

      const currentNetworkId = await updatedProvider.send('eth_chainId');
      console.log(`Current network ID: ${currentNetworkId}`);
    }
  } catch (error) {
    console.error(error);
  }
}

function NetworkSwitcher() {
  const [selectedNetwork, setSelectedNetwork] = useState(); // Default to Base Mainnet
  const [availableNetworks, setAvailableNetworks] = useState([
    { value: '0x2105', label: 'Base' },
    { value: '0x28', label: 'Telos' },
    { value: '0x7A', label: 'Fuse' },
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

    SwitchNetwork(selectedNetwork);
  }, [selectedNetwork]);

  const handleNetworkChange = (selectedOption) => {
    setSelectedNetwork(selectedOption.value);
  };

  const { collateral } = useLiquity();

  return (
    <div style={{ position: "relative" }}>
      <Select
        options={availableNetworks}
        value={{
          value: selectedNetwork,
          label: collateral === "TLOS" ? "Telos" : collateral === "FUSE" ? "Fuse" : "Base"
        }}
        onChange={handleNetworkChange}
        styles={{
          container: (provided) => ({
            ...provided,
            width: 120,
          }),
        }}
      />
    </div>
  );
}

export default NetworkSwitcher;
