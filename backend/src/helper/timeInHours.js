export function timeDifferenceInHours(date) {
    const date1 = new Date(Date.now());
    const date2 = new Date(date);
    
    // Calculate the difference in milliseconds
    const differenceInMilliseconds = date1 - date2;
    
    // Convert milliseconds to hours
    const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);  
    
    return differenceInHours;
}