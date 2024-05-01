export function getImagePath(imageName) {
    if (import.meta.env.MODE === 'development') {
      return `./src/img/list/${imageName}`;
    } else {
      return `./assets/${imageName}`;
    }
  }