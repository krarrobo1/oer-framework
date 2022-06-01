import React, { useState, useEffect } from "react";
import UserListContract from "src/contracts/UserList.json";
import ResourceListContract from "src/contracts/ResourceList.json";
import getWeb3 from "src/getWeb3";
import BlockchainContext from 'src/BlockchainContext';
import "src/App.css";
import { AppRouter } from "src/nav/AppRouter";
import ipfs from 'src/ipfs';
import { emptyHexStr } from "./types/resource";



export const App = () => {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [userListContract, setUserListContract] = useState(undefined);
  const [resourceListContract, setResourceListContract] = useState(undefined);
  const [user, setUser] = useState(undefined);
  
  
 

  useEffect(() => {

    const init = async () => {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();

      const deployedNetwork = UserListContract.networks[networkId];

      const deployedNetwork2 = ResourceListContract.networks[networkId];
  
      const userList = new web3.eth.Contract(
        UserListContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
  
      const resourceList = new web3.eth.Contract(
        ResourceListContract.abi,
        deployedNetwork2 && deployedNetwork2.address,
      );
      
      let user = await userList.methods.users(accounts[0]).call({ from: accounts[0] });
      if (user.name !== emptyHexStr) {
        user.name = web3.utils.hexToUtf8(user.name);
        setUser(user.name);
      }
      
      setAccounts(accounts);
      setWeb3(web3);
      setUserListContract(userList);
      setResourceListContract(resourceList);
    }
    init();
  }, [])

  useEffect(() => {
    const load = async () => {
      let user = await userListContract.methods.users(accounts[0]).call({ from: accounts[0] });
      if (user.name !== emptyHexStr) {
        user.name = web3.utils.hexToUtf8(user.name);
        setUser(user.name);
      }
    };
    if (!!web3 && !!accounts && !!userListContract) {
      load();
    }
  }, [web3, accounts, userListContract]);

  

  return (
    <div>
      {
        (!!web3) ?
          (<div className="App">
            <BlockchainContext.Provider value={{ web3, ipfs, accounts, user, setUser, userListContract, resourceListContract}}>
              <AppRouter />
            </BlockchainContext.Provider>
          </div>) :

          (<div className="center">
            <h1>
              Please connect your Metamask wallet to <strong className="text-warning">Rinkerby Network </strong>
              to proceed
            </h1>
          </div>)
      }
    </div>
  )
}
export default App;