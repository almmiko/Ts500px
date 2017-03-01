export function validateStatusCode(response: Response) {
  if (response.status >= 200 && response.status < 300) {
    return true;
  } else {
    throw new Error(response.statusText);
  }
}
