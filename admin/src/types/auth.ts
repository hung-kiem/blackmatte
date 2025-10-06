// ---- LOGIN RESPONSE ----
export interface LoginResponse {
    userid: number
    username: string
    lowerusername: string
    mobile: string
    email: string
    roleid: number
    rolename: string
    rolekey: string
    accessToken: string
}
// ---- LOGIN RESPONSE ----

// ---- CURRENT USER DETAILS ----
export interface UserInformation {
    id: string
    name: string
    email: string
    role: string
    roleName: string
}
// ---- CURRENT USER DETAILS ----

// ---- MENU ITEMS ----
export interface GetMenuItemResponse {
    menuItems: MenuItems[]
}

export interface MenuItems {
    modes?: string[]
    scopes?: string[]
    label?: string
    route?: string
    icon?: string
    children?: MenuItems[]
}
// ---- MENU ITEMS ----
