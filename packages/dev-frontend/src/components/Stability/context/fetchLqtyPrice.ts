import { Decimal } from "@liquity/lib-base";

type CoinGeckoSimplePriceResponse<T extends string, U extends string> = {
  [P in T]: {
    [Q in U]: number;
  };
};

const hasProp = <T, P extends string>(o: T, p: P): o is T & { [_ in P]: unknown } => p in o;

const validateCoinGeckoSimplePriceResponse = <T extends string, U extends string>(
  expectedCoinIds: readonly T[],
  expectedCurrencies: readonly U[],
  body: unknown
): CoinGeckoSimplePriceResponse<T, U> => {
  if (typeof body !== "object" || body === null) {
    throw new Error(`unexpected response from CoinGecko`);
  }

  for (const coinId of expectedCoinIds) {
    if (!hasProp(body, coinId)) {
      throw new Error(`coin "${coinId}" missing from CoinGecko response`);
    }

    const coinPrices = body[coinId];

    for (const currency of expectedCurrencies) {
      if (!hasProp(coinPrices, currency)) {
        throw new Error(`currency "${currency}" missing from CoinGecko response`);
      }

      if (typeof coinPrices[currency] !== "number") {
        throw new Error(`price of coin "${coinId}" in currency "${currency}" is not a number`);
      }
    }
  }

  return body as CoinGeckoSimplePriceResponse<T, U>;
};

const fetchCoinGeckoSimplePrice = async <T extends string, U extends string>(
  coinIds: readonly T[],
  vsCurrencies: readonly U[]
): Promise<CoinGeckoSimplePriceResponse<T, U>> => {
  const simplePriceUrl =
    "https://api.coingecko.com/api/v3/simple/price?" +
    new URLSearchParams({
      ids: coinIds.join(","),
      vs_currencies: vsCurrencies.join(",")
    });

  const response = await window.fetch(simplePriceUrl, {
    headers: {
      accept: "application/json"
    }
  });

  if (!response.ok) {
    throw new Error(`couldn't fetch price from CoinGecko: got status ${response.status}`);
  }

  return validateCoinGeckoSimplePriceResponse(coinIds, vsCurrencies, await response.json());
};

export interface LqtyPriceResponse {
  lqtyPriceUSD: Decimal;
}

export const fetchLqtyPrice = async (): Promise<LqtyPriceResponse> => {
  const response = await fetchCoinGeckoSimplePrice(["liquity"] as const, ["usd"] as const);

  console.log(Decimal.from(response.liquity.usd), "LIQUITY PRICE")
  return {
    lqtyPriceUSD: Decimal.from(response.liquity.usd)
  };
};


export interface MstPriceResponse {
  lqtyPriceUSD: Decimal;
}

export const fetchMSTPrice = async (): Promise<MstPriceResponse> => {
  const url = "https://omnidex.bmaa3ajd1gjri.eu-west-2.cs.amazonlightsail.com/mst_price";
  const response = await fetch(url);
  const data = await response.json();

  return {
    lqtyPriceUSD: Decimal.from(data)
  };
};


export interface TLOSYieldResponse {
  TLOSYield: Decimal;
}

export const fetchTLOSYield = async (): Promise<TLOSYieldResponse> => {
  const url = "https://omnidex.bmaa3ajd1gjri.eu-west-2.cs.amazonlightsail.com/stability_pool";
  const response = await fetch(url);
  const data = await response.json();

  return {
    TLOSYield: Decimal.from(data.telos)
  };
};

export interface FUSEYieldResponse {
  FUSEYield: Decimal;
}

export const fetchFUSEYield = async (): Promise<FUSEYieldResponse> => {
  const url = "https://omnidex.bmaa3ajd1gjri.eu-west-2.cs.amazonlightsail.com/stability_pool";
  const response = await fetch(url);
  const data = await response.json();
  return {
    FUSEYield: Decimal.from(data.fuse)
  };
};


export interface MSTMcapResponse {
  MstMcapUSD: Decimal;
}

export interface TVLUSDResponse {
  TVLUSD: Decimal;
}


export const fetchMSTMcap = async (): Promise<MSTMcapResponse> => {
  const url = "https://omnidex.bmaa3ajd1gjri.eu-west-2.cs.amazonlightsail.com/mst_mcap";
  const response = await fetch(url);
  const data = await response.json();

  return {
    MstMcapUSD: Decimal.from(data)
  };
};



export const fetchMeridianTVL = async (): Promise<TVLUSDResponse> => {
  const url = "https://omnidex.bmaa3ajd1gjri.eu-west-2.cs.amazonlightsail.com/total_tvl";
  const response = await fetch(url);
  const data = await response.json();

  return {
    TVLUSD: Decimal.from(data)
  };
};


