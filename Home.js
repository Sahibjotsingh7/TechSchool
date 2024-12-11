import React from 'react'
import Main from './Main'
import Footer from './Footer'

const Home = ({isLoggedIn}) => {
  return (
    <div>
       <Main></Main>
       <Footer isLoggedIn={isLoggedIn.status} userEmail={isLoggedIn.email} userName={isLoggedIn.name} />
    </div>
  )
}

export default Home
