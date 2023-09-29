import { useState, useEffect } from 'react'
import { config } from '../constants'
import { setAuthHeader } from '../utility';

export default function MessageContent() {

    useEffect(componentDidMount, []);
    const [data, setData] = useState([])

    function componentDidMount() {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${window.localStorage.getItem('auth_token')}`
            }
        }

        fetch(`${config.url.BASE_URL}/messages`, options)
            .then((response) => response.json())
            .then((resp) => { setData(resp) })
            .catch((error) => {
                if (error.response.status === 401) {
                    setAuthHeader(null);
                } else {
                    setData(error.response.code)
                }
            });
    };

    return (
        <div className="row justify-content-md-center">
            <div className="col-4">
                <div className="card" style={{ width: "18rem" }}>
                    <div className="card-body">
                        <h5 className="card-title">You're logged in</h5>
                        <ul>
                            {data && data.map((line) =>
                                <li key={line}>{line}</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );

}