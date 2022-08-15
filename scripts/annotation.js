/*
Mumbai Deploy
npx hardhat compile
npx hardhat run scripts/deploy.js --network polygonMumbai

Deploying contracts with the account:, 0xe37DF09A14CCC1fDB3dffeD559bc059A21b8C13D
Account balance:, 999522240080587203
Token address Tarefa 01:, 0xbfd260ddF1936d3ac0ded8E6D52B9f6E8EC70153
Token address Tarefa 02:, 0x6182A9cf01D0CE53F8be3d210128e565E9DE660B
Token address Tarefa 03:, 0x40d72AaE3adcFD55742b3f2a3E35eAb27bB979aE


Adicione liquidez na QuickSwap - https://quickswap.exchange/ - da token recém criada, cole o tx hash abaixo:
https://mumbai.polygonscan.com/tx/0x833912207f29a1ddc5102ea292e796ce0e6cf1c44ed558ca3422070e72a80511

Adicione liquidez na Uniswap V3 - https://uniswap.org/ - da token recém criada, cole o tx hash abaixo:
https://mumbai.polygonscan.com/tx/0xa8cd4c965398c6588afdc2f6305fca35a532985abe0af740e5e3107687e2fe86

https://mumbai.polygonscan.com/address/0xbfd260ddF1936d3ac0ded8E6D52B9f6E8EC70153
https://mumbai.polygonscan.com/address/0x6182A9cf01D0CE53F8be3d210128e565E9DE660B
https://mumbai.polygonscan.com/address/0x40d72AaE3adcFD55742b3f2a3E35eAb27bB979aE

npx hardhat verify --network polygonMumbai 0xbfd260ddF1936d3ac0ded8E6D52B9f6E8EC70153 --contract contracts/Tarefa01.sol:Tarefa01

https://mumbai.polygonscan.com/address/0xbfd260ddF1936d3ac0ded8E6D52B9f6E8EC70153#code

npx hardhat verify --network polygonMumbai 0x6182A9cf01D0CE53F8be3d210128e565E9DE660B --contract contracts/Tarefa02.sol:Tarefa02

https://mumbai.polygonscan.com/address/0x6182A9cf01D0CE53F8be3d210128e565E9DE660B#code

npx hardhat verify --network polygonMumbai 0x40d72AaE3adcFD55742b3f2a3E35eAb27bB979aE --contract contracts/Tarefa03.sol:Tarefa03

https://mumbai.polygonscan.com/address/0x40d72AaE3adcFD55742b3f2a3E35eAb27bB979aE#code


npx hardhat clean
npx hardhat compile
npx hardhat run scripts/deploy_seller.js --network polygonMumbai

Compiled 10 Solidity files successfully
Deploying contracts with the account:, 0xe37DF09A14CCC1fDB3dffeD559bc059A21b8C13D
Account balance:, 433938113685101515
Token address Seller Tarefa 04:, 0x77b38dceFD80f10665a13d36727A290fbb8105Ab

npx hardhat verify --network polygonMumbai 0x77b38dceFD80f10665a13d36727A290fbb8105Ab --contract contracts/Tarefa04.sol:Tarefa04 0xbfd260ddF1936d3ac0ded8E6D52B9f6E8EC70153

https://mumbai.polygonscan.com/address/0x77b38dceFD80f10665a13d36727A290fbb8105Ab#code

/*
