# APIBook

usage

Install localize, and enjoy it.

Installation

Python3.6+

```shell

    pip3 install virtualenv

    virtualenv ENV
    source ENV/bin/activate

    python manage.py collectstatic

    gunicorn -w 4 server.wsgi:application

```
