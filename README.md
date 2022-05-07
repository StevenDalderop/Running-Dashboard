# Running dashboard

Running dashboard is a website that shows the data of my Garmin watch on a website. It uses Django, Dango-Rest-Framework for the back-end and React for the front-end. 

## Installation

In the main folder:
```bash
pip install -r requirements.txt
```

In  the frontend folder:
```bash
npm install
```

## Usage 
On windows on the command line for a local server in development mode:
```bash
python manage.py makemigrations 
python manage.py migrate 
set debug=True 
set DJANGO_DEVELOPMENT=1 
python manage.py runserver 
```

To update the front-end files:
```bash
npm run dev
```
