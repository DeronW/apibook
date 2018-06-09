


pip3 install virtualenv
virtualenv ENV

source ENV/bin/activate

pip3 instlal -r requirements.txt

python3 manage.py collectstatic
python3 manage.py migrate

gunicorn -w 4 server.wsgi:application 

