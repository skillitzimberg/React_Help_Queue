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
                currentRouterPath={props.location.pathname}/>} />

          <Route component={Error404} />
        </Switch>
      </div>
    );
  }

  componentDidMount() {
    this.waitTimeUpdateTimer = setInterval(() =>
      this.updateTicketElapsedWaitTime(),
      5000
    );
  }

  updateTicketElapsedWaitTime() {
    const { dispatch } = this.props;
    console.log('updateTicketElapsedWaitTime')
    Object.keys(this.props.masterTicketList).map(ticketId => {
      const ticket = this.props.masterTicketList[ticketId];
      const newFormattedWaitTime = ticket.timeOpen.fromNow(true);
      const action = {
        type: 'UPDATED_TIME',
        id: ticketId,
        formattedWaitTime: newFormattedWaitTime
      };
      console.log(action.formattedWaitTime)
      dispatch(action);
    });
  }

  componentWillUnmount() {
    clearInterval(this.waitTimeUpdateTimer);
  }

}

const mapStateToProps = (state) => {
  return {
    masterTicketList: state.masterTicketList
  }
}

App.propTypes = {
  newMasterTicketList: PropTypes.object
};

export default withRouter(connect(mapStateToProps)(App));
