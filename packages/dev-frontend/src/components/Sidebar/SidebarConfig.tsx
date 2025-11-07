import { IconType } from "react-icons";
import {
  FaRegChartBar,
  FaCoins,
  FaHandshake,
  FaChartLine,
  FaArchway,
  FaSeedling,
  FaDollarSign,
  FaArrowAltCircleUp,
  FaExchangeAlt,
  FaEllipsisH,
} from "react-icons/fa";

// **Import network logo images**
import baseLogo from "../../images/networks/base.svg";
import fuseLogo from "../../images/networks/fuse.svg";
import meterLogo from "../../images/networks/meter-white.svg";
import telosLogo from "../../images/networks/telos.svg";
import taikoLogo from "../../images/networks/taiko.svg";
import taraxaLogo from "../../images/networks/taraxa.png";
import artelaLogo from "../../images/networks/artela.png";

// Import other logos as needed

const BASE_MAINNET = 8453;
const FUSE_MAINNET = 122;
const METER_MAINNET = 82;
const TELOS_MAINNET = 40;
const TAIKO_MAINNET = 167000;
const TARAXA_MAINNET = 841;
const ARTELA_MAINNET = 11820;


// Define interfaces
export interface InAppPath {
  name: string;
  path: string;
}

export interface SubMenuItemConfig {
  networkId: number;
  name: string;
  path: string;
  logo?: string; // **Added logo property**
  subSubMenu?: InAppPath[];
}

export interface MenuItemConfig {
  icon: IconType;
  title: string;
  path: string;
  subMenu?: SubMenuItemConfig[];
}

