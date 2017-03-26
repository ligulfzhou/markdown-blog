import logging
from django.shortcuts import render
from django.views import View
from django.http import HttpResponse, JsonResponse
from django.forms.models import model_to_dict
from django.contrib import admin
from django.shortcuts import render
from django.db.models import Count, DateTimeField
from django.utils.dateparse import parse_datetime

from .models import Blog, Comment, Tag, Category

def to_dict(instance):
    opts = instance._meta
    data = {}
    for f in opts.concrete_fields:
        if isinstance(f, DateTimeField):
            data[f.name] = f.value_from_object(instance).strftime('%Y-%m-%d %X')
        else:
            data[f.name] = f.value_from_object(instance)
    return data


def cors_response(response):
    response['Access-Control-Allow-Origin'] = '*'
    response['Access-Control-Allow-Headers'] = 'x-requested-with'
    response['Access-Control-Allow-Methods'] = '*'
    return response


class TagsView(View):

    def get(self, request):
        tags = Tag.objects.all()
        tags = [to_dict(item) for item in tags]
        blogs_count = Blog.objects.values('tag_id').annotate(Count('tag_id'))
        tid_bcount_dict = {i['tag_id']: i['tag_id__count'] for i in blogs_count}
        [tag.update({'count': tid_bcount_dict.get(tag['id'], 0)}) for tag in tags]
        return cors_response(JsonResponse(dict(tags=tags)))


class TagView(View):

    def get(self, request, tag_id):
        tag = Tag.objects.get(pk=tag_id)
        blogs = Blog.objects.filter(tag_id=tag_id).all()
        tag = to_dict(tag)
        blogs = [to_dict(item) for item in blogs]
        [blog.update({'tag_id': tag['id'], 'tag_title': tag['title'], 'tag_img_url': tag['img_url']})
                     for blog in blogs]
        tag.update({'blogs': blogs})
        return cors_response(JsonResponse(dict(tag=tag)))


class BlogsView(View):

    def get(self, request):
        blogs = Blog.objects.all()
        blogs = [to_dict(blog) for blog in blogs]

        blog_ids = [item['id'] for item in blogs]
        comment_count = Comment.objects.filter(blog_id__in = blog_ids).values('blog_id').annotate(Count('blog_id'))
        id_count_dict = {item['blog_id']: item['blog_id__count'] for item in comment_count}
        [blog.update({'count': id_count_dict.get(blog['id'], 0)}) for blog in blogs]

        blog_tag_ids = [item['tag_id'] for item in blogs]
        tags = Tag.objects.filter(id__in=blog_tag_ids).values()
        # tags = [to_dict(tag) for tag in tags]
        id_tag_dict = {item['id']: item for item in tags}
        [blog.update({'tag_title': id_tag_dict.get(blog['tag_id'], {}).get('title', ''),
                      'tag_img_url': id_tag_dict.get(blog['tag_id'], {}).get('img_url', '')})
                    for blog in blogs]
        return cors_response(JsonResponse(dict(blogs=blogs)))


class BlogView(View):

    def get(self, request, blog_id):
        blog = Blog.objects.get(pk=blog_id)
        comments = Comment.objects.filter(blog_id=blog_id).all()
        blog = to_dict(blog)
        comments = [to_dict(item) for item in comments]
        blog.update({'comments': comments})
        return cors_response(JsonResponse(dict(blog=blog)))

    def post(self, request, blog_id):
        pass


class CategoriesView(View):

    def get(self, request):
        cates = Category.objects.all()
        cates = [to_dict(item) for item in cates]
        blogs_count = Blog.objects.values('category_id').annotate(Count('category_id'))
        cid_bcount_dict = {item['category_id']: item['category_id__count'] for item in blogs_count}
        [cate.update({'count': cid_bcount_dict.get(cate['id'], 0)}) for cate in cates]
        return cors_response(JsonResponse(dict(cates=cates)))


class CategoryView(View):

    def get(self, request, cate_id):
        cate = Category.objects.get(pk=cate_id)
        blogs = Blog.objects.filter(category_id=cate_id).all()
        cate = to_dict(cate)
        blogs = [to_dict(item) for item in blogs]
        return cors_response(JsonResponse(dict(cate=cate, blogs=blogs)))


class CommentsView(View):

    def get(self, request, blog_id):
        blog_id = int(blog_id)
        page = int(request.GET.get('page', 1))
        page_size = int(request.GET.get('page_size', 10))
        offset = page_size * (page - 1)

        total_count = Comment.objects.filter(blog_id=blog_id).count()
        total_page = (total_count + page_size - 1) // page_size
        comments = Comment.objects.filter(blog_id=blog_id).all()[offset:offset+page_size]
        comments = [to_dict(item) for item in comments]
        return cors_response(JsonResponse(dict(comments=comments, total_count=total_count,
                                               total_page=total_page, page=page, blog_id=blog_id)))

def index(request):
    return render(request, 'index.html')

