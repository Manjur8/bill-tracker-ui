export interface CustomCardTypes {
    title: string,
    description: string | React.ReactElement,
    photo: string,
    onClickHandler: () => void,
    actions?: React.ReactElement[]
}

export interface ApartmentsListTypes {
    _id: string,
    name: string,
    available_fund: number
    address: {
        country: string,
        city_village: string,
        pincode: number,
        locality: string,
    }
}

export interface ApartmentDetailsTypes extends ApartmentsListTypes {
    members: Record<string, unknown>,
}

export interface ApartmentFlatsTypes {
    _id: string,
    name: string,
    apartment_id: string,
    block: string,
    floor: number,
    flat_number: string,
    maintanance_due: number,
}