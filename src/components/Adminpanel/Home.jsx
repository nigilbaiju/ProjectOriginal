import React from 'react'
import './Home.css'
import Topbar from './Topbar'

const Home = (props) => {
  return (
    <div>
     <Topbar xxx={props.checkLogout}/>
      </div>
  )
}

export default Home
