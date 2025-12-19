from .models import OrderItem,Order
from .serializers import OrderItemSerializer
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def choose_item(request,order_id):
    try:
        order=Order.objects.get(id=order_id,buyer=request.user)
    except Order.DoesNotExist:
        return Response({"error":"Order not found"},status=status.HTTP_404_NOT_FOUND)
    
    serializer=OrderItemSerializer(data=request.data)
    if serializer.is_valid():
        product=serializer.validated_data["product"]
        serializer.save(order=order,
                        price_at_time=product.price)
        return Response(serializer.data,status=status.HTTP_201_CREATED)

    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)