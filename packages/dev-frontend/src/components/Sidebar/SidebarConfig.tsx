import { IconType } from "react-icons";
import { FaCoins, FaHandshake, FaChartLine, FaArchway, FaSeedling, FaBitcoin, FaHandHoldingUsd, FaBookReader, FaEllipsisH  } from "react-icons/fa";

const BASE_MAINNET = 8453
const FUSE_MAINNET = 122
const METER_MAINNET = 82
const TELOS_MAINNET = 40

export interface InAppPath {
  name: string;
  path: string;
}

export interface SubMenuItemConfig {
    networkId: number;
    name: string;
    path: string;
    subSubMenu?: InAppPath[]
  }

export interface MenuItemConfig {
  icon: IconType;
  title: string;
  path: string;
  subMenu?: SubMenuItemConfig[];
}

const menuConfig: MenuItemConfig[] = [
  { icon: FaCoins,
    title: "Mint USDM",
    path: "https://mint.meridianfinance.net/",
    subMenu: [
        {networkId: BASE_MAINNET, name: "Base", path: "https://mint.meridianfinance.net/",
          subSubMenu:[
            {name: "Trove", path: "/"},
            {name: "Stability Pool", path: "/pool"},
            {name: "Staking", path: "/staking"},
            {name: "Risky Troves", path: "/risky-troves"},
            {name: "Redemptions", path: "/redemption"},
           ]
        },
        {networkId: FUSE_MAINNET, name: "Fuse", path: "https://mint.meridianfinance.net/",
        subSubMenu:[
          {name: "Trove", path: "/"},
          {name: "Stability Pool", path: "/pool"},
          {name: "Staking", path: "/staking"},
          {name: "Risky Troves", path: "/risky-troves"},
          {name: "Redemptions", path: "/redemption"},
         ]
        },
        {networkId: TELOS_MAINNET, name: "Telos", path: "https://mint.meridianfinance.net/",
        subSubMenu:[
          {name: "Trove", path: "/"},
          {name: "Stability Pool", path: "/pool"},
          {name: "Staking", path: "/staking"},
          {name: "Risky Troves", path: "/risky-troves"},
          {name: "Redemptions", path: "/redemption"},
         ]
        },
      ] },
  { icon: FaHandshake, 
    title: "Lend/Borrow",
    path: "https://lend.meridianfinance.net/",
    subMenu: [
        {networkId: FUSE_MAINNET, name: "Fuse", path: "https://lend.meridianfinance.net/"},
        {networkId: METER_MAINNET, name: "Meter", path: "https://lend.meridianfinance.net/"},
        {networkId: TELOS_MAINNET, name: "Telos", path: "https://lend.meridianfinance.net/"},
      ] },
  { icon: FaChartLine,
    title: "Trade",
    path: "https://trade.meridianfinance.net/#/trade",
    subMenu: [
        {networkId: BASE_MAINNET, name: "Base", path: "https://trade.meridianfinance.net/#/trade"},
      ] },
  { icon: FaSeedling,
    title: "Stake MST",
    path: "https://stake.meridianfinance.net/#/stakemst", 
    subMenu: [
        {networkId: BASE_MAINNET, name: "Base", path: "https://stake.meridianfinance.net/#/stakemst"},
        {networkId: FUSE_MAINNET, name: "Fuse", path: "https://stake.meridianfinance.net/#/stakemst"},
        {networkId: METER_MAINNET, name: "Meter", path: "https://stake.meridianfinance.net/#/stakemst"},
        {networkId: TELOS_MAINNET, name: "Telos", path: "https://stake.meridianfinance.net/#/stakemst"},
      ] },
  { icon: FaArchway,
    title: "Bridge MST",
    path: "https://bridge.meridianfinance.net/#/", },
  { icon: FaBitcoin,
    title: "Buy MST",
    path: "",
    subMenu: [
      {networkId: BASE_MAINNET, name: "Base/Uniswap", path: "https://app.uniswap.org/swap?exactField=input&exactAmount=0&outputCurrency=0x2F3b1A07E3eFb1fCc64BD09b86bD0Fa885D93552&inputCurrency=0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913&chain=base"},
      {networkId: FUSE_MAINNET, name: "Fuse/Voltage", path: "https://voltage.finance/swap?outputCurrency=0x2363Df84fDb7D4ee9d4E1A15c763BB6b7177eAEe"},
      {networkId: METER_MAINNET, name: "Meter", path: ""},
      {networkId: TELOS_MAINNET, name: "Telos/Swapsicle", path: "https://telos.swapsicle.io/swap?outputCurrency=0x568524DA340579887db50Ecf602Cd1BA8451b243&inputCurrency=0x8D97Cea50351Fb4329d591682b148D43a0C3611b"},
    ] },
  { icon: FaHandHoldingUsd, 
    title: "Buy USDM",
    path: "",
    subMenu: [
      {networkId: BASE_MAINNET, name: "Base/Uniswap", path: "https://app.uniswap.org/swap?exactField=input&exactAmount=0&outputCurrency=0x5e06eA564efcB3158a85dBF0B9E017cb003ff56f&inputCurrency=0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913&chain=base"},
      {networkId: FUSE_MAINNET, name: "Fuse/Voltage", path: "https://voltage.finance/swap?outputCurrency=0x4447863cddABbF2c3dAC826f042e03c91927A196"},
      {networkId: METER_MAINNET, name: "Meter", path: ""},
      {networkId: TELOS_MAINNET, name: "Telos/Swapsicle", path: "https://telos.swapsicle.io/swap?outputCurrency=0x8f7D64ea96D729EF24a0F30b4526D47b80d877B9&inputCurrency=0x8D97Cea50351Fb4329d591682b148D43a0C3611b"},
    ] },
  { icon: FaEllipsisH , 
    title: "More",
    path: "",
    subMenu: [
      {networkId: 0, name: "Tokens", path: "https://www.meridianfinance.net/tokens/"},
      {networkId: 0, name: "Docs", path: "https://docs.meridianfinance.net/"},
      {networkId: 0, name: "Github", path: "https://github.com/MeridianDollar"},
    ] },
];

export default menuConfig;
