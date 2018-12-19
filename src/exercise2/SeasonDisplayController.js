import React, { Component } from 'react'
import SeasonDisplayView from './SeasonDisplayView';

class SeasonDisplayController extends Component {
  constructor(props){
    super(props)
    this.state = {
      lat: null,
      long: null,
      errorMessage: '',
      displaySeason: null
    }
  }

  componentDidMount(){
    // Get the client current position after client's approval
    window.navigator.geolocation.getCurrentPosition(
      position => this.setState({lat: position.coords.latitude, long: position.coords.longitude}),
      err => this.setState({errorMessage: err.message, errorMessageCode: err.code})
    )
    const getSeason = (lat, month) => {
      if(month > 2 && month < 9){
        this.setState({
          displaySeason: lat > 0 ? 'summer' : 'winter'
        })
      } else {
        this.setState({
          displaySeason: lat > 0 ? 'winter' : 'summer'
        })
      }
    }

    getSeason(this.state.lat, new Date().getMonth())
   
  }

  componentDidUpdate(){

  }

  render(){

    const {
      errorMessage,
      errorMessageCode
    } = this.state

    if (this.state.errorMessage && !this.state.lat) {
      console.log('Reason: ', errorMessage)
      console.log('Error Code: ', errorMessageCode)
      return (
        <div>
          <h4>You need to enable geo location to properly use our app</h4>
        </div>
      )
    }

    if (!this.state.errorMessage && this.state.lat) {
      return(
        <div>
          <SeasonDisplayView displaySeason={this.state.displaySeason}/>
        </div>
      )
    }

    return(      
      <div>
        <h1>Loading...</h1>
      </div>
    )

  }
}

export default SeasonDisplayController
