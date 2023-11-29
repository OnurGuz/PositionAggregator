import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';

class Home extends Component {
    render() {
        return (
            <div>
                <AppNavbar/>
                    <h1>Onur's Trading App</h1>
						<pre>
						I have created an app that loads the initial csv file and has an interactive way to add and delete trades.
     				<br></br></pre>
                    <h3>Further improvements</h3>
                    <pre>


				However, given the timeframe and the basic nature of the task, there are many ways to improve the app.
				<br></br><br></br>
				  1. The data is currently linked to the runtime of the application and is not stored in an external database. So if the app is restarted, it would lose any trades that
				were added or deleted to it beforehand.<br></br>
				  2. Given that the application is only supposed to be used by one person, I did not make it thread safe. If the use case was
				for multiple users to be accessing the api, I would have:<br></br>
				    <p> i) used concurrent data structures <br></br></p>
				    <p> ii) used a CP distributed database such as MongoDb which maintains consistency of data over availability<br></br></p>
				    <p> iii) hosted it on a cloud server using GCP, which would allow the server to run constantly and the website would be accessible to anyone.<br></br></p>
				  3. This then has its own safety concerns, such as DOS attacks, so another module would be required to provide authentication and authorisation to access the website.
				  </pre>
            </div>
        );
    }
}
export default Home;