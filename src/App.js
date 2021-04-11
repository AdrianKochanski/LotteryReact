import React, { useEffect, useState } from 'react';
import getWeb3 from './web3ETHEnable';
import lottery from './lottery';

const App = () => {

    const [manager, setManager] = useState("");
    const [message, setMessage] = useState("");
    const [players, setPlayers] = useState([]);
    const [balance, setBalance] = useState(0);
    const [value, setValue] = useState(0);

    useEffect(async () => {
        const web3 = await getWeb3();
        setManager(await lottery.methods.manager().call());
        setPlayers(await lottery.methods.getPlayers().call());
        const balanceWei = await web3.eth.getBalance(lottery.options.address);
        setBalance(await web3.utils.fromWei(balanceWei, 'ether'));
    });

    const onSubmit = async e => {
        e.preventDefault();

        const web3 = await getWeb3(); 
        const accounts = await web3.eth.getAccounts();

        setMessage("Waiting on transaction success...");

        await lottery.methods.enter().send({ 
            from: accounts[0],
            value: await web3.utils.toWei(value, 'ether')
        });

        setMessage("Transaction success!");
    }

    const pickWinner = async () => {
        const web3 = await getWeb3(); 
        const accounts = await web3.eth.getAccounts();

        setMessage("Waiting on transaction success...");

        await lottery.methods.pickWinner().send({
            from: accounts[0]
        });

        setMessage("A winner has been picked!");
    }

    return(
        <div>
            <h2>Lottery Contract</h2>
            <span>This contract is managed by {manager}</span>
            <span>There are currently {players.length} people entered,</span>
            <span>competing to win {balance} ether!</span>

            <hr/>

            <form onSubmit={onSubmit}>
                <h4>Want to try your luck?</h4>
                <div>
                    <label>Amount of ether to enter</label>
                    <input type="number" value={value} onChange={e => {setValue(e.target.value)}}/>
                </div>
                <button type="submit">Enter</button>
            </form>

            <hr/>

            <h4>Ready to pick a winner?</h4>
            <button onClick={pickWinner}>Pick a winner!</button>

            <hr/>

            <h1>{message}</h1>
        </div>
    ); 
}

export default App;