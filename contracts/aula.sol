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
        opcoesCriadas[msg.sender] = amountOfOptions;
        // _mint()
        // 1) Fazer a conta de quanto colateral será preciso pegar do vendedor
        // 2) Transferir o colateral necessário do vendedor para o contrato
        // 3) Transferir de volta um token, que representa o contrrato de opção
    }

    function exercicio(uint256 amountOfOptions) public {
        require(block.timestamp > expirationDate, "A opcao nao expirou ainda");
        IERC20 strikeContract = IERC20(strikeAddress);
        IERC20 underlyingContract = IERC20(underlyingAddress);
        uint256 collateralToSend = amountOfOptions * strikePrice;

        underlyingContract.transferFrom(msg.sender, address(this), amountOfOptions);
        strikeContract.transfer(msg.sender, collateralToSend);
        _burn(msg.sender, amountOfOptions);

        // 1) require() => block.timestamp > expirationDate
        // (check) comprador enviar underlying(acucar coin) pro contrato e 
        // (check) comprador vai receber o strike asset (brl coin)
        // _burn()
        // burn no amountOFOptions (quantidade de opCoès a serem exercidas)
    }

    function retirada() public {
        require(block.timestamp > expirationDate + EXERCISE_WINDOW, "A opcao nao expirou ainda");
        uint256 quantidadeCriada = opcoesCriadas[msg.sender];

         IERC20 strikeContract = IERC20(strikeAddress);
         IERC20 underlyingContract = IERC20(underlyingAddress);

        if (underlyingContract.balanceOf(address(this)) > 0) {
            underlyingContract.transfer(msg.sender, quantidadeCriada);
        } else {
            // envio o colateral original
            strikeContract.transfer(msg.sender, quantidadeCriada * strikePrice);
        }
         
         // SE O COMPRADOR NAO EXERCEU => ENVIAR O COLATERAL QUE TINHA SIDO TRANCADO
         // SE O COMPRADOR EXERCEU => ENVIAR O ACUCAR COIN QUE O COMPRADOR VENDEU 

        // enviar a sobras ou o colateral não utilizado do vendedor que trancou inicialmente como garantia
    }

}