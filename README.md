# Oldtimers Rent & Buy SC

Deploy Oldtimers (Rent & Buy) smart contract on EOS EVM testnet.


## Usage

### Pre Requisites

Before running any command, you need to create a `.env` file and set a PRIVATE_KEY.

PRIVATE_KEY = "..."

Then, proceed with installing dependencies:

```sh
yarn install
```

### Compile

Compile the smart contracts with Hardhat:

```sh
$ yarn compile
```


### Test

Run the tests:

```sh
$ yarn hardhat test
```

### Deploy

Deploy the contracts to blockchain network (EOS EVM testnet):

```sh
$ yarn deploy --network eosevm
```

## Verify

Verify the contract:

```sh
$ yarn hardhat verify --network eosevm "oldtimersrentbuy"
```

## Oldtimers Rent & Buy SC Details

Oldtimers (Rent & Buy) SC is made up of experienced blockchain developers (team members) from Oldtimers Offer platform. The SC is a Proof of Concept for Renting & Buying Classic Vehicles and belong as a part of applying for the [ENF Grant](https://eosnetwork.com/blog/eos-network-foundation-grant-framework-guidelines/) program. Our hard work is open source and help developers a lot to create simular SCs for marketplace on blockchain (EVM is compatible, but our approach is strictly to EOS EVM). 
It can be very easy to use for real estate, sea vessels or books projects. Our approach is highly innovative in the blockchain industry and we are so proud of it. The solution is for renting, selling and reviewing of classic vehicles.    
The SC has the following advantages and rules:

-   **1. Easy to list a classic vehicle on blockchain:** User can very simple add vehicle to blockchain. It is free service.

-   **2. Owner of a vehicle has privilege:** The vehicle owner can add and change details of the vehicle. Except simple details such as Exterior Color, Transmission, Miles,... the owner can set option is the vehicle avaible for rent or sell (maybe both solutions) and what is the price for that. 

-   **2.b. Advantage in addDetails Fuction:** When a vehicle is rented, the owner can not put avaible for rent option and on that way we build trust and reputation among application users.(Innovative Solution!)

-   **3. Vehicle Reviews:** In the smart contract exist function "giveReviewScore" which allow users to give review points from 0 to 10 to some vehicle. The smart contract have view function "getReviews" which allow us to see all points for some particular vehicle.

-   **3.b. Advantage in Vehicle Reviews:** The review point to vehicle can give only users who rent that vehicle and the smart contract is secured that users can make it only one time. On that way, we prevent some kind of manipulation. We have finally trusted review points on market (Innovative Solution!). 

-   **4. Service fee:** We already mentioned that listing is free, but we put on our smart contract fee for renting and selling and in that way we create a profitable blockchain solution. Creator of the SC can change fee for renting or selling. Also, with "accumulatedProfit" we can follow how much money make our aplication (smart contract). 

-   **5. Renting a vehicle (Innovative Solution!):** During the creation of renting function in our smart contract we tried to make high light of blockchain function. We certainly think that we succeeded in that. Why? Lets explan in the next step.

-   **5.b Advantage in Vehicle Rent function:** In our function we covered the following issues:
a. Only the owner of the vehicle can add or remove the vehicle from the renting list. That is a really decentralized approach.
b. Owner can't rent owned vehicle, and on that way we secure review score.
c. When the user pays exactly or more for rent, the money goes automatically to the vehicle owner (smart contract calculated the profit).
d. We map who rents the vehicle last and what time, on that way owner has clear evidence for the court if something happens whith the vehicle (Innovative Solution!).
e. The owner of the vehicle can't put an available-for-rent option at the moment when the vehicle is rented.
f. We map how much is vehicle rented and which wallet address

-   **6. Buying a vehicle (Innovative Solution!):** During the creation of this smart contract, our idea was first to make a brand new smart contract only for buying a vehicle. After research, we find out that if we add the buying option we can not just have more options for owners of the vehicle but make the best covered smart contract for the marketplace. We decided to add that future as well. Lets explan in the next step, what we covered with buying a vehicle option.

-   **6.b Advantage in Vehicle Buy function:** In our function we covered the following rules:
a. Only the owner of the vehicle can add or remove the vehicle from the buying list. That is a really decentralized approach.
b. When the user pays exactly or more for buying the vehicle, the money goes automatically to the previous vehicle owner (smart contract calculated the profit).
c. We map who buy the vehicle, on that way new owner has option to add details and rent/buy option. The previus owner is automatically removed for that privilege.

### Business Architecture

If you are confused because of the previous explanation, don't worry. We have prepared for you [Business Architecture](https://miro.com/app/board/uXjVPq5__rU=/?share_link_id=994333599006). Enjoy! We are available for all questions at the email address office@oldtimersoffer.com

