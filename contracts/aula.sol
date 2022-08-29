// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "contracts/helpers.sol";

contract LiftAMM is ERC20 { 
    address public tokenA;
    address public tokenB;
    uint256 public fee;

    modifier ensure(uint deadline) {
        // deadline zero para desligar a proteção timelock
        require(deadline == 0 || deadline >= block.timestamp, 'Time lock protection : timestamp greater then deadline');
        _;
    }

    constructor(string memory name_, string memory symbol_, address _tokenA, address _tokenB, uint256 _fee) ERC20(name_, symbol_) {
        require(_tokenA != _tokenB, 'Must be different addressess');  
        tokenA = _tokenA;
        tokenB = _tokenB;   
        fee = _fee;
    }

    function setFee(uint256 _fee) external {
        require(fee == 0, "May be changed only once");
        fee = _fee;
    }

    function getTimeStamp() external view returns (uint256) {
        return block.timestamp;
    }

    function getBalances() external view returns (uint256 balanceA, uint256 balanceB) {
        (balanceA, balanceB) = AmmLibrary.getReserves(tokenA,tokenB);
    }

    function addLiquidity(uint256 amountA, uint256 amountB) external returns (uint256 liquidity) {       
        
        require(amountA > 0 && amountB > 0, "Amount must be greater than zero" );
        IERC20(tokenA).transferFrom(msg.sender, address(this), amountA);
        IERC20(tokenB).transferFrom(msg.sender, address(this), amountB);

        (uint256 balanceA, uint256 balanceB) = AmmLibrary.getReserves(tokenA,tokenB);

        require(totalSupply() * amountA / balanceA == totalSupply() * amountB / balanceB, "Wrong proportion between asset A and B");

        liquidity = AmmLibrary.squareRoot(amountA * amountB);
        _mint(msg.sender, liquidity);        
    }

    function removeLiquidity(uint256 liquidity) external returns (uint256 amountA, uint256 amountB) {   
        require(balanceOf(msg.sender) >= liquidity, "Not enough liquidity for this, amount too big"); 
        
        (uint256 balanceA, uint256 balanceB) = AmmLibrary.getReserves(tokenA,tokenB);        

        uint denominator = totalSupply() / liquidity;
        amountA = balanceA / denominator;
        amountB = balanceB / denominator;

        _burn(msg.sender, liquidity);
        IERC20(tokenA).transfer(msg.sender, amountA);
        IERC20(tokenB).transfer(msg.sender, amountB); 
    }

    function swap(address tokenIn, uint256 amountIn, uint256 minAmountOut, uint deadline ) external ensure(deadline) returns (uint256 amountOut) {
        require(tokenIn == tokenA || tokenIn == tokenB, "TokenIn not in pool");
        require(amountIn > 0, "Insufficient Amount");
        address tokenOut = (tokenA == tokenIn) ? tokenB : tokenA;       
        (uint256 balanceA, uint256 balanceB) = AmmLibrary.getReserves(tokenIn,tokenOut);
        require(balanceA > 0 && balanceB > 0 && amountIn < balanceA, "Not enought liquidity tokenA");

        amountOut = AmmLibrary.getAmountOut(amountIn, balanceA, balanceB, fee);
        require( amountOut > 0 && amountOut < balanceB, "Not enought liquidity tokenB");
        require( amountOut >= minAmountOut, "Slippage Protection: Amount less then Minimum requested");
        
        // Get tokenIn and send tokenOut
        IERC20(tokenIn).transferFrom(msg.sender, address(this), amountIn);            
        IERC20(tokenOut).transfer(msg.sender, amountOut);
    }
}