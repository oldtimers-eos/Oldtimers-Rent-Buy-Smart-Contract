// SPDX-License-Identifier: Mit
// Proof of Concept for Renting & Buying Classic Vehicles
// @autor Oldtimers Offer (A step towards decentralization of the classic vehicle market)

pragma solidity ^0.8.7;

interface ClassicVehicles {
   
   event newVehicle(bool _vehicleCreated);
    
    struct ClassicVehicle{
        uint256 year;
        string make;
        string model;
        string vehicleType;
        uint256 time;
        address owner;
    }

    struct VehicleDetails{
        string exteriorColor;
        string interiorColor;
        string transmission;
        uint256 odometer; //miles
        bool rentAvailable;
        uint256 priceRentPerDay; //The Price is in ETH
        uint ableToAddDetails;
        bool buyAvailable;
        uint256 priceForVehicle; //The Price is in ETH
    }

    struct RentedVehicle{
        uint rentedTimes;
        uint256 lastTimeOfRent;
        address lastTimeRentedBy;
        address[] users;
        address[] usersReviewed;
    }

    struct VehicleOwner{
        address vehicleOwner;
    }

    struct UserReviews{
        uint256[] reviewScore;
    }
}