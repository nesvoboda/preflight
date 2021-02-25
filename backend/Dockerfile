FROM python:3.9-alpine3.13

# set work directory
WORKDIR /usr/src/app

# set environment variables
ENV CRYPTOGRAPHY_DONT_BUILD_RUST=1
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV DJANGO_SETTINGS_MODULE preflight-backend.settings

RUN apk add gcc musl-dev libffi-dev libressl-dev

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

# copy project
COPY . .

RUN python3 manage.py migrate