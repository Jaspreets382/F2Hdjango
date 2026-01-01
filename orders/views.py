from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from .serializers import OrderSerializer,FarmerDashboardSerializer,FarmerDashSummarySerializer,OrderHistorySerializer
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Order
from orderitem.models import OrderItem
from users.permissions import IsFarmer,IsBuyer
# Create your views here.

@api_view(["POST","GET"])
@permission_classes([IsAuthenticated,IsBuyer])
def create_order(request):
    if request.method=='POST':
        
        order=Order.objects.create(buyer=request.user)
        serializer=OrderSerializer(data=order)
        if serializer.is_valid():
            serializer.save(buyer=request.user)
        return Response({"message":"Your order has been created"},
                        status=status.HTTP_201_CREATED)
    if request.method=="GET":
        count = Order.objects.filter(buyer=request.user).count()
        return Response({"your_orders": count})    
    
@api_view(["GET"])
@permission_classes([IsAuthenticated,IsBuyer])
def order_detail(request,order_id):
    try:
        order=Order.objects.get(id=order_id,
                                buyer=request.user)
    except Order.DoesNotExist:
        return Response({"error":"Order not found"},
                        status=status.HTTP_404_NOT_FOUND)
    serializer=OrderSerializer(order)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated,IsFarmer])
def get_farmer_dashboard(request):
    # if request.user.is_farmer==False:
    #     return Response({"error":"Not allowed"},status=status.HTTP_403_FORBIDDEN)
    
    status_param=request.query_params.get("status")
    products=OrderItem.objects.filter(product_id__farmer=request.user).order_by("-order__created_at")
    
    if status_param:
        products=products.filter(status=status_param).order_by("-order__created_at")
    serializer=FarmerDashboardSerializer(products,many=True)
    return Response (serializer.data,status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated,IsFarmer])
def get_summary(request):
    items=OrderItem.objects.filter(product_id__farmer=request.user)
    data={"total_items":items.count(),
    "pending_items":items.filter(status="Pending").count(),
    "delivered_items":items.filter(status="Delivered").count(),
    "confirmed_items":items.filter(status="Confirmed").count(),
    "cancelled_items":items.filter(status="Cancelled").count()
    }

    serializer=FarmerDashSummarySerializer(data)
    return Response(serializer.data,status=status.HTTP_200_OK)

@api_view(["GET"])
@permission_classes([IsAuthenticated,IsBuyer])
def get_order_history(request):

    orders=Order.objects.filter(buyer=request.user)
    serializer=OrderHistorySerializer(orders,many=True)
    return Response(serializer.data,status=status.HTTP_200_OK)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def cancel_order(request, order_id):
    
    order = Order.objects.get( id=order_id)

    if order.buyer != request.user:
        return Response(
            {"error": "Not allowed"},
            status=status.HTTP_403_FORBIDDEN
        )

    OrderItem.objects.filter(
        order=order
    ).exclude(
        status="DELIVERED"
    ).update(status="CANCELLED")

    return Response({"message": "Order cancelled successfully"})

