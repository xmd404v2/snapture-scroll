// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Workflow is ReentrancyGuard {
    event PaymentTriggered();

    enum StepType { JOB, PAYMENT }

    struct Metadata {
        string key;
        string value;
    }

    struct Step {
        string name;
        StepType stepType;
        Metadata metadata;
    }

    address public owner;
    string public workflowName;
    Step[] public steps;
    uint256[] public progress;
    address public payee;
    uint public amount;
    address public usdcAddress;
    address public nftAddress;

    constructor(string memory _workflowName, string memory _payee, uint _amount, address _usdcAddress, address _nftAddress) {
        owner = msg.sender;
        workflowName = _workflowName;
        payee = _payee;
        amount = _amount;
        usdcAddress = _usdcAddress;
        nftAddress = _nftAddress;
    }

    // Steps will be predefined before deploy contract
    // function addStep(string memory _name, StepType _type) public {
    //     require(msg.sender == owner, "Only owner can add steps");
    //     Step storage newStep = steps.push();
    //     newStep.name = _name;
    //     newStep.stepType = _type;
    // }
    // function setStepMetadata(uint256 stepIndex, string memory key, string memory value) public {
    //     require(msg.sender == owner, "Only owner can set metadata");
    //     require(stepIndex < steps.length, "Step index out of bounds");
    //     steps[stepIndex].metadata = {key: "key", value: "value"};
    // }

    function updateProgress() public nonReentrant {
        require(msg.sender == owner, "Only owner can update progress");
        require(progress.length < steps.length, "Progress index out of bounds");
        progress.push(block.timestamp);

        // last progress is Payment
        if (progress.length == (steps.length - 1)) {
            // mint NFT to contractor
            string memory tokenUri = "IPFS url";
            ISnaptureNFT(nftAddress).mint(owner, tokenUri);
            // release fund to payee
            IERC20(usdcAddress).transfer(payee, amount);

            progress.push(block.timestamp);
            emit PaymentTriggered();
        }
    }
    
    function getAllSteps() public view returns (Step[] memory) {
        return steps;
    }

    function getStep(uint256 stepIndex) public view returns (Step memory) {
        require(stepIndex < steps.length, "Step index out of bounds");
        return steps[stepIndex];
    }

    function getStepsCount() public view returns (uint256) {
        return steps.length;
    }
    
    function getAllProgress() public view returns (uint256[] memory) {
        return progress;
    }

    function getProgressCount() public view returns (uint256) {
        return progress.length;
    }
} 