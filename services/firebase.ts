// Firebase service has been removed and replaced by local storage.
export const db = null;
export default null;
export const saveRecord = async () => {
    throw new Error("Firebase is disabled. Use storageService instead.");
};
