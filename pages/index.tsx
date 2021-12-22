import type { NextPage } from 'next';
import Head from 'next/head';
import { ethers } from 'ethers';
import ToDo from '../artifacts/contracts/_ToDo.sol/ToDo.json';
import { useEffect, useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import useEthers from '../store/ethers';

declare let window: any;

const Home: NextPage = () => {
  const { account, setAccount, setProvider } = useEthers((state) => state);

  const requestAccount = async () => {
    const Accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(Accounts);
  };

  const checkMMConnection = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
    const accounts = await provider.listAccounts();
    if (accounts.length !== 0) {
      void requestAccount();
    } else {
      setAccount(accounts);
    }
  };

  const handleConnectWallet = () => {
    void requestAccount();
  };

  useEffect(() => {
    void checkMMConnection();
  }, []);

  useEffect(() => {
    if (typeof window.ethereum !== undefined) {
      window.ethereum.on('accountsChanged', (accounts: []) => {
        setAccount(accounts);
      });
    }
  }, [account]);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="max-w-md mx-auto w-full mt-20 bg-gradient-to-r px-4 py-5 from-red-300 to-orange-300 text-white rounded-md">
        <div className="flex justify-between items-center pb-3">
          <span>My Notes</span>
          <button className="p-2 bg-red-400 rounded-md" onClick={handleConnectWallet}>
            Connect Wallet
          </button>
        </div>
        <p className="py-3 border-t border-white">
          You have <span className="text-red-500">4 tasks</span> left to do.
        </p>
        <div className="flex rounded-md overflow-hidden">
          <input className="w-8/12 h-10 p-2 text-black"></input>
          <button className="bg-red-400 w-4/12 h-10">Add Task</button>
        </div>
        <div className="py-5 flex justify-between">
          <h1 className="font-black">YOUR TASKS</h1>
          {/*<h1 className="font-black bg-green-600 p-1 rounded-md">COMPLETED TASKS</h1>*/}
        </div>
        <ul className="list-none list-inside">
          <li className="flex justify-center items-center rounded-md overflow-hidden mt-1">
            <input className="w-8/12 h-10 p-2 text-black"></input>
            <button className="w-4/12 flex justify-center items-center bg-red-400 h-10">
              <AiOutlineCheck />
            </button>
          </li>
        </ul>
      </main>
    </div>
  );
};

export default Home;
