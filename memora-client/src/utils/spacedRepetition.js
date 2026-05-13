export function getNextReviewDate(rating){
     const now = new Date();
     
     switch (rating){
        case "hard":
            now.setDate(now.getDate() + 1);
            break;

        case "medium":
            now.setDate(now.getDate() + 3);
            break;
        
        case "easy":
            now.setDate(now.getDate() + 7);
            break;
        
        default:
            break;
     }
     return now.toISOString();
}
