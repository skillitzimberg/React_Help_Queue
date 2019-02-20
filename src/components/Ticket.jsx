import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';

function Ticket(props){
  return (
    <div>
      <style jsx>{`
        div {
          text-align: center;
        }
        `}</style>
      <h3>{props.names}</h3>
      <h3>{props.location}</h3>
      <h4>{props.formattedWaitTime}</h4>
      <p><em>{props.issue}</em></p>
      <hr/>
    </div>
  );
}

Ticket.propTypes = {
  names: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  issue: PropTypes.string,
  formattedWaitTime: PropTypes.string.isRequired
};

export default Ticket;
