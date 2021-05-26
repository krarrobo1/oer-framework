// SPDX-License-Identifier: MIT
pragma solidity >=0.4.16 <0.9.0;
       
// Gestiona los usuarios.
contract UserList{
    struct User{
        bytes32 name; // 0x4d6175726963696f000000000000000000000000000000000000000000000000
        uint256 createdAt;
    }

    mapping(address => User) public users;

    address[] public userList;


    function register
    (bytes32 _name) 
    public
    returns (bytes32 username)
    {
        users[msg.sender].name = _name;
        users[msg.sender].createdAt = block.timestamp;
        userList.push(msg.sender);
        return (users[msg.sender].name);
    }

    function getUserCount()
    public
    view
    returns (uint userCount)
    {
        return userList.length;
    }
   
}