// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Aula {

    string public timeDoCoracao;

    constructor() {
        timeDoCoracao = "SPFC";
    }

    function mudarTime(string memory _novoTimeDoCoracao) public returns (bool, uint8) {
        timeDoCoracao = _novoTimeDoCoracao;
        return (true, 1);
    }
}