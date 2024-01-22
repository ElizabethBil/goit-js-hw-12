import{a as h,S as L,i as b}from"./assets/vendor-89feecc5.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&c(i)}).observe(document,{childList:!0,subtree:!0});function y(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerpolicy&&(n.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?n.credentials="include":t.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function c(t){if(t.ep)return;t.ep=!0;const n=y(t);fetch(t.href,n)}})();const E=h.create({baseURL:"https://pixabay.com/api/",params:{key:"41702545-5a959d1a868233ac463ab5270",language:"en",image_type:"photo",orientation:"horizontal",safesearch:!0}}),v=document.getElementById("search-form"),l=document.getElementById("image-gallery"),s=document.getElementById("load-more"),w=document.getElementById("spinner");let o,a=1,m=40,f="",I=!1,d;v.addEventListener("submit",async e=>{e.preventDefault();const r=new FormData(e.currentTarget).get("query");r&&(f=r,a=1,l.innerHTML="",await g())});s.addEventListener("click",async()=>{a+=1,await g()});async function S(){return(await E.get("",{params:{q:f,page:a,per_page:m}})).data}async function g(){try{u(!0);const e=await S();d=e.totalHits,a*m>=d?(I=!0,s.classList.add("is-hidden")):s.classList.remove("is-hidden"),x(e.hits)}catch{p()}finally{u(!1)}}function x(e){if(e.length===0){p();return}const r=e.map(M);l.append(...r),k()}function M(e){const r=document.createElement("a");return r.href=e.largeImageURL,r.setAttribute("data-lightbox","image-gallery"),r.innerHTML=`
    <div class="gallery-item">
      <img src="${e.webformatURL}" alt="${e.tags}"> <!-- Використання webformatURL -->
      <div class="image-info">
        <div class="img-info-item">
          <p>Likes:</p>
          <p>${e.likes}</p>
        </div>
        ...
      </div>
    </div>
  `,r}function k(){o?o.refresh():o=new L(".gallery a")}function u(e){w.classList.toggle("is-hidden",!e)}function p(){l.innerHTML="",b.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"})}
//# sourceMappingURL=commonHelpers.js.map
