interface ProtectedRouteProps {
    children: ((session: Session) => React.ReactNode) | React.ReactNode;
}
