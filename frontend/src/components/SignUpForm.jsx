import { useState } from 'react'
import { setAuthHeader } from '../utility';
import { config } from '../constants';

export default function SignUpForm(props) {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  function onSubmitRegister(event) {
    event.preventDefault();
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            login: login,
            password: password
        })
    }

    fetch(`${config.url.BASE_URL}/register`, options)
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
        <form onSubmit={onSubmitRegister} className="container">
          <div className="card">
            {/* Header */}
            <div className="card-header">
              <h2>Sign Up</h2>
            </div>
            {/* Inputs */}
            <div className="card-body">
              <div className="form-group">
                <label>First name</label>
                <input onChange={e => setFirstName(e.target.value)} className="form-control"></input>
              </div>
              <div className="form-group">
                <label>Last name</label>
                <input onChange={e => setLastName(e.target.value)} className="form-control"></input>
              </div>
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
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}