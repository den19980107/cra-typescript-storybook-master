const getRefObject = async target => {
  return new Promise(function (resolve, reject) {
    const timer = setInterval(() => {
      if (target.current) {
        clearInterval(timer);
        resolve(target.current);
      }
    }, 100);
  });
};

export default getRefObject;
//# sourceMappingURL=getRefObject.js.map