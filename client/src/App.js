import React, { useState, useEffect } from "react";
import UserListContract from "./contracts/UserList.json";
import ResourceListContract from "./contracts/ResourceList.json";
import getWeb3 from "./getWeb3";
import BlockchainContext from './BlockchainContext';
import "./App.css";
import { AppRouter } from "./nav/AppRouter";
import ipfs from './ipfs';



export const App = () => {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [userListContract, setUserListContract] = useState(undefined);
  const [resourceListContract, setResourceListContract] = useState(undefined);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
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
      if (user.name !== "0x0000000000000000000000000000000000000000000000000000000000000000") {
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
            <BlockchainContext.Provider value={{ web3, ipfs, accounts, user, setUser, userListContract, resourceListContract }}>
              <AppRouter />
            </BlockchainContext.Provider>
          </div>) :

          (<div>Loading Web3, accounts, and contract...</div>)
      }
    </div>
  )
}
export default App;