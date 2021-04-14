import { LOTTERY_TRANSACTION, LOTTERY_DATA_INIT } from '../actions/types';

const INITIAL_STATE = {
    manager: '',
    players: [],
    balance: 0,
    transactionFinished: true
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LOTTERY_DATA_INIT:
            return {
                ...state,
                manager: action.payload.manager,
                players: action.payload.players,
                balance: action.payload.balance,
                web3: action.payload.web3,
                accounts: action.payload.accounts
            }
        case LOTTERY_TRANSACTION:
            return {
                ...state,
                transactionFinished: action.payload
            }
        default:
            return state;
    }
}