// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ISP} from "@ethsign/sign-protocol-evm/src/interfaces/ISP.sol";
import {ISPHook} from "@ethsign/sign-protocol-evm/src/interfaces/ISPHook.sol";
import {Attestation} from "@ethsign/sign-protocol-evm/src/models/Attestation.sol";
import "./interfaces/ISnaptureNFT.sol";
import "./interfaces/ISnaptureWorkflow.sol";
import "./WhitelistMananger.sol";
import "hardhat/console.sol";

contract Hook is ISPHook, WhitelistMananger, ReentrancyGuard {
    address public usdc;
    address public nft;

    address[] public workflows;
    mapping(address => uint64) public hasAttested;

    uint public threshold = 1;

    string public debugMessage;

    mapping(address => uint) public attestationCount; // workflowAddress => count

    error NumberBelowThreshold();
    error UnsupportedOperation();

    event WorkflowCreated(address indexed workflowAddress);

    constructor(address _nft, address _usdc) {
        nft = _nft;
        usdc = _usdc;
    }

    // Add a new workflow
    function createWorkflow(address _workflowAddress) public {
        workflows.push(_workflowAddress);
        emit WorkflowCreated(_workflowAddress);
    }

    function getAllWorkflows() public view returns (address[] memory) {
        return workflows;
    }

    function _finalizeJob(address _workflowAddress, string memory _tokenUri) public onlyOwner {
        console.log("finalizeJob:", _workflowAddress);
        debugMessage = "finalizeJob";
        require(workflowExists(_workflowAddress) == true, "Workflow does not exist.");

        console.log("update workflow:", _tokenUri);
        debugMessage = "finalizeJob: update workflow";
        ISnaptureWorkflow(_workflowAddress).updateProgress(_tokenUri);

        debugMessage = "finalizeJob: emit event";
        // remove job from project
        // delete project.jobs[jobId];
    }

    function workflowExists(address _workflowAddress) public view returns (bool) {
        for (uint i = 0; i < workflows.length; i++) {
            if (workflows[i] == _workflowAddress) {
                return true; // Address found
            }
        }
        return false; // Address not found
    }

    function setThreshold(uint256 threshold_) external onlyOwner {
        threshold = threshold_;
    }

    function _checkThreshold(uint256 number) internal view returns (bool) {
        // solhint-disable-next-line custom-errors
        return number >= threshold;
    }

    function didReceiveAttestation(
        address attester,
        uint64, // schemaId
        uint64 attestationId, // attestationId
        bytes calldata // extraData
    ) external payable {
        console.log("Attester:", attester);
        console.log("Attestation ID:", attestationId);
        
        _checkAttesterWhitelistStatus(attester);
        console.log("_msgSender", _msgSender());
        Attestation memory attestation = ISP(_msgSender()).getAttestation(
            attestationId
        );
        console.log("attestation error");

        (address workflowAddress, string memory tokenUri) = abi.decode(
            attestation.data,
            (address, string)
        ); // workflowAddress, tokenUri

        console.log("Workflow Address:", workflowAddress);
        console.log("Token URI:", tokenUri);

        // Check if the signer has already attested
        require(
            hasAttested[workflowAddress] == 0,
            "Signer has already attested"
        );
        // Mark the signer as having attested
        hasAttested[workflowAddress] = attestationId;

        attestationCount[workflowAddress]++;
        if (_checkThreshold(attestationCount[workflowAddress])) {
            _finalizeJob(workflowAddress, tokenUri);
        }
    }

    function didReceiveAttestation(
        address, // attester,
        uint64, // schemaId
        uint64, // attestationId
        IERC20, // resolverFeeERC20Token
        uint256, // resolverFeeERC20Amount
        bytes calldata // extraData
    ) external pure {
        revert UnsupportedOperation();
    }

    function didReceiveRevocation(
        address, // attester,
        uint64, // schemaId
        uint64, // attestationId
        bytes calldata // extraData
    ) external payable {
        revert UnsupportedOperation();
    }

    function didReceiveRevocation(
        address, // attester,
        uint64, // schemaId
        uint64, // attestationId
        IERC20, // resolverFeeERC20Token
        uint256, // resolverFeeERC20Amount
        bytes calldata // extraData
    ) external pure {
        revert UnsupportedOperation();
    }
}
