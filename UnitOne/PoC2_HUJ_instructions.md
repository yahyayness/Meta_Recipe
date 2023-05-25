# Getting PoC2 HUJ web app running

 - File paths are relative to the current directory.
 - The instructions do not apply to `aj_dashboard`. 
 - Virtual environments are assumed managed by Anaconda (or possibly Miniconda, not tested). 
     - If Anaconda is not installed on your system, first [install it](https://docs.anaconda.com/free/anaconda/install/index.html). 
     - Then make sure `base` environment is updated:
 ```
 conda update -n base -c defaults conda -y
 ```

## Git branch
This instruction assumes the code on the `dressed_up_version` branch. Go to root of the local copy of the `Meta_Recipe` repo.
```
git fetch
git checkout dressed_up_version
git pull origin dressed_up_version
cd UnitOne
```


## Backend

 - In one terminal window, create the virtual environment:
```
conda create -n ajx_poc2_huj_env python=3.7 conda
conda activate ajx_poc2_huj_env
pip install --upgrade pip
cd backend
pip install -r requirements.txt
conda install psycopg2=2.8.6
python manage.py runserver
```

(Maybe also
```
# Ctrl+C
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```
)

 - Navigate a browser tab to [http://127.0.0.1:8000/](http://127.0.0.1:8000/).

## Frontend

 - Open a new terminal window.
 - Make sure Node.js and NPM are installed.
     - On macOS, assuming homebrew is package manager:
```
brew install node
npm install
```

 - On Linux, maybe this (not tested, please provide feedback):
 
```
apt-get install node
npm install
```

 - Run frontend:

```
conda activate ajx_poc2_huj_env # Even if just to visualize which web app the terminal is currently used for.
cd frontend
npm run start
```
 - Navigate another browser tab to [http://localhost:3000/](http://localhost:3000/).
