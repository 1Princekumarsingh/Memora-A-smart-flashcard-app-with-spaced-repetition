export function calculateSchedule(card, rating){
    let {
        repetitions,
        interval,
        easeFactor
    } = card

    if (rating === 1){
        repetitions = 0
        interval = 1
    }
    else{
        repetitions ++ 

        if(repetitions === 1){
            interval = 1
        } else if(repetitions === 2){
            interval = 6
        } else{
            interval = Math.round(interval*easeFactor)
        }
    }
    
    easeFactor = easeFactor + (0.1 - (4 - rating) * (0.08 + (4 - rating)*0.02))

    easeFactor = Math.max(1.3, easeFactor)

    const nextReview = new Date()
    
    nextReview.setDate(nextReview.getDate() + interval)

    return {
        repetitions,
        interval,
        easeFactor,
        nextReview
    }
}