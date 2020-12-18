export default (request, response, next) => {
    const { method, url, ip } = request;
    const logLabel = `[${method.toUpperCase()} ${url}] from ${ip}`;
    console.time(logLabel);
    next();
    console.timeEnd(logLabel);
};
