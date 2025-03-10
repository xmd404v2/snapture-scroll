const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("All Contracts", function () {
    let Hook, MockUSDC, NFT, Workflow;
    let hook, mockUSDC, nft, workflow;

    let tokenUri = 'https://gateway.pinata.cloud/ipfs/QmXNJzDJYKG8tjBDvQrStqcM9dbuQBjv2tvpvvUeDoS2SV';

    beforeEach(async function () {
        // Deploy MockUSDC
        MockUSDC = await ethers.getContractFactory("MockUSDC");
        mockUSDC = await MockUSDC.deploy();
        await mockUSDC.waitForDeployment();

        // Deploy NFT
        NFT = await ethers.getContractFactory("NFT");
        nft = await NFT.deploy();
        await nft.waitForDeployment();

        // Now deploy Hook with the addresses of MockUSDC and NFT
        Hook = await ethers.getContractFactory("Hook");
        hook = await Hook.deploy(await nft.getAddress(), await mockUSDC.getAddress());
        await hook.waitForDeployment();

        // Set hook address in NFT contract
        await nft.setHookAddress(await hook.getAddress());

        // Deploy Workflow
        const [owner, user1, user2] = await ethers.getSigners();
        Workflow = await ethers.getContractFactory("Workflow");
        workflow = await Workflow.connect(user1).deploy(
            "Test Workflow",  // workflowName
            user2.address,    // payee
            1000,            // workflowAmount
            await mockUSDC.getAddress(),  // usdcAddress
            await nft.getAddress(),       // nftAddress
            await hook.getAddress()       // hookAddress
        );
        await workflow.waitForDeployment();
    });

    describe("MockUSDC", function () {
        it("should deploy successfully", async function () {
            expect(await mockUSDC.getAddress()).to.be.properAddress;
        });
    });

    describe("NFT", function () {
        let owner, user1, user2;

        beforeEach(async function () {
            [owner, user1, user2] = await ethers.getSigners();
        });

        it("should deploy successfully", async function () {
            expect(await nft.getAddress()).to.be.properAddress;
        });

        it("should only allow owner or hook contract to mint", async function () {
            await expect(nft.connect(user1).mint(user1.address, tokenUri))
                .to.be.revertedWith('Only the hook contract or owner can call this function');
        });
        
        it("should have correct owner", async function () {
            const contractOwner = await nft.owner();
            expect(contractOwner).to.equal(owner.address);
        });

        it("should allow owner to mint NFT successfully", async function () {
            const recipient = user1.address;
            
            // Set hook address first
            await nft.setHookAddress(await hook.getAddress());

            // Mint the NFT
            await nft.connect(owner).mint(recipient, tokenUri);

            expect(await nft.ownerOf(0)).to.equal(recipient);
            expect(await nft.tokenURI(0)).to.equal(tokenUri);
            expect(await nft.nextNFTId()).to.equal(1);
        });

        it("should increment nextNFTId after minting", async function () {
            await nft.setHookAddress(await hook.getAddress());
            
            // Mint multiple NFTs
            await nft.connect(owner).mint(user1.address, tokenUri);
            await nft.connect(owner).mint(user2.address, tokenUri);
            
            expect(await nft.nextNFTId()).to.equal(2);
        });
    });

    describe("Hook", function () {
        let owner, user1, user2;
        let workflowAddress;

        beforeEach(async function () {
            [owner, user1, user2] = await ethers.getSigners();
            workflowAddress = await workflow.getAddress();

            // Mint some USDC to users for testing
            const tx1 = await mockUSDC.mint(user1.address, ethers.parseUnits("1000", 6));
            await tx1.wait();
            const tx2 = await mockUSDC.mint(user2.address, ethers.parseUnits("1000", 6));
            await tx2.wait();
        });

        it("should deploy successfully", async function () {
            expect(await hook.getAddress()).to.be.properAddress;
        });

        it("should create workflow successfully", async function () {
            await hook.createWorkflow(workflowAddress);
            const workflows = await hook.getAllWorkflows();
            expect(workflows).to.include(workflowAddress);
        });

        it("should set threshold correctly", async function () {
            const newThreshold = 3;
            await hook.connect(owner).setThreshold(newThreshold);
            expect(await hook.threshold()).to.equal(newThreshold);
        });

        it("should create workflow, finalize job, and update progress", async function () {
            const user2orgBalance = await mockUSDC.balanceOf(user2.address);

            // Create a workflow
            await hook.connect(user1).createWorkflow(workflowAddress);

            // Deposit USDC to workflow contract
            // IERC20(usdc).transferFrom(msg.sender, address(this), _amount);
            const workflowAmount = ethers.parseUnits("1000", 6);
            await mockUSDC.connect(user1).approve(workflowAddress, workflowAmount);
            await workflow.connect(user1).deposit(workflowAmount);

            // Set hook address in NFT contract
            await nft.setHookAddress(await hook.getAddress());

            // Call _finalizeJob directly
            await hook.connect(owner)._finalizeJob(workflowAddress, tokenUri);
    
            // Check if the progress was updated in workflow
            const progress = await workflow.getAllProgress();
            expect(progress.length).to.equal(2);

            // Check if NFT was minted to the owner
            expect(await nft.ownerOf(0)).to.equal(await workflow.getOwner());
            
            // Check all mockUSDC balancese
            const user1Balance = await mockUSDC.balanceOf(user1.address);
            const user2Balance = await mockUSDC.balanceOf(user2.address);

            expect(user1Balance).to.equal(0);
            expect(user2Balance).to.equal( user2orgBalance + workflowAmount);
        });

        // it("should track attestation count correctly", async function () {
        //     await hook.createWorkflow(workflowAddress);
            
        //     // Set the hook address in NFT contract
        //     await nft.setHookAddress(await hook.getAddress());

        //     // Add user1 to whitelist
        //     await hook.connect(owner).setWhitelist(user1.address, true);

        //     // Mock attestation data
        //     const schemaId = 1;
        //     const attestationId = 1;
        //     const extraData = ethers.AbiCoder.defaultAbiCoder().encode(
        //         ['address', 'string'],
        //         [workflowAddress, tokenUri]
        //     );

        //     await hook.connect(user1).didReceiveAttestation(
        //         user1.address,
        //         schemaId,
        //         attestationId,
        //         extraData
        //     );

        //     expect(await hook.attestationCount(workflowAddress)).to.equal(1);
        // });
    });
});