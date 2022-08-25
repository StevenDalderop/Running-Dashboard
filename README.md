# Running dashboard

Running dashboard is a website that shows the data of a Garmin 35 watch on a website. It uses Django, Dango-Rest-Framework for the back-end and React for the front-end. 

## Installation

In the main folder:
```bash
pip install -r requirements.txt
```

In  the frontend folder:
```bash
npm install
```

To migrate the database:
```bash
python manage.py makemigrations 
python manage.py migrate 
```

Set the secret key in the settings.py file. 

Authorize requests to Google Calendar using: https://developers.google.com/calendar/api/guides/auth?hl=en_US

## Usage 
Importing files from usb:
```bash
python main.py import
python main.py extract
python main.py update
python main.py info
```

On windows on the command line for a local server in development mode:
```bash
set debug=True 
python manage.py runserver 
```

To update the front-end files:
```bash
npm run dev
```

Manage the database at : http://127.0.0.1:8000/admin/
