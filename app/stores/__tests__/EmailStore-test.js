/* eslint-disable block-scoped-var */

jest.dontMock('../EmailStore');

describe('EmailStore', function() {
  var EmailStore;
  var ServerActionCreators;

  beforeEach(function() {
    jest.mock('../../utils/APIUtils');
    EmailStore = require('../EmailStore');
    ServerActionCreators = require('../../actions/ServerActionCreators');
  });

  it('should initialize with no mail items', function() {
    var all = EmailStore.getAll();
    expect(all).toEqual({});
  });

  describe('Actions', function() {
    var MailThreadActionCreators;

    beforeEach(function() {
      ServerActionCreators.receiveAll([
        {
          id: 1,
          name: 'sent',
          emails: [
            {
              id: 1,
              from: 'alice@rmail.com',
              to: 'seanlin0800@rmail.com',
              subject: 'Meeting',
              body: 'hi',
              isRead: false,
              isStarred: false,
              date: '2014-12-29T04:44:44Z'
            }
          ]
        }
      ]);
      MailThreadActionCreators = require('../../actions/MailThreadActionCreators');
    });

    it('should initialize dataset on receiveAll', function() {
      var all = EmailStore.getAll();
      var keys = Object.keys(all);

      expect(keys.length).toBe(1);
      expect(all.sent.name).toEqual('sent');
      expect(Object.keys(all.sent.emails).length).toBe(1);
    });

    it('should mark mail thread read on markThread', function() {
      var mail;

      MailThreadActionCreators.markThread({
        name: 'sent',
        id: 1,
        val: true
      });
      mail = EmailStore.get('sent', 1);

      expect(mail.isRead).toBe(true);
    });

    it('should delete an mail on delete', function() {
      MailThreadActionCreators.delete({
        name: 'sent',
        id: 1
      });
      expect(EmailStore.getAll().sent.emails).toEqual({});
    });

    it('should start an mail on ClickStar', function() {
      var mail;

      MailThreadActionCreators.clickStar({
        name: 'sent',
        id: 1,
        val: true
      });
      mail = EmailStore.get('sent', 1);

      expect(mail.isStarred).toBe(true);
    });

    it('should add an mail on sendMailSuccess', function() {
      ServerActionCreators.sendMailSuccess({
        id: 2,
        from: 'seanlin0800@rmail.com',
        to: 'alice@rmail.com',
        subject: 'test',
        body: '123',
        date: '2015-12-29T04:44:44Z'
      });

      expect(Object.keys(EmailStore.getAll().sent.emails).length).toBe(2);
    });
  });
});
