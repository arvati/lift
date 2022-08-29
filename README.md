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

Qual o endereço do contrato deployado? 


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

