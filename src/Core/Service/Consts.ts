const { NODE_ENV } = process.env;

/** Development mode path. */
export const devPath = "http://localhost:8000";

/** Production mode path. */
export const prodPath = "http://localhost:8000";

/** Full path. */
export const restPath = NODE_ENV === "development" ? devPath : prodPath;
