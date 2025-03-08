// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/ISnaptureNFT.sol";

contract Workflow is ReentrancyGuard, Ownable {
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

    string public workflowName;
    Step[] public steps;
    uint256[] public progress;
    address public payee;
    uint public workflowAmount;
    address public usdcAddress;
    address public nftAddress;
    address public hookAddress;

    event PaymentTriggered();
    event Deposit(address indexed user, uint256 depositAmount);
    event Withdrawn(
        address indexed user,
        uint256 withdrawAmount,
        string reason
    );
    event ReleaseFund(address indexed user, uint256 workflowAmount);

    constructor(
        string memory _workflowName,
        address _payee,
        uint _workflowAmount,
        address _usdcAddress,
        address _nftAddress,
        address _hookAddress
    ) Ownable(msg.sender) {
        workflowName = _workflowName;
        payee = _payee;
        workflowAmount = _workflowAmount;
        usdcAddress = _usdcAddress;
        nftAddress = _nftAddress;
        hookAddress = _hookAddress;

        // predefined 1 Job and 1 Payment
        steps.push(Step({ 
            name: 'Job1',
            stepType: StepType.JOB,
            metadata: Metadata({ key: "", value: "" }) // Initialize metadata
        }));
        steps.push(Step({ 
            name: 'Payment1',
            stepType: StepType.PAYMENT,
            metadata: Metadata({ key: "", value: "" }) // Initialize metadata
        }));
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

    function deposit(uint depositAmount) external payable nonReentrant {
        IERC20(usdcAddress).transferFrom(msg.sender, address(this), depositAmount);
        emit Deposit(msg.sender, depositAmount);
    }

    function withdraw(
        uint withdrawAmount,
        string calldata reason
    ) external onlyOwner {
        require(withdrawAmount <= workflowAmount, "Workflow amount not sufficient");
        IERC20(usdcAddress).transfer(owner(), withdrawAmount);

        workflowAmount -= withdrawAmount;
        emit Withdrawn(msg.sender, withdrawAmount, reason);
    }

    function releaseFund(
    ) external {
        require(msg.sender == hookAddress, "Only hook can release fund");

        IERC20(usdcAddress).transfer(payee, workflowAmount);

        emit ReleaseFund(payee, workflowAmount);
    }

    function updateProgress(string memory tokenUri) public nonReentrant {
        require(msg.sender == hookAddress, "Only hook can update progress");
        require(progress.length < steps.length, "Progress index out of bounds");
        progress.push(block.timestamp);

        // last progress is Payment
        if (progress.length == (steps.length - 1)) {
            // mint NFT to owner
            ISnaptureNFT(nftAddress).mint(owner(), tokenUri);
            // release fund to payee
            IERC20(usdcAddress).transfer(payee, workflowAmount);
            workflowAmount = 0;
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

    function getPayee() public view returns (address) {
        return payee;
    }

    function getWorkflowAmount() public view returns (uint256) {
        return workflowAmount;
    }

    function getUsdcAddress() public view returns (address) {
        return usdcAddress;
    }

    function getNftAddress() public view returns (address) {
        return nftAddress;
    }

    function getHookAddress() public view returns (address) {
        return hookAddress;
    }
} 