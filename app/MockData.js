module.exports = {

  init: function() {
    if (sessionStorage.mails) {
      return;
    }
    sessionStorage.setItem('mails', JSON.stringify([
      {
        id: 1,
        name: 'inbox',
        emails: [
          {
            id: 1,
            from: 'alice@rmail.com',
            to: 'seanlin0800@rmail.com',
            subject: 'Greeting',
            body: 'Just wanna say hi.',
            isRead: false,
            isStarred: false,
            date: '2014-12-29T04:44:44Z'
          },
          {
            id: 2,
            from: 'react@facebook.com',
            to: 'seanlin0800@rmail.com',
            subject: 'News Digest',
            body: '<h1>Awesome React</h1> <img src="https://raw.githubusercontent.com/wiki/facebook/react/react-logo-1000-transparent.png" width=300/)>',
            isRead: false,
            isStarred: false,
            date: '2015-04-25T04:44:44Z'
          },
          {
            id: 3,
            from: 'admin@github.com',
            to: 'seanlin0800@rmail.com',
            subject: 'Welcome to Github',
            body: 'Welcome!! Thanks for signing up with Github.',
            isRead: false,
            isStarred: false,
            date: (new Date()).toISOString()
          }
        ]
      },
      {
        id: 2,
        name: 'spam',
        emails: [
          {
            id: 3,
            from: 'richdad@gmail.com',
            to: 'seanlin0800@rmail.com',
            subject: 'Want to Be Rich?',
            body: 'Have you ever dreamed of being a millionaire? Here\'re some secrets rich people don\'t want you to know.',
            isRead: false,
            isStarred: false,
            date: '2015-07-04T16:44:44Z'
          }
        ]
      },
      {
        id: 3,
        name: 'sent',
        emails: [
        ]
      }
    ]));
  }

};
