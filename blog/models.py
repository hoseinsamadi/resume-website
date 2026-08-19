from django.db import models
from django.utils.text import slugify


class Post(models.Model):
    title = models.CharField(max_length=200, verbose_name='عنوان مطلب')
    slug = models.SlugField(max_length=200, unique=True, blank=True, verbose_name='شناسه یکتا')
    excerpt = models.TextField(blank=True, verbose_name='خلاصه مطلب')
    content = models.TextField(verbose_name='محتوا')
    image = models.ImageField(upload_to='blog/%Y/%m/%d/', blank=True, verbose_name='تصویر')
    author = models.ForeignKey(
        'auth.User',
        on_delete=models.CASCADE,
        related_name='blog_posts',
        verbose_name='نویسنده'
    )
    categories = models.CharField(max_length=500, blank=True, verbose_name='دسته‌بندی‌ها')
    tags = models.CharField(max_length=500, blank=True, help_text='جدا شده با کاما', verbose_name='برچسب‌ها')
    is_published = models.BooleanField(default=False, verbose_name='منتشر شده')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='تاریخ ایجاد')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='تاریخ به‌روزرسانی')
    views = models.PositiveIntegerField(default=0, verbose_name='بازدیدها')

    class Meta:
        verbose_name = 'مطلب آموزشی'
        verbose_name_plural = 'مطالب آموزشی'
        ordering = ['-created_at']

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title, allow_unicode=True)
        super().save(*args, **kwargs)


class Category(models.Model):
    name = models.CharField(max_length=100, verbose_name='نام دسته‌بندی')
    slug = models.SlugField(max_length=100, unique=True, blank=True, verbose_name='شناسه یکتا')
    description = models.TextField(blank=True, verbose_name='توضیحات')
    is_active = models.BooleanField(default=True, verbose_name='فعال')

    class Meta:
        verbose_name = 'دسته‌بندی'
        verbose_name_plural = 'دسته‌بندی‌ها'
        ordering = ['name']

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name, allow_unicode=True)
        super().save(*args, **kwargs)


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments', verbose_name='مطلب')
    name = models.CharField(max_length=100, verbose_name='نام')
    email = models.EmailField(verbose_name='ایمیل')
    website = models.URLField(blank=True, verbose_name='وبسایت')
    content = models.TextField(verbose_name='نظر')
    is_approved = models.BooleanField(default=False, verbose_name='تایید شده')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='تاریخ ارسال')

    class Meta:
        verbose_name = 'نظر'
        verbose_name_plural = 'نظرات'
        ordering = ['-created_at']

    def __str__(self):
        return f"نظر {self.name} برای {self.post.title}"

# Create your models here.
