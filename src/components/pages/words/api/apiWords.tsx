export const getQuickStudyList = async (userId: string) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_GATEWAY_URL}/api/v1/words/user/${userId}/quick-study-set`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch study set: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching study set:", error);
  }
};

export const updateProgress = async (
  wordId: string,
  userId: string,
  progress: number
) => {
  try {
    console.log(`Updating progress for word ${wordId} on ${progress}`);

    await new Promise((resolve) => setTimeout(resolve, 300));

    return Promise.resolve();
  } catch (error) {
    console.error("Error updating progress:", error);
    throw new Error("Failed to update progress");
  }
};

export const getStudyCardDto = async (userId: string, wordId: string) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_GATEWAY_URL}/api/v1/words/study-card/user/${userId}/wordId/${wordId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch study card: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching study card:", error);
  }
};
