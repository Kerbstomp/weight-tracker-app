from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name='api-routes'),
    path('user/', views.UserView.as_view(), name='user'),
    path('users/', views.UsersView.as_view(), name='users'),
    path('weights/<str:userId>/', views.UserWeightView.as_view(), name='user-weights'),
]