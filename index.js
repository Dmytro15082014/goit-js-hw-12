import{a as p,S as g,i as c}from"./assets/vendor-CZCqCKWq.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const y="49627345-81d87c81626646e8cd4c1e6ab",h=a=>p("https://pixabay.com/api/",{params:{key:y,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:"30"}}),f=document.querySelector(".gallery"),m=document.querySelector(".loader"),L=new g(".gallery-card a",{captionsData:"alt",captionDelay:"250"});function b(a){f.innerHTML=a.map(({webformatURL:t,largeImageURL:o,tags:s,likes:e,views:r,comments:i,downloads:d})=>`<li class="image-item">
            <div class="gallery-card"><a href="${o}"><img src="${t}" alt="${s}" class="image"/></a></div>
            <ul class="image-info">
                <li>Likes<p>${e}</p></li>
                <li>Views<p>${r}</p></li>
                <li>Comments<p>${i}</p></li>
                <li>Downloads<p>${d}</p></li>
            </ul>
        </li>`).join(""),L.refresh()}const v=()=>{f.innerHTML=""},w=()=>{m.classList.remove("visually-hidden")},u=()=>{m.classList.add("visually-hidden")},l=document.querySelector(".form");l.addEventListener("submit",S);function S(a){a.preventDefault(),w(),v();const t=l.elements[0].value.toLowerCase().trim();if(!(t.length>0)){c.show(n),u(),l.reset();return}h(t).then(o=>{const s=o.data.hits;if(!s.length){c.show(n);return}b(s)}).catch(o=>{n.message=o.message,c.show(n)}).finally(()=>{u(),l.reset()})}const n={title:"Error",titleColor:"#fafafb",message:"Sorry, there are no images matching your search query. Please try again!",iconColor:"#fafafb",color:"#ef4040",messageColor:"#fafafb",position:"topRight",messageSize:"16px",messageSize:"150%"};
//# sourceMappingURL=index.js.map
