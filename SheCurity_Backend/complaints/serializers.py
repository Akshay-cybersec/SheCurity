from rest_framework import serializers
from .models import Ecommerce 

class EcommerceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ecommerce
        fields = '__all__'  
