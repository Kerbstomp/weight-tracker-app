from rest_framework.serializers import ModelSerializer
from .models import User, UserWeight

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class UserWeightSerializer(ModelSerializer):
    class Meta:
        model = UserWeight
        fields = '__all__'
