import React from 'react';
import TopCollection from "./Data/topCollection.json";

export const TopCollections = () => {

    const prevDefault = e => {
        e.preventDefault();
    }
    
    return (
        <>
        
            { TopCollection?.map((nft, index) => (

            <div className="col-lg-4 col-md-6" key={index}>
                <div className="card blog blog-primary shadow rounded-md overflow-hidden">
                    <div className="d-flex align-items-center">
                        <div className="position-relative">
                            <img src="images/items/1.jpg" className="avatar avatar-md-md rounded-md shadow-md" alt="" />

                            <div className="position-absolute top-0 start-0 translate-middle px-1 rounded-lg shadow-md bg-white">
                                <i className="mdi mdi-account-check mdi-18px text-success"></i>
                            </div>
                        </div>
                            
                        <span className="content ms-3">
                            <a onClick={e => prevDefault(e)} className="text-dark title mb-0 h6" style={{ display: "inline-block" }}>Azuki  <small className="text-muted d-block mt-1" style={{ display: "inline-block", color : "green" }}>+250 %</small></a>
                            <small className="text-muted d-block mt-1">Price <a onClick={e => prevDefault(e)} className="link fw-bold">4 ETH</a> - <a onClick={e => prevDefault(e)} className="link fw-bold">56 ETH</a></small>
                            {/* <small className="text-muted d-block mt-1">Price <a onClick={e => prevDefault(e)} className="link fw-bold">47 ETH</a></small> */}
                            
                           
                        </span>
                    </div>
                </div>
            </div>


            )) }

        </>
    );
}