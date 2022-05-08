import React from 'react';
import Topdrops from "./Data/topdrops.json";
import {Link} from "react-router-dom";

export const NotableDrops = () => {

    return (
        <>
        
            { Topdrops?.map((nft, index) => (
                // console.log(nft)
            <div className="col-lg-4 col-md-6" key={index}>
                <div className="card blog blog-primary shadow rounded-md overflow-hidden">
                    <div className="position-relative">
                        
                        <Link to={"/asset/"+nft.addrs}>
                            <img src={nft.image} style={{ width: "100%" }} className="img-fluid rounded-md" alt="Notable Drop" />
                            <div className="position-absolute top-0 end-0 m-3">
                                <span className="badge tag rounded-md fw-bold" style={{ top: "0", right: "10px"}}>Live</span>
                            </div>
                        </Link>
                    </div>
                    <div className="card-body position-relative p-4">
                        <a href="blog-detail.html" className="text-dark title h5 mt-3">{nft.name}</a>
                    </div>
                </div>
            </div>


            )) }

        </>
    );
}