from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model=User
        fields=['username','password','first_name','phone_number','address','is_farmer']
        extra_kwargs = {
            'is_farmer': {'read_only': True},
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create_user(**validated_data, password=password)
        user.set_password(password)
        user.save()
        return user
    def validate_password(self, value):
        if len(value) < 8:
                raise serializers.ValidationError(
            "Password must be at least 8 characters long."
        )
        return value
    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already exists.")
        return value
