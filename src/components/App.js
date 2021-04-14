import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../actions/index';

const App = (props) => {
    const { handleSubmit } = props;

    const [message, setMessage] = useState("");

    useEffect(() => {
        props.lotterytInit();
        if(!props.transactionFinished) setMessage("Waiting on transaction success...")
    });

    const onSubmit = (formProps) => {
        props.lottertEnter(formProps, () => { setMessage("Transaction success!") });
    }

    const pickWinner = () => {
        props.lotteryPickWinner(() => { setMessage("A winner has been picked!") });
    }

    return(
        <div>
            <h2>Lottery Contract</h2>
            <span>This contract is managed by {props.manager}</span>
            <span>There are currently {props.players.length} people entered,</span>
            <span>competing to win {props.balance} ether!</span>

            <hr/>

            <form onSubmit={handleSubmit(onSubmit)}>
                <h4>Want to try your luck?</h4>
                <fieldset>
                    <label>Amount of ether to enter</label>
                    <Field
                        name="value"
                        type="number"
                        component="input"
                        min="0.01"
                        step="0.001"
                    />
                </fieldset>
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

App.propTypes = {
    manager: propTypes.string.isRequired,
    players: propTypes.array,
    balance: propTypes.number,
    transactionFinished: propTypes.bool
};

function mapStateToProps(state) {
    return {
        manager: state.lottery.manager,
        players: state.lottery.players,
        balance: state.lottery.balance,
        transactionFinished: state.lottery.transactionFinished
    };
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({form: 'enter'})
)(App);