const e=document.querySelector("[data-start]"),t=e.nextElementSibling;let d=null;function l(){document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}t.disabled=!0,e.addEventListener("click",(()=>{l(),d=setInterval(l,1e3),e.disabled=!0,t.disabled=!1})),t.addEventListener("click",(()=>{clearInterval(d),e.disabled=!1,t.disabled=!0}));
//# sourceMappingURL=01-color-switcher.9b185337.js.map
