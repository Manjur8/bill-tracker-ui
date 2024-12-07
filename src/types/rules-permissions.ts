export interface RulesPermissionsTypes {
    apartment_id?: string;
    name: string,
    _id: string,
    paths: Record<string, string[]>
    editable: boolean
    role_for: string[]
}