import react,{useState} from 'react';
import {Link} from 'react-router-dom';
import Base from '../core/Base';

const Signin = () => {
    const SignInForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input type="email" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input type="password" className="form-control"/>
                        </div>
                        <br/>
                        <button className="btn btn-success btn-block col-12">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
    return (
        <div>
            <Base title="SignIn page" description="This is the sign in page">
                {SignInForm()}
            </Base>
        </div>
    )
}

export default Signin;