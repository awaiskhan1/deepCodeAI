export const generateUniqueId = () => {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);

    return `id-${timestamp}-${hexadecimalString}`;
}

export const fetchDeepCode = async (ask) => {
    const response = await fetch("/api/deepcode", {
        method: "POST",
        body: JSON.stringify({ask}),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data.response;
}