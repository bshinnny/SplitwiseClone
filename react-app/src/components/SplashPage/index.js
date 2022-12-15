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

    let bigText;
    let text = [
        <div style={{ color: '#70caae' }} className="rotating-text big-text">on trips.</div>,
        <div style={{ color: 'rgb(92, 0, 162)' }}  className="rotating-text big-text">with housemates.</div>,
        <div style={{ color: '#b4032b' }} className="rotating-text big-text">with your partner.</div>,
        <div style={{ color: '#70caae' }} className="rotating-text big-text">with anyone.</div>
    ];

    let index = 0;
    const textContainer = document.querySelector('rotating-text-container');
    console.log('+++++++++', textContainer)

    function change() {
        textContainer.appendChild(text[index])
        index = 3 ? index = 0 : index++;
    }

    window.onload = function () {
        setInterval(change, 3000);
    };

    return (
        <div className="entire-page-container">
            <div className="white-container" style={{ backgroundImage: `url(${background})`}}>
                <div className="white-left-container">
                    <div className='big-text'>Less stress when</div>
                    <div className='big-text'>sharing expenses</div>
                    <div className="rotating-text-container">
                        {/* <div style={{ color: '#70caae' }} className="rotating-text big-text">on trips.</div>
                        <div style={{ color: 'rgb(92, 0, 162)' }}  className="rotating-text big-text">with housemates.</div>
                        <div style={{ color: '#b4032b' }} className="rotating-text big-text">with your partner.</div>
                        <div style={{ color: '#70caae' }} className="rotating-text big-text">with anyone.</div> */}
                    </div>
                    <div className="rotating-images-container">
                        <div style={{ color: '#70caae' }} className="rotating-image"><i className="fa-solid fa-plane-departure"></i></div>
                        <div style={{ color: 'rgb(92, 0, 162)'}}  className="rotating-image"><i className="fa-solid fa-house"></i></div>
                        <div style={{ color: '#b4032b' }} className="rotating-image"><i className="fa-solid fa-heart"></i></div>
                        <div style={{ color: 'grey' }} className="rotating-image"><i className="fa-solid fa-asterisk"></i></div>
                    </div>
                    <div id="white-small-text">
                        <div>Keep track of your shared expenses and</div>
                        <div>balances with housemates, trips, groups,</div>
                        <div>friends, and family.</div>
                    </div>
                    <NavLink to='/sign-up' exact={true} activeClassName='active'>
                        <button id='sign-up-button-3'>Sign Up</button>
                    </NavLink>
                    <div>Free for <i className="fa-brands fa-apple"></i> iPhone, <i className="fa-solid fa-robot"></i> Android, and web.</div>
                </div>
                <div className="white-right-container">
                    <div style={{ color: '#70caae' }} className="rotating-image"><i className="fa-solid fa-plane-departure"></i></div>
                    {/* <div style={{ color: 'rgb(92, 0, 162)' }}  className="rotating-image"><i className="fa-solid fa-house"></i></div>
                    <div style={{ color: '#b4032b' }} className="rotating-image"><i className="fa-solid fa-heart"></i></div>
                    <div style={{ color: 'grey' }} className="rotating-image"><i className="fa-solid fa-asterisk"></i></div> */}
                </div>
            </div>
            <div className="row-container" style={{ backgroundImage: `url(${background})`}}>
                <div className="block-container black-block" >
                    <div className='big-text'>Track balances</div>
                    <div>Keep track of shared expenses,</div>
                    <div className='last-line'>balances, and who owes who.</div>
                    <img className='iphone-imgs' src={iphone1} alt='phone'/>
                </div>
                <div className="block-container" id='green-block'>
                    <div className='big-text'>Organize expenses</div>
                    <div>Split expenses with any group: trips,</div>
                    <div className='last-line'>housemates, friends, and family.</div>
                    <img className='iphone-imgs' src={iphone2} alt='phone'/>
                </div>
            </div>
            <div className="row-container" style={{ backgroundImage: `url(${background})`}}>
                <div className="block-container" id='orange-block'>
                    <div className='big-text'>Add expenses easily</div>
                    <div>Quickly add expenses on the go before</div>
                    <div className='last-line'>you forget who paid.</div>
                    <img className='iphone-imgs' src={iphone3} alt='phone'/>
                </div>
                <div className="block-container black-block">
                    <div className='big-text'>Pay friends back</div>
                    <div>Settle up with a friend and record any</div>
                    <div className='last-line'>cash or online payment.</div>
                    <img className='iphone-imgs' src={iphone4} alt='phone'/>
                </div>
            </div>
            <div className="row-container" style={{ backgroundImage: `url(${background})`}}>
                <div className="block-container purple-block" id='purple-left-block'>
                        <div className='big-text'>Get even more with PRO</div>
                        <div>Get even more organized with receipt scanning,</div>
                        <div>charts and graphs, currency conversion, and</div>
                        <div>more!</div>
                    <NavLink to='/sign-up' exact={true} activeClassName='active'>
                        <button id='sign-up-button-2'>Sign Up</button>
                    </NavLink>
                </div>
                <div className="block-container purple-block" id='purple-right-block'>
                    <img className='iphone-imgs' src={iphone5} alt='phone'/>
                </div>
            </div>
            <img src={info} alt='info'></img>
            <div>
                <div className='review-bar'>
                    <a href='https://www.ft.com/content/8ccd6f0e-18bb-11e9-b93e-f4351a53f1c3'>
                        <img src={review1} alt='review'/>
                    </a>
                    <img src={review2} alt='review'/>
                    <a href='https://www.nytimes.com/2018/08/28/smarter-living/money-finance-apps-tools.html'>
                        <img src={review3} alt='review'/>
                    </a>
                </div>
                <div className='review-bar'>
                    <img src={review4} alt='review'/>
                    <a href='https://www.businessinsider.com/best-apps-for-splitting-expenses-friends-2017-3'>
                        <img src={review5} alt='review'/>
                    </a>
                    <img src={review6} alt='review'/>
                </div>
            </div>
            <img src={more} alt='more'></img>
            <img src={footer} alt='footer'></img>
        </div>
    )



}
