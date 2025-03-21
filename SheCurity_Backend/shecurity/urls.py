from django.contrib import admin
from django.urls import path
from django.conf.urls.static import static
from complaints.views import hello_world,ecommerce_data,upload_to_ipfs,fetch_all_locations,create_product
from django.conf import settings


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/hello/', hello_world),
    path('api/ecommerce/', ecommerce_data),
    path('api/uploadtoipfs/', upload_to_ipfs),
    path('api/fetchlocation/', fetch_all_locations),
    path('api/uploadproduct/', create_product)
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
