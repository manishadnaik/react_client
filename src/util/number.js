export const convertToFixed = (t) => {
  if (!isNaN(t)) {
    // console.log(t, isNaN(t));
    console.log(typeof t);
    t = typeof t === "number" ? t.toString() : t;
    // console.log(t.indexOf("."));

    return t.indexOf(".") >= 0
      ? t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), 3)
      : t;
  }
};
