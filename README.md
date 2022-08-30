# Aula 07 - DEX - Programadores

Slides: https://docs.google.com/presentation/d/1U_vrh2vLuvXr59IVFXONGGQE7RXJ_Rcs47ZYOD3V4_4/edit#slide=id.g14800d8e754_0_124

Exemplo: https://docs.google.com/spreadsheets/d/1pD4zp6LEZCW1Hs_drJTtP6fiRgLoKNhbGaRJ9ZYdMxA/edit#gid=1743446277


Use esse repositório de ponto de partida: https://github.com/joaoavf/amm

1. Adicione proteção de slippage (minAmountOut)
2. Adicione o time lock (deadline)
3. Adicione a fee (0.3%) para os provedores de liquidez
4. Transforme um contrato em uma token ERC20 e associe o mint ao addLiquidity e o burn ao removeLiquidity()

Um bom recurso é o repositório da UniswapV2: https://github.com/Uniswap/v2-core/tree/master/contracts 

Qual o endereço da sua carteira na polygon?
https://mumbai.polygonscan.com/address/0xff2416ac6d95ee66fa095453531970291a3651a6

Qual o endereço do contrato deployado? 
https://mumbai.polygonscan.com/address/0xECe7C80215c3BC0906e1b83b979B5e835ade322f#code


Outros conteúdos: 
https://github.com/ffatique/lift-learning-aula07
https://github.com/Uniswap/v2-periphery/blob/master/contracts/UniswapV2Router02.sol

https://github.com/Uniswap/v2-periphery/blob/master/contracts/libraries/UniswapV2LiquidityMathLibrary.sol
https://github.com/Uniswap/v2-periphery/blob/master/contracts/libraries/UniswapV2Library.sol


Hardhat with Remix IDE and HardHat Node
Execute os comandos na raiz do repositório em dois terminais diferentes
Abra o Remix IDE: https://remix.ethereum.org/

```
npx remixd --remix-ide https://remix.ethereum.org
```

```
npx hardhat node
```

Mumbai Deploy
```
npx hardhat compile
npx hardhat run scripts/deploy.js --network polygonMumbai
```

```
npx hardhat verify --network polygonMumbai 0xFf95A425ee5069e6a17761567e943DFb6F2B2F82 --contract contracts/token.sol:Token "Token A" "A"

npx hardhat verify --network polygonMumbai 0x28c4E5d0a4E34a19756333f191d70bED3E7c89e1 --contract contracts/token.sol:Token "Token B" "B"

npx hardhat verify --network polygonMumbai 0xECe7C80215c3BC0906e1b83b979B5e835ade322f --contract contracts/aula.sol:LiftAMM "Lift aula 7 - AMM" "LiftAMM" "0xFf95A425ee5069e6a17761567e943DFb6F2B2F82" "0x28c4E5d0a4E34a19756333f191d70bED3E7c89e1" "3"
```

Successfully verified contract LiftAMM on Etherscan.
https://mumbai.polygonscan.com/address/0xFf95A425ee5069e6a17761567e943DFb6F2B2F82#code
https://mumbai.polygonscan.com/address/0x28c4E5d0a4E34a19756333f191d70bED3E7c89e1#code
https://mumbai.polygonscan.com/address/0xECe7C80215c3BC0906e1b83b979B5e835ade322f#code