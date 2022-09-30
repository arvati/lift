// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PutTokenAcucar is ERC20 {
    uint256 expirationDate = 1664496580;
    address underlyingAddress = 0x1AEF739B0f366DCF853F686300Ac721806480A2B;
    address strikeAddress = 0xDE47C60e6964668cE158c75612F145BEf997229B;
    uint256 strikePrice = 2;
    mapping(address => uint256) opcoesCriadas;
    // PUT => direito de VENDA

    constructor() ERC20("Put-Acucar-2-1-Oct", "Put-Acucar-2-1-Oct") {}

    function criacao(uint256 amountOfOptions) public {
        // Fazer a conta de quanto colateral será preciso pegar do vendedor
        // Transferir o colateral necessário do vendedor para o contrato
        // Transferir de volta um token, que representa o contrrato de opção
    }

    function exercicio(uint256 amountOfOptions) public {
        require(block.timestamp > expirationDate, "A opcao nao expirou ainda");
        // require() => block.timestamp > expirationDate
        // comprador enviar underlying(acucar coin) pro contrato e 
        // vai receber o strike asset (brl coin)
        // burn no amountOFOptions (quantidade de opCoès a serem exercidas)
    }

    function retirada() public {
        // enviar a sobras ou o colateral não utilizado do vendedor que trancou inicialmente como garantia
    }

}