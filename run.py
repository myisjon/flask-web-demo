from settings import RUN_CONFIG
from view import app


def main():
    app.run(**RUN_CONFIG)


if __name__ == '__main__':
    main()
