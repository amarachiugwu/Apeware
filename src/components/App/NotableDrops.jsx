import Topdrops from "./Data/topdrops.json";

export const NotableDrops = () => {

    const prevDefault = e => {
        e.preventDefault();
    }
    
    return (
        <>
        
            { Topdrops?.map((nft, index) => (

            <div className="col-lg-4 col-md-6" key={index}>
                <div className="card blog blog-primary shadow rounded-md overflow-hidden">
                    <div className="position-relative">
                        <img src="images/blog/01.jpg" className="img-fluid rounded-md" alt="Notable Drop" />
                        <div className="position-absolute top-0 end-0 m-3">
                            <span className="like-icon shadow-sm"><a onClick={e => prevDefault(e)} className="text-muted icon"><i className="mdi mdi-18px mdi-heart mb-0"></i></a></span>
                        </div>
                    </div>
                    <div className="card-body position-relative p-4">
                        <a href="#" className="badge tag gradient rounded-md fw-bold">Arts</a>

                        <ul className="list-unstyled mt-2">
                            <li className="list-inline-item text-muted small me-3"><i className="uil uil-calendar-alt text-dark h6 me-1"></i>20th January, 2022</li>
                            <li className="list-inline-item text-muted small"><i className="uil uil-clock text-dark h6 me-1"></i>5 min read</li>
                        </ul>
                        <a href="blog-detail.html" className="text-dark title h5 mt-3">Mindfulness Activities for Kids & Toddlers with NFT</a>
                        
                        <div className="mt-3 d-flex justify-content-between align-items-center">
                            <a href="blog-detail.html" className="btn btn-link text-muted">Read more <i data-feather="arrow-right" className="fea icon-sm"></i></a>
                            <span className="text-muted fs-6">by <a href="creator-profile.html" className="link">@callyjoe</a></span>
                        </div>
                    </div>
                </div>
            </div>


            )) }

        </>
    );
}