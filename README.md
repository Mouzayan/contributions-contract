# Basic Contributions Smart Contract Project

This project uses the Hardhat smart contract framework and inherits from the OpenZeppelin library. 


Scope:
- A token contract that inherits from OpenZeppelin’s ERC20 base contract and extends its
functionality so that tokens can only be transferred after a particular `_startTime` and before a particular
`_endTime` 
- A `Contribution` contract that users can donate ETH to. In return for their ETH-based
contributions, the `Contribution` contract issues them tokens from the token contract in return
- The `Contribution` contract stores the addresses of users that donate as well as the amount of
ETH they’ve donated.
- It includes a function that will accept a wallet address and return the contributed amount
of ETH that a wallet address has contributed to the contract
- Unit testing
