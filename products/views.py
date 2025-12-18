from django.shortcuts import render,redirect
from django.http import JsonResponse
from .models import Product
from rest_framework.decorators import api_view,permission_classes
from .serializers import ProductSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
# Create your views here.
# def view_listings(request):
#     products= Product.objects.all()
#     data=[]
#     for product in products:
#         data.append({
#             "id": product.id,
#             "name": product.name,
#             "price": product.price,
#             "quantity": product.quantity,
#             "farmer": product.farmer.username,
#         })
    
#     return JsonResponse(data, safe=False)

@api_view(["GET","POST"])
@permission_classes([IsAuthenticated])
def product_list_create(request):
    if request.method=="GET":
        products=Product.objects.filter(is_active=True)
        serializer=ProductSerializer(products,many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        if not request.user.is_farmer:
            return Response(status=status.HTTP_403_FORBIDDEN)
        if request.user.is_farmer==True:
            serializer = ProductSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(farmer=request.user)  # set farmer automatically
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
