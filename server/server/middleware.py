import json

def JsonBodyMiddleware(get_response):
    # One-time configuration and initialization.

    def middleware(request):
        # Code to be executed for each request before
        # the view (and later middleware) are called.
        
        data = {}
        if request.content_type == 'application/json':
            if request.body:
                try:
                    data = json.loads(request.body)
                except:
                    data = Exception('request.body is not JSON format')
        
        setattr(request, 'json', data)

        response = get_response(request)

        # Code to be executed for each request/response after
        # the view is called.

        return response

    return middleware