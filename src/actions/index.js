import { LOTTERY_TRANSACTION, LOTTERY_DATA_INIT } from './types';

import getWeb3 from '../ethereum/web3ETHEnable';
import lottery from '../ethereum/lottery';

export const lotterytInit = () => async dispatch => {
        const web3 = await getWeb3();
        const data = {}
        data["web3"]  = web3;
        data["accounts"] = await web3.eth.getAccounts();
        data["manager"] = await lottery.methods.manager().call();
        data["players"] = await lottery.methods.getPlayers().call();
        data["balance"] = await web3.utils.fromWei(await web3.eth.getBalance(lottery.options.address), 'ether');
        data["balance"] = Number.parseFloat(data["balance"]);
        dispatch({
            type: LOTTERY_DATA_INIT,
            payload: data
        });
}

export const lotteryPickWinner = (callback) => async (dispatch, getState) => {
    dispatch({ type: LOTTERY_TRANSACTION, payload: false });

    await lottery.methods.pickWinner().send({
        from: getState().lottery.accounts[0]
    });
    
    dispatch({ type: LOTTERY_TRANSACTION, payload: true });
    callback();
}

export const lottertEnter = (formProps, callback) => async (dispatch, getState) => {
    dispatch({ type: LOTTERY_TRANSACTION, payload: false });

    await lottery.methods.enter().send({ 
        from: getState().lottery.accounts[0],
        value: await getState().lottery.web3.utils.toWei(formProps.value, 'ether')
    });

    dispatch({ type: LOTTERY_TRANSACTION, payload: true });
    callback();
}