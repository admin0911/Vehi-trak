# Vehi-trak

Vehi-trak is a dApp that runs on the ethereum blockchain that helps its users in recording, storing, retrieving, and tracking pertinent information about a specific vehicle through the recording of numerous events and transactions over a vehicle's complete lifecycle. The following project uses Solidity to create the smart contract containing the business logic, truffle framework to test and deploy the smart contract, Ganache to provide a test network and Metamask to act as the wallet connected to our test network.

##Funtionality of this dApp
1. Version - 1
  - List all of the details held on the blockchain
  - Add details about a new vehicle
  - Search for the details of a car with respect to registration number or name of the owner
  - Change status of the car as active or inactive

## Control Flow Diagram
![VEHI0-TRAK FLOWCHART](https://user-images.githubusercontent.com/51152622/180730537-32c4a0db-d417-4c81-bf41-61850d0f1b2f.jpg)


## Pre-requisites
1. Node.js already installed [ type in ' node -v ' in a terminal to check if its already installed]
2. Metamask plugin for Chrome - https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en 
3. Ganache - https://trufflesuite.com/ganache/

4. truffle framework 
```
npm install -g truffle@5.0.2
```

## Setting up project
**Make sure all pre-requisites are satisfied**
1. Check if truffle is installed properly
```
truffle version
```
2. Navigate to the eth-todo-list folder in the terminal and initialize truffle
```
truffle init
```
3. Install all the dependencies for the project using the following command
```
npm install
```
4. Open Ganache, ensure that it is configured correctly and the test network is active. Migrate the smart contract to the blockchain using the following command
```
truffle migrate
```
5. To start up the client side application a.k.a dApp we use the following command
```
npm run dev
```
6. To connect the browser through Metamask to the blockchain we do the following
> 1. Open Ganache
> 2. Copy the Private key of any one of the test accounts ( Preferably the first one for ease of verification )
> 3. Open the Metamask plugin
> 4. Connect to private network - "http/127.0.0.1:7545" , if its not listed create a new one having the following configuration
![image](https://user-images.githubusercontent.com/51152622/180719108-40dfdef6-a535-4842-9243-f44cb658afb6.png)
> 5. Once you have setup and selected the test network, we need to import the test account by clicking on Accounts -> Import Account and paste in the private key we coppied earlier and click on "Import"


Now just reload the webpage and if eveyrhting is configured properly your webpage should look like this


![image](https://user-images.githubusercontent.com/51152622/180721474-94342358-9228-40eb-8062-4dade488fffc.png)

***Note: The data on the blockchain will only be deleted if you deploy a new version of the smart contract***

