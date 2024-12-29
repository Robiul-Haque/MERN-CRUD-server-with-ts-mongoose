export type TCrud = {
    image: {
        url: string;
        public_id: string;
    };
    name: string;
    phone?: string;
    email?: string;
    description?: string;
    priority: string
}