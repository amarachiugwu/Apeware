import TopTrends from "./Data/topTrending.json";
import {Link} from "react-router-dom";

export const TopTrendings = () => {

    return (
        <>
        
            { TopTrends?.map((nft, index) => (
                // console.log(nft)
            <div className="col-lg-4 col-md-6" key={index}>
                <div className="card blog blog-primary shadow rounded-md overflow-hidden">
                    <div className="position-relative"  style={{ height: "200px", overflow: "hidden" }}>
                        <Link to={"/asset/"+nft.addrs}>
                            <div>
                                <img src={nft.image} style={{ width: "100%" }} className="img-fluid rounded-md" alt="Top Trending" />
                            </div>
                        </Link>
                    </div>
                    <div className="card-body position-relative p-4">

                        <Link href={"/asset/"+nft.addrs} className="text-dark title h5 mt-3">{nft.name}</Link>
                        
                        <div className="mt-3 d-flex justify-content-between align-items-center">
                        <Link href={"/asset/"+nft.addrs} className="btn btn-link text-muted">Know more <i data-feather="arrow-right" className="fea icon-sm"></i></Link>
                            <span className="text-muted fs-6">by <Link href={"/asset/"+nft.addrs} className="link">{nft.owner}</Link></span>
                        </div>
                    </div>
                </div>
            </div>


            )) }

        </>
    );
}