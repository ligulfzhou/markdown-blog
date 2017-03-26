from django.conf.urls import url

from .views import BlogView, BlogsView, index, TagView, TagsView, \
    CategoriesView, CategoryView, CommentsView

urlpatterns = [
    url(r'^$', index),
    url(r'^/tags$', TagsView.as_view()),
    url(r'^/tags/(?P<tag_id>[0-9])', TagView.as_view()),
    url(r'^/cates$', CategoriesView.as_view()),
    url(r'^/cates/(?P<cate_id>[0-9])', CategoryView.as_view()),
    url(r'^/blogs$', BlogsView.as_view()),
    url(r'^/blogs/(?P<blog_id>[0-9])$', BlogView.as_view()),
    url(r'^/blogs/(?P<blog_id>[0-9])/comments', CommentsView.as_view())
]

