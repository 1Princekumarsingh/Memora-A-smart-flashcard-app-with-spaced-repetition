export function getNextReviewDate(rating){
    const now = new Date();

    const daysMap = {
        1:1,
        2:2,
        3:4 ,
        4:7
    }

    now.setDate(now.getDate() + daysMap[rating]);

    return now;
}