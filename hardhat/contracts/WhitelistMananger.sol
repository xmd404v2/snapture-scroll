// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/access/Ownable.sol";

// @dev This contract manages the whitelist. We are separating the whitelist logic from the hook to make things easier
// to read.
contract WhitelistMananger is Ownable {
    mapping(address attester => bool allowed) public whitelist;

    error UnauthorizedAttester();

    constructor() Ownable(msg.sender) {}

    function setWhitelist(address attester, bool allowed) external onlyOwner {
        whitelist[attester] = allowed;
    }

    function _checkAttesterWhitelistStatus(address attester) internal view {
        // solhint-disable-next-line custom-errors
        require(whitelist[attester], UnauthorizedAttester());
    }
}
