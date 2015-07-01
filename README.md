# The SendGrid Mailer App

The SendGrid mailer app provides a Foxx script and `Foxx.queues` job type for sending transactional emails with [SendGrid](https://sendgrid.com/).

**Note:** Version 2.0.0 and higher require ArangoDB 2.6 or later to work correctly.

*Examples*

First add this app to your dependencies:

```js
{
  ...
  "dependencies": {
    "mailer": "mailer-sendgrid:^2.0.0"
  }
  ...
}
```

Once you've configured both apps correctly, you can use it like this:

```js
var Foxx = require('org/arangodb/foxx');
var queue = Foxx.queues.get('default');

queue.push(applicationContext.dependencies.mailer, {
    from: 'postmaster@initech.example',
    to: 'john.doe@employees.initech.example',
    subject: 'Termination',
    html: '<blink>YOU ARE FIRED!</blink>'
});
```

## Configuration

This app has the following configuration options:

* *apiUser*: Your SendGrid API user. This is the same username used to log into your SendGrid account.
* *apiKey*: Your SendGrid API key. This is the same password used to log into your SendGrid account.
* *maxFailures* (optional): The maximum number of times each job will be retried if it fails. Default: *0* (don't retry).

## Job Data

For full documentation of all job data options supported by SendGrid see [the official SendGrid API documentation](https://sendgrid.com/docs/API_Reference/Web_API/mail.html).

You can specify an option multiple times by passing an array as the option's value.

### Attachments

If you want to send attachments, you need to pass them as objects with the following properties:

* *content*: the attachment's base64-encoded content.
* *name*: the name of the attachment that will be used in the e-mail.
* *type* (optional): the attachment's MIME type. Default: *application/octet-stream*

If you want to reference attachments in the message's html you can specify content IDs by passing an object mapping file names to content IDs.

*Examples*

```js
queue.push(applicationContext.dependencies.mailer, {
    // ...
    html: '<a href="cid:ii_139db99fdb5c3704">hello world</a>',
    files: {
        content: 'SGVsbG8gV29ybGQh',
        name: 'hello_world.txt',
        type: 'text/plain'
    },
    content: {
        'hello_world.txt': 'ii_139db99fdb5c3704'
    }
});
```

## License

This code is distributed under the [Apache License](http://www.apache.org/licenses/LICENSE-2.0) by ArangoDB GmbH.
