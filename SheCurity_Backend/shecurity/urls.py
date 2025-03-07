
from django.contrib import admin
from django.urls import path
from complaints.views import hello_world,ecommerce_data,upload_to_ipfs


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/hello/', hello_world),
    path('api/ecommerce/', ecommerce_data),
    path('api/uploadtoipfs/', upload_to_ipfs),
]
