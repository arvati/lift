// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "solmate/tokens/ERC20.sol";
import "solmate/auth/Owned.sol";

contract FiatBacked is ERC20, Owned {
    mapping (address => bool) public blocklist;

    constructor() ERC20(
        "Fiat Backed",
        "FB",
        18
    ) Owned(msg.sender) {}

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function burn(address to, uint256 amount) external onlyOwner {
        _burn(to, amount);
    }

    function manageBlocklist(address who, bool blocked) external onlyOwner {
        blocklist[who] = blocked;
    }

    function transfer(address to, uint256 amount) public override returns (bool) {
        require(blocklist[msg.sender] == false, "user is blocked");
        return super.transfer(to, amount);
    }

    function transferFrom(address from, address to, uint256 amount) public override returns (bool) {
        require(blocklist[msg.sender] == false, "user is blocked");
        return super.transferFrom(from, to, amount);
    }
}