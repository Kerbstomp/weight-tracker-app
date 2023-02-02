# weight-tracker-app

I created this simple weight tracker app mostly to test for myself the integration of a [React](https://reactjs.org/) application with a [Django](https://www.djangoproject.com/) backend project

## Installation

Requires both python (> 3.11) and the package manager [pip](https://pip.pypa.io/en/stable/) to be installed

```shell
pipenv install
pipenv shell
python manage.py runserver
```

> The application will now be running on **_127.0.0.1:8000/_**

### Potential Future Improvements

**_Probably wont actually do any of these as this was more of a throwaway project_**

- Fix callback so UserList does not re-render needlessly
- Style this shit
- Ability to delete a user
- Ability to select a date when logging new weight
- Ability to go back to user selection
- Ability to delete a logged weight
