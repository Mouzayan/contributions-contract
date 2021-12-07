//SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Tyro is ERC20{
    address public founder;
    uint public totalSupply;
    // stores the number of tokens for each address in the mapping
    mapping(address => uint) public balances;

    // stores addressed of accounts approved to withdraw from the founder's account, and their withdrawal sum
    mapping(address =>  mapping(address => uint)) allowed;

    constructor(uint totalSupply) ERC20('Tyro', 'TYR') {
        totalSupply = 1000000 * (10 ** decimals());
        founder = msg.sender; // contract deployer is the founder
        balances[founder] = totalSupply; // initial token supply of founder
    }

    function balanceOf(address tokenOwner) public view override returns(uint balance){
        return balances[tokenOwner];
    }

    function transfer(address to, uint tokens) public virtual override returns(bool success){
        require(balances[msg.sender] >= tokens);
        balances[to] += tokens;
        balances[msg.sender] -= tokens;
        emit Transfer(msg.sender, to, tokens);

        return true;
    }

    // to return the allowance of an account: getter function for the allowed state variable
    // how many tokens has the tokenOwner allowed the spender to withdraw
    function allowance(address tokenOwner, address spender) view public override returns(uint) {
        return allowed[tokenOwner][spender];
    }

    // called by the tokenOwner. Sets the amount that can be spent by the approved spender from the tokenOwner account
    function approve(address spender, uint tokens) public override returns(bool success) {
        require(balances[msg.sender] >= tokens);
        require (tokens >0);

        // updates the allowed mapping
        allowed[msg.sender][spender] = tokens;
        //event triggered on any successful event to approve 
        emit Approval(msg.sender, spender, tokens);
        return true; 
    }

    // allows the spender to withdraw from the owner's account, multiple times, up to the allowed value
    // also updates the current allowance
    function transferFrom(address from, address to, uint tokens) public virtual override returns(bool success) {
        // check that the allowance of the current user is greater than or equal to the amount of tokens that is being transferred
        require(allowed[from][to] >= tokens);
        // check that the balance of the owner is greater than or equal to the balance that the user wants to transfer
        require(balances[from] >= tokens);
        // subtract the transferred tokens from the owner's balance
        balances[from] -= tokens;
        // add the transferred tokens to the spender's account
        balances[to] += tokens;
        // update the allowance of the spender in the allowed mapping
        allowed[from][to] -= tokens; 

        return true;
    }
}

contract Contribution is Tyro{
    address public admin;
    address payable public deposit;
    uint tokenRate = 0.001 ether; // 1ETH = 1000 Tyro
    uint public contributionsStart = block.number; // contribution period starts
    uint public contributionsEnd = block.number + 43800;  // contribution period ends in one week (block number plus amount of blocks processed in a week.)
    uint public tokenTransferStart = contributionsEnd + 43800; // tranfers can begin one week after saleEnd
    uint public maxContribution = 5 ether; // minumum allowed contribution
    uint public minContribution = 0.1 ether; // maximum allowed contribution

    enum State {beforeStart, running, afterEnd, halted}
    State public contractState; // state of the contribution offering

    constructor(address payable _deposit, uint totalSupply) Tyro(totalSupply) {
        deposit = _deposit;
        admin = msg.sender;
        contractState = State.beforeStart;
    }

    modifier onlyAdmin(){
        require(msg.sender == admin);
        _;
    }

    function halt() public onlyAdmin{
        contractState = State.halted;
    }

    function resume() public onlyAdmin{
        contractState = State.running;
    }

    // stores the amount of eth contributed for each address in the mapping
    mapping(address => uint) public contributed;

    // functions that returns the state of the ico
    function getCurrentState() public view returns(State){
        if(contractState == State.halted){
            return State.halted;
        }else if(block.number < contributionsStart){
            return State.beforeStart;
        }else if(block.number >= contributionsStart && block.number <= contributionsEnd){
            return State.running;
        }else{
            return State.afterEnd;
        }
    }

    event Contribute(address contributor, uint value, uint tokens);

    // called when somone send ether to the contract and receives Tyro in return
    function contribute() payable public returns(bool){
        contractState = getCurrentState();
        require(contractState == State.running);
        require(msg.value >= minContribution && msg.value <= maxContribution);

        contributed[msg.sender] = msg.value;

        uint tokens = msg.value / tokenRate;
        balances[msg.sender] += tokens;
        balances[founder] -= tokens;
        deposit.transfer(msg.value);
        emit Contribute(msg.sender, msg.value, tokens);

        return true;
    }

    function contributionOf(address contributor) public view returns(uint contribution){
        return contributed[contributor];
    }

    receive() payable external{
        contribute();
    }

    function transfer(address to, uint tokens) public override returns(bool success) {
        require(block.number > tokenTransferStart);
        Tyro.transfer(to, tokens); // same as super.transfer(to, tokens);
        return true;
    }

    function transferFrom(address from, address to, uint tokens) public override returns(bool success) {
        require(block.number > tokenTransferStart);
        Tyro.transferFrom(from, to, tokens);
        return true;
    }
}