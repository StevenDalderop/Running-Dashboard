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
To compile the front-end files in watch-mode:
```bash
npm run dev
```

To create an user account: 
```bash
python manage.py createsuperuser
```

On windows on the command line for a local server in development mode:
```bash
set debug=True 
python manage.py runserver 
```

Importing files from usb:
```bash
python main.py import
python main.py extract
python main.py update
python main.py info
```
