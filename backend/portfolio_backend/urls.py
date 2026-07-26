"""
URL configuration for portfolio_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from core.views import ProjectViewSet, PosterViewSet, MessageViewSet, AnalyticsViewSet, ProfileViewSet, SkillCategoryViewSet, SkillViewSet

router = DefaultRouter()
router.register(r'projects', ProjectViewSet)
router.register(r'posters', PosterViewSet)
router.register(r'messages', MessageViewSet)
router.register(r'analytics', AnalyticsViewSet)
router.register(r'profile', ProfileViewSet)
router.register(r'skills', SkillCategoryViewSet)
router.register(r'skill', SkillViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
