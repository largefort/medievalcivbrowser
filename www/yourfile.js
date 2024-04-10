const QuickNode = require('@quicknode/sdk');
// if you are using ESM style imports, use this line instead:
// import QuickNode from '@quicknode/sdk';

const core = new Core({
  endpointUrl: 'https://holy-hidden-shadow.quiknode.pro/f316d2a3571323837b7431e0294f1500b8905fec/',
})

const currentBlockNumber = await core.client.getBlockNumber();
console.log(currentBlockNumber)
