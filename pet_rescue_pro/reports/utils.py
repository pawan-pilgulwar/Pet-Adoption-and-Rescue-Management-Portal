from .models import PetReport
from notifications.models import Notification

def find_matches(new_report):
    """
    Search for potential matches for a new pet report.
    If the new report is 'Lost', search for 'Found' reports and vice versa.
    Matches are based on pet type, breed, color, and location.
    Notifications are sent to both the new report owner and the matching report owners.
    """
    # Determine the opposite status to search for
    target_status = "Found" if new_report.pet_status == "Lost" else "Lost"
    
    # Filter for matching reports
    # Only match with 'Accepted' reports to ensure reliability
    matches = PetReport.objects.filter(
        pet_status=target_status,
        pet_type__iexact=new_report.pet_type,
        status="Accepted"
    ).exclude(user=new_report.user)
    
    # Apply additional filters if fields are available (iexact for color/breed, icontains for location)
    if new_report.pet_breed:
        matches = matches.filter(pet_breed__icontains=new_report.pet_breed)
    
    if new_report.pet_color:
        matches = matches.filter(pet_color__icontains=new_report.pet_color)
        
    if new_report.location:
        matches = matches.filter(location__icontains=new_report.location)

    # Trigger notifications for all matches
    for match in matches:
        # Notify the owner of the existing matching report
        Notification.objects.create(
            user=match.user,
            report=new_report,
            notification_type="Match_Found",
            title="Potential Match Found!",
            message=f"A similar {new_report.pet_type} has been reported as {new_report.pet_status}. Please check."
        )
        
        # Notify the owner of the new report
        Notification.objects.create(
            user=new_report.user,
            report=match,
            notification_type="Match_Found",
            title="Potential Match Found!",
            message=f"A similar {match.pet_type} was previously reported as {match.pet_status}. Please check."
        )
