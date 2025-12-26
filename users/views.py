from .serializers import UserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.contrib.auth import authenticate
# Create your views here.

@api_view(['POST'])
def user_creation(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()

        return Response(
            {
                "message": "User registered successfully",
                "username": user.username
            },
            status=status.HTTP_201_CREATED
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def login_user(request):
    username=request.data.get("username")
    password=request.data.get("password")
    if not username or not password:
        return Response(
        {"error": "Username and password are required"},
        status=status.HTTP_400_BAD_REQUEST
    )


    user=authenticate(request=request,username=username,password=password)

    if not user:
        return Response({"error":"invalid credentials"},status=status.HTTP_401_UNAUTHORIZED)
    token,_=Token.objects.get_or_create(user=user)
    return Response({"token":token.key,
                    "user_id":user.id,
                    'is_farmer':user.is_farmer},status=status.HTTP_200_OK)

