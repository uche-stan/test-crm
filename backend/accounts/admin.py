from django.contrib import admin
from .models import User




@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = [ 'full_name',  'email', "profession", 'photo', "phone"]
    
    readonly_fields = ['last_login', 'date_joined']
    
    def get_form(self, request, obj=None, **kwargs): 
        form = super().get_form(request, obj, **kwargs) 
        is_superuser = request.user.is_superuser 
        if not is_superuser: 
            form.base_fields['email'].disabled = True 
        return form 
