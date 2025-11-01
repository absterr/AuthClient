const handleFallbackMessage = (error: unknown, fallbackMessage: string) => {
  if (error instanceof Error) {
    const axiosError = error as any;
    const message = axiosError?.response?.data?.message || error.message;
    if (message === "Internal server error") throw new Error(fallbackMessage);
    throw new Error(message);
  }
  throw new Error(fallbackMessage);
};

export default handleFallbackMessage;
