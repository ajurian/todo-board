import NextLink, { LinkProps } from "next/link";
import React, { forwardRef } from "react";

const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
    props,
    ref
) {
    return <NextLink ref={ref} {...props} />;
});

export default Link;
