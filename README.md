# Tendering System Based on Blockchain

It is a website based on the Ethereum blockchain, designed to create and manage tenders.

You can register on the site as a company or as a bidder.

#### Features of this site:

* Eliminate counterfeiting and fraud

* High security system, because of the blockchain

* Permanent archiving (in Ethereum)

* The possibility of determining the winner of the tender easily
#### Why Ethereum?

* A fully decentralized network, powered by PoW.

* Widespread

* High security and transparency


[Website demo](https://youtu.be/MV_h6u9PwdA)


# How to install on your computer?


## First step: install Node JS & NPM

### Step 1: Download Node.js Installer

[Download Node JS](https://nodejs.org/en/download/).

![1](https://user-images.githubusercontent.com/52602033/185775133-33f26384-5206-4978-974e-d952a22a5a6b.png)

### Step 2: Install Node.js and NPM from Browser

1. Once the installer finishes downloading, launch it. Open the downloads link in your browser and click the file. Or, browse to the location where you have saved the file and double-click it to launch.

2. The system will ask if you want to run the software – click Run.

3. You will be welcomed to the Node.js Setup Wizard – click Next.

4. On the next screen, review the license agreement. Click Next if you agree to the terms and install the software.

5. The installer will prompt you for the installation location. Leave the default location, unless you have a specific need to install it somewhere else – then click Next.

6. The wizard will let you select components to include or remove from the installation. Again, unless you have a specific need, accept the defaults by clicking Next.

7. Finally, click the Install button to run the installer. When it finishes, click Finish.

### Step 3: Verify Installation

Open a command prompt (or PowerShell), and enter the following:

node -v

npm -v

![jb](https://user-images.githubusercontent.com/52602033/185775211-78e6029f-3fcb-45bb-b12f-bfd887d504cc.PNG)

## Second step: download & setup Ganache

### Step 1: Install Ganache

#### Download Ganache from [here](https://trufflesuite.com/ganache/)

#### Next, double-click on the downloaded file, follow the prompts, and you're up and running.

### Step 2: Create a Workspace

1- set a network id to : 1337

2- set a port to : 85454

3- set a hostname to : 0.0.0.0 (to allow access from any device)

![42](https://user-images.githubusercontent.com/52602033/185775464-cb6c17b8-d330-4833-b00c-bb1089ba15e4.PNG)

4- set a GAS LIMIT to : 2604200000 &  GAS PRICE to : 20000000000


![ewwewe](https://user-images.githubusercontent.com/52602033/185775511-7986d9c3-2ee4-482e-b00c-3295bb256363.PNG)

Click Save and run this Workspace

## Third step: install Metamask Wallet

#### Step 1 : install Metamask from this link : [Download Metamask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn) or install by hand

#### Step 2: Click the Add to Chrome button

#### Step 3: Once installation is complete this page will be displayed. Click on the Get Started button.



![getstartedmetamask](https://user-images.githubusercontent.com/52602033/185775831-b5b2737f-924a-4123-81a1-0e98404fa59c.png)

### Step 4: setup Metamsk 

#### 1- click Wallet Import



![fefewwfe](https://user-images.githubusercontent.com/52602033/185775848-6200c476-68ab-4893-9bab-5eede7885660.PNG)

2- open Ganache Workspace and copy this phase

![rr](https://user-images.githubusercontent.com/52602033/185775867-8621cbd1-e935-4099-a3ba-19be539da500.PNG)

3-paste copied phase in these boxes and click import

![grfdgfv](https://user-images.githubusercontent.com/52602033/185775876-d59b37de-243f-4935-9d30-70a2a4f5ed44.PNG)

4-Now we went add & connect ganache newtork to metamask

![evfce](https://user-images.githubusercontent.com/52602033/185775914-4f253279-51bc-4cfb-8b73-c26f549ce680.PNG)

#### click add network

5- write this setup info and click save **

![fefe](https://user-images.githubusercontent.com/52602033/185775929-8080c2c9-4f67-43e9-bf0b-f63ad06e4117.PNG)

## Final Step: clone this project and run 

1- donwload this project manually or via git : git clone https://github.com/ahmed-yacoubi/Blockchain-Based-Tendering-System-.git

![vfdsfv](https://user-images.githubusercontent.com/52602033/185776103-9f79d8af-a09c-40d8-9019-2a86ba985e9e.PNG)

2- open new global cmd and install truffle via this command :  npm install -g truffle 

3- open this project in cmd or git Bash and install all library 

![dwdww](https://user-images.githubusercontent.com/52602033/185776127-fc58d8f1-0475-46f9-bfda-6e46c09b2f8c.PNG)

4- write this command in cmd : truffle migrate --compile-all --reset  --network development 

5- finally run project via this command : npm start 

![fecefc](https://user-images.githubusercontent.com/52602033/185776280-b1bdf8b3-a4ca-45d5-89d0-ded205ecec8f.png)


#### Enjoy

Connect us : 
* [Facebook](https://www.facebook.com/AhmedAliALYacoubi/)
* [Twitter](https://twitter.com/ahmeddev1999)
