import React, { Component } from 'react';
import SearchBar from './component/SearchBar';
import Status from './component/Status';
import SideNavLinks from './component/SideNavLinks';
import Loading from './component/Loading'
import './App.css';

import axios from 'axios';
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
      weatherData: '',
      isLoading: false
    }
  }

  toggleInput = () => e => {
    this.setState({
      input: e.target.value
    });
  };

  clear = () => {
    this.setState({
      input: '',
      weatherData: '',
    });
  };

  getWeatherStatus = () => {
    let input = this.state.input
    if (input !== '') {
      this.setState({
        isLoading: true
      });
      axios.post('http://localhost:3000/api/weather', {
        search: input,
      }).then((response) => {
        this.setState({
          weatherData: response.data,
          isLoading: false
        });
      }).catch((error) => {
        console.log(error);
      });
    }
  };

  render() {
    let { isLoading } = this.state

    console.log('input', this.state.weatherData);
    return (
      <div className="App">
        <div className="Container">
        </div>
        <SearchBar toggleInput={this.toggleInput} getWeatherStatus={this.getWeatherStatus} clear={this.clear} data={this.state} />
        {isLoading ? <Loading /> : <Status result={this.state} />}
        <SideNavLinks />
      </div>
    );
  }
}

export default App;
