from django.shortcuts import render, get_object_or_404
from .models import Project, Skill, Experience


def home(request):
    projects = Project.objects.filter(is_active=True)[:6]
    skills = Skill.objects.filter(is_active=True)
    experiences = Experience.objects.filter(is_active=True)[:5]
    
    context = {
        'projects': projects,
        'skills': skills,
        'experiences': experiences,
    }
    return render(request, 'pages/home.html', context)


def about(request):
    skills = Skill.objects.filter(is_active=True)
    experiences = Experience.objects.filter(is_active=True)
    
    context = {
        'skills': skills,
        'experiences': experiences,
    }
    return render(request, 'portfolio/about.html', context)


def services(request):
    return render(request, 'portfolio/services.html')


def contact(request):
    return render(request, 'portfolio/contact.html')
