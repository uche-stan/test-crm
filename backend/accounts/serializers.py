from rest_framework import serializers
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from djoser.serializers import UserCreateSerializer
from djoser.serializers import UserSerializer as BaseUserSerializer


# ****************************************************************

# JWT Authentication
# ****************************************************************
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
     @classmethod
     def get_token(cls, user):
        token = super().get_token(user)
        
        # Add custom claims
        token['id'] = user.id
        token['username'] = user.username
        token['full_name'] = user.full_name
        token['email'] = user.email
        token['phone'] = user.phone
        token['profession'] = user.profession
        token['address'] = user.address
        token['image'] = str(user.photo)
        token['organizer'] = str(user.is_organizer)
        token['agent'] = str(user.is_agent)
        token['date_joined'] = str(user.date_joined)

        return token
    
    

class CreateUserSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ['id', 'full_name', 'email',  'password', 'profession', 'phone']    
        

class UserSerializer(BaseUserSerializer):    
    photo = serializers.ImageField(required=False)
    class Meta(BaseUserSerializer.Meta):
        model = User
        fields = ['id', 'full_name', 'email', 'profession', 'phone', 'gender', 
                  'city', 'state', 'address', 'zip', 'country', 'photo']        
        
        # fields = ['id', 'full_name', 'profession' , 'photo']     