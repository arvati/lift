# Exercicio aula 4

https://forms.gle/B6pJE1Q1bmf3Ujiu8

Qual o endereço da sua carteira na polygon?
https://mumbai.polygonscan.com/address/0xff2416aC6D95ee66fa095453531970291a3651a6

Faça o deploy de uma token, cole o endereço da token abaixo:
https://mumbai.polygonscan.com/address/0x62f8129f0376a239056f5bc6ad53073f32c81521#code

Adicione liquidez na QuickSwap - https://quickswap.exchange/ - da token recém criada, cole o tx hash abaixo:
https://quickswap.exchange/#/pools
https://legacy.quickswap.exchange/#/pool

https://mumbai.polygonscan.com/tx/0x9951be3d8e513804f0e1f2d4646f5bac4f90c73faab1fc0bd2858bba024e23c9


Adicione liquidez na Uniswap V3 - https://uniswap.org/ - da token recém criada, cole o tx hash abaixo:
https://app.uniswap.org/#/add/ETH/0x62f8129f0376A239056F5bC6Ad53073F32C81521?chain=polygon_mumbai

https://mumbai.polygonscan.com/tx/0xbd74c34438261e4a55ace50f2f581eecaf05fb62c569a1f0f4cb98b38756510d

Faça o deploy de uma token com 5% de taxa para 0x0000… (burn) em cada transferência. Cole o endereço da token abaixo:
https://mumbai.polygonscan.com/address/0x18eb58691a368fc0a870f83896900f73101af996#code

Faça o deploy de uma token onde não donos do contrato só conseguem transferir a partir de 2023 Dica: (block.timestamp)
Cole o endereço da token abaixo:
https://mumbai.polygonscan.com/address/0x2def055876e3d94c79ea8ae939712bfb23f259ce#code

Faça o deploy de um contrato de venda de de uma das tokens criadas acima a partir de um depósito em MATIC. Cole o endereço do contrato abaixo.
https://mumbai.polygonscan.com/address/0x1f11828405c52be6623c703cb5b1c0e818e3d64c#code

send tokens to sell
tarefa01 = 0.000000000000001
https://mumbai.polygonscan.com/tx/0xa1f05137fd42f0af162b9b57f6eff7b789660348881a40b35f286e9ac09a6ef8

buy tokens back
matic = 0.000000000000000005
https://mumbai.polygonscan.com/tx/0x04f766d37ad08a20d84bc289209364fde0b7de39cdf442b92a3c7986c2d15e1a
received 0.0000000000000005 


## Anotações

npx hardhat clean
npx hardhat compile
npx hardhat test --network hardhat
npx hardhat run scripts/deploy.js --network polygonMumbai


npx hardhat verify --network polygonMumbai 0x62f8129f0376A239056F5bC6Ad53073F32C81521 --contract contracts/Tarefa01.sol:Tarefa01

npx hardhat verify --network polygonMumbai 0x18Eb58691A368fC0a870f83896900F73101aF996 --contract contracts/Tarefa02.sol:Tarefa02

npx hardhat verify --network polygonMumbai 0x2DEf055876E3D94C79eA8ae939712BfB23f259ce --contract contracts/Tarefa03.sol:Tarefa03

npx hardhat verify --network polygonMumbai 0x1F11828405C52Be6623C703CB5b1C0E818e3D64C --contract contracts/Tarefa04.sol:Tarefa04 0x62f8129f0376A239056F5bC6Ad53073F32C81521
