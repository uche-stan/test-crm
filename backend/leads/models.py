from django.db import models
from accounts.models import User
from django.db.models.signals import post_save
from django.contrib.auth.models import AbstractUser
from django.urls import reverse
from datetime import datetime





class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE) 
    
    def __str__(self):
        return self.user.email

     # signal
    def create_profile(sender, instance, created, **kwargs):
        if created:
            UserProfile.objects.create(user=instance)
    
    post_save.connect(create_profile, sender=User)
    
    
class Agent (models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    organization = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.user.full_name} "
    

class Category(models.Model):
    name = models.CharField(max_length=200) 
    organization = models.ForeignKey('Userprofile', on_delete=models.CASCADE)   
    
    def __str__(self):
        return self.name         
        

class Lead (models.Model):
    
    SOURCE_CHOICES = (
        ('ig', 'instagram'),
        ('fb', 'facebook'),
        ('google', 'google'),
        ('website', 'website'),
        ('X', 'X'),
        ('yt', 'YouTube'),
        ('reference', 'reference'),
    )
    
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    
    phone = models.CharField(max_length=255, blank=True, null = True)
    email = models.EmailField(blank=True, null = True)
    age = models.IntegerField(blank=True, null = True)
    
    source = models.CharField(max_length=255, choices=SOURCE_CHOICES, default=None)
    campaign = models.CharField(max_length=255, default=None, blank=True, null = True)
    reminder  = models.TextField(blank=True, null = True)
    created_time = models.DateTimeField(auto_now_add=True)
    updated_time = models.DateTimeField(auto_now=True)
    agent = models.ForeignKey(Agent, on_delete=models.SET_NULL, blank=True, null=True, default=None)
    organization = models.ForeignKey(User, on_delete=models.CASCADE)
    
    category = models.ForeignKey(Category, on_delete=models.SET_NULL,related_name="leads", blank=True, null=True)



    def __str__(self):
        return f"{self.first_name} {self.last_name} "