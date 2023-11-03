import TodoBoard from "@/components/TodoBoard";
import ProtectedRoute from "@/components/common/ProtectedRoute/ProtectedRoute";
import { Box } from "@mui/material";

const HomePage = () => (
    <ProtectedRoute>
        <Box
            component="main"
            sx={{
                p: 6,
                gap: 6,
                display: "flex",
                alignItems: "start",
                width: "fit-content",
                minWidth: "100vw",
            }}
        >
            <TodoBoard />
        </Box>
    </ProtectedRoute>
);

export default HomePage;
