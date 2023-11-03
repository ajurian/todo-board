"use client";

import AddList from "@/components/TodoBoard/AddList";
import TodoList from "@/components/TodoList";
import { useTodo } from "@/context/TodoProvider";
import useAddTodoList from "@/hooks/useAddTodoList";
import { Box, CircularProgress, Typography } from "@mui/material";

export default function TodoBoard() {
    const { todoLists, status: queryStatus, error } = useTodo();
    const { mutate, status: addTodoListStatus, variables } = useAddTodoList();

    if (queryStatus === "pending") {
        return (
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <CircularProgress size="2rem" />
            </Box>
        );
    }

    if (queryStatus === "error") {
        return (
            <Typography
                variant="body1"
                color="error"
                sx={{ width: "100%", textAlign: "center" }}
            >
                PostgreSQL Error Code: {error?.code}
            </Typography>
        );
    }

    return (
        <>
            {todoLists.map((props, idx) => (
                <TodoList key={idx} {...props} />
            ))}
            {addTodoListStatus === "pending" && (
                <TodoList title={variables?.title} creationPending />
            )}
            <AddList onAdd={mutate} status={addTodoListStatus} />
        </>
    );
}
