from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from .serializers import OrderSerializer
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Order
# Create your views here.

@api_view(["POST","GET"])
@permission_classes([IsAuthenticated])
def create_order(request):
    if request.method=='POST':
        if request.user.is_farmer==True:
            return Response (status=status.HTTP_403_FORBIDDEN)
        else:
            order=OrderSerializer(data=request.data)
            if order.is_valid():
                
                order.save(buyer=request.user)
                return Response(order.data,status=status.HTTP_201_CREATED)
    if request.method=="GET":
        count = Order.objects.filter(buyer=request.user).count()
        return Response({"your_orders": count})    
