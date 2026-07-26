from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=200, verbose_name="Titre")
    description = models.TextField(verbose_name="Description")
    image_url = models.CharField(max_length=500, verbose_name="Chemin de l'image (ex: assets/project1.png)")
    tags = models.CharField(max_length=200, verbose_name="Tags (séparés par des virgules)")
    client_project = models.BooleanField(default=False, verbose_name="Projet Client ?")
    live_url = models.URLField(blank=True, null=True, verbose_name="Lien (optionnel)")
    order = models.IntegerField(default=0, verbose_name="Ordre d'affichage")

    class Meta:
        ordering = ['order', '-id']
        verbose_name = "Réalisation"
        verbose_name_plural = "Réalisations"

    def __str__(self):
        return self.title

class Poster(models.Model):
    title = models.CharField(max_length=100, verbose_name="Titre de l'affiche")
    image_url = models.CharField(max_length=500, verbose_name="Chemin de l'image (ex: assets/flyer1.jpg)")
    order = models.IntegerField(default=0, verbose_name="Ordre d'affichage")

    class Meta:
        ordering = ['order', '-id']
        verbose_name = "Poster"
        verbose_name_plural = "Posters"

    def __str__(self):
        return self.title

class Message(models.Model):
    STATUS_CHOICES = [
        ('new', 'Nouveau'),
        ('read', 'Lu'),
        ('replied', 'Répondu'),
    ]
    name = models.CharField(max_length=150, verbose_name="Nom")
    email = models.EmailField(verbose_name="Email")
    phone = models.CharField(max_length=30, blank=True, default='', verbose_name="Téléphone")
    content = models.TextField(verbose_name="Message")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new', verbose_name="Statut")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Reçu le")

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Message"
        verbose_name_plural = "Messages"

    def __str__(self):
        return f"Message de {self.name} ({self.status})"

class Analytics(models.Model):
    date = models.DateField(auto_now_add=True, unique=True, verbose_name="Date")
    page_views = models.IntegerField(default=0, verbose_name="Vues globales")
    cv_downloads = models.IntegerField(default=0, verbose_name="Téléchargements CV")

    class Meta:
        ordering = ['-date']
        verbose_name = "Statistique"
        verbose_name_plural = "Statistiques"

    def __str__(self):
        return f"Stats du {self.date}"

class Profile(models.Model):
    hero_title = models.CharField(max_length=200, default="Bonjour, je suis", verbose_name="Titre Hero (Ex: Bonjour, je suis)")
    hero_name = models.CharField(max_length=200, default="Pape Sene", verbose_name="Nom Hero")
    hero_subtitle = models.CharField(max_length=200, default="Développeur Frontend", verbose_name="Sous-titre Hero")
    hero_description = models.TextField(verbose_name="Description Hero")
    about_text = models.TextField(verbose_name="Texte 'À Propos'")
    cv_url = models.CharField(max_length=500, default="assets/cv-pape-sene.pdf", verbose_name="Lien du CV")

    class Meta:
        verbose_name = "Profil Global"
        verbose_name_plural = "Profil Global"

    def __str__(self):
        return "Configuration du Profil"

class SkillCategory(models.Model):
    name = models.CharField(max_length=100, verbose_name="Nom de la catégorie (Ex: Frontend)")
    order = models.IntegerField(default=0, verbose_name="Ordre d'affichage")

    class Meta:
        ordering = ['order']
        verbose_name = "Catégorie de compétence"
        verbose_name_plural = "Catégories de compétences"

    def __str__(self):
        return self.name

class Skill(models.Model):
    category = models.ForeignKey(SkillCategory, related_name='skills', on_delete=models.CASCADE, verbose_name="Catégorie")
    name = models.CharField(max_length=100, verbose_name="Nom de la compétence (Ex: React)")
    order = models.IntegerField(default=0, verbose_name="Ordre d'affichage")

    class Meta:
        ordering = ['order']
        verbose_name = "Compétence"
        verbose_name_plural = "Compétences"

    def __str__(self):
        return self.name
