from .models import Product
from rest_framework.decorators import api_view,permission_classes
from .serializers import ProductSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

@api_view(["GET","POST"])
@permission_classes([IsAuthenticated])
def product_list_create(request):
    if request.method=="GET":
        products=Product.objects.filter(is_active=True).select_related("farmer")
        serializer=ProductSerializer(products,many=True)
        return Response(serializer.data)
    if request.method == "POST":
        if not request.user.is_farmer: #error for farmer
            return Response(status=status.HTTP_403_FORBIDDEN)
        serializer = ProductSerializer(data=request.data,context={"request":request})
        if serializer.is_valid():
            serializer.save(farmer=request.user)  # set farmer automatically
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def edit_product(request,product_id):
    if request.user.is_farmer ==False:
        return Response(status=status.HTTP_400_BAD_REQUEST)
        
    product=Product.objects.get(id=product_id)
    serializer=ProductSerializer(product,data=request.data,
                                    partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=status.HTTP_200_OK)
    return Response(status=status.HTTP_304_NOT_MODIFIED)
        
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def delete_product(request,product_id):
    product=Product.objects.get(id=product_id)
    product.delete()
    return Response("Product deleted", status=status.HTTP_200_OK)