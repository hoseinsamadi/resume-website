from django.db import models
from django.utils.text import slugify


class Project(models.Model):
    title = models.CharField(max_length=200, verbose_name='عنوان پروژه')
    slug = models.SlugField(max_length=200, unique=True, blank=True, verbose_name='شناسه یکتا')
    description = models.TextField(verbose_name='توضیحات')
    image = models.ImageField(upload_to='portfolio/%Y/%m/%d/', verbose_name='تصویر')
    technologies = models.CharField(max_length=500, blank=True, verbose_name='تکنولوژی‌ها')
    project_url = models.URLField(blank=True, verbose_name='لینک پروژه')
    github_url = models.URLField(blank=True, verbose_name='لینک گیت‌هاب')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='تاریخ ایجاد')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='تاریخ به‌روزرسانی')
    is_active = models.BooleanField(default=True, verbose_name='فعال')

    class Meta:
        verbose_name = 'پروژه'
        verbose_name_plural = 'پروژه‌ها'
        ordering = ['-created_at']

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title, allow_unicode=True)
        super().save(*args, **kwargs)


class Skill(models.Model):
    name = models.CharField(max_length=100, verbose_name='نام مهارت')
    level = models.PositiveIntegerField(default=50, help_text='از 0 تا 100', verbose_name='سطح')
    icon = models.CharField(max_length=50, blank=True, help_text='نام کلاس آیکون', verbose_name='آیکون')
    is_active = models.BooleanField(default=True, verbose_name='فعال')

    class Meta:
        verbose_name = 'مهارت'
        verbose_name_plural = 'مهارت‌ها'
        ordering = ['name']

    def __str__(self):
        return self.name


class Experience(models.Model):
    title = models.CharField(max_length=200, verbose_name='عنوان شغلی')
    company = models.CharField(max_length=200, verbose_name='شرکت')
    location = models.CharField(max_length=200, blank=True, verbose_name='موقعیت مکانی')
    start_date = models.DateField(verbose_name='تاریخ شروع')
    end_date = models.DateField(null=True, blank=True, verbose_name='تاریخ پایان')
    is_current = models.BooleanField(default=False, verbose_name='شاغل هستم')
    description = models.TextField(verbose_name='توضیحات')
    is_active = models.BooleanField(default=True, verbose_name='فعال')

    class Meta:
        verbose_name = 'سابقه کاری'
        verbose_name_plural = 'سوابق کاری'
        ordering = ['-start_date']

    def __str__(self):
        return f"{self.title} در {self.company}"

# Create your models here.
