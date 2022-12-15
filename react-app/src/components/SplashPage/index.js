import { NavLink } from 'react-router-dom';
import './SplashPage.css'
import background from '../../assets/background.png'
import iphone1 from '../../assets/iphone/iphone1.png'
import iphone2 from '../../assets/iphone/iphone2.png'
import iphone3 from '../../assets/iphone/iphone3.png'
import iphone4 from '../../assets/iphone/iphone4.png'
import iphone5 from '../../assets/iphone/iphone5.png'
import footer from '../../assets/footer.png'
import more from '../../assets/more.png'
import info from '../../assets/info.png'
import review1 from '../../assets/review1.png'
import review2 from '../../assets/review2.png'
import review3 from '../../assets/review3.png'
import review4 from '../../assets/review4.png'
import review5 from '../../assets/review5.png'
import review6 from '../../assets/review6.png'

export default function SplashPage() {

    return (
        <div className="entire-page-container">
            <div className="white-container" style={{ backgroundImage: `url(${background})`}}>
                <div className="white-left-container">
                    <h1>Less stress when</h1>
                    <h1>sharing expenses</h1>
                    <div className="rotating-text-container">
                        <h1 className="rotating-text">on trips.</h1>
                        <h1 className="rotating-text">with housemates.</h1>
                        <h1 className="rotating-text">with your partner.</h1>
                        <h1 className="rotating-text">with anyone.</h1>
                    </div>
                    <div className="rotating-images-container">
                        <div className="rotating-image"><i className="fa-solid fa-plane"></i></div>
                        <div className="rotating-image"><i className="fa-solid fa-house"></i></div>
                        <div className="rotating-image"><i className="fa-solid fa-heart"></i></div>
                        <div className="rotating-image"><i className="fa-solid fa-asterisk"></i></div>
                    </div>
                    <div id="white-small-text">
                        <p>Keep track of your shared expenses and</p>
                        <p>balances with housemates, trips, groups,</p>
                        <p>friends, and family.</p>
                    </div>
                    <NavLink to='/sign-up' exact={true} activeClassName='active'>
                        <button id='sign-up-button-2'>Sign Up</button>
                    </NavLink>
                    <div>Free for iPhone, Android, and web.</div>
                </div>
                <div className="white-right-container">
                    <i className="fa-solid fa-plane"></i>
                </div>
            </div>
            <div className="row-container" style={{ backgroundImage: `url(${background})`}}>
                <div className="block-container black-block" >
                    <h1>Track balances</h1>
                    <div>Keep track of shared expenses,</div>
                    <div>balances, and who owes who.</div>
                    <img className='iphone-imgs' src={iphone1}/>
                </div>
                <div className="block-container" id='green-block'>
                    <h1>Organize expenses</h1>
                    <div>Split expenses with any group: trips,</div>
                    <div>housemates, friends, and family.</div>
                    <img className='iphone-imgs' src={iphone2}/>
                </div>
            </div>
            <div className="row-container" style={{ backgroundImage: `url(${background})`}}>
                <div className="block-container" id='orange-block'>
                    <h1>Add expenses easily</h1>
                    <div>Quickly add expenses on the go before</div>
                    <div>you forget who paid.</div>
                    <img className='iphone-imgs' src={iphone3}/>
                </div>
                <div className="block-container black-block">
                    <h1>Pay friends back</h1>
                    <div>Settle up with a friend and record any</div>
                    <div>cash or online payment.</div>
                    <img className='iphone-imgs' src={iphone4}/>
                </div>
            </div>
            <div className="row-container" style={{ backgroundImage: `url(${background})`}}>
                <div className="block-container purple-block">
                    <h1>Get even more with PRO</h1>
                    <div>Get even more organized with receipt scanning,</div>
                    <div>charts and graphs, currency conversion, and</div>
                    <div>more!</div>
                    <NavLink to='/sign-up' exact={true} activeClassName='active'>
                        <button id='sign-up-button-2'>Sign Up</button>
                    </NavLink>
                </div>
                <div className="block-container purple-block">
                    <img className='iphone-imgs' src={iphone5}/>
                </div>
            </div>
            <img src={info}></img>
            <div>
                <div className='review-bar'>
                    <a href='https://www.ft.com/content/8ccd6f0e-18bb-11e9-b93e-f4351a53f1c3'>
                        <img src={review1} />
                    </a>
                    <img src={review2} />
                    <a href='https://www.nytimes.com/2018/08/28/smarter-living/money-finance-apps-tools.html'>
                        <img src={review3} />
                    </a>
                </div>
                <div className='review-bar'>
                    <img src={review4} />
                    <a href='https://www.businessinsider.com/best-apps-for-splitting-expenses-friends-2017-3'>
                        <img src={review5} />
                    </a>
                    <img src={review6} />
                </div>
            </div>
            <img src={more}></img>
            <img src={footer}></img>
        </div>
    )



}
