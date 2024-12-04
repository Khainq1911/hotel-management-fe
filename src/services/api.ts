"use client";

type httpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface Response<T = any> {
  response?: T;
}

export const sendRequest = async <T>(
  url: string,
  method: httpMethod = "GET",
  data: T | null = null,
  accessToken?: string | null,
  headers: Record<string, string> = {}
): Promise<Response> => {
  const authHeader = {
    ...headers,
    "Content-Type": "application/json",
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };

  const options: RequestInit = {
    method,
    headers: authHeader,
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong!");
    }

    const responseData = await response.json();

    return {
      response: responseData,
    };
  } catch (error: any) {
    console.error("API Error:", error);
    throw new Error(
      error?.message || "An error occurred while fetching the data"
    );
  }
};
