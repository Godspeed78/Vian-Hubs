import React from 'react'

const Footer = (props) => {
    return (
        <footer>
            <div className="bg-custom-dark">
                <section className="container py-5">
                    <div className="row">
                        <div className="col-md-4">
                            <p className="font-weight-bold">Address:</p>

                            <p className="font-weight-light">
                                VIAN HUB SALON, <br/>
                                Plot 134 Adetokunbo Ademola Cres, <br/>
                                Wuse 900271, II <br/>
                                Nigeria
                            </p>
                        </div>

                        <div className="col-md-4">
                            <p className="font-weight-bold">Contact Info:</p>

                            <p className="font-weight-light">
                                <i className="czi-phone mr-1"/> Phone: +234 70 3456 567, +234 786 7856 <br/>
                                <i className="czi-mail mr-1"/> email: info@vianhubs.com <br/>
                            </p>
                        </div>

                        <div className="col-md-4">
                            <p className="font-weight-bold">Socials:</p>

                            <p className="font-weight-light">
                                <i className="czi-facebook mr-2"/> Facebook
                            </p>
                            <p className="font-weight-light">
                                <i className="czi-twitter mr-2"/> Twitter
                            </p>
                            <p className="font-weight-light">
                                <i className="czi-instagram mr-2"/> Instagram
                            </p>
                        </div>
                    </div>
                </section>
            </div>

            <div className="bg-custom-darker">
                <section className="container py-5">
                    <div className="row">
                        <div className="col-md-3">
                            <p className="font-weight-bold">Quality Service Assurance</p>
                        </div>

                        <div className="col-md-3">
                            <p className="font-weight-bold">24/7 Customer Support</p>
                        </div>

                        <div className="col-md-3">
                            <p className="font-weight-bold">Secure Online Payment</p>
                        </div>

                        <div className="col-md-3">
                            <p className="font-weight-bold">Convenience</p>
                        </div>
                    </div>

                    <hr className='border-light'/>

                    <h3 className='font-weight-bold mt-5'>Vian Hub</h3>
                    <div className="d-flex">
                        <p className="font-weight-light mr-3">Outlets</p>
                        <p className="font-weight-light mr-3">Affiliates</p>
                        <p className="font-weight-light mr-3">Support</p>
                        <p className="font-weight-light mr-3">Map</p>
                    </div>
                </section>
            </div>
        </footer>
    )
};

export default Footer
