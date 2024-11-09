// ====Note: if api is not_need auth token, add PUBLIC_<api_contants> before yhe key====
// ====eg: PUBLIC_USERS_SIGNUP: '/users/signup',  as sign-up api doesn't need auth token====
export const API_ROUTES: Record<string, string> = {
    PUBLIC_USERS_SIGNUP: '/users/signup',
    PUBLIC_USERS_SIGNIN: '/auth/signin',
    USERS_SIGNOUT: '/auth/signout',

    // =====Appartments===
    APPARTMENT_REGISTER: '/apartments',
    MY_APARTMENT: '/apartments/my-apartments',
    APARTMENT_DETAILS: '/apartments/apartment_detail',
    APARTMENT_MEMBERS: '/apartments/members',
    APARTMENT_FLATS: '/apartments/flats',
    APARTMENT_ADD_MEMBER: '/apartments/add-member',
    APARTMENT_MEMBERS_DELETE: '/apartments/remove-member',

    // ========Users========
    USERS: '/users/list',
    
    //=======rules======== 
    RULES_PERMISSIONS: '/rules-and-permissions',
}