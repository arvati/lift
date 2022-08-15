/*
Mumbai Deploy
npx hardhat compile
npx hardhat run scripts/deploy.js --network polygonMumbai

Deploying contracts with the account:, 0xff2416aC6D95ee66fa095453531970291a3651a6
Account balance:, 200000000000000000
Token address Tarefa 01:, 0x86fcF8f5815f36F771eE2140Beb4fe87206cde59
Token address Tarefa 02:, 0xF462215930c0Fd2193A8d82536480Fdc162bDE8c
Token address Tarefa 03:, 0xD908b62E06D263BE1cec87700e7f170981CCdA1E

npx hardhat verify --network polygonMumbai 0x86fcF8f5815f36F771eE2140Beb4fe87206cde59 --contract contracts/Tarefa01.sol:Tarefa01

https://mumbai.polygonscan.com/address/0x86fcF8f5815f36F771eE2140Beb4fe87206cde59#code

npx hardhat verify --network polygonMumbai 0xF462215930c0Fd2193A8d82536480Fdc162bDE8c --contract contracts/Tarefa02.sol:Tarefa02

npx hardhat verify --network polygonMumbai 0xD908b62E06D263BE1cec87700e7f170981CCdA1E --contract contracts/Tarefa03.sol:Tarefa03

npx hardhat clean
npx hardhat compile
npx hardhat run scripts/deploy_seller.js --network polygonMumbai
Deploying contracts with the account:, 0xff2416aC6D95ee66fa095453531970291a3651a6
Account balance:, 194024466465500952
Token address Seller Tarefa 04:, 0x193d5571641d35666e25420BfEFc7415fEA863A1

npx hardhat verify --network polygonMumbai 0x193d5571641d35666e25420BfEFc7415fEA863A1 --contract contracts/Tarefa04.sol:Tarefa04 0x86fcF8f5815f36F771eE2140Beb4fe87206cde59

https://mumbai.polygonscan.com/address/0x193d5571641d35666e25420BfEFc7415fEA863A1#code

/*