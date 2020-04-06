## Project Setup:

### Initial setup:
```
# Run venv script
./ scripts/venv-setup.sh
```

### Activate virutal environment:
```
source venv/bin/activate
```

### Initialize database
```
flask init-db
```

### Run server:
```
export FLASK_APP=app
flask run
```

### Deactivate virtual environment:
```
deactivate
```
