import selectedTicketReducer from './../../src/reducers/selected-ticket-reducer';
import c from './../constants';

describe("selectedTicketReducer", () => {

  test('should return default state if no action type is defined', () => {
    expect(selectedTicketReducer({}, { type: null })).toEqual({});
  });

  test('Should record which ticket has been selected by user', () => {
    expect(selectedTicketReducer({}, { type: c.SELECT_TICKET, ticketId: 1 })).toEqual(1);
  })

  test('Should record which ticket has been selected by user', () => {
    expect(selectedTicketReducer({}, { type: c.SELECT_TICKET, ticketId: 1 })).not.toBe(0);
  })
});
