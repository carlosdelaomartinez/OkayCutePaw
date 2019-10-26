import React from 'react'
import Navbar from '../navbar/navbar'
class UserSearch extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    return(<div className="user-search">
      <Navbar></Navbar>
      <div className="search-info">

      </div>
      This is user search
      <footer className="footer">
        <div>All Icons except for Messages made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        <div>Messenges Icon Made by <a href="https://www.flaticon.com/authors/flat-icons" title="Flat Icons">Flat Icons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        <span>promotional content</span>
      </footer>
    </div>)
  }
}

export default UserSearch;