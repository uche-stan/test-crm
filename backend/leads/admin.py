from django.contrib import admin
from .models import  Agent, Lead, UserProfile, Category


@admin.register(Agent)    
class AgentAdmin(admin.ModelAdmin):
        list_display = [ "user"]
        

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = [ "user"]
    
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = [ "name", 'organization' ]

        
@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = [ "first_name", "last_name", "phone", "email", "agent", "source"]     
    
    fieldsets = (
        ("Bio", {'fields': ("first_name", "last_name",  "age") },),
        
        ("Contact Information", {'fields': ("phone", "email",)},),
        
        ("Others", {'fields': ("source", "campaign", "agent", "reminder")},),
    )   