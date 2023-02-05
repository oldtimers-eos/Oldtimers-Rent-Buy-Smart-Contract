// Unit Tests for Proof of Concept (Renting & Buying Classic Vehicles)

const {expect, use} = require("chai");
const { ethers } = require('hardhat');
use(require('chai-as-promised'));

describe("Oldtimers Rent & Buy SC", async function() {

        before(async () => {
            const RentContract = await ethers.getContractFactory("OldtimersRentBuy");
            rent = await RentContract.deploy();
            accounts =await hre.ethers.getSigners();
            owner = accounts[0];
        });

        it("User can add vehicle for free -> sucesfully", async () => {
            await expect(rent.connect(accounts[0]).addVehicle(1965, "Ford", "Mustang")).to.not.be.reverted;
            expect(await rent.vehicleOwner(1)).to.equal(accounts[0].address);
        });
    
        it("Not Owner of the vehecle try to add Details to the vehicle -> failed", async () => {
            await expect(rent.connect(accounts[1]).addDetailsToVehicle(1, "Blue", "White", "Manual", 100, false, 2, false, 0)).to.be.rejectedWith("Only Owner can add Details to the vehicle"); 
        });

        it("Owner add Details of the vehicle -> sucesfully", async () => {
            await expect(rent.connect(accounts[0]).addDetailsToVehicle(1, "Blue", "White", "Manual", 100, false, 2, false, 0)).to.not.be.reverted;
        });

        it("User try to rent the vehicle which is not avaible for rent -> failed", async () => {
            await expect(rent.connect(accounts[1]).rentVehicle(1, 1, {value: ethers.utils.parseEther("2.02")})).to.be.rejectedWith("Only available vehicles for rent can be rented"); 
        });

        it("Owner add avaible rent option for the vehicle -> sucesfully", async () => {
            await expect(rent.connect(accounts[0]).addDetailsToVehicle(1, "Blue", "White", "Manual", 100, true, 2, false, 0)).to.not.be.reverted;
        });

        it("Owner try to rent the vehicle which owns -> failed", async () => {
            await expect(rent.connect(accounts[0]).rentVehicle(1, 1, {value: ethers.utils.parseEther("2.02")})).to.be.rejectedWith("Owner can't rent their own vehicle"); 
        });

        it("User try to pay less for renting the vehicle -> failed", async () => {
            await expect(rent.connect(accounts[1]).rentVehicle(1, 1, {value: ethers.utils.parseEther("2.00")})).to.be.rejectedWith("You want to pay less than the owner asked for the vehicle"); 
        });

        it("User sucesfully renting the vehicle", async () => {
            await expect(rent.connect(accounts[1]).rentVehicle(1, 1, {value: ethers.utils.parseEther("2.02")})).to.not.be.reverted; 
        });

        it("Owner try to add avaible rent option for the vehicle which is already rented -> failed", async () => {
            await expect(rent.connect(accounts[0]).addDetailsToVehicle(1, "Blue", "White", "Manual", 100, true, 2, false, 0)).to.be.rejectedWith("You can't change Details when the vehicle is rented"); 
        });

        it("Owner try to add avaible rent option for the vehicle after rented period -> sucesfully", async () => {
            await ethers.provider.send('evm_increaseTime', [86400]);
            await expect(rent.connect(accounts[0]).addDetailsToVehicle(1, "Blue", "White", "Manual", 100, true, 2, false, 0)).to.not.be.rejected; 
        });

        it("Calculate a profit of Dapp", async () => {
            expect(await rent.accumulatedProfit()).to.equal("20000000000000000");
        });

        it("User faild to give rating, becuase they not rented that vehicle -> failed", async () => {
            await expect(rent.connect(accounts[2]).giveReviewScore(1, 10)).to.be.rejectedWith("Only users who rent a vehicle can give a score"); 
        });

        it("User faild to give rating, becuase they want to give review score 11 -> failed", async () => {
            await expect(rent.connect(accounts[1]).giveReviewScore(1, 11)).to.be.rejectedWith("Users can give a score between 0 and 10"); 
        });

        it("User sucesfully rating the vehicle", async () => {
            await expect(rent.connect(accounts[1]).giveReviewScore(1, 10)).to.not.be.rejected;
        });

        it("User try to make one more review score for the some vehicle -> failed", async () => {
            await expect(rent.connect(accounts[1]).giveReviewScore(1, 9)).to.be.rejectedWith("Users can give a score only one time per vehicle"); 
        });

        it("Not Admin try to change service fee -> failed", async () => {
            await expect(rent.connect(accounts[2]).changeRentFee(2)).to.be.rejectedWith("Only creator of the smart contract can chagen service fee"); 
        });

        it("Admin sucesfully change service fee", async () => {
            await expect(rent.connect(accounts[0]).changeRentFee(2)).to.not.be.rejected;
            expect(await rent.rentFee()).to.equal("20000000000000000");
        });

        it("User 2. can add vehicle for free -> sucesfully", async () => {
            await expect(rent.connect(accounts[2]).addVehicle(1956, "Cadillac", "Eldorado")).to.not.be.reverted;
            expect(await rent.vehicleOwner(2)).to.equal(accounts[2].address);
        });

        it("User try to buy the vehicle which is not avaible for buying -> failed", async () => {
            await expect(rent.connect(accounts[1]).buyVehicle(2, {value: ethers.utils.parseEther("2.02")})).to.be.rejectedWith("Only available vehicles for buying can be buy"); 
        });

        it("Owner add avaible buying option for the vehicle -> sucesfully", async () => {
            await expect(rent.connect(accounts[2]).addDetailsToVehicle(2, "Green", "Beige", "Manual", 200, false, 0, true, 33)).to.not.be.reverted;
        });

        it("Owner try to buy the vehicle which owns -> failed", async () => {
            await expect(rent.connect(accounts[2]).buyVehicle(2, {value: ethers.utils.parseEther("33.02")})).to.be.rejectedWith("Owner can't buy their own vehicle"); 
        });

        it("User try to pay less for buying the vehicle -> failed", async () => {
            await expect(rent.connect(accounts[1]).buyVehicle(2, {value: ethers.utils.parseEther("22.01")})).to.be.rejectedWith("You want to pay less than the owner asked for the vehicle"); 
        });

        it("User sucesfully bought the vehicle", async () => {
            await expect(rent.connect(accounts[3]).buyVehicle(2, {value: ethers.utils.parseEther("33.02")})).to.not.be.reverted; 
            expect(await rent.vehicleOwner(2)).to.equal(accounts[3].address);
        });

});
    


