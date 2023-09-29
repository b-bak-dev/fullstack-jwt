import { useState } from 'react'
import { setAuthHeader } from '../utility';
import { config } from '../constants';

export default function SignInForm(props) {

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  function onSubmitSignIn(e) {
    e.preventDefault();

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            login: login,
            password: password
        })
    }

    fetch(`${config.url.BASE_URL}/login`, options)
        .then((response) => response.json())
        .then((data) => {
            if (data.token !== null && data.token !== "null") {
                setAuthHeader(data.token);
                props.componentToShow('messages')
            }
        })
        .catch((error) => {
          props.componentToShow('welcome')
        });
};

  return (
    <div className="row">
      <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
        <form onSubmit={onSubmitSignIn} className="container">
          <div className="card">
            {/* Header */}
            <div className="card-header">
              <h2>Sign In</h2>
            </div>
            {/* Inputs */}
            <div className="card-body">
              <div className="form-group">
                <label>Login</label>
                <input onChange={e => setLogin(e.target.value)} className="form-control"></input>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" onChange={e => setPassword(e.target.value)} className="form-control"></input>
              </div>
            </div>
            {/* Footer */}
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">Sign in</button>
              <div className='error'>
                Server error: 
              </div>            
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}