from .models import OrderItem,Order
from .serializers import OrderItemSerializer
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from users.permissions import IsBuyer,IsFarmer
from orders.services import is_valid_transition
# Create your views here.
@api_view(["POST"])
@permission_classes([IsAuthenticated,IsBuyer])
def choose_item(request,order_id):
    try:
        order=Order.objects.get(id=order_id,buyer=request.user,
                                status='PENDING')
    except Order.DoesNotExist:
        return Response({"error":"Order not found"},status=status.HTTP_404_NOT_FOUND)
    
    serializer=OrderItemSerializer(data=request.data,context={"order": order})
    if serializer.is_valid():
        product=serializer.validated_data["product_id"]
        serializer.save(order=order,
                        price_at_time=product.price)
        return Response(serializer.data,status=status.HTTP_201_CREATED)

    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


def get_user_role(user, item):
    if user == item.order.buyer:
        return "buyer"
    if user == item.product_id.farmer:
        return "farmer"
    return None


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_order_item_status(request, item_id):
    try:
        item = OrderItem.objects.get(id=item_id)
    except OrderItem.DoesNotExist:
        return Response(
            {"error": "Order item not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    role = get_user_role(request.user, item)

    if not role:
        return Response(
            {"error": "Not authorized"},
            status=status.HTTP_403_FORBIDDEN
        )

    new_status = request.data.get("status")

    if not new_status:
        return Response(
            {"error": "Status is required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    if not is_valid_transition(role, item.status, new_status):
        return Response(
            {"error": f"{role.capitalize()} cannot change status from {item.status} to {new_status}"},
            status=status.HTTP_400_BAD_REQUEST
        )

    serializer = OrderItemSerializer(
        item,
        data={"status": new_status},
        partial=True
    )

    if serializer.is_valid():
        serializer.save()
        recalculate_order_status(item.order)
        return Response(serializer.data, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
def recalculate_order_status(order):
    items = order.items.all()
    if all(item.status == "DELIVERED" for item in items):
        order.status = "DELIVERED"

    elif any(item.status=="CANCELLED" for item in items):
        order.status="CANCELLED"

    elif all(item.status == "CONFIRMED" for item in items):
        order.status = "CONFIRMED"
    else:
        order.status = "PENDING"

    order.save()
