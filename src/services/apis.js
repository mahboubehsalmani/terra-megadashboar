// Home
const getHourlyPrive =
  "https://api.flipsidecrypto.com/api/v2/queries/3be72416-0e4f-4c46-81d0-3db8c7afa3ce/data/latest";
const queryHourlyPrice =
  "https://app.flipsidecrypto.com/velocity/queries/3be72416-0e4f-4c46-81d0-3db8c7afa3ce";

const getNewWalletsPastDay =
  "https://api.flipsidecrypto.com/api/v2/queries/5cbab18a-d484-4799-bb34-d2171a652e51/data/latest";
const queryNewWalletsPastDay =
  "https://app.flipsidecrypto.com/velocity/queries/5cbab18a-d484-4799-bb34-d2171a652e51";

const getNumberOfTransactionsPastDay =
  "https://api.flipsidecrypto.com/api/v2/queries/4d0ef746-ded0-448f-a2c3-360860e40ba7/data/latest";

const queryNumberOfTransactionsPastDay =
  "https://app.flipsidecrypto.com/velocity/queries/4d0ef746-ded0-448f-a2c3-360860e40ba7";

const getAverageTPSForPastDay =
  "https://api.flipsidecrypto.com/api/v2/queries/53b9ac4e-f1d4-4f6b-a4f6-441b1d7e0094/data/latest";

const queryAverageTPSForPastDay =
  "https://app.flipsidecrypto.com/velocity/queries/53b9ac4e-f1d4-4f6b-a4f6-441b1d7e0094";

const getCurrentPrice =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=terra-luna-2";

const getActiveUserForPastDay =
  "https://api.flipsidecrypto.com/api/v2/queries/c488dc9a-15df-4d7b-9060-f1209e60fda2/data/latest";

// Transactions
const getAverageTransactionFeePerTransactionPerWeek =
  "https://node-api.flipsidecrypto.com/api/v2/queries/ce70d394-0d9a-42da-a45d-5447e3fbe723/data/latest";
const getTotalTransactionFeesPerWeek =
  "https://node-api.flipsidecrypto.com/api/v2/queries/45256793-70cf-4300-af75-2adcd102fd43/data/latest";

const getTotalNumberOfTransactionsPerWeek =
  "https://node-api.flipsidecrypto.com/api/v2/queries/062ba184-b948-46b8-ac2a-1a7ade83c52d/data/latest";

const getAverageTPSPerWeek =
  "https://node-api.flipsidecrypto.com/api/v2/queries/19a7c1e8-4c8b-4700-9d68-88ad29a05a0c/data/latest";

const getAverageBlockTimePerWeek =
  "https://node-api.flipsidecrypto.com/api/v2/queries/6ca0ca97-b1ce-42b5-9e5b-2bdb28e1f070/data/latest";

const getAllTimeQuickTransactions =
  "https://node-api.flipsidecrypto.com/api/v2/queries/6fae5351-a02a-427a-9c32-6f5f2c7aeb4e/data/latest";
const getThisWeekQuickTransactions =
  "https://node-api.flipsidecrypto.com/api/v2/queries/78f0184b-d53f-46e6-be0a-95ff9488b12d/data/latest";
const queryThisWeekQuickTransactions =
  "https://app.flipsidecrypto.com/velocity/queries/78f0184b-d53f-46e6-be0a-95ff9488b12d";

const queryAllTimeQuickTransactions =
  "https://app.flipsidecrypto.com/velocity/queries/6fae5351-a02a-427a-9c32-6f5f2c7aeb4e";
const queryAverageTransactionFeePerTransactionPerWeek =
  "https://app.flipsidecrypto.com/velocity/queries/ce70d394-0d9a-42da-a45d-5447e3fbe723";

const queryTotalTransactionFeesPerWeek =
  "https://app.flipsidecrypto.com/velocity/queries/45256793-70cf-4300-af75-2adcd102fd43";

const queryTotalNumberOfTransactionsPerWeek =
  "https://app.flipsidecrypto.com/velocity/queries/062ba184-b948-46b8-ac2a-1a7ade83c52d";

const queryAverageTPSPerWeek =
  "https://app.flipsidecrypto.com/velocity/queries/19a7c1e8-4c8b-4700-9d68-88ad29a05a0c";

const queryAverageBlockTimePerWeek =
  "https://app.flipsidecrypto.com/velocity/queries/6ca0ca97-b1ce-42b5-9e5b-2bdb28e1f070";

// Wallets
const getTotalNumberOfNewWalletsPerWeek =
  "https://api.flipsidecrypto.com/api/v2/queries/85d7bd06-f44a-487c-87d5-b0671438c9d7/data/latest";
const getTotalNumberOfActiveWalletsPerWeek =
  "https://node-api.flipsidecrypto.com/api/v2/queries/fec2a5f8-1d02-4d2a-921c-76b83ec00cad/data/latest";
