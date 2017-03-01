export function appStorage() {

  const STORAGE_PREFIX = '500px_';

  function saveState (state: any) {
    localStorage.setItem(STORAGE_PREFIX + 'favourite', JSON.stringify(state));
  }

  function getState () {
    const data: any = localStorage.getItem(STORAGE_PREFIX + 'favourite');
    return  JSON.parse(data);
  }

  return {
    saveState,
    getState,
  };

}
