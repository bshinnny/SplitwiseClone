// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import './SplashPage.css'
import background from '../../assets/background.png'
import iphone1 from '../../assets/iphone/iphone1.png'
import iphone2 from '../../assets/iphone/iphone2.png'
import iphone3 from '../../assets/iphone/iphone3.png'
import iphone4 from '../../assets/iphone/iphone4.png'
import iphone5 from '../../assets/iphone/iphone5.png'


export default function SplashPage() {

    return (
        <div className="entire-page-container" style={{ backgroundImage: `url(${background})`}}>
            <div className="white-container">
                <div className="white-left-container">
                    <div className="white-left-total-text">
                    <div className="white-bold-text">Less stress when</div>
                    <div className="white-bold-text">sharing expenses</div>
                    <div className="rotating-text-container">
                        <div className="rotating-text">on trips.</div>
                        <div className="rotating-text">with housemates.</div>
                        <div className="rotating-text">with your partner.</div>
                        <div className="rotating-text">with anyone.</div>
                    </div>
                    <div className="rotating-images-container">
                        <div className="rotating-image"><i className="fa-solid fa-plane"></i></div>
                        <div className="rotating-image"><i className="fa-solid fa-house"></i></div>
                        <div className="rotating-image"><i className="fa-solid fa-heart"></i></div>
                        <div className="rotating-image"><i className="fa-solid fa-asterisk"></i></div>
                    </div>
                    <div id="white-small-text">Keep track of your shared expenses and balances with housemates, trips, groups, friends, and family.</div>
                    <button >Sign up</button>
                    <div>Free for iPhone, Android, and web.</div>
                    </div>
                </div>
                <div className="white-right-container">
                    <i className="fa-solid fa-plane"></i>
                </div>
            </div>
            <div className="row-container">
                <div className="block-container">
                    <h1>Track balances</h1>
                    <div>Keep track of shared expenses,</div>
                    <div>balances, and who owes who.</div>
                    <img src={iphone1}/>
                </div>
                <div className="block-container">
                    <h1>Organize expenses</h1>
                    <div>Split expenses with any group: trips,</div>
                    <div>housemates, friends, and family.</div>
                    <img src={iphone2}/>
                </div>
            </div>
            <div className="row-container">
                <div className="block-container">
                    <h1>Add expenses easily</h1>
                    <div>Quickly add expenses on the go before</div>
                    <div>you forget who paid.</div>
                    <img src={iphone3}/>
                </div>
                <div className="block-container">
                    <h1>Pay friends back</h1>
                    <div>Settle up with a friend and record any</div>
                    <div>cash or online payment.</div>
                    <img src={iphone4}/>
                </div>
            </div>
            <div className="row-container">
                <div className="block-container">
                    <h1>Get even more with PRO</h1>
                    <div>Get even more organized with receipt scanning,</div>
                    <div>charts and graphs, currency conversion, and</div>
                    <div>more!</div>
                    <NavLink to='/sign-up' exact={true} activeClassName='active'>
                        <button id='sign-up-button-2'>Sign Up</button>
                    </NavLink>
                </div>
                <img src={iphone5}/>
            </div>

        </div>
    )



}
