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
        product=serializer.validated_data["product_id"]
        serializer.save(order=order,
                        price_at_time=product.price)
        return Response(serializer.data,status=status.HTTP_201_CREATED)

    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

def update_order_item_status(request,item_id):
    try:
        item=OrderItem.objects.get(id=item_id)

    except OrderItem.DoesNotExist:
        return Response({"error":"Order item does not found"},status=status.HTTP_404_NOT_FOUND)
    
    if item.product.farmer!=request.user:
        return Response({"error": "Not allowed"},
            status=status.HTTP_403_FORBIDDEN
        )
    serializer=OrderItemSerializer(item,data=request.data,partial=True)

    if serializer.is_valid():
        serializer.save()
        recalculate_order_status(item.order)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
def recalculate_order_status(order):
    items = order.items.all()
    if all(item.status == "DELIVERED" for item in items):
        order.status = "DELIVERED"

    elif all(item.status == "CONFIRMED" for item in items):
        order.status = "CONFIRMED"

    else:
        order.status = "PENDING"

    order.save()
