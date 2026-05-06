from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'user_type', 'company_name', 'first_name', 'last_name')

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    full_name = serializers.CharField(required=False)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'user_type', 'company_name', 'full_name')

    def create(self, validated_data):
        full_name = validated_data.pop('full_name', '')
        first_name = ''
        last_name = ''
        if full_name:
            parts = full_name.split(' ', 1)
            first_name = parts[0]
            if len(parts) > 1:
                last_name = parts[1]

        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            user_type=validated_data.get('user_type', 'root'),
            company_name=validated_data.get('company_name', ''),
            first_name=first_name,
            last_name=last_name
        )
        return user

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['user_type'] = user.user_type
        token['email'] = user.email
        return token
