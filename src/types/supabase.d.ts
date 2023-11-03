type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

interface Database {
    public: {
        Tables: {
            todoItems: {
                Row: {
                    createdAt: string;
                    description: string;
                    id: string;
                    listId: string;
                    title: string;
                };
                Insert: {
                    createdAt?: string;
                    description?: string;
                    id?: string;
                    listId: string;
                    title: string;
                };
                Update: {
                    createdAt?: string;
                    description?: string;
                    id?: string;
                    listId?: string;
                    title?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "todoItems_listId_fkey";
                        columns: ["listId"];
                        referencedRelation: "todoLists";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "todoItems_listId_fkey";
                        columns: ["listId"];
                        referencedRelation: "todoListsWithItems";
                        referencedColumns: ["id"];
                    }
                ];
            };
            todoLists: {
                Row: {
                    createdAt: string;
                    id: string;
                    ownerId: string;
                    title: string;
                };
                Insert: {
                    createdAt?: string;
                    id?: string;
                    ownerId: string;
                    title: string;
                };
                Update: {
                    createdAt?: string;
                    id?: string;
                    ownerId?: string;
                    title?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "todoLists_ownerId_fkey";
                        columns: ["ownerId"];
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    }
                ];
            };
            users: {
                Row: {
                    createdAt: string;
                    email: string;
                    id: string;
                    username: string;
                };
                Insert: {
                    createdAt?: string;
                    email: string;
                    id: string;
                    username?: string;
                };
                Update: {
                    createdAt?: string;
                    email?: string;
                    id?: string;
                    username?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "users_id_fkey";
                        columns: ["id"];
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    }
                ];
            };
        };
        Views: {
            todoListsWithItems: {
                Row: {
                    createdAt: string;
                    id: string;
                    items: TodoItemData[];
                    ownerId: string;
                    title: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "todoLists_ownerId_fkey";
                        columns: ["ownerId"];
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    }
                ];
            };
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
}

type TodoListData = Database["public"]["Tables"]["todoLists"]["Row"];
type TodoItemData = Database["public"]["Tables"]["todoItems"]["Row"];
type TodoListWithItemsData = Database["public"]["Views"]["todoListsWithItems"]["Row"]