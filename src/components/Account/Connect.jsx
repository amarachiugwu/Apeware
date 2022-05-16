import React from 'react';
import { connectors } from "./config";
import { useMoralis } from "react-moralis";
import NFTBalance from "components/NFTBalance";

function Connect() {
    const { authenticate, isAuthenticated, account, } = useMoralis();

    if (!isAuthenticated || !account) {
        return (
            <>
                <section className="section">
                    <div className="container">
                        <div className="row row-cols-xl-4 row-cols-lg-3 row-cols-sm-2 row-cols-1 g-4">

                                {connectors.map(({ title, icon, connectorId }, key) => (


                                    <div className="col" style={{ cursor:"pointer" }}
                                        key={key}
                                        onClick={async () => {
                                        try {
                                            await authenticate({ provider: connectorId });
                                            window.localStorage.setItem("connectorId", connectorId);
                                        } catch (e) {
                                            console.error(e);
                                        }
                                        }}
                                    >
                                        <div className="card wallet wallet-primary rounded-md shadow">
                                            <div className="bg-gradient-secondary p-5 rounded-md"></div>
                                            <div className="position-relative">
                                                <div className="position-absolute top-0 start-50 translate-middle">
                                                    <img src={icon} className="avatar avatar-md-md rounded-pill shadow-sm p-3 bg-light" alt={title} />
                                                </div>
                                                
                                                <div className="content text-center p-4">
                                                    <h5 className="mt-4 pt-2 mb-0">{title}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            
                        </div>
                    </div>
                </section>
            </>
        );
    }

    return (
        <>
            <NFTBalance />
        </>
    );
}

export default Connect;
