
import React from 'react';
import {
    Link,
} from "react-router-dom";




export function Footer() {

    const topFunction = e => {
        e.preventDefault();
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      };

  return(
      <>
        <footer className="bg-footer mt-5">
            <div className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 col-lg-7 col-md-6">
                            <h5 className="text-light fw-normal title-dark">Download the Apeware app to explore any NFTs</h5>
                            
                            <div className="mt-4">
                                <a href="/"><img src="/images/app.png" height="40" alt="IOS App" /></a>
                                <a href="/" className="ms-2"><img src="/images/playstore.png" height="40" alt="Adroid App" /></a>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-5 col-md-6 mt-4 mt-sm-0">
                            <h5 className="text-light fw-normal title-dark">Join Apeware community</h5>

                            <ul className="list-unstyled social-icon foot-social-icon mb-0 mt-4">
                                <li className="list-inline-item lh-1"><Link to="/" className="rounded"><i className="uil uil-facebook-f"></i></Link></li>
                                <li className="list-inline-item lh-1"><Link to="/" className="rounded"><i className="uil uil-instagram"></i></Link></li>
                                <li className="list-inline-item lh-1"><Link to="/" className="rounded"><i className="uil uil-discord"></i></Link></li>
                                {/* <li className="list-inline-item lh-1"><Link to="/" className="rounded"><i className="uil uil-dribbble"></i></Link></li> */}
                                <li className="list-inline-item lh-1"><Link to="/" className="rounded"><i className="uil uil-twitter"></i></Link></li>
                                {/* <li className="list-inline-item lh-1"><Link to="/" className="rounded"><i className="uil uil-skype"></i></Link></li> */}
                                <li className="list-inline-item lh-1"><Link to="/" className="rounded"><i className="uil uil-telegram"></i></Link></li>
                                {/* <li className="list-inline-item lh-1"><Link to="/" className="rounded"><i className="uil uil-slack"></i></Link></li> */}
                                {/* <li className="list-inline-item lh-1"><Link to="/" className="rounded"><i className="uil uil-tumblr"></i></Link></li> */}
                                <li className="list-inline-item lh-1"><a href="mailto:support@apeware.io" className="rounded"><i className="uil uil-envelope"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="footer-py-60 footer-border">
                            <div className="row">
                                <div className="col-lg-4 col-12 mb-0 mb-md-4 pb-0 pb-md-2">
                                    <Link to="/" className="logo-footer" style={{ backgroundColor:"#fff", borderRadius: "50%" }}>
                                        <img src="/images/icon-logo-64.png" alt="Logo" />
                                    </Link>
                                    <p className="para-desc mb-0 mt-4">Buy, sell and discover exclusive digital assets by the top artists of NFTs world.</p>
                                
                                    
                                </div>
                                
                                <div className="col-lg-2 col-md-4 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
                                    <h5 className="footer-head">Apeware</h5>
                                    <ul className="list-unstyled footer-list mt-4">
                                        <li><Link to="/assets" className="text-foot"><i className="uil uil-angle-right-b me-1"></i> Explore</Link></li>
                                        {/* <li><Link to="/" className="text-foot"><i className="uil uil-angle-right-b me-1"></i> Live Auction</Link></li> */}
                                        <li><Link to="/transactions" className="text-foot"><i className="uil uil-angle-right-b me-1"></i> Activities</Link></li>
                                        <li><Link to="/profile" className="text-foot"><i className="uil uil-angle-right-b me-1"></i> Profile</Link></li>
                                        {/* <li><Link to="/" className="text-foot"><i className="uil uil-angle-right-b me-1"></i> Creators</Link></li> */}
                                    </ul>
                                </div>
                                
                                <div className="col-lg-3 col-md-4 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
                                    <h5 className="footer-head">Community</h5>
                                    <ul className="list-unstyled footer-list mt-4">
                                        <li><Link to="/" className="text-foot"><i className="uil uil-angle-right-b me-1"></i> About Us</Link></li>
                                        {/* <li><Link to="/" className="text-foot"><i className="uil uil-angle-right-b me-1"></i> Blog</Link></li> */}
                                        <li><Link to="/" className="text-foot"><i className="uil uil-angle-right-b me-1"></i> Terms & Conditions</Link></li>
                                        <li><Link to="/" className="text-foot"><i className="uil uil-angle-right-b me-1"></i> Privacy Policy</Link></li>
                                        {/* <li><Link to="/" className="text-foot"><i className="uil uil-angle-right-b me-1"></i> Login</Link></li> */}
                                        {/* <li><Link to="/" className="text-foot"><i className="uil uil-angle-right-b me-1"></i> Subscribe</Link></li> */}
                                        <li><a href="mailto:contact@apeware.io" className="text-foot"><i className="uil uil-angle-right-b me-1"></i> Contact</a></li>
                                    </ul>
                                </div>
            
                                <div className="col-lg-3 col-md-4 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
                                    <h5 className="footer-head">Newsletter</h5>
                                    <p className="mt-4">Sign up and receive the latest tips via email.</p>
                                    <form>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="foot-subscribe mb-3">
                                                    <label className="form-label">Write your email <span className="text-danger">*</span></label>
                                                    <div className="form-icon position-relative">
                                                        <i data-feather="mail" className="fea icon-sm icons"></i>
                                                        <input type="email" name="email" id="emailsubscribe" className="form-control ps-5 rounded" placeholder="Your email : " required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="d-grid">
                                                    <input type="submit" id="submitsubscribe" name="send" className="btn btn-soft-primary" value="Subscribe" />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-py-30 footer-bar">
                <div className="container text-center">
                    <div className="row align-items-center">
                        <div className="col-sm-6">
                            <div className="text-sm-start">
                                <p className="mb-0">© {(new Date().getFullYear())} Apeware. All rights Researved.</p>
                            </div>
                        </div>

                        <div className="col-sm-6 mt-4 mt-sm-0 pt-2 pt-sm-0">
                            <ul className="list-unstyled footer-list text-sm-end mb-0">
                                <li className="list-inline-item mb-0"><Link to="/privacy" className="text-foot me-2">Privacy</Link></li>
                                <li className="list-inline-item mb-0"><Link to="/terms" className="text-foot me-2">Terms</Link></li>
                                {/* <li className="list-inline-item mb-0"><Link to="/" className="text-foot me-2">Help Center</Link></li> */}
                                {/* <li className="list-inline-item mb-0"><Link to="/" className="text-foot">Contact</Link></li> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </footer>
    
        <Link to="/" onClick={e => topFunction(e)} id="back-to-top" className="back-to-top rounded-pill fs-5"><i data-feather="arrow-up" className="fea icon-sm icons align-middle"></i></Link>
    </>
  )
}