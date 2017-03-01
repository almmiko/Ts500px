export function dataTransform (data: any[]) {
  let result: any[] = [];

  data.forEach((item) => {
    result.push({
      url: item.image_url,
      selected: false,
      id: item.id,
    });
  });

  return result;
}
