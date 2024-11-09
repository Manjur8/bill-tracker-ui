export interface DynamicRouteTypes {
    params: {
        id: string
    };
};

export interface ModalPropsTypes<T> {
    open: boolean;
    handleOk: () => void;
    handleCancel: () => void;
    title : string;
    data?: T; // Replace with actual data type
    submitLoader?: boolean;
}