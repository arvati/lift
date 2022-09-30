// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract PutTokenAcucar is ERC20 {
    uint256 expirationDate = 1664496580;
    address underlyingAddress = 0x1AEF739B0f366DCF853F686300Ac721806480A2B;
    address strikeAddress = 0xDE47C60e6964668cE158c75612F145BEf997229B;
    uint256 strikePrice = 2;
    uint256 EXERCISE_WINDOW = 24*60*60;
    mapping(address => uint256) opcoesCriadas;
    // PUT => direito de VENDA -> 100% collateralized

    constructor() ERC20("Put-Acucar-2-1-Oct", "Put-Acucar-2-1-Oct") {}

    function criacao(uint256 amountOfOptions) public {
        uint256 collateralToLock = amountOfOptions * strikePrice;
        IERC20 strikeContract = IERC20(strikeAddress);

        strikeContract.transferFrom(msg.sender, address(this), collateralToLock);
        _mint(msg.sender, amountOfOptions);
        // _mint()
        // 1) Fazer a conta de quanto colateral será preciso pegar do vendedor
        // 2) Transferir o colateral necessário do vendedor para o contrato
        // 3) Transferir de volta um token, que representa o contrrato de opção
    }

    function exercicio(uint256 amountOfOptions) public {
        require(block.timestamp > expirationDate, "A opcao nao expirou ainda");
        // require() => block.timestamp > expirationDate
        // comprador enviar underlying(acucar coin) pro contrato e 
        // vai receber o strike asset (brl coin)
        // _burn()
        // burn no amountOFOptions (quantidade de opCoès a serem exercidas)
    }

    function retirada() public {
        require(block.timestamp > expirationDate + EXERCISE_WINDOW, "A opcao nao expirou ainda");
        // enviar a sobras ou o colateral não utilizado do vendedor que trancou inicialmente como garantia
    }

}