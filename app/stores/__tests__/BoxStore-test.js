/* eslint-disable block-scoped-var */

jest.dontMock('../BoxStore');

describe('BoxStore', function() {
  var alt;
  var BoxStore;
  var EmailStore;

  beforeEach(function() {
    alt = require('../../alt');
    alt.dispatcher.waitFor = jest.genMockFunction();
    jest.mock('../EmailStore');
    EmailStore = require('../EmailStore');
    BoxStore = require('../BoxStore');
  });

  it('should initialize with no mail items', function() {
    var all = BoxStore.getAll();
    expect(all).toEqual({});
  });

  describe('Actions', function() {
    var MailThreadActionCreators;
    var ServerActionCreators;
    var data;

    beforeEach(function() {
      ServerActionCreators = require('../../actions/ServerActionCreators');
      MailThreadActionCreators = require('../../actions/MailThreadActionCreators');
      data = {
        sent: {
          id: 1,
          name: 'sent',
          emails: {
            '1': {
              id: 1,
              from: 'alice@rmail.com',
              to: 'seanlin0800@rmail.com',
              subject: 'Meeting',
              body: 'hi',
              isRead: false,
              isStarred: false,
              date: '2014-12-29T04:44:44Z'
            }
          }
        }
      };

      EmailStore.getAll.mockReturnValue(data);
      EmailStore.getBox.mockReturnValue(data.sent);
      alt.dispatcher.dispatch({
        action: ServerActionCreators.RECEIVE_ALL,
        data: []
      });
    });

    it('should initialize dataset on receiveAll', function() {
      var all = BoxStore.getAll();

      expect(Object.keys(all).length).toBe(1);
      expect(all.sent.unreadCount).toBe(1);
    });

    it('should update unreadCount on markThread', function() {
      var id = 1;

      data.sent.emails[id].isRead = true;
      alt.dispatcher.dispatch({
        action: MailThreadActionCreators.MARK_THREAD,
        data: {
          name: 'sent',
          id: id,
          val: true
        }
      });

      expect(BoxStore.get('sent').unreadCount).toBe(0);
    });

    it('should update unreadCount on delete', function() {
      var id = 1;

      delete data.sent.emails[id];
      alt.dispatcher.dispatch({
        action: MailThreadActionCreators.DELETE,
        data: {
          name: 'sent',
          id: id
        }
      });

      expect(BoxStore.get('sent').unreadCount).toBe(0);
    });

    it('should update unreadCount on sendMailSuccess', function() {
      var newData = {
        id: 2,
        from: 'seanlin0800@rmail.com',
        to: 'alice@rmail.com',
        subject: 'test',
        body: '123',
        date: '2015-12-29T04:44:44Z'
      };

      data.sent.emails['2'] = newData;
      alt.dispatcher.dispatch({
        action: ServerActionCreators.SEND_MAIL_SUCCESS,
        data: newData
      });

      expect(BoxStore.get('sent').unreadCount).toBe(2);
    });
  });
});
