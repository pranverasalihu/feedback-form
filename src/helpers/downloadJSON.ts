export const downloadJSON = (data: Object) => {
  const link = document.createElement("a");
  link.href =
    "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
  link.style.opacity = "0";
  link.download = "data.json";
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
