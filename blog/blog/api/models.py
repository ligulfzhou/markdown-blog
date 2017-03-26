import datetime
from django.db import models


class Category(models.Model):
    title = models.CharField(max_length=128, default='')
    img_url = models.CharField(max_length=128, default='')
    create_time = models.DateTimeField(auto_now_add=True)
    # create_time = models.DateTimeField(default=datetime.datetime.now().strftime('%Y-%m-%d %X'))

    class Meta:
        db_table = 'category'

    def __str__(self):
        return f'{self.title}'

class Blog(models.Model):
    title = models.CharField(max_length=128, default='')
    stars = models.IntegerField()
    content = models.TextField()
    # category = models.ForeignKey(Category, on_delete=models.CASCADE, default=1)
    category_id = models.IntegerField("belong to which category", default=0)
    tag_id = models.IntegerField("tag id", default=0)
    create_time = models.DateTimeField(auto_now_add=True)
    # create_time = models.DateTimeField(default=datetime.datetime.now().strftime('%Y-%m-%d %X'))

    class Meta:
        db_table = 'blog'

    def __str__(self):
        return f'{self.title}'


class Tag(models.Model):
    # blogs = models.ManyToManyField(Blog)
    img_url = models.CharField(max_length=128, default='')
    title = models.CharField(max_length=128, default='')
    create_time = models.DateTimeField(auto_now_add=True)
    # create_time = models.DateTimeField(default=datetime.datetime.now().strftime('%Y-%m-%d %X'))

    class Meta:
        db_table = 'tag'

    def __str__(self):
        return f'{self.title}'

class Comment(models.Model):
    # blog = models.ForeignKey(Blog, on_delete=models.CASCADE, default=1)
    blog_id = models.IntegerField("belong to which blog", default=0)
    to_comment_id = models.IntegerField("comment to another comment", default=0)
    username = models.CharField(max_length=128)
    content = models.TextField()
    create_time = models.DateTimeField(auto_now_add=True)
    # create_time = models.DateTimeField(default=datetime.datetime.now().strftime('%Y-%m-%d %X'))

    class Meta:
        db_table = 'comment'

    def __str__(self):
        return f'{self.blog_id}, {self.to_comment_id}, {self.content[:20]}'

