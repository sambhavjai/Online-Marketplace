import react,{useState} from 'react';
import Base from '../core/Base';
import {Link} from 'react-router-dom';

const Signup = () => {
    const SignUpForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input type="text" className="form-control"/>
                        </div>
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
            <Base title="SignUp page" description="A page for user to signup">
                {SignUpForm()}
            </Base>
        </div>
    )
}

export default Signup;