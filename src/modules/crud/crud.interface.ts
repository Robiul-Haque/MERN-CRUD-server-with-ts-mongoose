export type TCrud = {
    image: {
        url: string;
        publicId: string;
    };
    name: string;
    phone?: string;
    email?: string;
    description?: string;
    priority: string
}