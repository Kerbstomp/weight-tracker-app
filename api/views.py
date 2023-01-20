from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import User, UserWeight
from .serializers import UserSerializer, UserWeightSerializer

api_routes = [
    {
        'Endpoint': '/user/',
        'method': 'POST',
        'body': {'name': ''},
        'description': 'Creates a new user'
    },
    {
        'Endpoint': '/users/',
        'method': 'GET',
        'body': None,
        'description': 'Returns all the users'
    },
    {
        'Endpoint': '/weights/userId',
        'method': 'GET',
        'body': None,
        'description': 'Returns all the weights for provided user id'
    },
        {
        'Endpoint': '/weights/userId',
        'method': 'POST',
        'body': {'weight': ""},
        'description': 'Adds a new weight for the user id'
    },
]

@api_view(['GET'])
def getRoutes(request):
    return Response(api_routes)

class UserView(APIView):
    def post(self, request):
        print(request.data)
        data = request.data
        user = User.objects.create(
            name = data
        )
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)

class UsersView(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

class UserWeightView(APIView):
    def get(self, request, userId):
        weights = UserWeight.objects.filter(user_id=userId)
        serializer = UserWeightSerializer(weights, many=True)
        return Response(serializer.data)

    def post(self, request, userId):
        data = request.data
        user = User.objects.get(id=userId)
        weight = UserWeight.objects.create(
            user = user,
            weight = data
        )
        serializer = UserWeightSerializer(weight, many=False)
        return Response(serializer.data)
