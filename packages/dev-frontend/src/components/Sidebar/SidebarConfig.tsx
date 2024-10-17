import { IconType } from "react-icons";
import { FaRegChartBar, FaCoins, FaHandshake, FaChartLine, FaArchway, FaSeedling, FaDollarSign, FaArrowAltCircleUp, FaExchangeAlt, FaEllipsisH } from "react-icons/fa";

const BASE_MAINNET = 8453
const FUSE_MAINNET = 122
const METER_MAINNET = 82
const TELOS_MAINNET = 40
const TAIKO_MAINNET = 167000
const TARAXA_TESTNET = 841

// const ARTELA_TESTNET = 11822

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
  {
    icon: FaCoins,
    title: "Mint USDM",
    path: "https://mint.meridianfinance.net/",
    subMenu: [
      {
        networkId: BASE_MAINNET, name: "Base", path: "https://mint.meridianfinance.net/",
        subSubMenu: [
          { name: "Trove", path: "/" },
          { name: "Stability Pool", path: "/pool" },
          { name: "Staking", path: "/staking" },
          { name: "Risky Troves", path: "/risky-troves" },
          { name: "Redemptions", path: "/redemption" },
        ]
      },
      {
        networkId: FUSE_MAINNET, name: "Fuse", path: "https://mint.meridianfinance.net/",
        subSubMenu: [
          { name: "Trove", path: "/" },
          { name: "Stability Pool", path: "/pool" },
          { name: "Staking", path: "/staking" },
          { name: "Risky Troves", path: "/risky-troves" },
          { name: "Redemptions", path: "/redemption" },
        ]
      },
      {
        networkId: TELOS_MAINNET, name: "Telos", path: "https://mint.meridianfinance.net/",
        subSubMenu: [
          { name: "Trove", path: "/" },
          { name: "Stability Pool", path: "/pool" },
          { name: "Staking", path: "/staking" },
          { name: "Risky Troves", path: "/risky-troves" },
          { name: "Redemptions", path: "/redemption" },
        ]
      },
    ]
  },
  {
    icon: FaHandshake,
    title: "Lend/Borrow",
    path: "https://lend.meridianfinance.net/",
    subMenu: [
      { networkId: FUSE_MAINNET, name: "Fuse", path: "https://lend.meridianfinance.net/" },
      { networkId: METER_MAINNET, name: "Meter", path: "https://lend.meridianfinance.net/" },
      { networkId: TELOS_MAINNET, name: "Telos", path: "https://lend.meridianfinance.net/" },
      { networkId: TAIKO_MAINNET, name: "Taiko", path: "https://lend.meridianfinance.net/" },

    ]
  },
  {
    icon: FaChartLine,
    title: "Trade",
    path: "https://trade.meridianfinance.net/#/trade",
    subMenu: [
      { networkId: BASE_MAINNET, name: "Base", path: "https://trade.meridianfinance.net/#/trade" },
      { networkId: METER_MAINNET, name: "Meter", path: "https://trade.meridianfinance.net/#/trade" },

    ]
  },
  {
    icon: FaExchangeAlt,
    title: "Swap",
    path: "https://swaps.meridianfinance.net",
    subMenu: [
      { networkId: TELOS_MAINNET, name: "Telos", path: "https://swaps.meridianfinance.net" },
    ]
  },
  {
    icon: FaSeedling,
    title: "Stake MST",
    path: "https://stake.meridianfinance.net/#/stakemst",
    subMenu: [
      { networkId: BASE_MAINNET, name: "Base", path: "https://stake.meridianfinance.net/#/stakemst" },
      { networkId: FUSE_MAINNET, name: "Fuse", path: "https://stake.meridianfinance.net/#/stakemst" },
      { networkId: METER_MAINNET, name: "Meter", path: "https://stake.meridianfinance.net/#/stakemst" },
      { networkId: TELOS_MAINNET, name: "Telos", path: "https://stake.meridianfinance.net/#/stakemst" },
      { networkId: TAIKO_MAINNET, name: "Taiko", path: "https://stake.meridianfinance.net/#/stakemst" },

    ]
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
      { networkId: 0, name: "Swaps", path: "https://analytics.swaps.meridianfinance.net" },
      { networkId: 0, name: "Yields", path: "https://stake.meridianfinance.net/#/yields" },]
  },
  {
    icon: FaEllipsisH,
    title: "More",
    path: "",
    subMenu: [
      { networkId: 0, name: "Tokens", path: "https://stake.meridianfinance.net/#/tokens/" },
      { networkId: 0, name: "Ecosystem", path: "https://stake.meridianfinance.net/#/ecosystem/" },
      { networkId: 0, name: "Docs", path: "https://docs.meridianfinance.net/" },
      { networkId: 0, name: "Github", path: "https://github.com/MeridianDollar" },
      { networkId: 0, name: "Governance", path: "https://snapshot.org/#/meridian-foundation.eth" },
      {
        networkId: 0, name: "Tools", path: "",
        subSubMenu: [
          { name: "Gas Top-up", path: "https://www.gas.zip/" },
          { name: "Base Explorer", path: "https://basescan.org/" },
          { name: "Base Bridge", path: "https://bridge.base.org/" },
          { name: "Fuse Explorer", path: "https://explorer.fuse.io/" },
          { name: "Fuse Bridge", path: "https://console.fuse.io/bridge" },
          { name: "Meter Explorer", path: "https://scan.meter.io/" },
          { name: "Meter Bridge", path: "https://passport.meter.io/" },
          { name: "Telos Explorer", path: "https://www.teloscan.io/" },
          { name: "Telos Bridge", path: "https://bridge.telos.net/bridge" },
          { name: "Taiko Explorer", path: "https://taikoscan.io" },
          { name: "Taiko Bridge", path: "https://bridge.taiko.xyz" },
        ]
      },
    ]
  },
];

export default menuConfig;
