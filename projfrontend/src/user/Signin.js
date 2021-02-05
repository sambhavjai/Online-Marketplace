import react,{useState} from 'react';
import {Link,Redirect} from 'react-router-dom';
import Base from '../core/Base';
import {isAuthenticated,authenticate,signin} from '../auth/helper/index'
const Signin = () => {
    
    const [values,setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        didRedirect: false
    });

    const {email,password,error,loading,didRedirect} = values;
    const {user} = isAuthenticated();

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({...values,error:false,loading:true})
        signin({email,password}).then(data => {
            if(data.error){
            setValues({...values,error:data.error,loading:false})
            }
            else
            authenticate(data,() => {
                setValues({...values,didRedirect:true})
            })   
        }).catch(error => {console.log("Signin failed")});
    };

    const performRedirect = () => {
        if(didRedirect)
        {
            if(user && user.role === 1)
            return <p>Redirect to admin</p>
            else
            return <p>Redirect to user dashboard</p>
        }
        if(isAuthenticated())
        {
            return <Redirect to="/" />
        }
    }

    const loadingMessage = () => {
        return (
            loading && (
            <div>
                <div className="row">
                    <div className="col-md-6 offset-sm-3 text-left">
                        <div className="alert alert-info">
                            <h2>Loading.....</h2>
                        </div>
                    </div>
                </div>
            </div>)
        )
    }

    const errorMessage = () => {
        return (
            <div>
                <div className="row">
                    <div className="col-md-6 offset-sm-3 text-left">
                        <div className="alert alert-danger" style={{display: error? "":"none"}}>
                            {error}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const SignInForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input onChange={handleChange("email")} value={email} type="email" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input onChange={handleChange("password")} value={password} type="password" className="form-control"/>
                        </div>
                        <br/>
                        <button onClick={onSubmit} className="btn btn-success btn-block col-12">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
    return (
        <div>
            <Base title="SignIn page" description="This is the sign in page">
                {loadingMessage()}
                {errorMessage()}
                {SignInForm()}
                {performRedirect()}
                <p className="text-white text-center">{JSON.stringify(values)}</p>
            </Base>
        </div>
    )
}

export default Signin;