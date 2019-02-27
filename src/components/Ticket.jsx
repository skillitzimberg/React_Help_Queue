import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { connect } from 'react-redux';

function Ticket(props){

  function handleSavingSelectedTicket(ticketId) {
    console.log(props);
    const { dispatch } = props;
    const action = {
      type: 'SELECT_TICKET',
      ticketId: ticketId
    };
    dispatch(action);
  }

  const ticketInformation =
      <div>
        <style jsx>{`
          div {
            text-align: center;
          }
          `}</style>
        <h3>{props.names}</h3>
        <h3>{props.location}</h3>
        <h4>{props.formattedWaitTime}</h4>
        <hr/>
      </div>;

  if (props.currentRouterPath === '/admin'){
    return (
      <div onClick={() => {handleSavingSelectedTicket(props.ticketId);}}>
        {ticketInformation}
      </div>
    );
  } else {
    return (
      <div>
        {ticketInformation}
      </div>
    );
  }
}

Ticket.propTypes = {
  names: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  issue: PropTypes.string,
  formattedWaitTime: PropTypes.string.isRequired,
  currentRouterPath: PropTypes.string
};

export default connect()(Ticket);
