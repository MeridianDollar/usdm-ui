// @ts-nocheck

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Select, { components } from 'react-select';
import { useLiquity } from "../hooks/LiquityContext";

// Import network logos
import baseLogo from "../images/networks/base.svg";
import fuseLogo from "../images/networks/fuse.svg";
import telosLogo from "../images/networks/telos.svg";
import taraxaLogo from "../images/networks/taraxa.png";
import artelaLogo from "../images/networks/artela.png";



// Import other logos as needed

export async function SwitchNetwork(newNetwork) {
  try {
    if (window.ethereum) {
      await window.ethereum.request({
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
  const { collateral } = useLiquity();

  const networks = [
    { value: '0x2105', label: 'Base', logo: baseLogo, chainId: 8453, collateral: 'ETH' },
    { value: '0x28', label: 'Telos', logo: telosLogo, chainId: 40, collateral: 'TLOS' },
    { value: '0x7A', label: 'Fuse', logo: fuseLogo, chainId: 122, collateral: 'FUSE' },
    { value: '0x349', label: 'Taraxa', logo: taraxaLogo, chainId: 841, collateral: 'TARA' },
    { value: '0x2E2C', label: 'Artela', logo: artelaLogo, chainId: 841, collateral: 'ART' },


    // Add more networks as needed
  ];

  const [availableNetworks] = useState(networks);
  const [selectedNetwork, setSelectedNetwork] = useState();

  // Set the selected network based on the collateral
  useEffect(() => {
    const currentNetwork = networks.find((net) => net.collateral === collateral);
    if (currentNetwork) {
      setSelectedNetwork(currentNetwork);
    }
  }, [collateral]);

  useEffect(() => {
    if (selectedNetwork) {
      SwitchNetwork(selectedNetwork.value);
    }
  }, [selectedNetwork]);

  const handleNetworkChange = (selectedOption) => {
    setSelectedNetwork(selectedOption);
  };

  // Custom Option component
  const Option = (props) => (
    <components.Option {...props}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={props.data.logo}
          alt={props.data.label}
          style={{ width: 16, height: 16, marginRight: 8 }}
        />
        <span>{props.data.label}</span>
      </div>
    </components.Option>
  );

  // Custom SingleValue component
  const SingleValue = (props) => (
    <components.SingleValue {...props}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={props.data.logo}
          alt={props.data.label}
          style={{ width: 16, height: 16, marginRight: 8 }}
        />
        <span>{props.data.label}</span>
      </div>
    </components.SingleValue>
  );

  return (
    <div style={{ position: 'relative' }}>
      <Select
        options={availableNetworks}
        value={selectedNetwork}
        onChange={handleNetworkChange}
        components={{ Option, SingleValue }}
        styles={{
          container: (provided) => ({
            ...provided,
            width: 150,
          }),
        }}
      />
    </div>
  );
}

export default NetworkSwitcher;
