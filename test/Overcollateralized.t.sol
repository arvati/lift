// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Overcollateralized.sol";

contract OvercollateralizedTest is Test {
    Overcollateralized public coin;
    SimpleOracle public oracle;

    function setUp() public {
        oracle = new SimpleOracle();
        coin = new Overcollateralized(oracle);

        oracle.setPrice(10000 ether); // BRL
    }

    function testGenerateDebt() external {
        // adicionou collateral
        coin.addCollateral{value: 1 ether}(); // ETH

        // gerou debito saudavel
        coin.generateDebt(5000 ether); // BRL

        assertEq(coin.balanceOf(address(this)), 5000 ether);

        (uint collat, uint debt) = coin.cdps(address(this)); // coin (BRL pegged)
        assertEq(collat, 1 ether); // eth
        assertEq(debt, 5000 ether); // brl

        // gerou debito não saudavel (reverte)
        vm.expectRevert(bytes("unhealthy"));
        coin.generateDebt(1700 ether); // BRL
    }

    function testFailLiquidateHealthy() external {
        // adicionou collateral
        coin.addCollateral{value: 1 ether}(); // ETH

        // gerou debito saudavel
        coin.generateDebt(5000 ether); // BRL

        assertEq(coin.balanceOf(address(this)), 5000 ether);

        (uint collat, uint debt) = coin.cdps(address(this)); // coin (BRL pegged)
        assertEq(collat, 1 ether); // eth
        assertEq(debt, 5000 ether); // brl

        oracle.setPrice(7500 ether);
        coin.liquidate(address(this));
    }

    function testLiquidate() external {
        // adicionou collateral
        coin.addCollateral{value: 1 ether}(); // ETH

        // gerou debito saudavel
        coin.generateDebt(5000 ether); // BRL

        assertEq(coin.balanceOf(address(this)), 5000 ether);

        (uint collat, uint debt) = coin.cdps(address(this)); // coin (BRL pegged)
        assertEq(collat, 1 ether); // eth
        assertEq(debt, 5000 ether); // brl

        oracle.setPrice(7499 ether);
        coin.liquidate(address(this));

        (collat, debt) = coin.cdps(address(this)); // coin (BRL pegged)
        assertEq(collat, 0); // eth, foi pra leilao
        assertEq(debt, 0); // brl, 0, aguardando repagamento
    }



}
