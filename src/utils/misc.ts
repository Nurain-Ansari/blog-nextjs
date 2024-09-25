export function getOptionString<T extends object>(
  options: Partial<T>,
  defaultOptions?: T
): string {
  const searchParams = new URLSearchParams();

  // Merge the default options with the provided options if any
  const queryOptions = { ...defaultOptions, ...options };

  Object.keys(queryOptions).forEach((key) => {
    // if value of key exist then set searchParams else remove it
    if (`${queryOptions[key as keyof T]}`)
      searchParams.set(key, `${queryOptions[key as keyof T]}`);
  });

  return searchParams.toString();
}
