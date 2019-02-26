import rootReducer from './../../src/reducers/index';
import selectedTicketReducer from './../../src/reducers/selected-ticket-reducer';
import ticketListReducer from './../../src/reducers/ticket-list-reducer';
import { createStore } from 'redux';

let store = createStore(rootReducer);

describe("rootReducer", () => {

  test('Should return default state if no action is define', () => {
    expect(rootReducer({}, { type: null })).toEqual({
      selectedTicket: {},
      masterTicketList: {}
    });
  });

  test('Should contain ticketListReducer logic', () => {
    expect(store.getState().masterTicketList).toEqual(ticketListReducer(undefined, { type: null }));
  });

  test("should contain selectedTicketReducer logic", () => {
    expect(store.getState().selectedTicket).toEqual(selectedTicketReducer(undefined, { type: null }));
  });

});
