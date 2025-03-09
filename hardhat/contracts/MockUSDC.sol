// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockUSDC is ERC20 {
    constructor() ERC20("USDC", "USDC") {
        _mint(msg.sender, 100_000_000 ether);
    }

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}
