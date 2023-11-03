import dotenv from "dotenv";
import { Wallet } from "@ethersproject/wallet";
import { JsonRpcProvider } from "@ethersproject/providers";

import { SubgraphLiquity } from "@liquity/lib-subgraph";

dotenv.config();

export const provider = new JsonRpcProvider("http://localhost:8545");
export const subgraph = new SubgraphLiquity("http://localhost:8000/subgraphs/name/liquity/subgraph");

export const deployer = process.env.DEPLOYER_PRIVATE_KEY
  ? new Wallet(process.env.DEPLOYER_PRIVATE_KEY, provider)
  : Wallet.createRandom().connect(provider);

export const funder = new Wallet(
  "6110107ee5376c20acadfe82498b4ba93c9fd44a62156e20cfe4563326fd7388",
  provider
);
