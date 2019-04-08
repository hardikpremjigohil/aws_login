import React, { Component } from 'react';
import AWS from 'aws-sdk';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import PeopleIcon from '@material-ui/icons/People';

import Dashboard from '../Dashboard'

const USER_POOL_ID='us-east-3_asdfDasdfFc'
const CLIENT_ID='2k3asdfzxcvlkjoliuadnsflkjcc'
const IDENTITY_POOL_ID='dasdasdfasdfasd-5basdfb4-asdf9-8asdfcxv-b6asdf2cxsfg5ads6'
const POOL_REGION='us-east-3'

class App extends Component {

  state = {
    loggedIn: false,
    userId: '',
    loading: false,
  }

  authenticateUser = (e) => {
    e.preventDefault();

    let username = e.target.username.value;
    let password = e.target.password.value;

    if(!username) {
      this.setState({
        loading: false,
        error: 'Please enter username.',
      })
      return;
    } else if(!password) {
      this.setState({
        loading: false,
        error: 'Please enter password.',
      })
      return;
    }

    this.setState({
      loading: true,
      error: '',
      username: username
    })

    let authenticationData = {
        Username : username,
        Password : password,
    };
    let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    // console.log(authenticationDetails, "autDea")
    let poolData = {
        UserPoolId : USER_POOL_ID, // Your user pool id here
        ClientId : CLIENT_ID, // Your client id here
    };
    let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    // console.log(userPool, "userPool")
    let userData = {
        Username : username,
        Pool : userPool
    };
    let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
            var accessToken = result.getIdToken().getJwtToken();
            console.log(result, "result")
            //POTENTIAL: Region needs to be set if not already set previously elsewhere.
            AWS.config.region = POOL_REGION;

            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId : `${AWS.config.region}:${IDENTITY_POOL_ID}`, // your identity pool id here
                Logins : {
                    // Change the key below according to the specific region your user pool is in.
                    [`cognito-idp.${AWS.config.region}.amazonaws.com/${USER_POOL_ID}`] : accessToken
                }
            });

            //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
            AWS.config.credentials.refresh((error) => {
                if (error) {
                    console.error(error);
                } else {
                    // Instantiate aws sdk service objects now that the credentials have been updated.
                    // example: var s3 = new AWS.S3();
                    console.log('Successfully logged in!');
                }
            });
            this.setState({
              loading: false,
              loggedIn: true,
            });
        },

        onFailure: (err) => {
          this.setState({
            loading: false,
            error: err.message
          })
          // alert(err.message || JSON.stringify(err));
        },
    });
  }

  render() {
    const { username, loggedIn, loading, error} = this.state;

    const { classes } = this.props;

    return (
      <div className="App">
        {
          !loggedIn ?
          (
            <div className="login-page-div">
              <div className="login-box-wrapper" style={{ backgroundImage: './bg.jpg' }}>
                <div className="form-box">
                  {/* <form onSubmit={this.authenticateUser}> */}
                    <div className="form-head">
                      Login
                    </div>

                    <div className="input-div">
                      <input placeholder="Username" type="text" name="username" />
                    </div>
                    <div className="input-div">
                      <input placeholder="Password" type="password" name="password" />
                    </div>
                    <div className="other-links">
                      <div className="link">
                        Forgot password?
                      </div>
                      <div className="link">
                        Register here
                      </div>
                    </div>
                    {
                      error ?
                      <span className="error-message"> {error} </span>
                      : undefined
                    }
                    {
                      loading ?
                      <button className="button disabled">  <div className="loader"/> </button> 
                      : <button className="button" type="submit" onClick={() => this.setState({ loggedIn: true })}> <div> Log In </div> </button>
                    }
                  {/* </form> */}
                </div>
              {/* Right side */}
              </div>
              <div className="info-box-wrapper">
                  <div className="info-box">
                    <div className="top-buttons-wrapper">
                    <Button variant="outlined" size="small" className={classes.button}>
                      About us
                    </Button>
                    <Button variant="outlined" size="small" className={classes.button}>
                      Mission
                    </Button>
                    <Button variant="outlined" size="small" className={classes.button}>
                      Functions
                    </Button>
                    <Button variant="outlined" size="small" className={classes.button}>
                      Meet the team
                    </Button>
                    <Button variant="outlined" size="small" className={classes.button}>
                      Contact Us
                    </Button>
                    
                    </div>
                    <Divider style={{ width: '100%'}} />
                    <div style={{ width: '100%', height: '100%', overflow: 'scroll' }}>
                      <div className="info-box-item">
                        <div>
                        <Button variant="contained" className={classes.button}>
                          About us
                        </Button>
                        </div>
                        <div className="item-content" > We are professional people who serves. </div>
                      </div>
                      <div className="info-box-item">
                      <div>
                        <Button variant="contained" className={classes.button}>
                        Mission
                        </Button>
                        </div>
                        <div className="item-content" > Our mission... </div>
                      </div>
                      <div className="info-box-item">
                      <div>
                        <Button variant="contained" className={classes.button}>
                        Functions
                        </Button>
                        </div>
                        <div className="item-content" > 
                          <div> 1... 2... </div>
                          <div> 3... 4... </div>
                        </div>
                      </div>
                      <div className="info-box-item">
                      <div>
                        <Button variant="contained" className={classes.button}>
                        Meet the team
                        </Button>
                        </div>
                        <div className="item-content" >
                          <div className="persons-wrapper"> 
                            <div className="person-div">
                              <PeopleIcon />
                              Person 1
                            </div>
                            <div className="person-div">
                              <PeopleIcon />
                              Person 2
                            </div>
                            <div className="person-div">
                              <PeopleIcon />
                              Person 3
                            </div>
                            <div className="person-div">
                              <PeopleIcon />
                              Person 4
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
              </div>
            </div>
          ) : (
            <Dashboard username={username} />
          )
        }
      </div>
    );
  }
}

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

export default withStyles(styles)(App);
