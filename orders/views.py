from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from .serializers import OrderSerializer,FarmerDashboardSerializer
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Order
from orderitem.models import OrderItem
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
    
@api_view(["GET"])
@permission_classes([IsAuthenticated])
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
@permission_classes([IsAuthenticated])
def get_farmer_dashboard(request):
    if request.user.is_farmer==False:
        return Response({"error":"Not allowed"},status=status.HTTP_403_FORBIDDEN)
    
    status_param=request.query_params.get("status")
    products=OrderItem.objects.filter(product_id__farmer=request.user).order_by("-order__created_at")
    
    if status_param:
        products=products.filter(status=status_param).order_by("-order__created_at")
    serializer=FarmerDashboardSerializer(products,many=True)
    return Response (serializer.data,status=status.HTTP_200_OK)
        