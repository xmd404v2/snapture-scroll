// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

interface ISnaptureWorkflow {
    function deposit(uint depositAmount) external;
    function updateProgress() external;
    function getStepsCount() external view returns (uint256);
    function getProgressCount() external view returns (uint256);
    function finalizePayment() external;
    function getOwner() external view returns (address);
}
