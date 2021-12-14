const socket = io("http://localhost:3000"); // the / namespace/endpoint

socket.on("connect", () => {
  console.log(socket.id);
});

socket.on("nsList", (nsData) => {
  console.log(nsData);
  let namespaceDiv = document.querySelector(".namespaces");

  namespaceDiv.innerHTML = "";

  nsData.forEach(({ img, endpoint }) => {
    namespaceDiv.innerHTML += `<div class="namespace" ns="${endpoint}">
      <img src="${img}" />
    </div>`;
  });

  Array.from(document.getElementsByClassName("namespace")).forEach((ele) => {
    console.log(ele);
    ele.addEventListener("click", () => {
      const endpoint = ele.getAttribute("ns");
      console.log(endpoint);
    });
  });
});
