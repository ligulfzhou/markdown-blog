from django.contrib import admin
from .models import Blog, Comment, Category, Tag

# Register your models here.

admin.site.register(Blog)
admin.site.register(Comment)
admin.site.register(Category)
admin.site.register(Tag)

