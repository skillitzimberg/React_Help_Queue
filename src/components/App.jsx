import React from 'react';
import 'moment';
import Error404 from './Error404';
import Header from './Header';
import TicketList from './TicketList';
import NewTicketControl from './NewTicketControl';
import Admin from './Admin';
import { Switch, Route } from 'react-router-dom';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      masterTicketList: {},
      selectedTicket: null
    };
    this.handleAddingNewTicketToList = this.handleAddingNewTicketToList.bind(this);
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
                ticketList={this.state.masterTicketList} />} />

          <Route path='/newticket' 
            render={()=>
              <NewTicketControl 
                onNewTicketCreation={this.handleAddingNewTicketToList}/>} />

          <Route path='/admin' 
            render={(props)=>
              <Admin 
                ticketList={this.state.masterTicketList} 
                currentRouterPath={props.location.pathname} 
                onTicketSelection={this.handleChangingSelectedTicket}
                selectedTicket={this.state.selectedTicket}/>} />

          <Route component={Error404} />
        </Switch>
      </div>
    );
  }

  handleAddingNewTicketToList(newTicket){
    var newMasterTicketList = Object.assign({}, this.state.masterTicketList, {
      [newTicket.id]: newTicket
    });
    newMasterTicketList[newTicket.id].formattedWaitTime = newMasterTicketList[newTicket.id].timeOpen.fromNow(true);
    this.setState({masterTicketList: newMasterTicketList});
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
    var newMasterTicketList = Object.assign({}, this.state.masterTicketList);
    Object.keys(newMasterTicketList).forEach(ticketId => {
      newMasterTicketList[ticketId].formattedWaitTime = (newMasterTicketList[ticketId].timeOpen).fromNow(true);
    });
    this.setState({masterTicketList: newMasterTicketList});
  }

  componentWillUnmount() {
    clearInterval(this.waitTimeUpdateTimer);
  }

}

export default App;
