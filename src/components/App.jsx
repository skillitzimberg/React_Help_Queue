import React from 'react';
import 'moment';
import Error404 from './Error404';
import PropTypes from 'prop-types';
import Header from './Header';
import TicketList from './TicketList';
import NewTicketControl from './NewTicketControl';
import Admin from './Admin';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class App extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      selectedTicket: null
    };
    this.handleChangingSelectedTicket = this.handleChangingSelectedTicket.bind(this);
  }

  render() {
    return (
      <div>
        <style jsx>{`
          div {
            font-family: helvetica;
            padding: 10px;
          }
          `}</style>
        <Header/>
        <Switch>
          <Route exact path='/'
            render={()=>
              <TicketList
                ticketList={this.props.masterTicketList} />} />

          <Route path='/newticket'
            render={()=>
              <NewTicketControl />} />

          <Route path='/admin'
            render={(props)=>
              <Admin
                ticketList={this.props.masterTicketList}
                currentRouterPath={props.location.pathname}
                onTicketSelection={this.handleChangingSelectedTicket}
                selectedTicket={this.state.selectedTicket}/>} />

          <Route component={Error404} />
        </Switch>
      </div>
    );
  }

  handleChangingSelectedTicket(ticketId){
    this.setState({selectedTicket: ticketId});
  }

  componentDidMount() {
    this.waitTimeUpdateTimer = setInterval(() =>
      this.updateTicketElapsedWaitTime(),
      60000
    );
  }

  updateTicketElapsedWaitTime() {
    // var newMasterTicketList = Object.assign({}, this.state.masterTicketList);
    // Object.keys(newMasterTicketList).forEach(ticketId => {
    //   newMasterTicketList[ticketId].formattedWaitTime = (newMasterTicketList[ticketId].timeOpen).fromNow(true);
    // });
    // this.setState({masterTicketList: newMasterTicketList});
  }

  componentWillUnmount() {
    clearInterval(this.waitTimeUpdateTimer);
  }

}

const mapStateToProps = (state) => {
  return {
    masterTicketList: state
  }
}

App.propTypes = {
  newMasterTicketList: PropTypes.object
};

export default withRouter(connect(mapStateToProps)(App));
