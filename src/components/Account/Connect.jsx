import React from 'react';

function Connect() {

  return (
    <>
        <section className="section">
            <div className="container">
                <div className="row row-cols-xl-4 row-cols-lg-3 row-cols-sm-2 row-cols-1 g-4">
                    <div className="col">
                        <div className="card wallet wallet-primary rounded-md shadow">
                            <div className="ribbon ribbon-right ribbon-primary overflow-hidden"><span className="text-center d-block shadow small fw-bold">Popular</span></div>
                            <div className="bg-gradient-primary p-5 rounded-md"></div>
                            <div className="position-relative">
                                <div className="position-absolute top-0 start-50 translate-middle">
                                    <img src="images/wallet/MetaMask_Fox.svg" className="avatar avatar-md-md rounded-pill shadow-sm p-3 bg-light" alt="" />
                                </div>
                                
                                <div className="content text-center p-4">
                                    <h5 className="mt-4 pt-2 mb-0">MetaMask</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col">
                        <div className="card wallet wallet-primary rounded-md shadow">
                            <div className="bg-gradient-primary p-5 rounded-md"></div>
                            <div className="position-relative">
                                <div className="position-absolute top-0 start-50 translate-middle">
                                    <img src="images/wallet/aave.svg" className="avatar avatar-md-md rounded-pill shadow-sm p-3 bg-light" alt="" />
                                </div>
                                
                                <div className="content text-center p-4">
                                    <h5 className="mt-4 pt-2 mb-0">Aave</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col">
                        <div className="card wallet wallet-primary rounded-md shadow">
                            <div className="bg-gradient-warning p-5 rounded-md"></div>
                            <div className="position-relative">
                                <div className="position-absolute top-0 start-50 translate-middle">
                                    <img src="images/wallet/Airswap.svg" className="avatar avatar-md-md rounded-pill shadow-sm p-3 bg-light" alt="" />
                                </div>
                                
                                <div className="content text-center p-4">
                                    <h5 className="mt-4 pt-2 mb-0">Airswap</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col">
                        <div className="card wallet wallet-primary rounded-md shadow">
                            <div className="bg-gradient-info p-5 rounded-md"></div>
                            <div className="position-relative">
                                <div className="position-absolute top-0 start-50 translate-middle">
                                    <img src="images/wallet/uniswap.svg" className="avatar avatar-md-md rounded-pill shadow-sm p-3 bg-light" alt="" />
                                </div>
                                
                                <div className="content text-center p-4">
                                    <h5 className="mt-4 pt-2 mb-0">Uniswap</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col">
                        <div className="card wallet wallet-primary rounded-md shadow">
                            <div className="bg-gradient-secondary p-5 rounded-md"></div>
                            <div className="position-relative">
                                <div className="position-absolute top-0 start-50 translate-middle">
                                    <img src="images/wallet/zerion.svg" className="avatar avatar-md-md rounded-pill shadow-sm p-3 bg-light" alt="" />
                                </div>
                                
                                <div className="content text-center p-4">
                                    <h5 className="mt-4 pt-2 mb-0">Zerion</h5>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col">
                        <div class="card wallet wallet-primary rounded-md shadow">
                            <div class="bg-gradient-info p-5 rounded-md"></div>
                            <div class="position-relative">
                                <div class="position-absolute top-0 start-50 translate-middle">
                                    <img src="images/wallet/ddexsvg.svg" class="avatar avatar-md-md rounded-pill shadow-sm p-3 bg-light" alt="" />
                                </div>
                                
                                <div class="content text-center p-4">
                                    <h5 class="mt-4 pt-2 mb-0">DDEX</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  );
}

export default Connect;
