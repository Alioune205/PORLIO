from rest_framework import viewsets, permissions
from .models import Project, Poster, Message, Analytics, Profile, SkillCategory, Skill
from .serializers import ProjectSerializer, PosterSerializer, MessageSerializer, AnalyticsSerializer, ProfileSerializer, SkillCategorySerializer, SkillSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all().order_by('order')
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class PosterViewSet(viewsets.ModelViewSet):
    queryset = Poster.objects.all().order_by('order')
    serializer_class = PosterSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    http_method_names = ['get', 'post', 'delete', 'head', 'options']

    def get_permissions(self):
        if self.request.method == 'POST':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

class AnalyticsViewSet(viewsets.ModelViewSet):
    queryset = Analytics.objects.all()
    serializer_class = AnalyticsSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class SkillCategoryViewSet(viewsets.ModelViewSet):
    queryset = SkillCategory.objects.all().order_by('order')
    serializer_class = SkillCategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all().order_by('order')
    serializer_class = SkillSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
