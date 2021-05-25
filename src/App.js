import React, {Component, Fragment} from 'react';
import './App.css';
import Navbar from './components/layout/Navbar'
import Users from './components/Users/Users'
import Search from './components/Users/Search'
import axios from 'axios'
import Alert from './components/layout/Alert'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import About from './components/pages/About'
class App extends Component {
  state ={
    users: [],
    loading:false,
    alert: null
  }
  // async componentDidMount(){
  //   this.setState({loading:true})
  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
  //   &client_secret = ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
  //   //console.log(process.env.REACT_APP_GITHUB_CLIENT_SECRET)
  //   this.setState({users:res.data, loading:false})
    
  // }
  searchUsers=async text =>{
    console.log(text)
    this.setState({loading:true})
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret = ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    //console.log(process.env.REACT_APP_GITHUB_CLIENT_SECRET)
    this.setState({users:res.data.items, loading:false})
  }
  clearUsers = ()=>this.setState({users:[], loading:false})
  setAlert =(msg, type)=>{
    this.setState({alert:{msg, type}})
    setTimeout(()=>{
      this.setState({alert:null})
    }, 5000)
  }
  foo1 = ()=>'Test456'
  render(){

    const name = 'john'
    const foo = () => 'Test123'
    //const loading = false
    const showName = true
    // if(loading){
    //   return 'Loading...'
    // }
    const {users,loading} = this.state
    return (
      <Router>
        <div className='App'>
          <Navbar  />      
          <div className="container">
            <Alert alert={this.state.alert}/>
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
            </Switch>
            
          </div>      
          {loading ? 'Loading...':<h4>Hello {showName && name.toUpperCase()} and {foo()} and {this.foo1()}</h4>}
          
        </div>
      </Router>
  );   
  }
}

export default App;
