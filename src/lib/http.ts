const request = async (
  method: "GET" | "PUT" | "POST" | "DELETE",
  url: string,
  options?: RequestInit | undefined
) => {
  const body = options?.body ? JSON.stringify(options.body) : undefined;
  const baseHeader = {
    "Content-Type": "application/json",
  };
};
