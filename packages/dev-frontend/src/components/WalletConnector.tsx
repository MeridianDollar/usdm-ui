

import React, { useEffect, useReducer } from "react";
import { useWeb3React } from "@web3-react/core";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { Button, Text, Flex, Link, Box } from "theme-ui";

import { injectedConnector } from "../connectors/injectedConnector";
import { useAuthorizedConnection } from "../hooks/useAuthorizedConnection";

import { RetryDialog } from "./RetryDialog";
import { ConnectionConfirmationDialog } from "./ConnectionConfirmationDialog";
import { MetaMaskIcon } from "./MetaMaskIcon";
import { Icon } from "./Icon";
import { Modal } from "./Modal";


const dappUrl = "https://testnet.meridianfinance.net/";
const encodedDappUrl = encodeURIComponent(dappUrl);
const deepLink = "okx://wallet/dapp/url?dappUrl=" + encodedDappUrl;
const encodedUrl = "https://www.okx.com/download?deeplink=" + encodeURIComponent(deepLink);


interface MaybeHasMetaMask {
  ethereum?: {
    isMetaMask?: boolean;
  };
}

type ConnectionState =
  | { type: "inactive" }
  | {
    type: "activating" | "active" | "rejectedByUser" | "alreadyPending" | "failed";
    connector: AbstractConnector;
  }
  | { type: "waitingForAgreement"; connector: AbstractConnector };

type ConnectionAction =
  | { type: "startActivating" | "agreeToTerms"; connector: AbstractConnector }
  | { type: "fail"; error: Error }
  | { type: "finishActivating" | "retry" | "cancel" | "deactivate" };

const connectionReducer: React.Reducer<ConnectionState, ConnectionAction> = (state, action) => {
  switch (action.type) {
    case "startActivating":
      if (state.type === "waitingForAgreement") {
        return {
          type: "activating",
          connector: action.connector
        };
      }
      return {
        type: "waitingForAgreement",
        connector: action.connector
      };

    case "agreeToTerms":
      if (state.type === "waitingForAgreement") {
        return {
          type: "activating",
          connector: state.connector
        };
      }
      break;
    case "finishActivating":
      return {
        type: "active",
        connector: state.type === "inactive" ? injectedConnector : state.connector
      };
    case "fail":
      if (state.type !== "inactive") {
        return {
          type: action.error.message.match(/user rejected/i)
            ? "rejectedByUser"
            : action.error.message.match(/already pending/i)
              ? "alreadyPending"
              : "failed",
          connector: state.connector
        };
      }
      break;
    case "retry":
      if (state.type !== "inactive") {
        return {
          type: "activating",
          connector: state.connector
        };
      }
      break;
    case "cancel":
      return {
        type: "inactive"
      };
    case "deactivate":
      return {
        type: "inactive"
      };
  }

  console.warn("Ignoring connectionReducer action:");
  console.log(action);
  console.log("  in state:");
  console.log(state);

  return state;
};

const detectMetaMask = () => (window as MaybeHasMetaMask).ethereum?.isMetaMask ?? false;

type WalletConnectorProps = {
  loader?: React.ReactNode;
};

export const WalletConnector: React.FC<WalletConnectorProps> = ({ children, loader }) => {
  const { activate, deactivate, active, error } = useWeb3React<unknown>();
  const triedAuthorizedConnection = useAuthorizedConnection();
  const [connectionState, dispatch] = useReducer(connectionReducer, { type: "inactive" });
  const isMetaMask = detectMetaMask();

  useEffect(() => {
    if (error) {
      dispatch({ type: "fail", error });
      deactivate();
    }
  }, [error, deactivate]);

  useEffect(() => {
    if (active) {
      dispatch({ type: "finishActivating" });
    } else {
      dispatch({ type: "deactivate" });
    }
  }, [active]);

  if (!triedAuthorizedConnection) {
    return <>{loader}</>;
  }

  if (connectionState.type === "active") {
    return <>{children}</>;
  }

  const handleOKXConnect = () => {
    window.location.href = encodedUrl;
  };

  return (
    <>
      <Flex sx={{ height: "100vh", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <Button
          onClick={() => {
            dispatch({ type: "startActivating", connector: injectedConnector });
            activate(injectedConnector);
          }}
        >
          {isMetaMask ? (
            <>
              <Icon name="plug" size="lg" />
              <Box sx={{ ml: 2 }}>Connect Wallet</Box>
            </>
          ) : (
            <>
              <Icon name="plug" size="lg" />
              <Box sx={{ ml: 2 }}>Connect wallet</Box>
            </>
          )}
        </Button>
        <Button onClick={handleOKXConnect} sx={{ mt: 3 }}>
          <Icon name="wallet" size="lg" />
          <Box sx={{ ml: 2 }}>Open in OKX Browser</Box>
        </Button>
      </Flex>

      {connectionState.type === "failed" && (
        <Modal>
          <RetryDialog
            title={isMetaMask ? "Failed to connect to MetaMask" : "Failed to connect wallet"}
            onCancel={() => dispatch({ type: "cancel" })}
            onRetry={() => {
              dispatch({ type: "retry" });
              activate(connectionState.connector);
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              You might need to install MetaMask or use a different browser.
            </Box>
            <Link sx={{ lineHeight: 3 }} href="https://metamask.io/download.html" target="_blank">
              Learn more <Icon size="xs" name="external-link-alt" />
            </Link>
          </RetryDialog>
        </Modal>
      )}

      {connectionState.type === "activating" && (
        <Modal>
          <ConnectionConfirmationDialog
            title={
              isMetaMask ? "Confirm connection in MetaMask" : "Confirm connection in your wallet"
            }
            icon={isMetaMask ? <MetaMaskIcon /> : <Icon name="wallet" size="lg" />}
            onCancel={() => dispatch({ type: "cancel" })}
          >
            <Text sx={{ textAlign: "center" }}>
              Confirm the request that&apos;s just appeared.
              {isMetaMask ? (
                <> If you can&apos;t see a request, open your MetaMask extension via your browser.</>
              ) : (
                <> If you can&apos;t see a request, you might have to open your wallet.</>
              )}
            </Text>
          </ConnectionConfirmationDialog>
        </Modal>
      )}

      {connectionState.type === "rejectedByUser" && (
        <Modal>
          <RetryDialog
            title="Cancel connection?"
            onCancel={() => dispatch({ type: "cancel" })}
            onRetry={() => {
              dispatch({ type: "retry" });
              activate(connectionState.connector);
            }}
          >
            <Text>To use Meridian, you need to connect your Metamask account.</Text>
          </RetryDialog>
        </Modal>
      )}

      {connectionState.type === "alreadyPending" && (
        <Modal>
          <RetryDialog
            title="Connection already requested"
            onCancel={() => dispatch({ type: "cancel" })}
            onRetry={() => {
              dispatch({ type: "retry" });
              activate(connectionState.connector);
            }}
          >
            <Text>Please check your wallet and accept the connection request before retrying.</Text>
          </RetryDialog>
        </Modal>
      )}
    </>
  );
};
