import React from 'react';
import {Link} from "react-router-dom";
import { TypedTextAnimation } from "./TypedTextAnimation";
import Featuring from "./Data/Featuring.json";
import { NotableDrops } from "./NotableDrops";
import { TopTrendings } from "./TopTrendings";
import { TopCollections } from "./TopCollections";


const styles = {

    banner: {
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        margin: "0 auto",
        width: "600px",
        height: "150px",
        marginBottom: "40px",
        paddingBottom: "20px",
        borderBottom: "solid 1px #e3e3e3",
        backgroundImage:" url('images/bg/bg01.png')",
        backgroundPosition: 'center'
    },

};


export default function Home() {

  return(

    <>
    
    <section className="bg-half-170 d-table w-100" style={styles.banner} >
        <div className="bg-overlay bg-gradient-primary banner opacity-8"></div>
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-7 col-md-6">
                    <div className="title-heading">
                        <h6 className="text-dark title-dark fw-normal">Explore, Create & Collect NFTs</h6>
                        <TypedTextAnimation />
                        <p className="text-dark-50 para-desc mb-0 mb-0">We are a huge marketplace dedicated to connecting great artists of all Apeware with their fans and unique token collectors!</p>

                        <div className="row">
                            <div className="col-6 col-md-4  mt-4 pt-2">
                                <Link to="/assets" className="btn btn-pills btn-primary"  style={{fontWeight:500, padding:"10px 15px", width:"100%", fontSize:"16px"}}>Discover</Link>
                            </div>

                            <div className="col-6 col-md-4  mt-4 pt-2">
                                <Link to="/assets" className="btn btn-pills btn-primary"  style={{fontWeight:500, padding:"10px 15px", width:"100%", fontSize:"16px"}}>Create</Link>
                            </div>
                        </div>
                        
                    </div>
                </div>

                <div className="col-lg-5 col-md-6 mt-4 pt-2 mt-sm-0 pt-sm-0">
                    <div className="card bg-white nft-items nft-primary img-skewed rounded-md shadow overflow-hidden mb-1 p-3">
                      
                        <div className="nft-image rounded-md mt-3 position-relative overflow-hidden shadow">
                            <Link to={"/asset/"+Featuring[0].addrs}><img src={Featuring[0].image} className="img-fluid" alt={Featuring[0].name} /></Link>
                            
                        </div>

                        <div className="card-body content position-relative p-0 mt-3">

                            <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                    <img src={Featuring[0].profile_pic} alt="user" className="avatar avatar-sm-sm img-thumbnail border-0 shadow-sm rounded-circle" />
                                    <Link to={"/asset/"+Featuring[0].addrs} className="text-dark small creator-name h6 mb-0 ms-2">{Featuring[0].name}<br />
                                    <p style={{ display:"block", color:"#1868B7" }}> {Featuring[0].owner}</p></Link> 
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div className="container mt-100 mt-60">
        <div className="row">
            <div className="col">
                <div className="section-two rounded-md shadow bg-gradient-primary px-md-5 px-4">
                    <div className="row align-items-end">
                        <div className="col-md-8">
                            <div className="section-title text-md-start text-center">
                                <h4 className="title text-white title-dark">Join our community!</h4>
                            </div>
                        </div>

                        <div className="col-md-4 mt-4 pt-2 mt-sm-0 pt-sm-0">
                            <div className="text-md-end text-center">
                                <a href="become-creator.html" className="btn btn-primary rounded-md">Discord <i className="uil uil-arrow-right"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/* <div className="discord">
        <p classname="text-dark title-dark fw-normal">Join our community</p>
        <button classname="btn btn-pills btn-primary">Discord</button>
    </div> */}

    <div className="container mt-100 mt-60">
        <div className="row justify-content-center">
            <div className="col">
                <div className="section-title text-center mb-5 pb-3">
                    <h4 className="title mb-4">Notable Drops</h4>
                </div>
            </div>
        </div>

        <div className="row g-4">
            <NotableDrops />
        </div>
        

    </div>

    <div className="container mt-100 mt-60">
        <div className="row justify-content-center">
            <div className="col">
                <div className="section-title text-center mb-5 pb-3">
                    <h4 className="title mb-4">Top Collection over Last 7 days</h4>
                </div>
            </div>
        </div>

        <div className="row g-4">
            <TopCollections />
        </div>
        

    </div>

    <div className="container mt-100 mt-60">
        <div className="row justify-content-center">
            <div className="col">
                <div className="section-title text-center mb-5 pb-3">
                    <h4 className="title mb-4">Top Trendings</h4>
                </div>
            </div>
        </div>

        <div className="row g-4">
            <TopTrendings />
        </div>
        

    </div>


    <div className="container mt-100 mt-60">
        <div className="row justify-content-center">
            <div className="col">
                <div className="section-title text-center mb-5 pb-3">
                    <h4 className="title mb-4">Browse by Category</h4>
                </div>
            </div>
        </div>

        <div className="row g-4">
            
            <div className="col-lg-4 col-md-6">
                <div className="card blog blog-primary shadow rounded-md overflow-hidden">
                    <div className="position-relative">
                        <Link to="/category/art">
                            <img src="images/collection/art.png" className="img-fluid rounded-md" alt="Arts" />
                        </Link>
                        
                    </div>
                    <div className="card-body position-relative p-4">
                        
                        <Link to="/category/art" className="badge tag gradient rounded-md fw-bold">Arts</Link>

                        <Link to="/category/art" className="text-dark title h5 mt-3" style={{ display:"block", textAlign:"center", fontWeight : "800" }}>Arts</Link>
                        
                    </div>
                </div>
            </div>

            <div className="col-lg-4 col-md-6">
                <div className="card blog blog-primary shadow rounded-md overflow-hidden">
                    <div className="position-relative">
                        <Link to="/category/sports">
                            <img src="images/collection/sports.png" className="img-fluid rounded-md" alt="Sports" />
                        </Link>
                        
                    
                    </div>
                    <div className="card-body position-relative p-4">
                        
                        <Link to="/category/sports" className="badge tag gradient rounded-md fw-bold">Sports</Link>

                        <Link to="/category/sports" className="text-dark title h5 mt-3" style={{ display:"block", textAlign:"center", fontWeight : "800" }}>Sports</Link>
                        
                    </div>
                </div>
            </div>

            <div className="col-lg-4 col-md-6">
                <div className="card blog blog-primary shadow rounded-md overflow-hidden">
                    <div className="position-relative">
                        <Link to="/category/music.png">
                            <img src="images/collection/music.png" className="img-fluid rounded-md" alt="Music" />
                        </Link>
                        
                    
                    </div>
                    <div className="card-body position-relative p-4">
                        
                        <Link to="/category/music" className="badge tag gradient rounded-md fw-bold">Music</Link>

                        <Link to="/category/music" className="text-dark title h5 mt-3" style={{ display:"block", textAlign:"center", fontWeight : "800" }}>Music</Link>
                        
                    </div>
                </div>
            </div>

            <div className="col-lg-4 col-md-6">
                <div className="card blog blog-primary shadow rounded-md overflow-hidden">
                    <div className="position-relative">
                        <Link to="/category/photography">
                            <img src="images/collection/photography.png" className="img-fluid rounded-md" alt="Photography" />
                        </Link>
                        
                    </div>
                    <div className="card-body position-relative p-4">
                        
                        <Link to="/category/photography" className="badge tag gradient rounded-md fw-bold">Photography</Link>

                        <Link to="/category/photography" className="text-dark title h5 mt-3" style={{ display:"block", textAlign:"center", fontWeight : "800" }}>Photography</Link>
                        
                    </div>
                </div>
            </div>

            <div className="col-lg-4 col-md-6">
                <div className="card blog blog-primary shadow rounded-md overflow-hidden">
                    <div className="position-relative">
                        <Link to="/category/collectibles">
                            <img src="images/collection/collectibles.png" className="img-fluid rounded-md" alt="Collectibles" />
                        </Link>
                        
                    </div>
                    <div className="card-body position-relative p-4">
                        
                        <Link to="/category/collectibles" className="badge tag gradient rounded-md fw-bold">Collectibles</Link>

                        <Link to="/category/collectibles" className="text-dark title h5 mt-3" style={{ display:"block", textAlign:"center", fontWeight : "800" }}>Collectibles</Link>
                        
                    </div>
                </div>
            </div>

            <div className="col-lg-4 col-md-6">
                <div className="card blog blog-primary shadow rounded-md overflow-hidden">
                    <div className="position-relative">
                        <Link to="/category/utility">
                            <img src="images/collection/utility.png" className="img-fluid rounded-md" alt="Utility" />
                        </Link>
                        
                        
                    </div>
                    <div className="card-body position-relative p-4">
                        
                        <Link to="/category/utility" className="badge tag gradient rounded-md fw-bold">Utility</Link>

                        <Link to="/category/utility" className="text-dark title h5 mt-3" style={{ display:"block", textAlign:"center", fontWeight : "800" }}>Utility</Link>
                        
                    </div>
                </div>
            </div>

        </div>
    </div>
    
    </>
  )
}