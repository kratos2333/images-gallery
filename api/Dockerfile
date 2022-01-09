FROM python:3.10

WORKDIR /app

EXPOSE 5050

# copy to the /app root
COPY Pipfile Pipfile.lock ./

# install pipenv globally inside container
RUN pip install pipenv
RUN pipenv lock --requirements > requirements.txt
RUN pip install -r requirements.txt

# copy all the remaining application files
COPY . ./

CMD ["python", "main.py"]
