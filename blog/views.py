from django.shortcuts import render, get_object_or_404
from .models import Post, Category


def post_list(request):
    posts = Post.objects.filter(is_published=True).select_related('author')
    context = {
        'posts': posts,
    }
    return render(request, 'blog/post_list.html', context)


def post_detail(request, slug):
    post = get_object_or_404(Post, slug=slug, is_published=True)
    post.views += 1
    post.save(update_fields=['views'])
    
    related_posts = Post.objects.filter(
        is_published=True,
        categories__icontains=post.categories
    ).exclude(id=post.id)[:3] if post.categories else []
    
    context = {
        'post': post,
        'related_posts': related_posts,
    }
    return render(request, 'blog/post_detail.html', context)
