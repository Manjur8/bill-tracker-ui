import { apartmentMenu, defaultMenus, flatMenu } from "@/contants/AppConstant";

export const generateSideMenus = (apartment: boolean, flat: boolean) => {
    const result = defaultMenus;
    const foundKey = result.find((item) => item?.key === 'appartment' || item?.key === 'flat');
    if (!foundKey) {
        if (apartment) {
            result.splice(1, 0, apartmentMenu); // Insert at index 1
        }
        if (flat) {
            if(apartment) {
                result.splice(2, 0, flatMenu); // Insert at index 2
            } else {
                result.splice(1, 0, flatMenu); // Insert at index 1
            }
        }
    }
    return result;
}