export const getCursor = async (userId: string, bookId: string) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_GATEWAY_URL}/api/v1/user-progress/${userId}/book/${bookId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch cursor: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching cursor:", error);
      return 0;
    }
  };

