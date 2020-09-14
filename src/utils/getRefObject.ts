const getRefObject = async <T extends {}>(target: React.RefObject<T>): Promise<T> => {
    return new Promise(function (resolve, reject) {
        const timer = setInterval(() => {
            if (target.current) {
                clearInterval(timer);
                resolve(target.current);
            }
        }, 100);
    });
}

export default getRefObject;