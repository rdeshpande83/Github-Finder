import React, {Component, Fragment} from 'react';
import './App.css';
import Navbar from './components/layout/Navbar'
import Users from './components/Users/Users'
import Search from './components/Users/Search'
import axios from 'axios'
import Alert from './components/layout/Alert'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import About from './components/pages/About'
import User from './components/Users/User'
class App extends Component {
  state ={
    users: [],
    user:{},
    loading:false,
    alert: null,
    repos:[]
  }
  // async componentDidMount(){
  //   this.setState({loading:true})
  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
  //   &client_secret = ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
  //   //console.log(process.env.REACT_APP_GITHUB_CLIENT_SECRET)
  //   this.setState({users:res.data, loading:false})
    
  // }
  //Search for users in Github using API
  searchUsers=async text =>{
    console.log(text)
    this.setState({loading:true})
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret = ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    //console.log(process.env.REACT_APP_GITHUB_CLIENT_SECRET)
    this.setState({users:res.data.items, loading:false})
  }

  //Get individual user details
  getUser = async (username)=>{
    this.setState({loading:true})
    const res = await axios.get(`https://api.github.com/users/${username}?&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret = ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    //console.log(process.env.REACT_APP_GITHUB_CLIENT_SECRET)
    this.setState({user:res.data, loading:false})
  }

  //Get repos for a specific user
  getUserRepos=async (username)=>{
    this.setState({loading:true})
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret = ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    //console.log(process.env.REACT_APP_GITHUB_CLIENT_SECRET)
    this.setState({repos:res.data, loading:false})
  }
  
  clearUsers = ()=>this.setState({users:[], loading:false})
  
  setAlert =(msg, type)=>{
    this.setState({alert:{msg, type}})
    setTimeout(()=>{
      this.setState({alert:null})
    }, 5000)
  }
  
  // foo1 = ()=>'Test456'
  render(){

    // const name = 'john'
    // const foo = () => 'Test123'
    //const loading = false
    // const showName = true
    // if(loading){
    //   return 'Loading...'
    // }
    const {users,loading, user, repos, alert} = this.state
    return (
      <Router>
        <div className='App'>
          <Navbar  />      
          <div className="container">
            <Alert alert={alert}/>
              <Switch>
                <Route exact path='/' render={props =>(
                  <Fragment>
                    <Search searchUsers={this.searchUsers} 
                            clearUsers = {this.clearUsers} 
                            showClear={users.length > 0?true :false } 
                            setAlert={this.setAlert}/>
                    <Users loading={loading} users={users}/>
                  </Fragment>
                )}/>
                <Route exact path='/about' component={About}/>
                <Route exact path='/user/:login' render={props =>(
                  <User {...props} 
                        getUser={this.getUser} 
                        getUserRepos={this.getUserRepos} 
                        user={user}
                        repos={repos} 
                        loading={loading}/>
                )}/>
              </Switch>  
          </div>      
        </div>
      </Router>
  );   
  }
}

export default App;
