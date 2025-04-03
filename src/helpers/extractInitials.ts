export function getInitials(fullName: string): string {
    // Split the full name by spaces
    const nameParts = fullName.trim().split(' ');

    // Extract the first letter of each part and join them
    const initials = nameParts.map(part => part.charAt(0).toUpperCase()).join('');

    return initials;
}