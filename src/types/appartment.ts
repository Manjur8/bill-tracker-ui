export interface CustomCardTypes {
    title: string,
    description: string | React.ReactElement,
    photo: string,
    onClickHandler: () => void
}

export interface ApartmentsListTypes {
    _id: string,
    name: string,
    address: {
        country: string,
        city_village: string,
        pincode: number,
        locality: string,
    }
}

export interface ApartmentDetailsTypes extends ApartmentsListTypes {
    members: Record<string, unknown>,
    available_fund: number
}