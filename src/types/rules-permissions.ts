export interface RulesPermissionsTypes {
    name: string,
    _id: string,
    paths: Record<string, string[]>
    editable: boolean
}