const getCumulativeNumberOfWalletsOverTime =
  "https://node-api.flipsidecrypto.com/api/v2/queries/f08d7454-80f1-469f-b4d1-94ac4e256a54/data/latest";
const queryCumulativeNumberOfWalletsOverTime =
  "https://app.flipsidecrypto.com/velocity/queries/f08d7454-80f1-469f-b4d1-94ac4e256a54";
const queryTotalNumberOfActiveWalletsPerWeek =
  "https://app.flipsidecrypto.com/velocity/queries/fec2a5f8-1d02-4d2a-921c-76b83ec00cad";
const queryTotalNumberOfNewWalletsPerWeek =
  "https://app.flipsidecrypto.com/velocity/queries/85d7bd06-f44a-487c-87d5-b0671438c9d7";

// Development
const getNewContractsDeployedEachWeek =
  "https://node-api.flipsidecrypto.com/api/v2/queries/b497e6f2-a790-4f72-8c48-c761d17afd44/data/latest";
const queryNewContractsDeployedEachWeek =
  "https://app.flipsidecrypto.com/velocity/queries/b497e6f2-a790-4f72-8c48-c761d17afd44";

const getTotalContractsDeployedEachWeek =
  "https://api.flipsidecrypto.com/api/v2/queries/7a018c05-2a2b-4bb9-8b6c-377eecec2ed8/data/latest";
const queryTotalContractsDeployedEachWeek =
  "https://app.flipsidecrypto.com/velocity/queries/7a018c05-2a2b-4bb9-8b6c-377eecec2ed8";

// Supply

const getRichList =
  "https://api.flipsidecrypto.com/api/v2/queries/a77d59bb-9ee8-4d50-8faf-1fc8f41e67bf/data/latest";
const queryRichList = "";

const getWeeklyStaking =
  "https://api.flipsidecrypto.com/api/v2/queries/356646fe-d848-4b72-9d17-3b0879256264/data/latest";

const getWeeklyStakingRewardsDistributed =
  "https://api.flipsidecrypto.com/api/v2/queries/5afa43b7-f4e6-49cd-9896-22bef3b2f8af/data/latest";

const getTotalAndCirculatingSupply =
  "https://api.coingecko.com/api/v3/coins/terra-luna-2";

const queryTotalAndCirculatingSupply =
  "https://api.coingecko.com/api/v3/coins/terra-luna-2";

const getTotalNumberOfStakedLUNA = "https://phoenix-lcd.terra.dev/staking/pool";
const queryTotalNumberOfStakedLUNA =
  "https://phoenix-lcd.terra.dev/staking/pool";

const getIBC =
  "https://api.flipsidecrypto.com/api/v2/queries/a8175d3b-cc61-4cf5-893d-3eb1e0bc36bd/data/latest";

const getIBCPercent =
  "https://api.flipsidecrypto.com/api/v2/queries/126c2e9f-5322-476e-8b2f-4d1068e83ba3/data/latest";

export default {
  getAverageTransactionFeePerTransactionPerWeek,
  getTotalTransactionFeesPerWeek,
  getTotalNumberOfTransactionsPerWeek,
  getAverageTPSPerWeek,
  getAverageBlockTimePerWeek,
  queryAverageTransactionFeePerTransactionPerWeek,
  queryAverageBlockTimePerWeek,
  queryAverageTPSPerWeek,
  queryTotalNumberOfTransactionsPerWeek,
  queryTotalTransactionFeesPerWeek,
  getTotalNumberOfNewWalletsPerWeek,
  getTotalNumberOfActiveWalletsPerWeek,
  getCumulativeNumberOfWalletsOverTime,
  queryCumulativeNumberOfWalletsOverTime,
  queryTotalNumberOfActiveWalletsPerWeek,
  queryTotalNumberOfNewWalletsPerWeek,
  getNewContractsDeployedEachWeek,
  queryNewContractsDeployedEachWeek,
  getAllTimeQuickTransactions,
  queryAllTimeQuickTransactions,
  getThisWeekQuickTransactions,
  queryThisWeekQuickTransactions,
  getRichList,
  queryRichList,
  getWeeklyStaking,
  getWeeklyStakingRewardsDistributed,
  getTotalAndCirculatingSupply,
  getTotalNumberOfStakedLUNA,
  queryTotalAndCirculatingSupply,
  queryTotalNumberOfStakedLUNA,
  getIBC,
  getIBCPercent,
  queryTotalContractsDeployedEachWeek,
  getTotalContractsDeployedEachWeek,
  getHourlyPrive,
  queryHourlyPrice,
  getNewWalletsPastDay,
  queryNewWalletsPastDay,
  getNumberOfTransactionsPastDay,
  queryNumberOfTransactionsPastDay,
  getAverageTPSForPastDay,
  queryAverageTPSForPastDay,
  getCurrentPrice,
  getActiveUserForPastDay,
};
