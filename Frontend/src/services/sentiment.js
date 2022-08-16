import { USER_FEEDBACK_TO_FIREBASE_URI, FETCH_FEEDBACK_FROM_FIREBASE_URI } from "../constants/index";

export const storeFeedbackSentimentToFireBase = async (
    username,
    review,
    days,
) => {
    const response = await fetch(USER_FEEDBACK_TO_FIREBASE_URI, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            review,
            days,
        }),
    });
    return response;
};


export const getUserFeedbackFromFirebase = async () => {
    const response = await fetch(
        FETCH_FEEDBACK_FROM_FIREBASE_URI,
        {
            headers: {
                "Content-Type": "application/json",
            },
        },
    );
    return response;
};