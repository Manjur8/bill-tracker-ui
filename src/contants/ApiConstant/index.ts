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

    //========Flats========
    FLATS: '/flats',
    MY_FLATS: '/flats/my-flats',
    MY_FLAT_MEMBERS: '/flats/my-flat-members',
    ADD_FLAT_MEMBERS: '/flats/add-member',

    // ========Users========
    USERS: '/users/list',
    
    //=======roles======== 
    ROLES_PERMISSIONS: '/rules-and-permissions',
    ROLES_PERMISSIONS_CONFIG: '/rules-and-permissions/ui-config',
    FLAT_ROLES: '/rules-and-permissions/flat-roles',
    APARTMENT_ROLES: '/rules-and-permissions/apartment-roles',
    UPDATE_ROLES_PERMISSIONS: '/rules-and-permissions/update',
}