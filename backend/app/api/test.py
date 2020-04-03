from . import api


@api.route('/test/')
def test():
    print('Request Received')
    return 200