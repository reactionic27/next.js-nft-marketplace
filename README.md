# NFT Marketplace Demo 

This is a basic Next.js app for listing NFTs in a given contract address. The purpose of this repository is to showcase the simplicity of creating your backend endpoints in Buildable and hooking them up to frontend apps.

## Usage

To run this app, simply clone this repository and run:

```bash
> yarn install
> yarn start
```

### Input

```javascript
const nodeInput = ({ $trigger, $nodes }) => {
  const { 
    chain = "ETH",
    address = "0xed5af388653567af2f388e6224dc7c4b3241c544",
    pageSize = 12,
    cursor
  } = $trigger.body;

  return {
    method: "GET",
    url: `https://deep-index.moralis.io/api/v2/nft/${address}`,
    params: {
      chain,
      address,
      limit: pageSize,
      cursor
    },
    responseType: "json",
    headers: {
      "Content-type": "application/json",
      "X-API-Key": $trigger.env.MORALIS_API_KEY
    }
  };
};
```

### Run

```javascript
const axios = require("axios");
const moment = require("moment");

const getRows = (result) => {
  return result?.map(token => {
    const metadata = JSON.parse(token.metadata);

    return {
      collection: token.name,
      name: metadata?.name,
      image: metadata?.image.replace("ipfs://", "https://ipfs.io/ipfs/"),
      contractType: token.contract_type,
      lastSynced: moment(token.synced_at).fromNow()
    };
  });
}

/**
 * The Node's executable function
 *
 * @param {Run} input - Data passed to your Node from the input function
 */
const run = async (input) => {
  verifyInput(input);

  try {
    const { data } = await axios(input);

    const rows = getRows(data.result);

    return {
      rows,
      page: data.page,
      pageSize: data.page_size,
      total: data.total,
      cursor: data.cursor
    };
  } catch (error) {
    return {
      failed: true,
      message: error.message,
      data: {
        ...error?.response?.data,
      },
    };
  }
};

/**
 * Verifies the input parameters
 */
const verifyInput = ({ method, url }) => {
  const ERRORS = {
    INVALID_METHOD: "A valid method field (string) must be provided",
    INVALID_URL: "A valid url field (string) must be provided",
  };

  if (typeof method !== "string") throw new Error(ERRORS.INVALID_METHOD);
  if (typeof url !== "string") throw new Error(ERRORS.INVALID_URL);
};
```
