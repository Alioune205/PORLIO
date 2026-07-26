from rest_framework import viewsets
from .models import Project, Poster, Message, Analytics, Profile, SkillCategory, Skill
from .serializers import ProjectSerializer, PosterSerializer, MessageSerializer, AnalyticsSerializer, ProfileSerializer, SkillCategorySerializer, SkillSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all().order_by('order')
    serializer_class = ProjectSerializer

class PosterViewSet(viewsets.ModelViewSet):
    queryset = Poster.objects.all().order_by('order')
    serializer_class = PosterSerializer

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    http_method_names = ['get', 'post', 'delete', 'head', 'options']

class AnalyticsViewSet(viewsets.ModelViewSet):
    queryset = Analytics.objects.all()
    serializer_class = AnalyticsSerializer

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class SkillCategoryViewSet(viewsets.ModelViewSet):
    queryset = SkillCategory.objects.all().order_by('order')
    serializer_class = SkillCategorySerializer

class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all().order_by('order')
    serializer_class = SkillSerializer
