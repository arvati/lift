// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/FiatBacked.sol";

contract FiatBackedTest is Test {
    FiatBacked public coin;
    function setUp() public {
       coin = new FiatBacked();
    }

    function testBlocklist() public {
        address user = address(0x5);
        coin.mint(user, 100 ether);

        assertEq(coin.balanceOf(user), 100 ether);

        vm.prank(user); // proxima chamada vai ser feita pelo user
        coin.transfer(address(1), 50 ether);

        assertEq(coin.balanceOf(user), 50 ether);
        assertEq(coin.balanceOf(address(1)), 50 ether);

        coin.manageBlocklist(user, true);

        assertTrue(coin.blocklist(user));

        vm.prank(user); // proxima chamada vai ser feita pelo user
        vm.expectRevert(bytes("user is blocked"));
        coin.transfer(address(1), 30 ether);
    }


}