// Update menuConfig with logos
const menuConfig: MenuItemConfig[] = [
  {
    icon: FaCoins,
    title: "Mint USDM",
    path: "https://mint.meridianfinance.net/",
    subMenu: [
      {
        networkId: BASE_MAINNET,
        name: "Base",
        path: "https://mint.meridianfinance.net/",
        logo: baseLogo, // **Added logo here**
        subSubMenu: [
          { name: "Trove", path: "/" },
          { name: "Stability Pool", path: "/pool" },
          { name: "Staking", path: "/staking" },
          { name: "Risky Troves", path: "/risky-troves" },
          { name: "Redemptions", path: "/redemption" },
        ],
      },
      {
        networkId: FUSE_MAINNET,
        name: "Fuse",
        path: "https://mint.meridianfinance.net/",
        logo: fuseLogo, // **Added logo here**
        subSubMenu: [
          { name: "Trove", path: "/" },
          { name: "Stability Pool", path: "/pool" },
          { name: "Staking", path: "/staking" },
          { name: "Risky Troves", path: "/risky-troves" },
          { name: "Redemptions", path: "/redemption" },
        ],
      },
      {
        networkId: TELOS_MAINNET,
        name: "Telos",
        path: "https://mint.meridianfinance.net/",
        logo: telosLogo, // **Added logo here**
        subSubMenu: [
          { name: "Trove", path: "/" },
          { name: "Stability Pool", path: "/pool" },
          { name: "Staking", path: "/staking" },
          { name: "Risky Troves", path: "/risky-troves" },
          { name: "Redemptions", path: "/redemption" },
        ],
      },
      {
        networkId: TARAXA_MAINNET,
        name: "Taraxa",
        path: "https://mint.meridianfinance.net/",
        logo: taraxaLogo, // **Added logo here**
        subSubMenu: [
          { name: "Trove", path: "/" },
          { name: "Stability Pool", path: "/pool" },
          { name: "Staking", path: "/staking" },
          { name: "Risky Troves", path: "/risky-troves" },
          { name: "Redemptions", path: "/redemption" },
        ],
      },
      {
        networkId: ARTELA_MAINNET,
        name: "Artela",
        path: "https://mint.meridianfinance.net/",
        logo: artelaLogo, // **Added logo here**
        subSubMenu: [
          { name: "Trove", path: "/" },
          { name: "Stability Pool", path: "/pool" },
          { name: "Staking", path: "/staking" },
          { name: "Risky Troves", path: "/risky-troves" },
          { name: "Redemptions", path: "/redemption" },
        ],
      },
    ],
  },
  {
    icon: FaHandshake,
    title: "Lend/Borrow",
    path: "https://lend.meridianfinance.net/",
    subMenu: [
      {
        networkId: FUSE_MAINNET,
        name: "Fuse",
        path: "https://lend.meridianfinance.net/",
        logo: fuseLogo, // **Added logo here**
      },
      {
        networkId: METER_MAINNET,
        name: "Meter",
        path: "https://lend.meridianfinance.net/",
        logo: meterLogo, // **Added logo here**
      },
      {
        networkId: TELOS_MAINNET,
        name: "Telos",
        path: "https://lend.meridianfinance.net/",
        logo: telosLogo, // **Added logo here**
      },
      {
        networkId: TAIKO_MAINNET,
        name: "Taiko",
        path: "https://lend.meridianfinance.net/",
        logo: taikoLogo, // **Added logo here**
      },
      {
        networkId: TARAXA_MAINNET,
        name: "Taraxa",
        path: "https://lend.meridianfinance.net/",
        logo: taraxaLogo, // **Added logo here**
      },
      {
        networkId: ARTELA_MAINNET,
        name: "Artela",
        path: "https://lend.meridianfinance.net/",
        logo: artelaLogo, // **Added logo here**
      },
    ],
  },
  {
    icon: FaChartLine,
    title: "Trade",
    path: "https://trade.meridianfinance.net/#/trade",
    subMenu: [
      {
        networkId: BASE_MAINNET,
        name: "Base",
        path: "https://trade.meridianfinance.net/#/trade",
        logo: baseLogo, // **Added logo here**
      },
      {
        networkId: METER_MAINNET,
        name: "Meter",
        path: "https://trade.meridianfinance.net/#/trade",
        logo: meterLogo, // **Added logo here**
      },
    ],
  },
  {
    icon: FaExchangeAlt,
    title: "Swap",
    path: "https://swaps.meridianfinance.net",
    subMenu: [
      {
        networkId: TELOS_MAINNET,
        name: "Telos",
        path: "https://swaps.meridianfinance.net",
        logo: telosLogo, // **Added logo here**
      },
    ],
  },
  {
    icon: FaSeedling,
    title: "Stake MST",
    path: "https://stake.meridianfinance.net/#/stakemst",
    subMenu: [
      {
        networkId: BASE_MAINNET,
        name: "Base",
        path: "https://stake.meridianfinance.net/#/stakemst",
        logo: baseLogo, // **Added logo here**
      },
      {
        networkId: FUSE_MAINNET,
        name: "Fuse",
        path: "https://stake.meridianfinance.net/#/stakemst",
        logo: fuseLogo, // **Added logo here**
      },
      {
        networkId: METER_MAINNET,
        name: "Meter",
        path: "https://stake.meridianfinance.net/#/stakemst",
        logo: meterLogo, // **Added logo here**
      },
      {
        networkId: TELOS_MAINNET,
        name: "Telos",
        path: "https://stake.meridianfinance.net/#/stakemst",
        logo: telosLogo, // **Added logo here**
      },
      {
        networkId: TAIKO_MAINNET,
        name: "Taiko",
        path: "https://stake.meridianfinance.net/#/stakemst",
        logo: taikoLogo, // **Added logo here**
      },
    ],
  },
  {
    icon: FaArchway,
    title: "Bridge MST",
    path: "https://bridge.meridianfinance.net/#/",
  },
  {
    icon: FaArrowAltCircleUp,
    title: "Buy MST",
    path: "https://stake.meridianfinance.net/#/tokens/",
  },
  {
    icon: FaDollarSign,
    title: "Buy USDM",
    path: "https://stake.meridianfinance.net/#/tokens/",
  },
  {
    icon: FaRegChartBar,
    title: "Analytics",
    path: "",
    subMenu: [
      {
        networkId: 0,
        name: "Swaps",
        path: "https://analytics.swaps.meridianfinance.net",
        // Optionally add a logo if applicable
      },
      {
        networkId: 0,
        name: "Yields",
        path: "https://stake.meridianfinance.net/#/yields",
        // Optionally add a logo if applicable
      },
    ],
  },
  {
    icon: FaEllipsisH,
    title: "More",
    path: "",
    subMenu: [
      {
        networkId: 0,
        name: "Tokens",
        path: "https://stake.meridianfinance.net/#/tokens/",
        // Optionally add a logo if applicable
      },
      {
        networkId: 0,
        name: "Ecosystem",
        path: "https://stake.meridianfinance.net/#/ecosystem/",
        // Optionally add a logo if applicable
      },
      {
        networkId: 0,
        name: "Docs",
        path: "https://docs.meridianfinance.net/",
        // Optionally add a logo if applicable
      },
      {
        networkId: 0,
        name: "Github",
        path: "https://github.com/MeridianDollar",
        // Optionally add a logo if applicable
      },
      {
        networkId: 0,
        name: "Governance",
        path: "https://snapshot.org/#/meridian-foundation.eth",
        // Optionally add a logo if applicable
      },
      {
        networkId: 0,
        name: "Network Bridges",
        path: "",
        subSubMenu: [
          { name: "Gas Top-up", path: "https://www.gas.zip/" },
          { name: "Base", path: "https://bridge.base.org/" },
          { name: "Fuse", path: "https://console.fuse.io/bridge" },
          { name: "Meter", path: "https://passport.meter.io/" },
          { name: "Telos", path: "https://bridge.telos.net/bridge" },
          { name: "Taiko", path: "https://bridge.taiko.xyz" },
          { name: "Taraxa", path: "https://bridge.taraxa.io" },
          { name: "Artela", path: "https://artbridge.artela.network" },
        ],
      },
      {
        networkId: 0,
        name: "Network Explorers",
        path: "",
        subSubMenu: [
          { name: "Gas Top-up", path: "https://www.gas.zip/" },
          { name: "Base", path: "https://basescan.org/" },
          { name: "Fuse", path: "https://explorer.fuse.io/" },
          { name: "Meter", path: "https://scan.meter.io/" },
          { name: "Telos", path: "https://www.teloscan.io/" },
          { name: "Taiko", path: "https://taikoscan.io" },
          { name: "Taraxa", path: "https://tara.to" },
          { name: "Artela", path: "https://artscan.artela.network" },
        ],
      },
    ],
  },
];

export default menuConfig;
