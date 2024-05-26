from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin



class UserManager(BaseUserManager):
    
    def create_user(self, email, full_name, password=None,):
        if email is None:
            raise ValueError('email is required')
        if password is None:
            raise ValueError('password is required')
        
        user = self.model(
            email=self.normalize_email(email), 
            full_name= full_name, 
            
            )
        
        
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    
    def create_superuser(self, email, full_name, password=None):
        if email is None:
            raise ValueError('email is required')
        if password is None:
            raise ValueError('password is required')
        
        user = self.create_user(
            email=email,
            full_name=full_name,
            password=password
            )
        user.is_admin = True
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user




class User(AbstractBaseUser, PermissionsMixin):    
    email                = models.EmailField(verbose_name='email', max_length=60, unique=True)
    username             = models.CharField(max_length=30, blank=True, null=True)
    full_name            = models.CharField( max_length=100, blank=True, null=True)
    phone                = models.CharField(max_length=12, blank=True, null=True)
    gender               = models.CharField(max_length=10, blank=True, null=True)
    profession           = models.CharField(max_length=100, blank=True, null=True)
    city                 = models.CharField(max_length=100, blank=True, null=True)
    state                = models.CharField(max_length=100, blank=True, null=True)
    zip                  = models.CharField(max_length=10, blank=True, null=True)
    address              = models.CharField(max_length=100, blank=True, null=True)
    country              = models.CharField(max_length=100, blank=True, null=True)
    photo                = models.FileField(upload_to ='images', default='images/default.jpg', blank=True, null=True)
    date_joined          = models.DateTimeField(verbose_name='date joined', auto_now_add=True)
    last_login           = models.DateTimeField(verbose_name="last login", auto_now=True)
    is_admin             = models.BooleanField(default=False)
    is_active            = models.BooleanField(default=True)
    is_staff             = models.BooleanField(default=False)
    is_superuser         = models.BooleanField(default=False)
    
    is_organizer = models.BooleanField(default=True)
    is_agent= models.BooleanField(default=False)
    
    otp = models.CharField(max_length=1000, null=True, blank=True)
    reset_token  = models.CharField(max_length=1000, null=True, blank=True)
    
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name']
    
    objects = UserManager()
    
    def __str__(self):
        if self.full_name:
            return str(self.full_name)
        else:
            return str(self.email)  
    
   