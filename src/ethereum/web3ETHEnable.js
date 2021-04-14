import web3 from './web3';

let web3EthEnable;

if(window.ethereum != null) {

    web3EthEnable = async () => {
        await window.ethereum.enable();
        return web3
    }
}

export default web3EthEnable;